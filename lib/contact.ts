// Contact form mail for Hike The Lakes. Server-only: never import this from a
// client component, or the delivery address ends up in the browser bundle.

// Where every contact form message goes. Damian, 11 Nov 2026: the Lakes
// network sites show no email address; all enquiries go to this one inbox.
export const DELIVERY_EMAIL = "damian@churchtownmedia.co.uk";

// Sender. hikethelakes.com has no MX and no Resend DNS records, so mail sent
// FROM it fails. Southport Guide's domain is verified in Resend, so we send
// from its noreply address under this site's own name. Change this once
// hikethelakes.com is verified in Resend.
export const FROM_EMAIL = "Hike The Lakes <noreply@southportguide.co.uk>";

const RESEND_URL = "https://api.resend.com/emails";

const EMAIL_RE = /^[^\s@<>,;"]+@[^\s@<>,;"]+\.[^\s@<>,;"]+$/;

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && value.length <= 254 && EMAIL_RE.test(value);
}

export function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const oneLine = (value: unknown) => String(value ?? "").replace(/[\r\n]+/g, " ").trim();

export function buildEnquiryEmail(input: { name: string; email: string; type: string; message: string }) {
  return {
    from: FROM_EMAIL,
    to: [DELIVERY_EMAIL],
    reply_to: isValidEmail(input.email) ? input.email : undefined,
    subject: `[Hike The Lakes] ${oneLine(input.type)} from ${oneLine(input.name)}`,
    html:
      `<p><strong>Site:</strong> Hike The Lakes (hikethelakes.com/contact)</p>` +
      `<p><strong>Name:</strong> ${escapeHtml(input.name)}</p>` +
      `<p><strong>Email:</strong> ${escapeHtml(input.email)}</p>` +
      `<p><strong>Enquiry type:</strong> ${escapeHtml(input.type)}</p>` +
      `<p><strong>Message:</strong><br>${escapeHtml(input.message).replace(/\r?\n/g, "<br>")}</p>` +
      `<p>Reply to this email to answer the enquirer.</p>`,
  };
}

// Sends through Resend's HTTP API (no SDK dependency on this site).
// Returns { error } like the Resend SDK: null when Resend accepted the mail.
export async function sendEnquiryEmail(
  apiKey: string,
  mail: ReturnType<typeof buildEnquiryEmail>,
  fetchImpl: typeof fetch = fetch,
): Promise<{ error: { name: string; message: string } | null }> {
  const res = await fetchImpl(RESEND_URL, {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify(mail),
  });
  if (res.ok) return { error: null };
  const body = (await res.json().catch(() => ({}))) as { name?: string; message?: string };
  return { error: { name: body.name ?? `http_${res.status}`, message: body.message ?? res.statusText } };
}

// Logs the error's name and message only: never the enquirer's details.
export function logSendError(error: unknown) {
  const e = (error ?? {}) as { name?: unknown; message?: unknown };
  console.error("Contact email failed:", String(e.name ?? "Error"), String(e.message ?? ""));
}
