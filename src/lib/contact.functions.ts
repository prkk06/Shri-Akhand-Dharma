import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
});

const NOTIFICATION_EMAIL = "info@shriakhanddharma.org";
// Must be a sender address on a domain you verify in Resend.
const SENDER_EMAIL = "Foundation Website <contact@shriakhanddharma.org>";

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&")
    .replace(/</g, "<")
    .replace(/>/g, ">")
    .replace(/"/g, """)
    .replace(/'/g, "&#39;");
}

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // 1. Persist the submission (service role, since this is a public form).
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error: insertError } = await supabaseAdmin
      .from("contact_submissions")
      .insert({
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        subject: data.subject || null,
        message: data.message,
      });
    if (insertError) {
      console.error("contact insert failed", insertError);
      throw new Error("Could not save your message.");
    }

    // 2. Email the foundation via the Resend gateway.
    const lovableKey = process.env["LOVABLE_API_KEY"];
    const resendKey = process.env["RESEND_API_KEY"];
    const gatewayUrl = "https://connector-gateway.lovable.dev/resend/emails";

    const html = `
      <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#1f2937">
        <h2 style="color:#0f1e3d;border-bottom:2px solid#c5a572;padding-bottom:8px">New Contact Form Submission</h2>
        <p style="color:#6b7280;font-size:13px">A visitor sent a message through the Shri Akhand Dharma Foundation website.</p>
        <table style="width:100%;border-collapse:collapse;font-size:14px;margin-top:12px">
          <tr><td style="padding:6px 0;font-weight:600;width:90px">Name:</td><td style="padding:6px 0">${escapeHtml(data.name)}</td></tr>
          <tr><td style="padding:6px 0;font-weight:600">Email:</td><td style="padding:6px 0"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></td></tr>
          ${data.phone ? `<tr><td style="padding:6px 0;font-weight:600">Phone:</td><td style="padding:6px 0">${escapeHtml(data.phone)}</td></tr>` : ""}
          ${data.subject ? `<tr><td style="padding:6px 0;font-weight:600">Subject:</td><td style="padding:6px 0">${escapeHtml(data.subject)}</td></tr>` : ""}
        </table>
        <h3 style="font-size:14px;margin-top:18px;color:#0f1e3d">Message</h3>
        <p style="background:#f7f4ee;border-left:3px solid#c5a572;padding:12px 14px;white-space:pre-wrap">${escapeHtml(data.message)}</p>
        <p style="margin-top:24px;font-size:12px;color:#9ca3af">This message was submitted from the contact form on shriakhanddharmatrust.org</p>
      </div>`;

    if (lovableKey && resendKey) {
      try {
        const res = await fetch(gatewayUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": resendKey,
          },
          body: JSON.stringify({
            from: SENDER_EMAIL,
            to: [NOTIFICATION_EMAIL],
            subject: data.subject
              ? `Website enquiry: ${data.subject}`
              : `Website enquiry from ${data.name}`,
            html,
            reply_to: data.email,
          }),
        });
        if (!res.ok) {
          const errBody = await res.text();
          console.error(`Resend send failed [${res.status}]: ${errBody}`);
        }
      } catch (err) {
        console.error("Resend send error", err);
      }
    } else {
      console.error("Missing RESEND_API_KEY or LOVABLE_API_KEY; email not sent.");
    }

    return { ok: true };
  });
