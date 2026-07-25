'use client';

import { useCallback, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { feature as topojsonFeature, mesh as topojsonMesh } from 'topojson-client';

const RADIUS = 100;
const OCEAN_COLOR = '#DFDFDF';
const LAND_COLOR = '#BFBFBF';
const BORDER_COLOR = '#DFDFDF';
const HIGHLIGHT_COLOR = '#f15e32'; // brand color

const TEX_WIDTH = 4096;
const TEX_HEIGHT = 2048;

// Natural Earth / world-atlas numeric id for Antarctica — excluded, its
// simplified coastline at this resolution renders as a flat band.
const ANTARCTICA_ID = '010';

// Drag rotation sensitivity: radians per pixel of mouse movement
const DRAG_SENSITIVITY = 0.005;
// Inertia damping: multiplier per frame (lower = more friction)
const INERTIA_DAMPING = 0.92;
// Minimum angular velocity below which inertia stops (radians/frame)
const INERTIA_THRESHOLD = 0.0001;
// Auto-rotate speed in radians per frame
const AUTO_ROTATE_SPEED = 0.0025;
// Focus animation duration in ms
const FOCUS_DURATION = 700;

// Reusable Y-axis vector — avoids allocating one every frame
const Y_AXIS = new THREE.Vector3(0, 1, 0);

type Props = {
    highlightedCountries?: string[]; // matches Natural Earth `properties.name`, case-insensitive
    className?: string;
    selectedCountry?: string | null; // hovered country
};

// Distance needed so a sphere of `radius` fits inside the camera frustum
// on BOTH axes, for the given aspect ratio. Padding >1 leaves a margin.
function computeFitDistance(aspect: number, radius: number, fovDeg: number, padding = 1.1) {
    const halfV = Math.tan(THREE.MathUtils.degToRad(fovDeg) / 2);
    // whichever axis is tighter (vertical, or horizontal via aspect) sets the distance
    const limitingHalf = halfV * Math.min(1, aspect);
    return (radius * padding) / limitingHalf;
}

function lonLatToPixel(lon: number, lat: number): [number, number] {
    const x = ((lon + 180) / 360) * TEX_WIDTH;
    const y = ((90 - lat) / 180) * TEX_HEIGHT;
    return [x, y];
}

function unwrapRing(ring: number[][]): [number, number][] {
    if (!ring || ring.length === 0) return [];
    const first = ring[0];
    if (!first || first.length < 2) return [];

    const result: [number, number][] = [[first[0] as number, first[1] as number]];
    for (let i = 1; i < ring.length; i++) {
        const current = ring[i];
        if (!current || current.length < 2) continue;
        let lon = current[0] as number;
        let lat = current[1] as number;

        const prevLon = result[result.length - 1]![0];
        while (lon - prevLon > 180) lon -= 360;
        while (lon - prevLon < -180) lon += 360;

        result.push([lon, lat]);
    }
    return result;
}

function drawWorldMap(
    ctx: CanvasRenderingContext2D,
    featureCollection: any,
    borderMesh: any,
    highlighted: string[]
) {
    const highlightSet = new Set(highlighted.map((n) => n.toLowerCase()));

    ctx.clearRect(0, 0, TEX_WIDTH, TEX_HEIGHT);
    ctx.fillStyle = OCEAN_COLOR;
    ctx.fillRect(0, 0, TEX_WIDTH, TEX_HEIGHT);

    // --- country fills ---
    for (const f of featureCollection.features) {
        const name: string = f.properties?.name ?? '';
        const isHighlighted = highlightSet.has(name.toLowerCase());

        const geomType = f.geometry?.type;
        const polygons: number[][][][] =
            geomType === 'Polygon' ? [f.geometry.coordinates] :
                geomType === 'MultiPolygon' ? f.geometry.coordinates : [];

        for (const rings of polygons) {
            const unwrappedRings = rings.map(unwrapRing);
            for (const xOffset of [-TEX_WIDTH, 0, TEX_WIDTH]) {
                ctx.beginPath();
                for (const ring of unwrappedRings) {
                    ring.forEach(([lon, lat], i) => {
                        const [x, y] = lonLatToPixel(lon, lat);
                        const px = x + xOffset;
                        if (i === 0) ctx.moveTo(px, y);
                        else ctx.lineTo(px, y);
                    });
                    ctx.closePath();
                }
                ctx.fillStyle = isHighlighted ? HIGHLIGHT_COLOR : LAND_COLOR;
                ctx.fill('evenodd');
            }
        }
    }

    // --- borders, drawn once via the deduped mesh ---
    ctx.strokeStyle = BORDER_COLOR;
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    const lines: number[][][] =
        borderMesh.type === 'MultiLineString' ? borderMesh.coordinates : [borderMesh.coordinates];

    for (const line of lines) {
        const unwrapped = unwrapRing(line);
        for (const xOffset of [-TEX_WIDTH, 0, TEX_WIDTH]) {
            ctx.beginPath();
            unwrapped.forEach(([lon, lat], i) => {
                const [x, y] = lonLatToPixel(lon, lat);
                const px = x + xOffset;
                if (i === 0) ctx.moveTo(px, y);
                else ctx.lineTo(px, y);
            });
            ctx.stroke();
        }
    }
}

// Converts lon/lat into the exact 3D direction that matches the UV mapping
// used by lonLatToPixel + THREE.SphereGeometry's default UVs — verified
// against the sphere's actual vertex generation formula.
function vertexDirection(lonDeg: number, latDeg: number): THREE.Vector3 {
    const lon = THREE.MathUtils.degToRad(lonDeg);
    const lat = THREE.MathUtils.degToRad(latDeg);
    return new THREE.Vector3(
        Math.cos(lat) * Math.cos(lon),
        Math.sin(lat),
        -Math.cos(lat) * Math.sin(lon)
    );
}

function ringArea(ring: number[][]): number {
    let sum = 0;
    for (let i = 0; i < ring.length - 1; i++) {
        const p1 = ring[i], p2 = ring[i + 1];
        if (!p1 || !p2 || p1.length < 2 || p2.length < 2) continue;
        const x1 = p1[0] as number, y1 = p1[1] as number;
        const x2 = p2[0] as number, y2 = p2[1] as number;
        sum += x1 * y2 - x2 * y1;
    }
    return sum / 2;
}

function ringCentroid(ring: number[][]): [number, number] {
    let cx = 0, cy = 0, area = 0;
    for (let i = 0; i < ring.length - 1; i++) {
        const p1 = ring[i], p2 = ring[i + 1];
        if (!p1 || !p2 || p1.length < 2 || p2.length < 2) continue;
        const x1 = p1[0] as number, y1 = p1[1] as number;
        const x2 = p2[0] as number, y2 = p2[1] as number;
        const cross = x1 * y2 - x2 * y1;
        area += cross;
        cx += (x1 + x2) * cross;
        cy += (y1 + y2) * cross;
    }
    area *= 0.5;
    if (Math.abs(area) < 1e-9) {
        const first = ring[0];
        return first ? [first[0] as number, first[1] as number] : [0, 0];
    }
    return [cx / (6 * area), cy / (6 * area)];
}

// Countries -> centroid lon/lat. Uses each feature's largest-area ring so
// outlying islands (e.g. Alaska/Hawaii for the USA) don't skew the point
// the camera focuses on.
function computeCountryCentroids(featureCollection: any): Map<string, [number, number]> {
    const map = new Map<string, [number, number]>();
    for (const f of featureCollection.features) {
        const name: string = f.properties?.name ?? '';
        if (!name) continue;
        const geomType = f.geometry?.type;
        const polygons: number[][][][] =
            geomType === 'Polygon' ? [f.geometry.coordinates] :
                geomType === 'MultiPolygon' ? f.geometry.coordinates : [];
        if (!polygons.length) continue;

        let best: { area: number; centroid: [number, number] } | null = null;
        for (const rings of polygons) {
            const firstRing = rings[0];
            if (!firstRing) continue;
            const outer = unwrapRing(firstRing);
            const area = Math.abs(ringArea(outer));
            if (!best || area > best.area) best = { area, centroid: ringCentroid(outer) };
        }
        if (best) map.set(name.toLowerCase(), best.centroid);
    }
    return map;
}

/**
 * Computes a quaternion that rotates the globe group so that dragging
 * the mouse by (dx, dy) pixels produces the intuitive "grab and spin"
 * feel regardless of the current globe orientation.
 *
 * Strategy: convert pixel deltas into rotation axes *in world space*,
 * then compose them into a single incremental quaternion that is
 * pre-multiplied onto the globe's current quaternion.
 *
 * - Horizontal drag (dx) → rotate around the camera's world-space UP (Y axis).
 * - Vertical drag (dy) → rotate around the camera's world-space RIGHT (X axis).
 *
 * Because the camera is always at (0,0,Z) looking at the origin, the
 * camera's right is world +X and camera's up is world +Y.
 */
function dragDeltaToQuat(dx: number, dy: number, sensitivity: number): THREE.Quaternion {
    const angleX = dy * sensitivity;  // pitch (vertical drag)
    const angleY = dx * sensitivity;  // yaw   (horizontal drag)

    const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), angleX);
    const qy = new THREE.Quaternion().setFromAxisAngle(Y_AXIS, angleY);

    // Compose: first yaw, then pitch (order matters for intuitive feel)
    return qy.multiply(qx);
}

