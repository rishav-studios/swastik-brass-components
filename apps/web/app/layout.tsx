import { PageTransitionOverlay } from "@/components/animations/transitions/PageTransitionOverlay";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import LenisProvider from "@/components/providers/LenisProvider";
import { PageTransitionProvider } from "@/components/providers/PageTransitionProvider";
import TrailingCursor from "@/components/shared/TrailingCursor";
import { TooltipProvider } from "@swastik/ui/components/shadcn/tooltip";
import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import localFont from "next/font/local";
import "./globals.css";

const googleSansFlex = localFont({
  src: "../../../packages/ui/src/fonts/GoogleSansFlex.ttf",
  variable: "--font-googleSansFlex",
});

export const metadata: Metadata = {
  title: "swastik brass components",
  description: "swastik brass components",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${googleSansFlex.className}`}>

        <TooltipProvider>
          <ViewTransitions>
            <PageTransitionProvider>
              <LenisProvider>
                <PageTransitionOverlay />
                <TrailingCursor />
                {/* <FirstLoaderAnimation /> */}
                <Navbar />
                <div>
                  {children}
                </div>
                <Footer />
              </LenisProvider>
            </PageTransitionProvider>
          </ViewTransitions>
        </TooltipProvider>
      </body>
    </html>
  );
}
