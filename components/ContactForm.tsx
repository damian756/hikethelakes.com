"use client";

import { useState, type FormEvent } from "react";
import { ENQUIRY_TYPES, HONEYPOT_FIELD } from "@/lib/contact-types";

export type ContactFormLabels = {
  formTitle: string;
  nameLabel: string;
  emailLabel: string;
  typeLabel: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendButton: string;
  sending: string;
  sentTitle: string;
  sentText: string;
  sendAnother: string;
  errorNetwork: string;
};

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full rounded-lg border border-[#D2D8CF] bg-[#F5F7F4] px-4 py-3 text-sm text-[#0E1C14] placeholder:text-[#3C4E42]/40 focus:outline-none focus:border-[#1A4A30] focus:ring-2 focus:ring-[#1A4A30]/15 transition";
const labelClass = "block text-xs font-semibold text-[#0E1C14] mb-1.5";

export default function ContactForm({ labels }: { labels: ContactFormLabels }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const field = (n: string) => (form.elements.namedItem(n) as HTMLInputElement | null)?.value ?? "";
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: field("name"),
          email: field("email"),
          type: field("type"),
          message: field("message"),
          [HONEYPOT_FIELD]: field(HONEYPOT_FIELD),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrorMsg(data.error ?? labels.errorNetwork);
        setStatus("error");
        return;
      }
      form.reset();
      setStatus("success");
    } catch {
      setErrorMsg(labels.errorNetwork);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-6">
        <h2 className="font-display text-2xl font-bold text-[#0E1C14] mb-2">{labels.sentTitle}</h2>
        <p className="text-sm text-[#3C4E42]/70 mb-5">{labels.sentText}</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm font-semibold text-[#1A4A30] hover:text-[#9E762A] transition-colors"
        >
          {labels.sendAnother}
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" onSubmit={handleSubmit} className="relative space-y-5">
      <h2 className="font-display text-2xl font-bold text-[#0E1C14]">{labels.formTitle}</h2>

      {/* Honeypot: hidden from people and screen readers; bots fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label>
          Website
          <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cf-name" className={labelClass}>
            {labels.nameLabel} <span className="text-[#9E762A]">*</span>
          </label>
          <input id="cf-name" name="name" type="text" required maxLength={200} autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>
            {labels.emailLabel} <span className="text-[#9E762A]">*</span>
          </label>
          <input id="cf-email" name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} />
        </div>
      </div>

      <div>
        <label htmlFor="cf-type" className={labelClass}>
          {labels.typeLabel}
        </label>
        <select id="cf-type" name="type" defaultValue={ENQUIRY_TYPES[0]} className={inputClass}>
          {ENQUIRY_TYPES.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>
          {labels.messageLabel} <span className="text-[#9E762A]">*</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={6}
          maxLength={5000}
          placeholder={labels.messagePlaceholder}
          className={`${inputClass} resize-y min-h-[140px]`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center bg-[#1A4A30] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#2A6A45] disabled:opacity-60 transition-colors text-sm w-full sm:w-auto"
      >
        {status === "sending" ? labels.sending : labels.sendButton}
      </button>
    </form>
  );
}
