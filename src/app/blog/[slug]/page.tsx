import type { Metadata } from "next";
import { BlogUnderConstruction } from "@/components/BlogUnderConstruction";

export const metadata: Metadata = {
  title: "Blog | EXPERGO",
  description: "Blog article — coming soon.",
};

export default function BlogDetailPage() {
  return <BlogUnderConstruction />;
}
