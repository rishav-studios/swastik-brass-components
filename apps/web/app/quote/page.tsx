"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { CustomLink } from "@/components/shared/clickables/CustomLink";
import { FileUploader } from "@/components/shared/FileUploader";
import ScrollDownMouseAnimation from "@/components/shared/MouseScrollAnimatedIcon";
import { Eyebrow, SectionHeader } from "@/components/shared/SectionHeader";
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
        <main key="quote">
            {/* Hero Section */}
            <Section className="min-h-[70dvh] lg:py-16 lg:pt-24">
                <BackgroundNoise />
                <BackgroundLines className="w-9/10 mx-auto" />
                <Container className="relative z-10 h-[calc(70dvh-8rem)] lg:h-[calc(70dvh-10rem)] flex flex-col">
                    <SectionHeader className="space-y-6 my-auto sm:mt-auto">
                        <Eyebrow className="mx-auto">quote</Eyebrow>
                        <h1 className="text-center text-6xl md:text-8xl font-medium">let's discuss</h1>
                    </SectionHeader>
                    <div className="justify-between hidden sm:flex text-gray-500 mt-auto">
                        <span>Jamnagar, Gujarat, India</span>
                        <span>22.4685° N, 70.0573° E</span>
                    </div>
                </Container>
                <ScrollDownMouseAnimation iconContainerClassname="bg-gray-300" />

            </Section>

            {/* Form Section */}
            <Section className="py-20 lg:py-32 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full bg-primary/5 blur-3xl rounded-full -z-10 pointer-events-none opacity-50"></div>

                <Container>
                    <div className="max-w-5xl mx-auto">
                        <div className="flex items-center gap-4 mb-8 justify-center">
                            <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                                <icons.fileCheck2 className="w-8 h-8" />
                            </div>
                            <h2 className="text-3xl font-bold text-foreground">Project Details</h2>
                        </div>

                        <div className="bg-card p-8 md:p-12 lg:p-16 rounded-[2rem] border border-border/50 shadow-2xl relative overflow-hidden">
                            {/* Accent line at the top */}
                            <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-r from-primary/20 via-primary to-primary/20"></div>

                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">

                                {/* SECTION A: Contact Information */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">1</span>
                                            Contact Information
                                        </h3>
                                    </div>
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
                                </div>

                                <hr className="border-border/50" />

                                {/* SECTION B: Project Details */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">2</span>
                                            Project Information
                                        </h3>
                                    </div>
                                    <Controller
                                        control={form.control}
                                        name="message"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Project Requirements <span className="text-destructive">*</span></FieldLabel>
                                                <FieldDescription>Please describe your project, required materials, quantities, and tolerances.</FieldDescription>
                                                <Textarea {...field} placeholder="We need 10,000 units of custom brass fittings as per the attached drawing. Tolerance should be ±0.01mm..." className="min-h-50 bg-background resize-y text-base p-4 mt-2" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>

                                <hr className="border-border/50" />

                                {/* SECTION C: Technical Drawings */}
                                <div className="space-y-8">
                                    <div>
                                        <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
                                            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</span>
                                            Technical Files
                                        </h3>
                                    </div>
                                    <Controller
                                        control={form.control}
                                        name="drawing_url"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Drawing/CAD File <span className="text-muted-foreground font-normal ml-1">(Optional)</span></FieldLabel>
                                                <FieldDescription className="mb-4">Upload your design files directly to our secure storage.</FieldDescription>
                                                <FileUploader
                                                    value={field.value}
                                                    onChange={field.onChange}
                                                    folder="quotes/drawings"
                                                />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />
                                </div>

                                <div className="pt-8">
                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full py-8 rounded-full text-xl shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:-translate-y-1 transition-all font-bold"
                                    >
                                        {isSubmitting ? "Submitting Request..." : "Submit Quote Request"}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Cross-Reference Section */}
            <Section className="bg-foreground min-h-max py-20 text-background">
                <Container>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 hover:border-primary/50 transition-colors group">
                            <h3 className="text-2xl font-bold text-white mb-4">Just have a question?</h3>
                            <p className="text-white/60 mb-8">
                                Not ready for a formal quote yet? Our team is happy to answer any questions about our capabilities.
                            </p>
                            <CustomLink href="/contact" className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                Contact Us <icons.arrowRight className="w-5 h-5" />
                            </CustomLink>
                        </div>
                        <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors group relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <icons.factory className="w-48 h-48 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4 relative z-10">Explore Our Work</h3>
                            <p className="text-white/80 mb-8 relative z-10">
                                View our portfolio of precision components and discover how we can help with your next project.
                            </p>
                            <CustomLink href="/sectors" className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all relative z-10">
                                View Sectors <icons.arrowRight className="w-5 h-5" />
                            </CustomLink>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}