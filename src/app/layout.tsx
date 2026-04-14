import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "EXPERGO — Continuous Portfolio Risk Control",
  description:
    "From periodic risk monitoring to continuous portfolio intelligence for institutional lenders.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable}`}
    >
      <body className={`${inter.className} font-sans`}>
        <Providers>
          {children}
          <Footer />
        </Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
