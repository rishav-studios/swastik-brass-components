import { baseSchema, seoIdSchema } from "./base.schema";
import { z } from "zod";

export const facilityCategorySchema = baseSchema.extend({
    name: z.string().min(1, "Category name is required"),
    slug: z.string().min(1, "Category slug is required"),
    description: z.string().nullable().optional(),
    display_name: z.string().min(1, "Display name is required"),
}).extend(seoIdSchema);

export type FacilityCategory = z.infer<typeof facilityCategorySchema>;

export const facilityGroupSchema = baseSchema.extend({
    category_id: z.string(),
    title: z.string().min(1, "Group title is required"),
    description: z.string().nullable().optional(),
});

export type FacilityGroup = z.infer<typeof facilityGroupSchema>;

export const facilitySchema = baseSchema.extend({
    group_id: z.string(),
    name: z.string().min(1, "Facility name is required"),
    description: z.string().nullable().optional(),
});

export type Facility = z.infer<typeof facilitySchema>;
