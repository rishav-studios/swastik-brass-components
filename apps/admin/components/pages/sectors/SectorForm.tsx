"use client";

import { createSector, updateSector } from "@/actions/sectors";
import { FormSection } from "@/components/shared/FormSection";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { convertToWebp, slugify, uploadToSupabase } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateSector, createSectorSchema, Sector } from "@swastik/types";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@swastik/ui/components/shadcn/field";
import { Input } from "@swastik/ui/components/shadcn/input";
import { toast } from "@swastik/ui/components/shadcn/sonner";
import { Textarea } from "@swastik/ui/components/shadcn/textarea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

// ── Main form ────────────────────────────────────────────────────────────────

export const SectorForm = ({ initialData }: { initialData?: Sector }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
    } = useForm<CreateSector>({
        resolver: zodResolver(createSectorSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            slug: initialData.slug,
            home_description: initialData.home_description,
            dedicated_description: initialData.dedicated_description || null,
            display_order: initialData.display_order,
            image_url: initialData.image_url,
            outline_image_url: initialData.outline_image_url || null,
            cover_image_url: initialData.cover_image_url,
            seo_metadata: {
                meta_title: initialData.seo_metadata?.meta_title || "",
                meta_description: initialData.seo_metadata?.meta_description || "",
                keywords: initialData.seo_metadata?.keywords || [],
                canonical_url: initialData.seo_metadata?.canonical_url || null,
                og_title: initialData.seo_metadata?.og_title || null,
                og_description: initialData.seo_metadata?.og_description || null,
                og_image: initialData.seo_metadata?.og_image || null,
                og_type: initialData.seo_metadata?.og_type || null,
                twitter_card: initialData.seo_metadata?.twitter_card || null,
                twitter_title: initialData.seo_metadata?.twitter_title || null,
                twitter_description: initialData.seo_metadata?.twitter_description || null,
                twitter_image: initialData.seo_metadata?.twitter_image || null,
                meta_robots: initialData.seo_metadata?.meta_robots || null,
                structured_data: initialData.seo_metadata?.structured_data || null,
            },
        } : {
            name: "",
            slug: "",
            home_description: "",
            dedicated_description: null,
            display_order: 0,
            image_url: "",
            outline_image_url: null,
            cover_image_url: "",
            seo_metadata: {
                meta_title: "",
                meta_description: "",
                keywords: [],
                canonical_url: null,
                og_title: null,
                og_description: null,
                og_image: null,
                og_type: null,
                twitter_card: null,
                twitter_title: null,
                twitter_description: null,
                twitter_image: null,
                meta_robots: null,
                structured_data: null,
            },
        },
    });


    const onSubmit = (data: CreateSector) => {
        startTransition(() => {
            const promise = new Promise(async (resolve, reject) => {
                try {
                    const payload = { ...data };

                    const processAndUploadImage = async (file: string | File | null | undefined, folder: string) => {
                        if (!file || typeof file === "string") return file;
                        const webpFile = await convertToWebp(file);
                        return await uploadToSupabase(webpFile, folder);
                    };

                    if (payload.image_url) {
                        payload.image_url = await processAndUploadImage(payload.image_url, "sectors/images") as string;
                    }
                    if (payload.cover_image_url) {
                        payload.cover_image_url = await processAndUploadImage(payload.cover_image_url, "sectors/covers") as string;
                    }
                    if (payload.outline_image_url) {
                        payload.outline_image_url = await processAndUploadImage(payload.outline_image_url, "sectors/outlines");
                    }

                    const result = initialData
                        ? await updateSector(initialData.id, payload)
                        : await createSector(payload);

                    if (result?.error) {
                        reject(new Error(result.error));
                    } else {
                        resolve(true);
                        router.push("/catalogue/sectors");
                    }
                } catch (err: any) {
                    reject(new Error(err.message || "An error occurred during submission."));
                }
            });

            toast.promise(promise, {
                loading: initialData ? "Updating sector..." : "Creating sector...",
                success: initialData ? "Sector updated successfully!" : "Sector created successfully!",
                error: (err) => err.message,
            });
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

            <div className="grid grid-cols-1 gap-4 items-start">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">


                    {/* ── Section 1: Basic Information ──────────────────────────────── */}
                    <FieldGroup>
                        <FormSection title="Basic Information" description="Name, slug, and display order of the sector.">
                            <div className="grid grid-cols-1 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="name">
                                                Sector Name
                                            </FieldLabel>
                                            <Input
                                                id="name"
                                                placeholder="e.g. Aerospace"
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                className="h-10"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    if (!slugManuallyEdited && !initialData) {
                                                        setValue("slug", slugify(e.target.value));
                                                    }
                                                }}
                                            />
                                            {
                                                fieldState.invalid &&

                                                <FieldError errors={[fieldState.error]} />
                                            }
                                        </Field>
                                    )}
                                />


                                <Controller
                                    name="slug"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="slug">URL Slug</FieldLabel>
                                            <Input
                                                id="slug"
                                                placeholder="e.g. aerospace"
                                                disabled={isPending || !!initialData}
                                                aria-invalid={fieldState.invalid}
                                                className="h-10 font-mono text-sm"
                                                {...field}
                                                onChange={(e) => {
                                                    field.onChange(e);
                                                    setSlugManuallyEdited(true);
                                                }}
                                            />
                                            {fieldState.invalid &&

                                                <FieldError errors={[fieldState.error]} />
                                            }
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="display_order"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="display_order">Display Order</FieldLabel>
                                            <Input
                                                id="display_order"
                                                type="number"
                                                min={0}
                                                placeholder="0"
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                className="h-10"
                                                {...field}
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(Number(e.target.value))}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FormSection>
                    </FieldGroup>

                    {/* ── Section 2: Descriptions ───────────────────────────────────── */}
                    <FieldGroup>
                        <FormSection title="Descriptions" description="Text that appears on the homepage and the dedicated sector page.">
                            {/* Home Description */}
                            <div className="space-y-1.5">
                                <Controller
                                    name="home_description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="home_description">Home Page Description</FieldLabel>
                                            <Textarea
                                                id="home_description"
                                                placeholder="Brief description shown on the homepage..."
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                rows={3}
                                                {...field}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            {/* Dedicated Description */}
                            <div className="space-y-1.5">
                                <Controller
                                    name="dedicated_description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="dedicated_description">
                                                Dedicated Page Description
                                            </FieldLabel>
                                            <Textarea
                                                id="dedicated_description"
                                                placeholder="Detailed description for the dedicated sector page..."
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                rows={4}
                                                {...field}
                                                value={field.value ?? ""}
                                                onChange={(e) => field.onChange(e.target.value || null)}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FormSection>
                    </FieldGroup>
                </div>
                {/* ── Section 3: Images ─────────────────────────────────────────── */}
                <FieldGroup>
                    <FormSection title="Images" description="Upload the sector icon, cover image, and optional outline image.">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                            {/* Sector Image */}
                            <Controller
                                name="image_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <ImageUpload
                                        label="Sector Image"
                                        value={field.value}
                                        onChange={(file) => field.onChange(file ?? "")}
                                        error={fieldState.error?.message}
                                        disabled={isPending}
                                    />
                                )}
                            />

                            {/* Cover Image */}
                            <Controller
                                name="cover_image_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <ImageUpload
                                        label="Cover Image"
                                        value={field.value}
                                        onChange={(file) => field.onChange(file ?? "")}
                                        error={fieldState.error?.message}
                                        disabled={isPending}
                                    />
                                )}
                            />

                            <Controller
                                name="outline_image_url"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <ImageUpload
                                        label="Outline Image (Optional)"
                                        value={field.value}
                                        onChange={(file) => field.onChange(file ?? null)}
                                        error={fieldState.error?.message}
                                        disabled={isPending}
                                    />
                                )}
                            />
                        </div>
                    </FormSection>
                </FieldGroup>

                {/* ── Section 4: SEO Metadata ───────────────────────────────────── */}
                <FieldGroup>
                    <FormSection title="SEO Metadata" description="Search engine optimization settings">
                        {/* Always visible required SEO fields */}
                        <div className="space-y-5">
                            <div className="space-y-1.5">
                                <Controller
                                    name="seo_metadata.meta_title"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="seo_meta_title">Meta Title</FieldLabel>
                                            <Input
                                                id="seo_meta_title"
                                                placeholder="Page title for search engines"
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                className="h-10"
                                                {...field}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <Controller
                                    name="seo_metadata.meta_description"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="seo_meta_description">Meta Description</FieldLabel>
                                            <Textarea
                                                id="seo_meta_description"
                                                placeholder="Brief description for search engine results..."
                                                disabled={isPending}
                                                aria-invalid={fieldState.invalid}
                                                rows={3}
                                                {...field}
                                            />
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </div>

                        {/* Expandable Advanced SEO */}
                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => setSeoOpen(!seoOpen)}
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors cursor-pointer"
                            >
                                <icons.settings className="w-4 h-4" />
                                {seoOpen ? "Hide Advanced SEO Settings" : "Show Advanced SEO Settings"}
                                <icons.chevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${seoOpen ? "rotate-180" : ""}`}
                                />
                            </button>

                            {seoOpen && (
                                <div className="mt-5 pt-5 border-t border-border space-y-6 animate-in fade-in slide-in-from-top-1 duration-200">
                                    <div className="space-y-1.5 max-w-lg">
                                        <Controller
                                            name="seo_metadata.canonical_url"
                                            control={control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="seo_canonical_url">
                                                        Canonical URL
                                                    </FieldLabel>
                                                    <Input
                                                        id="seo_canonical_url"
                                                        placeholder="https://example.com/sectors/..."
                                                        disabled={isPending}
                                                        aria-invalid={fieldState.invalid}
                                                        className="h-10"
                                                        {...field}
                                                        value={field.value ?? ""}
                                                        onChange={(e) => field.onChange(e.target.value || null)}
                                                    />
                                                    {fieldState.invalid && (
                                                        <FieldError errors={[fieldState.error]} />
                                                    )}
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    {/* Open Graph fields */}
                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase border-b border-border pb-2">
                                            Open Graph
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="seo_metadata.og_title"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="seo_og_title">OG Title</FieldLabel>
                                                            <Input
                                                                id="seo_og_title"
                                                                placeholder="Social sharing title"
                                                                disabled={isPending}
                                                                aria-invalid={fieldState.invalid}
                                                                className="h-10"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(e.target.value || null)}
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="seo_metadata.og_type"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="seo_og_type">OG Type</FieldLabel>
                                                            <Input
                                                                id="seo_og_type"
                                                                placeholder="e.g. website, article"
                                                                disabled={isPending}
                                                                aria-invalid={fieldState.invalid}
                                                                className="h-10"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(e.target.value || null)}
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Controller
                                                name="seo_metadata.og_description"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="seo_og_description">OG Description</FieldLabel>
                                                        <Textarea
                                                            id="seo_og_description"
                                                            placeholder="Description for social media sharing..."
                                                            disabled={isPending}
                                                            aria-invalid={fieldState.invalid}
                                                            rows={2}
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value || null)}
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Controller
                                                name="seo_metadata.og_image"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="seo_og_image">OG Image URL</FieldLabel>
                                                        <Input
                                                            id="seo_og_image"
                                                            placeholder="https://example.com/image.jpg"
                                                            disabled={isPending}
                                                            aria-invalid={fieldState.invalid}
                                                            className="h-10"
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value || null)}
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Twitter Card fields */}
                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase border-b border-border pb-2">
                                            Twitter Card
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="seo_metadata.twitter_title"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="seo_twitter_title">Twitter Title</FieldLabel>
                                                            <Input
                                                                id="seo_twitter_title"
                                                                placeholder="Twitter card title"
                                                                disabled={isPending}
                                                                aria-invalid={fieldState.invalid}
                                                                className="h-10"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(e.target.value || null)}
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                            <div className="space-y-1.5">
                                                <Controller
                                                    name="seo_metadata.twitter_card"
                                                    control={control}
                                                    render={({ field, fieldState }) => (
                                                        <Field data-invalid={fieldState.invalid}>
                                                            <FieldLabel htmlFor="seo_twitter_card">Card Type</FieldLabel>
                                                            <Input
                                                                id="seo_twitter_card"
                                                                placeholder="e.g. summary, summary_large_image"
                                                                disabled={isPending}
                                                                aria-invalid={fieldState.invalid}
                                                                className="h-10"
                                                                {...field}
                                                                value={field.value ?? ""}
                                                                onChange={(e) => field.onChange(e.target.value || null)}
                                                            />
                                                            {fieldState.invalid && (
                                                                <FieldError errors={[fieldState.error]} />
                                                            )}
                                                        </Field>
                                                    )}
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-1.5">
                                            <Controller
                                                name="seo_metadata.twitter_description"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="seo_twitter_description">Twitter Description</FieldLabel>
                                                        <Textarea
                                                            id="seo_twitter_description"
                                                            placeholder="Description for Twitter cards..."
                                                            disabled={isPending}
                                                            aria-invalid={fieldState.invalid}
                                                            rows={2}
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value || null)}
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <Controller
                                                name="seo_metadata.twitter_image"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="seo_twitter_image">Twitter Image URL</FieldLabel>
                                                        <Input
                                                            id="seo_twitter_image"
                                                            placeholder="https://example.com/twitter-image.jpg"
                                                            disabled={isPending}
                                                            aria-invalid={fieldState.invalid}
                                                            className="h-10"
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value || null)}
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                    </div>

                                    {/* Indexing Control */}
                                    <div className="space-y-3">
                                        <p className="text-xs font-semibold text-muted-foreground tracking-wide uppercase border-b border-border pb-2">
                                            Search Indexing
                                        </p>
                                        <div className="space-y-1.5 max-w-sm">
                                            <Controller
                                                name="seo_metadata.meta_robots"
                                                control={control}
                                                render={({ field, fieldState }) => (
                                                    <Field data-invalid={fieldState.invalid}>
                                                        <FieldLabel htmlFor="seo_meta_robots">Meta Robots</FieldLabel>
                                                        <Input
                                                            id="seo_meta_robots"
                                                            placeholder="e.g. index, follow"
                                                            disabled={isPending}
                                                            aria-invalid={fieldState.invalid}
                                                            className="h-10"
                                                            {...field}
                                                            value={field.value ?? ""}
                                                            onChange={(e) => field.onChange(e.target.value || null)}
                                                        />
                                                        {fieldState.invalid && (
                                                            <FieldError errors={[fieldState.error]} />
                                                        )}
                                                    </Field>
                                                )}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </FormSection>
                </FieldGroup>
            </div>

            {/* ── Submit ────────────────────────────────────────────────────── */}
            <div className="flex items-center justify-end gap-3 pt-2">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isPending}
                    onClick={() => router.back()}
                    className="h-10 px-5 cursor-pointer"
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="h-10 px-6 bg-primary text-white hover:bg-primary/90 shadow-md shadow-primary/10 flex items-center gap-2 font-semibold cursor-pointer"
                >
                    {isPending ? (
                        <>
                            <icons.loader className="w-4 h-4 animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <icons.plus className="w-4 h-4" />
                            Add Sector
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
