import type { Metadata } from "next";
import { Inter, Poppins, Roboto } from "next/font/google";
import { CookieBanner } from "@/components/CookieBanner";
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
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
  weight: ["100", "300", "400", "500", "700", "900"],
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
      className={`${inter.variable} ${poppins.variable} ${roboto.variable}`}
    >
      <body className={`${inter.className} font-sans`}>
        <Providers>{children}</Providers>
        <CookieBanner />
      </body>
    </html>
  );
}
