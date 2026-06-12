import { z } from "zod";
import { baseSchema, emailSchema, phoneNumberSchema } from "./base.schema";

export const statusEnums = [
    "NEW",
    "ASSIGNED",
    "IN_REVIEW",
    "WAITING_ON_CLIENT",
    "CLOSED_WON",
    "CLOSED_LOST",
    "REJECTED"
]

export const statusEnumSchema = z.enum(statusEnums);

export type Status = z.infer<typeof statusEnumSchema>;

export const quoteRequestSchema = baseSchema.extend({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    company_name: z.string().nullable().optional(),
    email: emailSchema,
    phone: phoneNumberSchema,
    message: z.string().min(1, "Message is required"),
    drawing_url: z.url().nullable().optional(),
    status: statusEnumSchema,
});

export type QuoteRequest = z.infer<typeof quoteRequestSchema>;

export const createQuoteRequestSchema = quoteRequestSchema.omit({
    id: true,
    created_at: true
})
export type CreateQuoteRequest = z.infer<typeof createQuoteRequestSchema>

export const enquirySchema = baseSchema.extend({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    company_name: z.string().nullable().optional(),
    email: emailSchema,
    phone: phoneNumberSchema,
    message: z.string().min(1, "Message is required"),
    status: statusEnumSchema,
});

export type Enquiry = z.infer<typeof enquirySchema>;

// Alias for convenience/safety to avoid typo issues
export const inquirySchema = enquirySchema;
export type Inquiry = Enquiry;

export const createInquirySchema = enquirySchema.omit({
    id: true,
    created_at: true
})

export type CreateInquiry = z.infer<typeof createInquirySchema>
