import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import LenisProvider from "@/components/providers/LenisProvider";
import TrailingCursor from "@/components/shared/TrailingCursor";
import { TooltipProvider } from "@swastik/ui/components/shadcn/tooltip";
import type { Metadata } from "next";
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${googleSansFlex.className}`}>

        <TooltipProvider>
          <LenisProvider>
            <TrailingCursor />
            <Navbar />
            <div>
              {children}
            </div>
            <Footer />
          </LenisProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
