"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { FileUploader } from "@/components/shared/FileUploader";
import { Eyebrow } from "@/components/shared/SectionHeader";
import { TransitionLink } from "@/components/shared/TransitionLink";
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
            <Section className="bg-foreground text-background py-0 lg:py-0 relative overflow-hidden flex flex-col lg:flex-row min-h-[70vh]">
                {/* Left Half */}
                <div className="w-full lg:w-1/2 p-8 lg:p-20 flex flex-col justify-center relative z-10">
                    <Eyebrow className="bg-primary/20 text-primary border-primary/30 mb-6 mx-0">Request a Quote</Eyebrow>
                    <h1 className="text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8">
                        Get an estimate for your <br className="hidden xl:block" />
                        <span className="text-primary">engineering projects.</span>
                    </h1>

                    <div className="space-y-6 mb-12">
                        {[
                            { step: 1, title: "Submit Specs", desc: "Share your requirements and CAD files" },
                            { step: 2, title: "Team Review", desc: "Our engineers analyze manufacturability" },
                            { step: 3, title: "Get Estimate", desc: "Receive a detailed, competitive quote" }
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-4">
                                <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold shrink-0 mt-1">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg text-white">{item.title}</h3>
                                    <p className="text-white/60">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-auto pt-8 border-t border-white/10">
                        <p className="text-white/60">
                            Have a general inquiry?{" "}
                            <TransitionLink href="/contact" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 transition-colors">
                                Contact us <icons.arrowRight className="w-4 h-4" />
                            </TransitionLink>
                        </p>
                    </div>
                </div>

                {/* Right Half */}
                <div className="w-full lg:w-1/2 bg-[#252223] relative min-h-[40vh] flex items-center justify-center p-8 overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>

                    {/* Decorative abstract elements simulating CAD/Blueprint */}
                    <div className="relative z-10 w-full max-w-md aspect-square border border-white/10 rounded-3xl bg-black/20 backdrop-blur-sm p-8 shadow-2xl flex flex-col items-center justify-center group hover:border-primary/30 transition-colors duration-500">
                        <icons.fileCheck2 className="w-32 h-32 text-primary/40 group-hover:text-primary transition-colors duration-500 mb-6" />
                        <div className="h-2 w-1/2 bg-white/10 rounded-full mb-4"></div>
                        <div className="h-2 w-3/4 bg-white/10 rounded-full mb-4"></div>
                        <div className="h-2 w-1/3 bg-white/10 rounded-full"></div>

                        {/* Floating badges */}
                        <div className="absolute -left-6 top-12 bg-card text-foreground px-4 py-2 rounded-lg shadow-lg border border-border/50 font-medium flex items-center gap-2 text-sm animate-[float_4s_ease-in-out_infinite]">
                            <icons.checkCircle2 className="w-4 h-4 text-primary" /> 24hr Response
                        </div>
                        <div className="absolute -right-8 bottom-24 bg-card text-foreground px-4 py-2 rounded-lg shadow-lg border border-border/50 font-medium flex items-center gap-2 text-sm animate-[float_5s_ease-in-out_infinite_reverse]">
                            <icons.shieldCheck className="w-4 h-4 text-primary" /> NDA Available
                        </div>
                    </div>
                </div>
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
                            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

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
                                                <Textarea {...field} placeholder="We need 10,000 units of custom brass fittings as per the attached drawing. Tolerance should be ±0.01mm..." className="min-h-[200px] bg-background resize-y text-base p-4 mt-2" />
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
                            <TransitionLink href="/contact" className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                                Contact Us <icons.arrowRight className="w-5 h-5" />
                            </TransitionLink>
                        </div>
                        <div className="bg-primary/10 p-8 rounded-3xl border border-primary/20 hover:border-primary/50 transition-colors group relative overflow-hidden">
                            <div className="absolute -right-10 -bottom-10 opacity-10">
                                <icons.factory className="w-48 h-48 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary mb-4 relative z-10">Explore Our Work</h3>
                            <p className="text-white/80 mb-8 relative z-10">
                                View our portfolio of precision components and discover how we can help with your next project.
                            </p>
                            <TransitionLink href="/sectors" className="inline-flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all relative z-10">
                                View Sectors <icons.arrowRight className="w-5 h-5" />
                            </TransitionLink>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}