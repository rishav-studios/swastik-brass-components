import { z } from "zod";
import { baseSchema, imageSchema, int8IdSchema } from "./base.schema";

export const productSchema = baseSchema.extend({
    name: z.string().min(1, "Product name is required"),
    slug: z.string().min(1, "Product slug is required"),
    material_id: int8IdSchema,
    grade_id: int8IdSchema,
    sector_id: int8IdSchema,
    image_url: imageSchema,
    is_featured: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;

export const createProductSchema = productSchema.omit({
    id: true,
    created_at: true
})

export type CreateProduct = z.infer<typeof createProductSchema>;

export const updateProductSchema = createProductSchema.omit({ slug: true }).partial();

export type UpdateProduct = z.infer<typeof updateProductSchema>;
