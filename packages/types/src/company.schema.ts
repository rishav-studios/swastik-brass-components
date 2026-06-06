import { baseSchema, emailSchema, phoneNumberSchema, seoIdSchema } from "./base.schema";
import { z } from "zod";

export const companyJourneySchema = baseSchema.extend({
  year: z.number(),
  title: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
  image_url: z.string().nullable().optional(),
});

export type CompanyJourney = z.infer<typeof companyJourneySchema>;

export const companyStatisticsSchema = baseSchema.extend({
  display_order: z.number(),
  value: z.number(),
  suffix: z.string().nullable().optional(),
  label: z.string().min(1, "Label is required"),
  icon_name: z.string().nullable().optional(),
});

export type CompanyStatistics = z.infer<typeof companyStatisticsSchema>;

export const siteSettingsSchema = baseSchema.extend({
  phone: z.array(z.object({ label: z.string(), phone: phoneNumberSchema })),
  email: z.array(z.object({ label: z.string(), email: emailSchema })),
  instagram_url: z.url().nullable().optional(),
  linkedin_url: z.url().nullable().optional(),
  youtube_url: z.url().nullable().optional(),
  facebook_url: z.url().nullable().optional(),
}).extend(seoIdSchema);

export type SiteSettings = z.infer<typeof siteSettingsSchema>;
