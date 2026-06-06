import { baseSchema, seoIdSchema } from "./base.schema";
import { z } from "zod";

export const blogCategorySchema = baseSchema.extend({
    name: z.string().min(1, "Category name is required"),
    slug: z.string().min(1, "Category slug is required"),
    description: z.string().optional(),
}).extend(seoIdSchema);

export type BlogCategory = z.infer<typeof blogCategorySchema>;

export const blogSchema = baseSchema.extend({
    author: z.string().min(1, "Author is required"),
    title: z.string().min(1, "Title is required"),
    banner_url: z.union([
        z.url("Invalid banner URL"),
        z.custom<File>((val) => typeof File !== "undefined" && val instanceof File, {
            message: "Invalid banner file",
        }),
    ]),
    category_id: z.number().int(),
    blocks: z.any(), // jsonb
    time_to_read: z.number(), // numeric
}).extend(seoIdSchema);

export type Blog = z.infer<typeof blogSchema>;
