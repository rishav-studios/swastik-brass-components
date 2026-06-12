"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow, Heading, SectionHeader } from "@/components/shared/SectionHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateInquiry, createInquirySchema } from "@swastik/types";
import { toast } from "@swastik/ui/components/shadcn";
import { Button } from "@swastik/ui/components/shadcn/button";
import { Field, FieldError, FieldLabel } from "@swastik/ui/components/shadcn/field";
import { Input } from "@swastik/ui/components/shadcn/input";
import { Textarea } from "@swastik/ui/components/shadcn/textarea";
import { icons } from "@swastik/ui/constants/icon";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";


export default function ContactPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<CreateInquiry>({
        resolver: zodResolver(createInquirySchema),
        defaultValues: {
            first_name: "",
            last_name: "",
            company_name: "",
            email: "",
            phone: "",
            message: "",
            status: "NEW",
        },
    });

    const onSubmit = async (data: CreateInquiry) => {
        setIsSubmitting(true);
        // Mock submit function
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Contact Form Data:", data);
        toast.success("Message sent successfully! We will get back to you soon.");
        form.reset();
        setIsSubmitting(false);
    };

    return (
        <main className="min-h-screen bg-background pt-24">
            {/* Hero Section */}
            <Section className="bg-foreground text-background py-20 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                <Container className="relative z-10">
                    <SectionHeader className="w-max max-w-3xl space-y-4">
                        <Eyebrow className="bg-primary/20 text-primary border-primary/30">Contact Us</Eyebrow>
                        <Heading className="leading-tight text-4xl lg:text-6xl text-background">
                            Let's discuss your <span className="text-primary">precision</span> needs.
                        </Heading>
                        <p className="text-muted text-lg lg:text-xl max-w-2xl pt-4">
                            Whether you have a specific inquiry or need detailed information about our manufacturing capabilities, our team is ready to assist you.
                        </p>
                    </SectionHeader>
                </Container>
            </Section>

            {/* Content Section */}
            <Section className="py-20 lg:py-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        {/* Contact Info (Left) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">Global Headquarters</h3>
                                <div className="space-y-6">
                                    <div className="flex items-start gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0 mt-1">
                                            <icons.mapPin className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-lg">Address</h4>
                                            <p className="text-muted-foreground leading-relaxed">
                                                Plot No. 3436, Phase III,<br />
                                                G.I.D.C., Dared,<br />
                                                Jamnagar - 361004, Gujarat, India
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-border/50 w-full" />

                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground">Direct Contact</h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
                                            <icons.mail className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-lg">Email</h4>
                                            <a href="mailto:info@swastikbrass.com" className="text-muted-foreground hover:text-primary transition-colors">
                                                info@swastikbrass.com
                                            </a>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 bg-primary/10 rounded-full text-primary shrink-0">
                                            <icons.phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground mb-1 text-lg">Phone</h4>
                                            <a href="tel:+919876543210" className="text-muted-foreground hover:text-primary transition-colors">
                                                +91 98765 43210
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Form (Right) */}
                        <div className="lg:col-span-7">
                            <div className="bg-card p-8 lg:p-12 rounded-[2rem] border border-border/50 shadow-xl">
                                <h3 className="text-3xl font-bold mb-8 text-foreground">Send us a message</h3>

                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Controller
                                            control={form.control}
                                            name="first_name"
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel>First Name <span className="text-destructive">*</span></FieldLabel>
                                                    <Input {...field} placeholder="John" className="bg-background" />
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
                                                    <Input {...field} placeholder="Doe" className="bg-background" />
                                                    <FieldError>{fieldState.error?.message}</FieldError>
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    <Controller
                                        control={form.control}
                                        name="company_name"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Company Name <span className="text-muted-foreground font-normal ml-1">(Optional)</span></FieldLabel>
                                                <Input {...field} value={field.value || ''} placeholder="Swastik Brass Components" className="bg-background" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <Controller
                                            control={form.control}
                                            name="email"
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel>Email Address <span className="text-destructive">*</span></FieldLabel>
                                                    <Input {...field} type="email" placeholder="john@example.com" className="bg-background" />
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
                                                    <Input {...field} type="tel" placeholder="+91 98765 43210" className="bg-background" />
                                                    <FieldError>{fieldState.error?.message}</FieldError>
                                                </Field>
                                            )}
                                        />
                                    </div>

                                    <Controller
                                        control={form.control}
                                        name="message"
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel>Message <span className="text-destructive">*</span></FieldLabel>
                                                <Textarea {...field} placeholder="How can we help you?" className="min-h-[150px] bg-background resize-y" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full lg:w-auto px-8 py-6 rounded-full text-lg shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all font-bold"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </main>
    );
}