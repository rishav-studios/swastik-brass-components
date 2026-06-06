import { baseSchema, seoIdSchema } from "./base.schema";
import { z } from "zod";

export const materialSchema = baseSchema.extend({
    name: z.string().min(1, "Material name is required"),
    slug: z.string().min(1, "Material slug is required"),
    description: z.string().min(1, "Material description is required"),
    image_url: z.url({ error: "Invalid image URL" }),
    display_order: z.number(),
    composition_template: z.any(), // jsonb
}).extend(seoIdSchema);

export type Material = z.infer<typeof materialSchema>;

export const materialGradeSchema = baseSchema.extend({
    material_id: z.string(),
    name: z.string().min(1, "Grade name is required"),
    chemical_composition: z.any(), // jsonb
});

export type MaterialGrade = z.infer<typeof materialGradeSchema>;
