import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from 'zod';


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


export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
];

export const imageSchema = z.union([
    z.url("Invalid image URL"),
    z.custom<File>(
        (val) =>
            typeof File !== "undefined" &&
            val instanceof File &&
            ACCEPTED_IMAGE_TYPES.includes(val.type),
        {
            message: "Invalid image file. Only PNG, JPG, JPEG, WEBP, GIF, and SVG are allowed.",
        }
    ),
]);

export type Image = z.infer<typeof imageSchema>;


export const int8IdSchema = z
    .union([z.string(), z.number()])
    .transform((val) => String(val))
    .refine((val) => /^\d+$/.test(val), {
        message: "Invalid ID format: Must be a numeric string",
    });

export type Int8Id = z.infer<typeof int8IdSchema>;

export const baseSchema = z.object({
    id: int8IdSchema,
    created_at: z.string().optional(),
})

export type Base = z.infer<typeof baseSchema>;