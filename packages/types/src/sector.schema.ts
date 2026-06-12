import { z } from "zod";
import { baseSchema, imageSchema } from "./base.schema";
import { seoSchema } from "./seo.schema";

export const sectorSchema = baseSchema.extend({
    name: z.string().min(1, "Sector name is required"),
    slug: z.string().min(1, "Sector slug is required"),
    home_description: z.string().min(1, "Home Page description is required"),
    dedicated_description: z.string().nullable().optional(),
    display_order: z.number(),
    image_url: imageSchema,
    outline_image_url: imageSchema.nullable().optional(),
    cover_image_url: imageSchema,
    seo_metadata: seoSchema
});

export type Sector = z.infer<typeof sectorSchema>;

export const createSectorSchema = sectorSchema.omit({
    id: true,
    created_at: true
});

export type CreateSector = z.infer<typeof createSectorSchema>;

export const updateSectorSchema = createSectorSchema.omit({ slug: true }).partial();

export type UpdateSector = z.infer<typeof updateSectorSchema>;
