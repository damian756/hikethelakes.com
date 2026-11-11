// Enquiry types offered by the contact form and accepted by /api/contact.
// Shared by the client form and the server route; holds no addresses.
export const ENQUIRY_TYPES = [
  "General enquiry",
  "Route or data correction",
  "Advertising",
  "Press or media",
] as const;

export const DEFAULT_ENQUIRY_TYPE = "General enquiry";

export const LIMITS = { name: 200, message: 5000 } as const;

// Hidden field that people never see or fill. Bots that fill every field do.
export const HONEYPOT_FIELD = "website";

export function normaliseEnquiryType(value: unknown): string {
  return (ENQUIRY_TYPES as readonly string[]).includes(value as string)
    ? (value as string)
    : DEFAULT_ENQUIRY_TYPE;
}
