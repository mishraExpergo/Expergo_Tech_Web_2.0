import type { Metadata } from "next";
import { BlogUnderConstruction } from "@/components/BlogUnderConstruction";

export const metadata: Metadata = {
  title: "Blog | EXPERGO",
  description: "Blog — coming soon.",
};

export default function BlogsPage() {
  return <BlogUnderConstruction />;
}
