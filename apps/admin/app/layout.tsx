import { TooltipProvider } from "@swastik/ui/components/shadcn/tooltip";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const googleSansFlex = localFont({
  src: "../../../packages/ui/src/fonts/GoogleSansFlex.ttf",
  variable: "--font-googleSansFlex",
});

export const metadata: Metadata = {
  title: "Admin | Swastik Brass Components",
  description: "Admin Panel for Swastik Brass Components",
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

          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
