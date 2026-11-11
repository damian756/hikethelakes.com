import { NextRequest, NextResponse } from "next/server";
import {
  buildEnquiryEmail,
  isValidEmail,
  logSendError,
  sendEnquiryEmail,
} from "@/lib/contact";
import { HONEYPOT_FIELD, LIMITS, normaliseEnquiryType } from "@/lib/contact-types";

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");
const FAILED = "Sorry, your message could not be sent. Please try again later.";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // A filled honeypot means a bot: answer as if sent, send nothing.
  if (str(body[HONEYPOT_FIELD])) {
    return NextResponse.json({ success: true });
  }

  const name = str(body.name);
  const email = str(body.email);
  const message = str(body.message);
  const type = normaliseEnquiryType(body.type);

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email and message are required." }, { status: 400 });
  }
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (name.length > LIMITS.name) {
    return NextResponse.json({ error: "Name is too long." }, { status: 400 });
  }
  if (message.length > LIMITS.message) {
    return NextResponse.json({ error: `Message is too long (max ${LIMITS.message} characters).` }, { status: 400 });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    logSendError({ name: "ConfigError", message: "RESEND_API_KEY is not set" });
    return NextResponse.json({ error: FAILED }, { status: 502 });
  }

  try {
    const { error } = await sendEnquiryEmail(key, buildEnquiryEmail({ name, email, type, message }));
    if (error) {
      logSendError(error);
      return NextResponse.json({ error: FAILED }, { status: 502 });
    }
  } catch (err) {
    logSendError(err);
    return NextResponse.json({ error: FAILED }, { status: 502 });
  }

  return NextResponse.json({ success: true });
}
