// import type { Metadata } from "next";
// import { Inter, Poppins } from "next/font/google";
// import Script from "next/script";
// import { CookieBanner } from "@/components/CookieBanner";
// import { Footer } from "@/components/Footer";
// import { Providers } from "@/components/Providers";
// import "./globals.css";

// const GA_MEASUREMENT_ID = "G-GCR6CDJSMK";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   display: "swap",
// });

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-poppins",
//   display: "swap",
//   weight: ["400", "500", "600", "700", "800", "900"],
//   adjustFontFallback: true,
// });

// export const metadata: Metadata = {
//   title: "EXPERGO — Continuous Portfolio Risk Control",
//   description:
//     "From periodic risk monitoring to continuous portfolio intelligence for institutional lenders.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html
//       lang="en"
//       className={`${inter.variable} ${poppins.variable}`}
//     >
//       <body className={`${inter.className} font-sans`}>
//         <Script
//           src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
//           strategy="afterInteractive"
//         />
//         <Script id="google-analytics" strategy="afterInteractive">
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${GA_MEASUREMENT_ID}');
//           `}
//         </Script>
//         <Providers>
//           {children}
//           <Footer />
//         </Providers>
//         <CookieBanner />
//       </body>
//     </html>
//   );
// }



import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Suspense } from "react";
// import { GoogleAnalytics } from "@next/third-parties/google";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { CookieBanner } from "@/components/CookieBanner";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/Providers";
import GoogleAnalyticsTracker from "@/components/GoogleAnalyticsTracker";

import "./globals.css";

const GA_MEASUREMENT_ID = "G-GCR6CDJSMK";

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
        <AntdRegistry>
          <Providers>
            <Suspense fallback={null}>
              <GoogleAnalyticsTracker />
            </Suspense>
            {children}
            <Footer />
          </Providers>

          <CookieBanner />
        </AntdRegistry>
      </body>
    </html>
  );
}