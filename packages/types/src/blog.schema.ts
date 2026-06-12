import { z } from "zod";
import { baseSchema, imageSchema, int8IdSchema } from "./base.schema";
import { seoSchema } from "./seo.schema";

export const blogCategorySchema = baseSchema.extend({
    name: z.string().min(1, "Category name is required"),
    slug: z.string().min(1, "Category slug is required"),
    description: z.string().optional(),
    seo_metadata: seoSchema
});

export type BlogCategory = z.infer<typeof blogCategorySchema>;

export const createBlogCategorySchema = blogCategorySchema.omit({
    id: true,
    created_at: true,
})

export type CreateBlogCategory = z.infer<typeof createBlogCategorySchema>;

export const updateBlogCategorySchema = createBlogCategorySchema.partial();

export type UpdateBlogCategory = z.infer<typeof updateBlogCategorySchema>;

export const blogSchema = baseSchema.extend({
    author: z.string().min(1, "Author is required"),
    title: z.string().min(1, "Title is required"),
    banner_url: imageSchema,
    category_id: int8IdSchema,
    blocks: z.any(), // jsonb
    time_to_read: z.number(), // numeric
    seo_metadata: seoSchema
})

export type Blog = z.infer<typeof blogSchema>;

export const createBlogSchema = blogSchema.omit({
    id: true,
    created_at: true,
})

export type CreateBlog = z.infer<typeof createBlogSchema>;

export const updateBlogSchema = createBlogSchema.partial();

export type UpdateBlog = z.infer<typeof updateBlogSchema>;
