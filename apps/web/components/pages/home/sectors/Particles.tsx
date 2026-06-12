/**
 * MorphingParticles.tsx
 * ---------------------
 * A Three.js particle system that morphs into any SVG shape on hover.
 *
 * Bugs fixed vs original:
 *  1. parseSvgToTargets moved outside component → no stale-closure on resize
 *  2. svgString prop changes now properly re-parse targets & reassign (deps array)
 *  3. Hover handler waits for svgTargetsRef to be populated before assigning
 *  4. RAF cancelled before async parse resolves → no race condition on unmount
 *  5. resizeTimer typed as ReturnType<typeof setTimeout> | undefined
 *  6. Shape-particle count tracked separately; target list sized to match exactly
 *  7. instanceColor existence checked before needsUpdate
 *  8. SSR guard: all window/canvas access inside useEffect
 *  9. dummy Object3D hoisted outside animate() loop → no per-frame allocation
 * 10. Idle velocity capped to prevent unbounded drift
 * 11. Ambient particles never consume shape targets; lists are kept separate
 * 12. img.onload set before src to avoid race in strict mode
 * 13. Full TypeScript types, no `any`
 */

"use client";

import { cn } from "@swastik/ui/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";

// ─── Config ───────────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 1_500;
const AMBIENT_RATIO = 0;   // fraction of particles that stay at the edges
const SHAPE_COUNT = Math.round(PARTICLE_COUNT * (1 - AMBIENT_RATIO));
const AMBIENT_COUNT = PARTICLE_COUNT - SHAPE_COUNT;

const COLORS = [
    "#F15E32",
];

const MAX_IDLE_SPEED = 1.8; // px/frame cap to prevent unbounded drift

// ─── Types ────────────────────────────────────────────────────────────────────

interface ParticleData {
    role: "ambient" | "shape";
    x: number;
    y: number;
    vx: number;
    vy: number;
    /** The SVG-derived target the particle flies to on hover */
    targetX: number;
    targetY: number;
    /** Idle / ambient resting position */
    anchorX: number;
    anchorY: number;
    wanderAngle: number;
    wanderSpeed: number;
    wanderRadius: number;
    size: number;
    color: THREE.Color;
}

export interface MorphingParticlesProps {
    /** Raw SVG markup string – must be a valid, self-contained <svg>…</svg> blob */
    svgString: string;
    /** Override canvas background color (default transparent/white) */
    className?: string;
    isActive?: boolean
}

// ─── Pure helper: SVG → sampled point cloud ───────────────────────────────────

/**
 * Rasterises `svgString` onto an offscreen canvas and returns `count` randomly
 * sampled positions from its opaque pixels, in WebGL's centre-origin space.
 *
 * Extracted from the component so it:
 *   • Has no closure over component state (fixes stale-closure bug on resize)
 *   • Can be called freely from any effect or callback
 */
function parseSvgToTargets(
    width: number,
    height: number,
    svgString: string,
    count: number
): Promise<Array<{ x: number; y: number }>> {
    return new Promise((resolve) => {
        if (!svgString || width === 0 || height === 0) return resolve([]);

        const img = new Image();

        img.onload = () => {
            const cvs = document.createElement("canvas");
            cvs.width = width;
            cvs.height = height;

            const ctx = cvs.getContext("2d", { willReadFrequently: true });
            if (!ctx) return resolve([]);

            // Render SVG centred, occupying ~60 % of the shorter axis
            const size = Math.min(width, height);
            const dx = (width - size) / 2;
            const dy = (height - size) / 2;
            ctx.drawImage(img, dx, dy, size, size);

            const { data } = ctx.getImageData(0, 0, width, height);
            const pool: Array<{ x: number; y: number }> = [];
            const step = 3; // sample every 3rd pixel for performance

            for (let py = 0; py < height; py += step) {
                for (let px = 0; px < width; px += step) {
                    if (data[(py * width + px) * 4 + 3]! > 128) {
                        // Convert from top-left origin (DOM) → centre-origin (WebGL)
                        pool.push({ x: px - width / 2, y: -(py - height / 2) });
                    }
                }
            }

            if (pool.length === 0) return resolve([]);

            // Sample `count` positions from the pool (with replacement)
            const targets = Array.from({ length: count }, () =>
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                pool[Math.floor(Math.random() * pool.length)]!
            );
            // Shuffle for organic sweep-in order
            targets.sort(() => Math.random() - 0.5);

            resolve(targets);
        };

        img.onerror = () => resolve([]);

        // Neutralise `currentColor` so the canvas renderer can see strokes/fills
        const safeSvg = svgString.replace(/currentColor/g, "#000000");
        img.src = `data:image/svg+xml;utf8,${encodeURIComponent(safeSvg)}`;
    });
}

