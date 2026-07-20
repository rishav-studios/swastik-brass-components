import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import BackgroundNoise, { BackgroundLines } from "@/components/shared/BackgroundNoise";
import { CustomLink, Arrow } from "@/components/shared/clickables/CustomLink";

export default function NotFound() {
    return (
        <Section className="min-h-dvh flex items-center justify-center">
            <BackgroundNoise />
            <BackgroundLines className="w-9/10 mx-auto" />

            <Container className="relative z-10 flex flex-col items-center text-center gap-8">
                {/* Large 404 number */}
                <div className="relative select-none">
                    <span className="text-[12rem] sm:text-[16rem] md:text-[20rem] font-bold leading-none tracking-tighter text-foreground/[0.03]">
                        404
                    </span>
                    <span className="absolute inset-0 flex items-center justify-center text-7xl sm:text-8xl md:text-9xl font-bold tracking-tight text-foreground">
                        4<span className="text-primary">0</span>4
                    </span>
                </div>

                {/* Message */}
                <div className="space-y-4 -mt-8 md:-mt-16">
                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                        Page not found
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-md mx-auto leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                    <CustomLink href="/" variant="button-brand">
                        Back to Home
                        <Arrow variant="white" className="p-1" />
                    </CustomLink>
                    <CustomLink href="/contact" variant="outline-black">
                        Contact Us
                    </CustomLink>
                </div>
            </Container>
        </Section>
    );
}
