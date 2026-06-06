import { z } from 'zod';
import parsePhoneNumberFromString from "libphonenumber-js";

export const baseSchema = z.object({
    id: z.string(),
    created_at: z.string().optional(),
})

export type Base = z.infer<typeof baseSchema>;


export const phoneNumberSchema = z.string().transform((val, ctx) => {
    const phoneNumber = parsePhoneNumberFromString(val, {
        defaultCountry: "IN", // Fallback if no country code is provided
        extract: false,       // Don't search inside strings
    });

    if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({
            code: "custom",
            message: "Please enter a valid phone number",
        });
        return z.NEVER;
    }

    // Returns standardized E.164 string format (e.g., +15555555555)
    return phoneNumber.number;
});


export const emailSchema = z
    .email({ message: "Please enter a valid email address." })
    .toLowerCase() // Normalizes formatting for database safety
    .max(254, { message: "Email must be less than 254 characters." })

export const seoIdSchema = z.object({
    seo_id: z.string().uuid().optional()
})

export type SeoId = z.infer<typeof seoIdSchema>;