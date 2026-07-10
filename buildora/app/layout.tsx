import type { Metadata } from "next";
import { Instrument_Serif, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Buildora Developments — Building Spaces That Define Tomorrow",
  description:
    "Buildora Developments designs, builds, sells, maintains and transforms exceptional properties — from luxury residential construction to full facility management.",
  keywords: [
    "Buildora Developments",
    "luxury real estate",
    "property development",
    "residential construction",
    "facility management",
    "refurbishment",
  ],
  openGraph: {
    title: "Buildora Developments — Building Spaces That Define Tomorrow",
    description:
      "We design, build, sell, maintain, and transform exceptional properties.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="bg-stone text-ink font-body antialiased selection:bg-bronze/25 selection:text-ink">
        <CustomCursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
