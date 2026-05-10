import type { Metadata } from "next";

import { CareerPageContent } from "@/components/career/CareerPageContent";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "Careers | Expergo",
  description:
    "Explore career opportunities at Expergo and help build continuous portfolio risk intelligence for modern lenders.",
};

export default function CareerPage() {
  return (
    <>
      <Header />
      <CareerPageContent />
    </>
  );
}
