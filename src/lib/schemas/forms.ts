import { z } from "zod";

/** Must match `COMPANY_SIZES` in BookDemoModal (en dash in ranges). */
const companySizes = ["1–10", "11–50", "51–200", "201–500"] as const;

export const demoRequestSchema = z.object({
  fullName: z.string().trim().min(1, "Full name is required").max(200),
  workEmail: z.string().trim().email("Valid work email required").max(320),
  companyName: z.string().trim().min(1, "Company name is required").max(200),
  phone: z.string().trim().min(1, "Phone is required").max(40),
  companySize: z.enum(companySizes, { message: "Select company size" }),
  industry: z.string().trim().min(1, "Select industry").max(120),
  useCase: z.string().trim().min(1, "Select use case").max(200),
});

export type DemoRequestInput = z.infer<typeof demoRequestSchema>;

export const newsletterSchema = z.object({
  email: z.string().trim().email("Valid email required").max(320),
  /** Optional segment for analytics / CRM (e.g. footer variant). */
  source: z.string().trim().max(64).optional(),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
