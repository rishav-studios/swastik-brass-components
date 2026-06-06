import { baseSchema } from "./base.schema";
import { z } from "zod";

export const seoSchema = baseSchema.extend({
    meta_title: z.string().min(1, "Meta title is required"),
    meta_description: z.string().min(1, "Meta description is required"),
    keywords: z.array(z.string()).optional(),
    canonical_url: z.url("Invalid canonical URL").nullable().optional(),

    // Open Graph (social sharing metadata)
    og_title: z.string().nullable().optional(),
    og_description: z.string().nullable().optional(),
    og_image: z.string().nullable().optional(),
    og_type: z.string().nullable().optional(), // e.g. "website", "article"

    // Twitter Card metadata
    twitter_card: z.string().nullable().optional(), // e.g. "summary", "summary_large_image"
    twitter_title: z.string().nullable().optional(),
    twitter_description: z.string().nullable().optional(),
    twitter_image: z.string().nullable().optional(),

    // Search indexing control
    meta_robots: z.string().nullable().optional(), // e.g. "index, follow", "noindex, nofollow"
    structured_data: z.any().nullable().optional(), // JSON-LD schema.org structured data
});
export type Seo = z.infer<typeof seoSchema>;