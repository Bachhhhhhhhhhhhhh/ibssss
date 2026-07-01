import type { Metadata } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Symbiotic Catalyst 2030 | Engma Group Global ESG Strategy",
  description:
    "Turning Talent into the Catalyst for Global Symbiosis — A proprietary ESG strategy framework for Engma Group. 2026 IBSS Bridging East and West Business Case Competition.",
  keywords: [
    "Engma Group",
    "ESG Strategy",
    "Symbiotic Catalyst Model",
    "IBSS 2026",
    "Talent Solutions",
    "Sustainability",
    "East-West Bridge",
  ],
  openGraph: {
    title: "Symbiotic Catalyst 2030 | Engma Group",
    description: "Turning Talent into the Catalyst for Global Symbiosis",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-background text-foreground antialiased selection:bg-teal/30 selection:text-sand">
        {children}
      </body>
    </html>
  );
}