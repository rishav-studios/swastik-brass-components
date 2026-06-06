import { baseSchema } from "./base.schema";
import { z } from "zod";

export const productSchema = baseSchema.extend({
    name: z.string().min(1, "Product name is required"),
    slug: z.string().min(1, "Product slug is required"),
    material_id: z.string(),
    grade_id: z.string(),
    sector_id: z.string(),
    image_url: z.url({ error: "Invalid image URL" }),
    is_featured: z.boolean(),
});

export type Product = z.infer<typeof productSchema>;
