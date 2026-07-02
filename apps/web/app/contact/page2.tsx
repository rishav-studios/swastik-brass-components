"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Eyebrow } from "@/components/shared/SectionHeader";
import { TransitionLink } from "@/components/shared/TransitionLink";
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

                {/* Decorative Graphic Right Side */}
                {/* <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-10 pointer-events-none hidden lg:block">
                    <icons.settings className="w-full h-full text-primary animate-spin-slow" />
                </div> */}

                <Container className="relative z-10">
                    <div className="w-max max-w-3xl space-y-6">
                        <Eyebrow className="bg-primary/20 text-primary border-primary/30 mx-0">CONTACT</Eyebrow>
                        <h1 className="leading-[1.1] text-5xl lg:text-7xl font-bold text-background">
                            Let's discuss your <br />
                            <span className="text-primary">precision needs.</span>
                        </h1>
                        <p className="text-muted text-lg lg:text-xl max-w-2xl pt-2">
                            Whether you have a specific inquiry or need detailed information about our manufacturing capabilities, our team is ready to assist you.
                        </p>

                        {/* Stat Pills */}
                        <div className="flex flex-wrap items-center gap-4 pt-8">
                            {["25+ Years Experience", "50+ Countries Served", "ISO 9001 Certified"].map((stat, i) => (
                                <div key={i} className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-sm font-medium backdrop-blur-sm">
                                    {stat}
                                </div>
                            ))}
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Content Section */}
            <Section className="py-20 lg:py-32">
                <Container>
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
                        {/* Contact Info (Left) */}
                        <div className="lg:col-span-5 space-y-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                                        <icons.mapPin className="w-5 h-5" />
                                    </div>
                                    Headoffice
                                </h3>
                                <div className="pl-12">
                                    <p className="text-muted-foreground leading-relaxed text-lg">
                                        Plot No. 3436, Phase III,<br />
                                        G.I.D.C., Dared,<br />
                                        Jamnagar - 361004, Gujarat, India
                                    </p>
                                </div>
                            </div>

                            <div className="h-px bg-border/50 w-full" />

                            <div>
                                <h3 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-3">
                                    <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
                                        <icons.phone className="w-5 h-5" />
                                    </div>
                                    Direct Contact
                                </h3>
                                <div className="space-y-4 pl-12">
                                    <div className="flex items-center gap-3">
                                        <icons.mail className="w-5 h-5 text-muted-foreground" />
                                        <a href="mailto:info@swastikbrass.com" className="text-foreground hover:text-primary transition-colors text-lg font-medium">
                                            info@swastikbrass.com
                                        </a>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <icons.phone className="w-5 h-5 text-muted-foreground" />
                                        <a href="tel:+919876543210" className="text-foreground hover:text-primary transition-colors text-lg font-medium">
                                            +91 98765 43210
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="h-px bg-border/50 w-full" />

                            {/* Quote Cross Reference CTA */}
                            <div className="bg-foreground text-background p-8 rounded-3xl relative overflow-hidden group">
                                <div className="absolute -right-8 -bottom-8 opacity-10 group-hover:scale-110 transition-transform duration-500">
                                    <icons.fileText className="w-40 h-40 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 relative z-10">Need a formal estimate?</h3>
                                <p className="text-white/70 mb-6 relative z-10">
                                    Submit your technical drawings and specifications for a detailed quote.
                                </p>
                                <TransitionLink
                                    href="/quote"
                                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold hover:bg-primary/90 transition-colors relative z-10"
                                >
                                    Request a Quote <icons.arrowRight className="w-4 h-4" />
                                </TransitionLink>
                            </div>
                        </div>

                        {/* Form (Right) */}
                        <div className="lg:col-span-7">
                            <div className="bg-card p-8 lg:p-12 rounded-[2rem] border border-border/50 shadow-xl relative overflow-hidden">
                                {/* Accent corner */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-bl-[100px] -z-0"></div>

                                <h3 className="text-3xl font-bold mb-8 text-foreground relative z-10">Send us a message</h3>

                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 relative z-10">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <Controller
                                            control={form.control}
                                            name="first_name"
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel>First Name <span className="text-destructive">*</span></FieldLabel>
                                                    <Input {...field} placeholder="John" className="bg-background py-6 px-4" />
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
                                                    <Input {...field} placeholder="Doe" className="bg-background py-6 px-4" />
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
                                                <Input {...field} value={field.value || ''} placeholder="Swastik Brass Components" className="bg-background py-6 px-4" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                                        <Controller
                                            control={form.control}
                                            name="email"
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel>Email Address <span className="text-destructive">*</span></FieldLabel>
                                                    <Input {...field} type="email" placeholder="john@example.com" className="bg-background py-6 px-4" />
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
                                                    <Input {...field} type="tel" placeholder="+91 98765 43210" className="bg-background py-6 px-4" />
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
                                                <Textarea {...field} placeholder="How can we help you?" className="min-h-[180px] bg-background resize-y p-4" />
                                                <FieldError>{fieldState.error?.message}</FieldError>
                                            </Field>
                                        )}
                                    />

                                    <div className="pt-4">
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full lg:w-auto px-10 py-7 rounded-full text-lg shadow-[0_0_20px_rgba(234,179,8,0.2)] hover:shadow-[0_0_30px_rgba(234,179,8,0.4)] transition-all font-bold group"
                                        >
                                            {isSubmitting ? "Sending..." : "Send Message"}
                                            {!isSubmitting && <icons.arrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />}
                                        </Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>

            {/* Map Section */}
            <section className="w-full h-[560px] relative bg-muted grayscale hover:grayscale-0 transition-all duration-700">
                <Container className="h-full">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d443.0410738103335!2d70.05297746198046!3d22.41370247097428!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sin!4v1781688094967!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>

                    {/* Overlay Text */}
                    <div className="absolute bottom-8 left-8 bg-background/90 backdrop-blur-md p-4 rounded-xl border border-border/50 shadow-lg pointer-events-none">
                        <p className="font-semibold text-foreground flex items-center gap-2">
                            <icons.mapPin className="w-4 h-4 text-primary" /> Jamnagar, Gujarat, India
                        </p>
                    </div>
                </Container>
            </section>
        </main>
    );
}