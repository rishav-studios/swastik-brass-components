import { z } from "zod";
import { baseSchema, imageSchema, int8IdSchema } from "./base.schema";
import { seoSchema } from "./seo.schema";

export const materialSchema = baseSchema.extend({
    name: z.string().min(1, "Material name is required"),
    slug: z.string().min(1, "Material slug is required"),
    description: z.string().min(1, "Material description is required"),
    image_url: imageSchema,
    display_order: z.number(),
    composition_template: z.any().nullable().optional(),
    seo_metadata: seoSchema
});

export type Material = z.infer<typeof materialSchema>;

export const createMaterialSchema = materialSchema.omit({
    id: true,
    created_at: true
})

export type CreateMaterial = z.infer<typeof createMaterialSchema>;

export const updateMaterialSchema = createMaterialSchema.omit({ slug: true }).partial();

export type UpdateMaterial = z.infer<typeof updateMaterialSchema>;

export const materialGradeSchema = baseSchema.extend({
    material_id: int8IdSchema,
    name: z.string().min(1, "Grade name is required"),
    chemical_composition: z.any(),
    label: z.string().min(1, "Grade label is required"),
    characteristics: z.array(z.string()).optional().default([])

});

export type MaterialGrade = z.infer<typeof materialGradeSchema>;

export const createMaterialGradeSchema = materialGradeSchema.omit({
    id: true,
    created_at: true
})

export type CreateMaterialGrade = z.infer<typeof createMaterialGradeSchema>;

export const updateMaterialGradeSchema = createMaterialGradeSchema.partial();

export type UpdateMaterialGrade = z.infer<typeof updateMaterialGradeSchema>;