export default function InteractiveGlobe({ highlightedCountries, className, selectedCountry }: Props) {
    const containerRef = useRef<HTMLDivElement>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const textureRef = useRef<THREE.CanvasTexture | null>(null);
    const featureCollectionRef = useRef<any>(null);
    const borderMeshRef = useRef<any>(null);

    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const globeGroupRef = useRef<THREE.Group | null>(null);
    const centroidsRef = useRef<Map<string, [number, number]>>(new Map());

    const focusRef = useRef<{
        active: boolean;
        startQuat: THREE.Quaternion;
        targetQuat: THREE.Quaternion;
        startTime: number;
    } | null>(null);
    const selectedCountryRef = useRef<string | null | undefined>(selectedCountry);

    // --- Drag state (kept in refs so event handlers don't need re-binding) ---
    const isDragging = useRef(false);
    const lastPointer = useRef({ x: 0, y: 0 });
    // Inertia: angular velocity stored as (dx, dy) in pixels/frame
    const velocity = useRef({ dx: 0, dy: 0 });

    const applyFocus = useCallback((name: string) => {
        const globeGroup = globeGroupRef.current;
        const camera = cameraRef.current;
        const centroid = centroidsRef.current.get(name.toLowerCase());
        if (!globeGroup || !camera || !centroid) return;

        const [lon, lat] = centroid;
        const lonRad = THREE.MathUtils.degToRad(lon);
        const latRad = THREE.MathUtils.degToRad(lat);

        // Build a roll-free rotation that faces the country toward the camera
        // while keeping north pointing up:
        //   1. Rotate around Y to align the country's longitude toward +Z (camera)
        //   2. Rotate around X to align the country's latitude toward +Z
        const qY = new THREE.Quaternion().setFromAxisAngle(Y_AXIS, -(Math.PI / 2 + lonRad));
        const qX = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), latRad);
        const targetQuat = qX.multiply(qY);

        focusRef.current = {
            active: true,
            startQuat: globeGroup.quaternion.clone(),
            targetQuat,
            startTime: performance.now(),
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const width = container.clientWidth;
        const height = container.clientHeight;

        // --- Scene setup ---
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xffffff);

        // const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        // camera.position.set(0, 0, 264);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.set(0, 0, computeFitDistance(width / height, RADIUS, 45));

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.setClearColor(0xffffff, 1);
        container.appendChild(renderer.domElement);

        const globeGroup = new THREE.Group();
        scene.add(globeGroup);
        // const updateGlobePosition = () => {
        //     // Calculate visible boundaries at z=0
        //     const vFov = THREE.MathUtils.degToRad(camera.fov);
        //     const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
        //     const visibleWidth = visibleHeight * camera.aspect; 0

        //     // Shift X so the globe's center is exactly on the right edge (50% visible)
        //     globeGroup.position.x = visibleWidth / 2;

        //     // (Optional) Keep this from your previous step if you still want it at the top
        //     // globeGroup.position.y = -(RADIUS - (visibleHeight / 2)); 
        // };

        // // Call it once for the initial render
        // updateGlobePosition();
        globeGroupRef.current = globeGroup;
        cameraRef.current = camera;

        // --- Texture setup ---
        const mapCanvas = document.createElement('canvas');
        mapCanvas.width = TEX_WIDTH;
        mapCanvas.height = TEX_HEIGHT;
        const ctx = mapCanvas.getContext('2d')!;
        ctx.fillStyle = OCEAN_COLOR;
        ctx.fillRect(0, 0, TEX_WIDTH, TEX_HEIGHT);
        ctxRef.current = ctx;

        const texture = new THREE.CanvasTexture(mapCanvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        textureRef.current = texture;

        const sphereGeo = new THREE.SphereGeometry(RADIUS, 96, 96);
        const sphereMat = new THREE.MeshBasicMaterial({ map: texture });
        const globe = new THREE.Mesh(sphereGeo, sphereMat);
        globeGroup.add(globe);

        // --- Load world data ---
        const abortController = new AbortController();
        const loadWorld = async () => {
            const res = await fetch('/data/countries-50m.json', { signal: abortController.signal });
            if (!res.ok) throw new Error(`Failed to load world data (${res.status})`);
            const topology: any = await res.json();

            const countriesObj = topology.objects.countries;
            const filteredGeometries = countriesObj.geometries.filter((g: any) => g.id !== ANTARCTICA_ID);
            const filteredObject = { ...countriesObj, geometries: filteredGeometries };

            const featureCollection = topojsonFeature(topology, filteredObject as any) as any;
            const borderMesh = topojsonMesh(topology, filteredObject as any) as any;

            featureCollectionRef.current = featureCollection;
            centroidsRef.current = computeCountryCentroids(featureCollection);
            if (selectedCountryRef.current) applyFocus(selectedCountryRef.current);
            borderMeshRef.current = borderMesh;

            drawWorldMap(ctx, featureCollection, borderMesh, highlightedCountries ?? []);
            texture.needsUpdate = true;
        };

        loadWorld().catch((err) => {
            if (err.name !== 'AbortError') console.error('Globe data load failed:', err);
        });

        // ---------------------------------------------------------------
        // Pointer-based drag rotation (replaces OrbitControls entirely)
        // ---------------------------------------------------------------
        const onPointerDown = (e: PointerEvent) => {
            isDragging.current = true;
            lastPointer.current = { x: e.clientX, y: e.clientY };
            velocity.current = { dx: 0, dy: 0 };
            // Capture pointer so we get move/up even outside the canvas
            renderer.domElement.setPointerCapture(e.pointerId);
        };

        const onPointerMove = (e: PointerEvent) => {
            if (!isDragging.current) return;

            const dx = e.clientX - lastPointer.current.x;
            const dy = e.clientY - lastPointer.current.y;
            lastPointer.current = { x: e.clientX, y: e.clientY };

            // Apply incremental rotation
            const dq = dragDeltaToQuat(dx, dy, DRAG_SENSITIVITY);
            globeGroup.quaternion.premultiply(dq);
            globeGroup.quaternion.normalize();

            // Store velocity for inertia
            velocity.current = { dx, dy };
        };

        const onPointerUp = (e: PointerEvent) => {
            isDragging.current = false;
            renderer.domElement.releasePointerCapture(e.pointerId);
        };

        // Prevent context menu on right-click drag
        const onContextMenu = (e: Event) => e.preventDefault();

        renderer.domElement.addEventListener('pointerdown', onPointerDown);
        renderer.domElement.addEventListener('pointermove', onPointerMove);
        renderer.domElement.addEventListener('pointerup', onPointerUp);
        renderer.domElement.addEventListener('pointercancel', onPointerUp);
        renderer.domElement.addEventListener('contextmenu', onContextMenu);

        // Touch: prevent default to avoid pull-to-refresh / scroll interference
        const onTouchStart = (e: TouchEvent) => {
            if (e.touches.length === 1) e.preventDefault();
        };
        renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false });

        // ---------------------------------------------------------------
        // Animation loop
        // ---------------------------------------------------------------
        let frameId: number;
        const animate = () => {
            frameId = requestAnimationFrame(animate);

            const focus = focusRef.current;
            if (focus?.active) {
                // Focus animation overrides everything
                const t = Math.min((performance.now() - focus.startTime) / FOCUS_DURATION, 1);
                const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
                globeGroup.quaternion.slerpQuaternions(focus.startQuat, focus.targetQuat, eased);
                if (t >= 1) focus.active = false;
            } else if (isDragging.current) {
                // User is actively dragging — rotation is handled in onPointerMove
            } else {
                // Apply inertia or auto-rotate
                const v = velocity.current;
                const speed = Math.sqrt(v.dx * v.dx + v.dy * v.dy);

                if (speed > INERTIA_THRESHOLD / DRAG_SENSITIVITY) {
                    // Inertia: keep spinning with decay
                    const dq = dragDeltaToQuat(v.dx, v.dy, DRAG_SENSITIVITY);
                    globeGroup.quaternion.premultiply(dq);
                    globeGroup.quaternion.normalize();
                    v.dx *= INERTIA_DAMPING;
                    v.dy *= INERTIA_DAMPING;
                } else if (!selectedCountryRef.current) {
                    // Idle auto-rotate around world Y
                    globeGroup.rotateOnWorldAxis(Y_AXIS, AUTO_ROTATE_SPEED);
                }
            }

            renderer.render(scene, camera);
        };
        animate();

        // ---------------------------------------------------------------
        // Resize handling
        // ---------------------------------------------------------------
        // const onResize = () => {
        //     const w = container.clientWidth;
        //     const h = container.clientHeight;

        //     camera.aspect = w / h;

        //     // The magic line: Tell the camera the "virtual" screen is twice as wide (w * 2),
        //     // but we only want to draw the left half of it (offset X = 0, width = w).
        //     // This perfectly centers the globe on the right edge of your actual canvas.
        //     camera.setViewOffset(w, h, 0, 0, w, h);

        //     camera.updateProjectionMatrix();
        //     renderer.setSize(w, h);
        // };

        const onResize = () => {
            const w = container.clientWidth;
            const h = container.clientHeight;

            camera.aspect = w / h;
            camera.position.z = computeFitDistance(w / h, RADIUS, 45);
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('resize', onResize);

        // Call it once immediately during setup so the initial load is correct
        onResize();

        // ---------------------------------------------------------------
        // Cleanup
        // ---------------------------------------------------------------
        return () => {
            cancelAnimationFrame(frameId);
            abortController.abort();
            window.removeEventListener('resize', onResize);

            renderer.domElement.removeEventListener('pointerdown', onPointerDown);
            renderer.domElement.removeEventListener('pointermove', onPointerMove);
            renderer.domElement.removeEventListener('pointerup', onPointerUp);
            renderer.domElement.removeEventListener('pointercancel', onPointerUp);
            renderer.domElement.removeEventListener('contextmenu', onContextMenu);
            renderer.domElement.removeEventListener('touchstart', onTouchStart);

            renderer.dispose();
            sphereGeo.dispose();
            sphereMat.dispose();
            texture.dispose();
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // --- Sync selectedCountry prop ---
    useEffect(() => {
        selectedCountryRef.current = selectedCountry ?? null;
        if (selectedCountry) {
            applyFocus(selectedCountry);
        } else if (focusRef.current) {
            focusRef.current.active = false; // just stop; auto-rotate resumes from here
        }
    }, [selectedCountry, applyFocus]);

    // --- Redraw texture only when the highlighted list changes ---
    useEffect(() => {
        const ctx = ctxRef.current;
        const texture = textureRef.current;
        const featureCollection = featureCollectionRef.current;
        const borderMesh = borderMeshRef.current;
        if (!ctx || !texture || !featureCollection || !borderMesh) return;
        drawWorldMap(ctx, featureCollection, borderMesh, highlightedCountries ?? []);
        texture.needsUpdate = true;
    }, [highlightedCountries]);

    return <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }} />;
}