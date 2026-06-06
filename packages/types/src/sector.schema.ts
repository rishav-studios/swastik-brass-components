import { baseSchema, seoIdSchema } from "./base.schema";
import { z } from "zod";

export const sectorSchema = baseSchema.extend({
    name: z.string().min(1, "Sector name is required"),
    slug: z.string().min(1, "Sector slug is required"),
    home_description: z.string().min(1, "Home description is required"),
    dedicated_description: z.string().nullable().optional(),
    display_order: z.number(),
    image_url: z.url({ error: "Invalid image URL" }),
    outline_image_ur: z.url({ error: "Invalid outline image URL" }).nullable().optional(),
    cover_image_url: z.url({ error: "Invalid cover image URL" }),
}).extend(seoIdSchema);

export type Sector = z.infer<typeof sectorSchema>;
