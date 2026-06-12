"use client";

import { createMaterial, updateMaterial } from "@/actions/materials";
import { FormSection } from "@/components/shared/FormSection";
import { ImageUpload } from "@/components/shared/ImageUpload";
import { convertToWebp, slugify, uploadToSupabase } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateMaterial, createMaterialSchema, Material } from "@swastik/types";
import { icons } from "@swastik/ui";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@swastik/ui/components/shadcn/field";
import { Input } from "@swastik/ui/components/shadcn/input";
import { toast } from "@swastik/ui/components/shadcn/sonner";
import { Textarea } from "@swastik/ui/components/shadcn/textarea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { MetalCompositionInput } from "@/components/shared/MetalCompositionInput";

// ── Main form ────────────────────────────────────────────────────────────────

export const MaterialForm = ({ initialData }: { initialData?: Material }) => {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);
    const [seoOpen, setSeoOpen] = useState(false);

    const {
        control,
        handleSubmit,
        setValue,
    } = useForm<CreateMaterial>({
        resolver: zodResolver(createMaterialSchema),
        defaultValues: initialData ? {
            name: initialData.name,
            slug: initialData.slug,
            description: initialData.description,
            display_order: initialData.display_order,
            image_url: initialData.image_url,
            composition_template: initialData.composition_template || null,
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
            description: "",
            display_order: 0,
            image_url: "",
            composition_template: null,
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


    const onSubmit = (data: CreateMaterial) => {
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
                        payload.image_url = await processAndUploadImage(payload.image_url, "materials/images") as string;
                    }

                    const result = initialData
                        ? await updateMaterial(initialData.id, payload)
                        : await createMaterial(payload);

                    if (result?.error) {
                        reject(new Error(result.error));
                    } else {
                        resolve(true);
                        router.push("/catalogue/materials");
                    }
                } catch (err: any) {
                    reject(new Error(err.message || "An error occurred during submission."));
                }
            });

            toast.promise(promise, {
                loading: initialData ? "Updating material..." : "Creating material...",
                success: initialData ? "Material updated successfully!" : "Material created successfully!",
                error: (err) => err.message,
            });
        });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full">

            <div className="grid grid-cols-1 gap-4 items-start">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">


                    {/* ── Section 1: Basic Information ──────────────────────────────── */}
                    <FieldGroup>
                        <FormSection title="Basic Information" description="Name, slug, and display order of the material.">
                            <div className="grid grid-cols-1 gap-4">
                                <Controller
                                    name="name"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="name">
                                                Material Name
                                            </FieldLabel>
                                            <Input
                                                id="name"
                                                placeholder="e.g. Brass"
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
                                                placeholder="e.g. brass"
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
                        <FormSection title="Description" description="Text that describes the material.">
                            <Controller
                                name="description"
                                control={control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid} className="h-full">
                                        <FieldLabel htmlFor="description">Material Description</FieldLabel>
                                        <Textarea
                                            className="resize-none"
                                            id="description"
                                            placeholder="Description of the material..."
                                            disabled={isPending}
                                            rows={18}
                                            aria-invalid={fieldState.invalid}
                                            {...field}
                                        />
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FormSection>
                    </FieldGroup>

                    {/* ── Section 3: Images ─────────────────────────────────────────── */}
                    <FieldGroup>
                        <FormSection title="Image" description="Upload the material image.">
                            <div className="grid grid-cols-1 h-full">
                                {/* Material Image */}
                                <Controller
                                    name="image_url"
                                    control={control}
                                    render={({ field, fieldState }) => (
                                        <ImageUpload
                                            label="Material Image"
                                            value={field.value}
                                            onChange={(file) => field.onChange(file ?? "")}
                                            error={fieldState.error?.message}
                                            disabled={isPending}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </FieldGroup>
                </div>

                {/* ── Section 4: SEO Metadata ───────────────────────────────────── */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <FieldGroup>
                        <FormSection title="Composition" description="Add composition data" className="h-max">
                            {/* Always visible required SEO fields */}
                            <div className="space-y-5">
                                <Controller
                                    name="composition_template"
                                    control={control}
                                    render={({ field }) => (
                                        <MetalCompositionInput
                                            value={field.value ?? []}
                                            onChange={field.onChange}
                                        />
                                    )}
                                />
                            </div>
                        </FormSection>
                    </FieldGroup>
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
                                                            placeholder="https://example.com/materials/..."
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
                            Add Material
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
};
