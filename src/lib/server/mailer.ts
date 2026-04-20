import type { BookDemoInput } from "@/lib/server/backend";

type SmtpTransportOptions = {
  host: string;
  port: number;
  secure: boolean;
  auth?: {
    user: string;
    pass: string;
  };
};

type MailMessage = {
  from: string;
  to: string;
  replyTo?: string;
  subject: string;
  text: string;
  html: string;
};

type NodemailerModule = {
  createTransport: (options: SmtpTransportOptions) => {
    sendMail: (message: MailMessage) => Promise<unknown>;
  };
};

const REQUIRED_SMTP_KEYS = ["SMTP_HOST", "SMTP_FROM", "COMPANY_DEMO_EMAIL"] as const;

function env(name: string) {
  return process.env[name]?.trim();
}

function isMailerConfigured() {
  return REQUIRED_SMTP_KEYS.every((key) => Boolean(env(key)));
}

function parseBoolean(value: string | undefined, fallback: boolean) {
  if (!value) return fallback;
  return ["1", "true", "yes"].includes(value.toLowerCase());
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function loadNodemailer(): Promise<NodemailerModule> {
  try {
    const dynamicImport = new Function("specifier", "return import(specifier)") as (
      specifier: string
    ) => Promise<NodemailerModule & { default?: NodemailerModule }>;
    const nodemailerModule = await dynamicImport("nodemailer");
    return nodemailerModule.default ?? nodemailerModule;
  } catch {
    throw new Error(
      "Nodemailer is not installed. Run `npm install nodemailer @types/nodemailer`."
    );
  }
}

async function createTransport() {
  const host = env("SMTP_HOST");
  const from = env("SMTP_FROM");
  const companyEmail = env("COMPANY_DEMO_EMAIL");

  if (!host || !from || !companyEmail) {
    const missing = REQUIRED_SMTP_KEYS.filter((key) => !env(key)).join(", ");
    throw new Error(`Email is not configured. Missing: ${missing}.`);
  }

  const port = Number(env("SMTP_PORT") ?? 587);
  const user = env("SMTP_USER");
  const pass = env("SMTP_PASS");
  const secure = parseBoolean(env("SMTP_SECURE"), port === 465);
  const nodemailer = await loadNodemailer();

  return {
    companyEmail,
    from,
    transporter: nodemailer.createTransport({
      host,
      port,
      secure,
      auth: user && pass ? { user, pass } : undefined,
    }),
  };
}

function leadRows(input: BookDemoInput) {
  return [
    ["Name", input.fullName],
    ["Work email", input.workEmail],
    ["Company", input.companyName],
    ["Phone", input.phone],
    ["Country", input.country],
    ["Industry", input.industry],
    ["Interest", input.useCase],
    ["Project context", input.projectDetails || "Not shared"],
    ["Source", input.source],
  ] as const;
}

function requestLabel(input: BookDemoInput) {
  return input.source.toLowerCase().includes("executive")
    ? "Executive Brief Request"
    : "Book Demo Request";
}

function companyEmailHtml(input: BookDemoInput) {
  const rows = leadRows(input)
    .map(
      ([label, value]) => `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#4b5563;font-weight:600;">${escapeHtml(
            label
          )}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #e5e7eb;color:#111827;">${escapeHtml(
            value
          )}</td>
        </tr>`
    )
    .join("");

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.5;">
      <h2 style="margin:0 0 12px;color:#111827;">New ${requestLabel(input)}</h2>
      <p style="margin:0 0 16px;">A new prospect submitted the ${requestLabel(input)} form.</p>
      <table style="border-collapse:collapse;width:100%;max-width:640px;border:1px solid #e5e7eb;">
        ${rows}
      </table>
    </div>
  `;
}

function userEmailHtml(input: BookDemoInput) {
  const label = requestLabel(input).toLowerCase();

  return `
    <div style="font-family:Arial,sans-serif;color:#111827;line-height:1.6;">
      <h2 style="margin:0 0 12px;color:#111827;">Thanks for your request</h2>
      <p style="margin:0 0 12px;">Hi ${escapeHtml(input.fullName)},</p>
      <p style="margin:0 0 12px;">
        We received your ${escapeHtml(label)} for ${escapeHtml(input.companyName)}. Our team will review your details and contact you shortly.
      </p>
      <p style="margin:0 0 12px;">
        Interest shared: <strong>${escapeHtml(input.useCase)}</strong>
      </p>
      <p style="margin:20px 0 0;">Regards,<br />EarlySafe Team</p>
    </div>
  `;
}

function companyEmailText(input: BookDemoInput) {
  return [
    `New ${requestLabel(input)}`,
    "",
    ...leadRows(input).map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
}

function userEmailText(input: BookDemoInput) {
  const label = requestLabel(input).toLowerCase();

  return [
    `Hi ${input.fullName},`,
    "",
    `We received your ${label} for ${input.companyName}. Our team will review your details and contact you shortly.`,
    "",
    `Interest shared: ${input.useCase}`,
    "",
    "Regards,",
    "EarlySafe Team",
  ].join("\n");
}

export async function sendBookDemoEmails(input: BookDemoInput) {
  if (!isMailerConfigured()) {
    if (process.env.NODE_ENV === "production") {
      await createTransport();
    }

    console.warn("[book-demo] SMTP email is not configured; skipping emails.");
    return;
  }

  const { companyEmail, from, transporter } = await createTransport();

  await Promise.all([
    transporter.sendMail({
      from,
      to: input.workEmail,
      replyTo: companyEmail,
      subject: `Your EarlySafe ${requestLabel(input).toLowerCase()} is confirmed`,
      text: userEmailText(input),
      html: userEmailHtml(input),
    }),
    transporter.sendMail({
      from,
      to: companyEmail,
      replyTo: input.workEmail,
      subject: `New ${requestLabel(input).toLowerCase()} from ${input.companyName}`,
      text: companyEmailText(input),
      html: companyEmailHtml(input),
    }),
  ]);
}