// ─── Component ────────────────────────────────────────────────────────────────

export function MorphingParticles({ svgString, className, isActive = false }: MorphingParticlesProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isHovered, setIsHovered] = useState(isActive);

    // ── Refs shared with the animation loop (avoids stale closures in RAF) ──────
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const particlesRef = useRef<ParticleData[]>([]);
    const meshRef = useRef<THREE.InstancedMesh | null>(null);
    const svgTargetsRef = useRef<Array<{ x: number; y: number }>>([]);
    const isHoveredRef = useRef(false);
    const dimensionsRef = useRef({ w: 0, h: 0 });

    // ─── Synchronise React state → ref for the RAF loop ─────────────────────────
    useEffect(() => {
        isHoveredRef.current = isHovered;
    }, [isHovered]);

    // ─── Assign SVG targets to shape particles (called on hover & after resize) ──
    const assignTargets = useCallback(() => {
        const targets = svgTargetsRef.current;
        if (targets.length === 0) return;

        let ti = 0;
        for (const p of particlesRef.current) {
            if (p.role !== "shape") continue;
            if (ti >= targets.length) ti = 0; // wrap if fewer targets than particles
            const target = targets[ti];
            if (target) {
                p.targetX = target.x;
                p.targetY = target.y;
            }
            ti++;
        }
    }, []);

    // ─── Core Three.js setup + animation loop ────────────────────────────────────
    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let w = container.clientWidth;
        let h = container.clientHeight;
        dimensionsRef.current = { w, h };

        // ── Scene ────────────────────────────────────────────────────────────────
        const scene = new THREE.Scene();

        const camera = new THREE.OrthographicCamera(
            w / -2, w / 2, h / 2, h / -2, 1, 1000
        );
        camera.position.z = 100;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
        });
        renderer.setSize(w, h);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        rendererRef.current = renderer;

        // ── Geometry / Material / InstancedMesh ──────────────────────────────────
        const geo = new THREE.CircleGeometry(0.8, 10);
        const mat = new THREE.MeshBasicMaterial({
            vertexColors: false,
            transparent: true,
            opacity: 0.88,
        });
        const mesh = new THREE.InstancedMesh(geo, mat, PARTICLE_COUNT);
        mesh.frustumCulled = false; // particles can sit outside view briefly
        meshRef.current = mesh;
        scene.add(mesh);

        // ── Build particle data ───────────────────────────────────────────────────
        const particles: ParticleData[] = [];
        const colorObj = new THREE.Color();

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const role: ParticleData["role"] = i < AMBIENT_COUNT ? "ambient" : "shape";

            let anchorX = 0;
            let anchorY = 0;

            if (role === "ambient") {
                const mX = w * 0.18;
                const mY = h * 0.18;
                const edge = Math.random();
                if (edge < 0.25) { anchorX = -w / 2 + Math.random() * mX; anchorY = -h / 2 + Math.random() * h; }
                else if (edge < 0.5) { anchorX = w / 2 - Math.random() * mX; anchorY = -h / 2 + Math.random() * h; }
                else if (edge < 0.75) { anchorX = -w / 2 + Math.random() * w; anchorY = h / 2 - Math.random() * mY; }
                else { anchorX = -w / 2 + Math.random() * w; anchorY = -h / 2 + Math.random() * mY; }
            }

            const startX = role === "ambient" ? anchorX : -w / 2 + Math.random() * w;
            const startY = role === "ambient" ? anchorY : -h / 2 + Math.random() * h;

            colorObj.set((COLORS[Math.floor(Math.random() * COLORS.length)] ?? "#F15E32") as THREE.ColorRepresentation);

            particles.push({
                role,
                x: startX, y: startY,
                vx: 0, vy: 0,
                targetX: startX, targetY: startY,
                anchorX, anchorY,
                wanderAngle: Math.random() * Math.PI * 2,
                wanderSpeed: Math.random() * 0.018 + 0.008,
                wanderRadius: Math.random() * 12 + 6,
                size: Math.random() * 2.2 + 0.9,
                color: colorObj.clone(),
            });

            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            mesh.setColorAt(i, particles[i]!.color);
        }
        if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
        particlesRef.current = particles;

        // ── Initial SVG parse ─────────────────────────────────────────────────────
        let cancelled = false;
        parseSvgToTargets(w, h, svgString, SHAPE_COUNT).then((targets) => {
            if (cancelled) return;
            svgTargetsRef.current = targets;
            // If already hovered when targets arrive, apply them immediately
            if (isHoveredRef.current) assignTargets();
        });

        // ── Animation loop ────────────────────────────────────────────────────────
        // Hoist dummy outside the loop → zero per-frame allocation
        const dummy = new THREE.Object3D();
        // initialized to 0; always assigned before cancelAnimationFrame is called
        let rafId = 0;

        const animate = () => {
            const { w: cw, h: ch } = dimensionsRef.current;
            const hovered = isHoveredRef.current;

            for (let i = 0; i < PARTICLE_COUNT; i++) {
                const p = particles[i];

                if (p?.role === "ambient") {
                    // Gentle orbital drift around border anchor
                    p.wanderAngle += p.wanderSpeed;
                    const tx = p.anchorX + Math.sin(p.wanderAngle) * p.wanderRadius;
                    const ty = p.anchorY + Math.cos(p.wanderAngle * 0.8) * p.wanderRadius;
                    p.x += (tx - p.x) * 0.05;
                    p.y += (ty - p.y) * 0.05;
                } else if (!hovered) {
                    // ── Idle: organic wander with velocity cap ──────────────────────────
                    p!.wanderAngle += (Math.random() - 0.5) * 0.12;
                    p!.vx += Math.cos(p!.wanderAngle) * p!.wanderSpeed;
                    p!.vy += Math.sin(p!.wanderAngle) * p!.wanderSpeed;

                    // Cap speed to prevent unbounded accumulation (fixed bug #10)
                    const speed = Math.sqrt(p!.vx * p!.vx + p!.vy * p!.vy);
                    if (speed > MAX_IDLE_SPEED) {
                        p!.vx = (p!.vx / speed) * MAX_IDLE_SPEED;
                        p!.vy = (p!.vy / speed) * MAX_IDLE_SPEED;
                    }

                    p!.vx *= 0.97;
                    p!.vy *= 0.97;
                    p!.x += p!.vx;
                    p!.y += p!.vy;

                    // Screen wrap (WebGL centre-origin space)
                    const hw = cw / 2 + 20;
                    const hh = ch / 2 + 20;
                    if (p!.x < -hw) p!.x = hw;
                    if (p!.x > hw) p!.x = -hw;
                    if (p!.y < -hh) p!.y = hh;
                    if (p!.y > hh) p!.y = -hh;
                } else {
                    // ── Hover: arrival steering towards SVG target ──────────────────────
                    p!.wanderAngle += p!.wanderSpeed * 1.4;

                    // Tiny alive orbit (2 px) so settled particles aren't perfectly static
                    const tx = p!.targetX + Math.cos(p!.wanderAngle) * 2;
                    const ty = p!.targetY + Math.sin(p!.wanderAngle) * 2;
                    const dx = tx - p!.x;
                    const dy = ty - p!.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist > 0.1) {
                        // Arrive: top speed 2.8, taper inside 160 px radius
                        const topSpeed = 2.8;
                        const arriveRadius = 160;
                        const desiredSpd = dist < arriveRadius
                            ? topSpeed * (dist / arriveRadius)
                            : topSpeed;

                        const dvx = (dx / dist) * desiredSpd - p!.vx;
                        const dvy = (dy / dist) * desiredSpd - p!.vy;

                        // Very gentle steering (flock-like sweep)
                        p!.vx += dvx * 0.028;
                        p!.vy += dvy * 0.028;
                    }

                    p!.x += p!.vx;
                    p!.y += p!.vy;
                }

                // Update InstancedMesh matrix
                dummy.position.set(p!.x, p!.y, 0);
                dummy.scale.setScalar(p!.size);
                dummy.updateMatrix();
                mesh.setMatrixAt(i, dummy.matrix);
            }

            mesh.instanceMatrix.needsUpdate = true;
            renderer.render(scene, camera);
            rafId = requestAnimationFrame(animate);
        };

        rafId = requestAnimationFrame(animate);

        // ── Resize handler ────────────────────────────────────────────────────────
        let resizeTimer: ReturnType<typeof setTimeout> | undefined = undefined;

        const handleResize = () => {
            if (!container) return;
            w = container.clientWidth;
            h = container.clientHeight;
            dimensionsRef.current = { w, h };

            renderer.setSize(w, h);
            camera.left = w / -2;
            camera.right = w / 2;
            camera.top = h / 2;
            camera.bottom = h / -2;
            camera.updateProjectionMatrix();

            // Re-parse at new size (debounced 250 ms)
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                parseSvgToTargets(w, h, svgString, SHAPE_COUNT).then((targets) => {
                    if (cancelled) return;
                    svgTargetsRef.current = targets;
                    if (isHoveredRef.current) assignTargets();
                });
            }, 250);
        };

        window.addEventListener("resize", handleResize, { passive: true });

        // ── Cleanup ───────────────────────────────────────────────────────────────
        return () => {
            cancelled = true;
            cancelAnimationFrame(rafId);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
            renderer.dispose();
            geo.dispose();
            mat.dispose();
            rendererRef.current = null;
            meshRef.current = null;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // intentionally mount-once; svgString handled by the effect below

    // ─── Re-parse when svgString prop changes ─────────────────────────────────
    useEffect(() => {
        const { w, h } = dimensionsRef.current;
        if (!w || !h) return; // not mounted yet – the init effect will handle it

        let cancelled = false;
        parseSvgToTargets(w, h, svgString, SHAPE_COUNT).then((targets) => {
            if (cancelled) return;
            svgTargetsRef.current = targets;
            if (isHoveredRef.current) assignTargets();
        });

        return () => { cancelled = true; };
    }, [svgString, assignTargets]);

    // ─── Hover interaction ────────────────────────────────────────────────────
    const handleMouseEnter = useCallback(() => {
        setIsHovered(true);
        isHoveredRef.current = true;

        // Targets may still be loading on very first hover; assignTargets is safe
        // because it short-circuits on empty svgTargetsRef
        assignTargets();
    }, [assignTargets]);

    const handleMouseLeave = useCallback(() => {
        setIsHovered(false);
        isHoveredRef.current = false;
    }, []);

    // ─── Render ───────────────────────────────────────────────────────────────
    return (
        <div
            ref={containerRef}
            className={cn("relative w-full overflow-hidden", className)}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 block w-full h-full"
            />


        </div>
    );
}