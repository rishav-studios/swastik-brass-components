import { z } from "zod";
import { baseSchema, emailSchema, imageSchema, phoneNumberSchema } from "./base.schema";
import { seoSchema } from "./seo.schema";

export const companyJourneySchema = baseSchema.extend({
  year: z.number(),
  title: z.string(),
  description: z.string(),
  image_url: imageSchema.optional(),
});

export const createCompanyJourneySchema = companyJourneySchema.omit({
  id: true,
  created_at: true,
})

export type CreateCompanyJourney = z.infer<typeof createCompanyJourneySchema>;

export type UpdateCompanyJourney = CreateCompanyJourney;

// statistics like 500 years of experience, 1 billion products developed, export in 10,000 countries
export const companyStatisticsSchema = baseSchema.extend({
  display_order: z.number(),
  value: z.number(),
  suffix: z.string().nullable().optional(),
  label: z.string().min(1, "Label is required"),
  icon_name: z.string().nullable().optional(),
});

export const createCompanyStatisticsSchema = companyStatisticsSchema.omit({
  id: true,
  created_at: true,
})

export type CreateCompanyStatistics = z.infer<typeof createCompanyStatisticsSchema>;

export type UpdateCompanyStatistics = CreateCompanyStatistics;

// settings like phone numbers, emails, social links, currency, etc.
export const siteSettingsSchema = baseSchema.extend({
  phone: z.array(z.object({ label: z.string(), phone: phoneNumberSchema })),
  email: z.array(z.object({ label: z.string(), email: emailSchema })),
  address: z.string().min(1, { error: "Address is required" }),
  address_url: z.url().min(1, { error: "Invalid address URL" }),
  instagram_url: z.url().nullable().optional(),
  linkedin_url: z.url().nullable().optional(),
  youtube_url: z.url().nullable().optional(),
  facebook_url: z.url().nullable().optional(),
  seo_metadata: seoSchema
});

export const createSiteSettingsSchema = siteSettingsSchema.omit({
  id: true,
  created_at: true,
})

export type CreateSiteSettings = z.infer<typeof createSiteSettingsSchema>;

export const updateSiteSettingsSchema = createSiteSettingsSchema.partial();

export type UpdateSiteSettings = z.infer<typeof updateSiteSettingsSchema>;
