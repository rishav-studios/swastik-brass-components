"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateQuoteRequest, createQuoteRequestSchema } from "@swastik/types";
import { icons } from "@swastik/ui";
import { toast } from "@swastik/ui/components/shadcn";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Field, FieldDescription, FieldError, FieldLabel } from "@swastik/ui/components/shadcn/field";
import { Input } from "@swastik/ui/components/shadcn/input";
import { Textarea } from "@swastik/ui/components/shadcn/textarea";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";


export default function QuotePage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CreateQuoteRequest>({
        resolver: zodResolver(createQuoteRequestSchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            company_name: "",
            email: "",
            phone: "",
            message: "",
            drawing_url: "",
            status: "NEW",
        },
    });

    const onSubmit = async (data: CreateQuoteRequest) => {
        setIsSubmitting(true);
        // Mock submit function
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Quote Request Data:", data);
        toast.success("Quote request submitted successfully! Our engineering team will review it shortly.");
        form.reset();
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-background pt-24">
            {/* Hero Section */}
            <Section className="bg-foreground text-background py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <Container className="relative z-10 text-center flex flex-col items-center">
                    <SectionHeader className="w-max max-w-4xl space-y-4 text-center">
                        <Eyebrow className="mx-auto bg-primary/20 text-primary border-primary/30">Request a Quote</Eyebrow>
                        <Heading className="mx-auto leading-tight text-4xl lg:text-6xl text-background">
                            Get an estimate for your <br className="hidden md:block" />
                            <span className="text-primary">engineering projects.</span>
                        </Heading>
                        <p className="mx-auto text-muted text-lg lg:text-xl max-w-2xl pt-4">
                            Provide your specifications and CAD drawings. Our technical team will analyze your requirements and provide a detailed, competitive estimate.
                        </p>
                    </SectionHeader>
                </Container>
            </Section>

            {/* Form Section */}
            <Section className="py-20 lg:py-32 relative">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none opacity-50"></div>

                <Container>
                    <div className="max-w-4xl mx-auto">
                        <div className="bg-card p-8 md:p-12 lg:p-16 rounded-[2.5rem] border border-border/50 shadow-2xl relative overflow-hidden">
                            {/* Accent line at the top */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

                            <div className="flex items-center gap-4 mb-10">
                                <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                    <icons.fileCheck2 className="w-8 h-8" />
                                </div>
                                <div>
                                    <h3 className="text-3xl font-bold text-foreground">Project Details</h3>
                                    <p className="text-muted-foreground mt-1">Fill out the form below to help us understand your needs.</p>
                                </div>
                            </div>

                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                                {/* Personal Info Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <Controller
                                        control={form.control}
                                        name="first_name"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>First Name <span className="text-destructive">*</span></FieldLabel>
                                                <Input {...field} placeholder="John" className="bg-background py-6 px-4 text-base" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        control={form.control}
                                        name="last_name"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Last Name <span className="text-destructive">*</span></FieldLabel>
                                                <Input {...field} placeholder="Doe" className="bg-background py-6 px-4 text-base" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>

                                {/* Company & Contact Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                    <Controller
                                        control={form.control}
                                        name="company_name"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Company Name <span className="text-muted-foreground font-normal ml-1">(Optional)</span></FieldLabel>
                                                <Input {...field} value={field.value || ''} placeholder="Swastik Brass Components" className="bg-background py-6 px-4 text-base" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                    <Controller
                                        control={form.control}
                                        name="phone"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Phone Number <span className="text-destructive">*</span></FieldLabel>
                                                <Input {...field} type="tel" placeholder="+91 98765 43210" className="bg-background py-6 px-4 text-base" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>

                                {/* Email Full Width */}
                                <Controller
                                    control={form.control}
                                    name="email"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Email Address <span className="text-destructive">*</span></FieldLabel>
                                            <Input {...field} type="email" placeholder="john.doe@company.com" className="bg-background py-6 px-4 text-base" />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                <hr className="border-border/50" />

                                {/* Project Requirements */}
                                <Controller
                                    control={form.control}
                                    name="message"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Project Requirements <span className="text-destructive">*</span></FieldLabel>
                                            <FieldDescription>Please describe your project, required materials, quantities, and tolerances.</FieldDescription>
                                            <Textarea {...field} placeholder="We need 10,000 units of custom brass fittings as per the attached drawing. Tolerance should be ±0.01mm..." className="min-h-[200px] bg-background resize-y text-base p-4 mt-2" />
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                {/* Drawing URL */}
                                <Controller
                                    control={form.control}
                                    name="drawing_url"
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel>Drawing/CAD File Link <span className="text-muted-foreground font-normal ml-1">(Optional)</span></FieldLabel>
                                            <FieldDescription>Provide a link to your Google Drive, Dropbox, or other cloud storage containing the design files.</FieldDescription>
                                            <div className="relative mt-2">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground">
                                                    <icons.linkIcon className="h-5 w-5" />
                                                </div>
                                                <Input {...field} value={field.value || ''} type="url" placeholder="https://drive.google.com/..." className="bg-background py-6 pl-12 pr-4 text-base" />
                                            </div>
                                            <FieldError>{fieldState.error?.message}</FieldError>
                                        </Field>
                                    )}
                                />

                                <div className="pt-8">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-8 rounded-2xl text-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:-translate-y-1 transition-all font-bold"
                                    >
                                        {isSubmitting ? "Submitting Request..." : "Request Estimate"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}