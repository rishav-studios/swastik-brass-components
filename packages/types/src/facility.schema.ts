import { z } from "zod";
import { baseSchema } from "./base.schema";
import { seoSchema } from "./seo.schema";

export const facilityCategorySchema = baseSchema.extend({
    name: z.string().min(1, "Category name is required"),
    slug: z.string().min(1, "Category slug is required"),
    description: z.string().nullable().optional(),
    display_name: z.string().min(1, "Display name is required"),
    seo_metadata: seoSchema
});

export type FacilityCategory = z.infer<typeof facilityCategorySchema>;

export const createFacilityCategorySchema = facilityCategorySchema.omit({
    id: true,
    created_at: true,
})

export type CreateFacilityCategory = z.infer<typeof createFacilityCategorySchema>;

export const updateFacilityCategorySchema = createFacilityCategorySchema.partial();

export type UpdateFacilityCategory = z.infer<typeof updateFacilityCategorySchema>;

export const facilityGroupSchema = baseSchema.extend({
    category_id: z.string(),
    title: z.string().min(1, "Group title is required"),
    description: z.string().nullable().optional(),
});

export type FacilityGroup = z.infer<typeof facilityGroupSchema>;

export const createFacilityGroupSchema = facilityGroupSchema.omit({
    id: true,
    created_at: true,
})

export type CreateFacilityGroup = z.infer<typeof createFacilityGroupSchema>;

export const updateFacilityGroupSchema = createFacilityGroupSchema.partial()

export type UpdateFacilityGroup = z.infer<typeof updateFacilityGroupSchema>;

export const facilitySchema = baseSchema.extend({
    group_id: z.string(),
    name: z.string().min(1, "Facility name is required"),
    description: z.string().nullable().optional(),
});

export type Facility = z.infer<typeof facilitySchema>;

export const createFacilitySchema = facilitySchema.omit({
    id: true,
    created_at: true,
})

export type CreateFacility = z.infer<typeof createFacilitySchema>;

export const updateFacilitySchema = createFacilitySchema.partial()

export type UpdateFacility = z.infer<typeof updateFacilitySchema>;
