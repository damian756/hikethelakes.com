// Contact form checks (11 Nov 2026). Run: npm run test:contact
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import {
  DELIVERY_EMAIL,
  FROM_EMAIL,
  buildEnquiryEmail,
  escapeHtml,
  isValidEmail,
  logSendError,
  sendEnquiryEmail,
} from "../lib/contact.ts";
import { ENQUIRY_TYPES, normaliseEnquiryType } from "../lib/contact-types.ts";

const root = new URL("..", import.meta.url);
const read = (p) => readFileSync(new URL(p, root), "utf8");
const walk = (dir) =>
  readdirSync(new URL(dir, root)).flatMap((name) => {
    const rel = join(dir, name).split(String.fromCharCode(92)).join("/");
    return statSync(new URL(rel, root)).isDirectory() ? walk(rel + "/") : [rel];
  });
const base = { name: "n", email: "e@x.co", type: "General enquiry", message: "m" };

test("the form delivers to damian@churchtownmedia.co.uk from the verified stand-in sender", () => {
  assert.equal(DELIVERY_EMAIL, "damian@churchtownmedia.co.uk");
  assert.equal(FROM_EMAIL, "Hike The Lakes <noreply@southportguide.co.uk>");
  const mail = buildEnquiryEmail(base);
  assert.deepEqual(mail.to, [DELIVERY_EMAIL]);
  assert.equal(mail.from, FROM_EMAIL);
});

test("sendEnquiryEmail reports Resend's refusal instead of hiding it", async () => {
  const calls = [];
  const ok = async (url, init) => { calls.push([url, init]); return new Response("{}", { status: 200 }); };
  assert.deepEqual(await sendEnquiryEmail("k", buildEnquiryEmail(base), ok), { error: null });
  assert.equal(calls[0][0], "https://api.resend.com/emails");
  assert.equal(calls[0][1].headers.Authorization, "Bearer k");
  assert.equal(JSON.parse(calls[0][1].body).from, FROM_EMAIL);
  const refused = async () =>
    new Response(JSON.stringify({ name: "validation_error", message: "domain not verified" }), { status: 403 });
  assert.deepEqual(await sendEnquiryEmail("k", buildEnquiryEmail(base), refused), {
    error: { name: "validation_error", message: "domain not verified" },
  });
});

test("the route checks the send result and answers ok only after it", () => {
  const src = read("app/api/contact/route.ts");
  assert.match(src, /from "@\/lib\/contact"/);
  assert.match(src, /const\s*\{\s*error\s*\}\s*=\s*await\s+sendEnquiryEmail\(key,\s*buildEnquiryEmail\(/);
  assert.match(src, /if\s*\(error\)\s*\{\s*logSendError\(error\);\s*return NextResponse\.json\([^)]*status:\s*502/);
  assert.match(src, /catch\s*\(err\)\s*\{\s*logSendError\(err\);/);
  assert.match(src, /isValidEmail\(email\)/);
  const oks = [...src.matchAll(/success:\s*true/g)].map((m) => m.index);
  assert.equal(oks.length, 2);
  assert.ok(oks[0] > src.indexOf("body[HONEYPOT_FIELD]") && oks[0] < src.indexOf("const name"), "first ok must be the honeypot answer");
  assert.ok(oks[1] > src.indexOf("logSendError(err)"), "last ok must come after the send is checked");
});

test("the client form never imports lib/contact.ts and sends what the route reads", () => {
  const cf = read("components/ContactForm.tsx");
  assert.doesNotMatch(cf, /from\s+["'](?:@\/|\.\.\/)+lib\/contact["']/);
  for (const f of ["name", "email", "type", "message"]) {
    assert.match(cf, new RegExp(`${f}: field\\("${f}"\\)`), `form does not send ${f}`);
    assert.match(read("app/api/contact/route.ts"), new RegExp(`body\\.${f}\\b`), `route does not read ${f}`);
  }
  assert.match(cf, /name=\{HONEYPOT_FIELD\}/);
  assert.equal(normaliseEnquiryType(ENQUIRY_TYPES[1]), ENQUIRY_TYPES[1]);
  assert.equal(normaliseEnquiryType("<b>x</b>"), "General enquiry");
});

test("every typed value is escaped in the html", () => {
  assert.equal(escapeHtml(`&<>"'`), "&amp;&lt;&gt;&quot;&#39;");
  const evil = "<script>x</script>&";
  for (const field of ["name", "email", "type", "message"]) {
    const html = buildEnquiryEmail({ ...base, [field]: evil }).html;
    assert.ok(!html.includes("<script>"), field + " not escaped");
    assert.ok(html.includes("&lt;script&gt;x&lt;/script&gt;&amp;"), field + " missing escaped text");
  }
  assert.ok(buildEnquiryEmail({ ...base, message: "a\nb" }).html.includes("a<br>b"));
});

test("reply_to is the enquirer's address; unsafe addresses are rejected", () => {
  assert.equal(buildEnquiryEmail({ ...base, email: "visitor@example.com" }).reply_to, "visitor@example.com");
  for (const bad of ["a@b.co, c@d.co", "a@b.co\nBcc: x@y.co", "a b@c.co", "<a@b.co>", "nodomain", "a@b", "x".repeat(250) + "@b.co"]) {
    assert.equal(isValidEmail(bad), false, bad);
    assert.equal(buildEnquiryEmail({ ...base, email: bad }).reply_to, undefined, bad);
  }
});

test("the subject has no CR or LF", () => {
  const { subject } = buildEnquiryEmail({ ...base, name: "a\r\nBcc: x", type: "b\nc" });
  assert.doesNotMatch(subject, /[\r\n]/);
});

test("logSendError logs only the error's name and message", () => {
  const calls = [];
  const orig = console.error;
  console.error = (...args) => calls.push(args);
  try {
    logSendError({ name: "validation_error", message: "domain not verified", to: "secret@x.co", body: "private text" });
  } finally {
    console.error = orig;
  }
  assert.equal(calls.length, 1);
  const out = calls[0].join(" ");
  assert.match(out, /validation_error/);
  assert.match(out, /domain not verified/);
  assert.doesNotMatch(out, /secret@x\.co|private text/);
});

test("no address of ours is printed on any page, message file or public file", () => {
  const ours = /[A-Za-z0-9._%+-]+@(?:[a-z0-9-]+\.)*(?:thelakes\.network|thelakesguide\.co\.uk|hikethelakes\.com|thelakeswildlife\.co\.uk|churchtownmedia\.co\.uk|southportguide\.co\.uk)/gi;
  const allowed = { "lib/contact.ts": ["damian@churchtownmedia.co.uk", "noreply@southportguide.co.uk"] };
  const files = [...walk("app/"), ...walk("components/"), ...walk("lib/"), ...walk("messages/"), ...walk("public/")].filter((f) =>
    /\.(ts|tsx|js|mjs|json|txt|xml|md|html)$/.test(f),
  );
  for (const f of files) {
    const src = read(f).replace(/^\s*\/\/.*$/gm, "");
    const found = (src.match(ours) ?? []).map((a) => a.toLowerCase());
    assert.deepEqual(found, allowed[f] ?? [], `${f} prints ${found.join(", ")}`);
  }
});

test("no route or helper can fall back to Resend's test sender (resend.dev)", () => {
  const files = [...walk("app/"), ...walk("lib/"), ...walk("components/")].filter((f) => /\.(ts|tsx|js|mjs)$/.test(f));
  for (const f of files) assert.ok(!read(f).replace(/^\s*\/\/.*$/gm, "").includes("resend.dev"), `${f} mentions resend.dev`);
});
