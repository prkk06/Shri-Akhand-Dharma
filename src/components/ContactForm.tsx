import { useState } from "react";
import { z } from "zod";
import { Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useServerFn } from "@tanstack/react-start";
import { submitContactForm } from "@/lib/contact.functions";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+\-()\s]*$/, "Enter a valid phone number")
    .optional()
    .or(z.literal("")),
  subject: z.string().trim().max(160).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000),
});

type FormValues = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormValues, string>>;

const initial: FormValues = { name: "", email: "", phone: "", subject: "", message: "" };

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>(initial);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const submitFn = useServerFn(submitContactForm);

  const update = <K extends keyof FormValues>(key: K, v: FormValues[K]) => {
    setValues((p) => ({ ...p, [key]: v }));
    if (errors[key]) setErrors((p) => ({ ...p, [key]: undefined }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Errors = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormValues;
        if (!fieldErrors[k]) fieldErrors[k] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setSubmitting(true);
    try {
      await submitFn({ data: parsed.data });
      toast.success("Thank you — your message has been received.");
      setValues(initial);
    } catch (err) {
      console.error(err);
      toast.error("Could not send your message. Please try again shortly.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full rounded-md border border-navy/15 bg-card px-4 py-3 text-sm text-navy placeholder:text-charcoal/40 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold transition";

  return (
    <form onSubmit={onSubmit} noValidate className="text-left space-y-5">
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className="block text-xs uppercase tracking-[0.2em] text-navy/70 mb-2">
            Name <span className="text-copper">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            value={values.name}
            onChange={(e) => update("name", e.target.value)}
            className={inputCls}
            placeholder="Your full name"
            maxLength={120}
            required
          />
          {errors.name && <p className="mt-1.5 text-xs text-copper">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="cf-email" className="block text-xs uppercase tracking-[0.2em] text-navy/70 mb-2">
            Email <span className="text-copper">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            value={values.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputCls}
            placeholder="you@example.com"
            maxLength={255}
            required
          />
          {errors.email && <p className="mt-1.5 text-xs text-copper">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="cf-phone" className="block text-xs uppercase tracking-[0.2em] text-navy/70 mb-2">
            Phone
          </label>
          <input
            id="cf-phone"
            type="tel"
            value={values.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputCls}
            placeholder="+91 …"
            maxLength={30}
          />
          {errors.phone && <p className="mt-1.5 text-xs text-copper">{errors.phone}</p>}
        </div>
        <div>
          <label htmlFor="cf-subject" className="block text-xs uppercase tracking-[0.2em] text-navy/70 mb-2">
            Subject
          </label>
          <input
            id="cf-subject"
            type="text"
            value={values.subject}
            onChange={(e) => update("subject", e.target.value)}
            className={inputCls}
            placeholder="How can we help?"
            maxLength={160}
          />
          {errors.subject && <p className="mt-1.5 text-xs text-copper">{errors.subject}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="cf-message" className="block text-xs uppercase tracking-[0.2em] text-navy/70 mb-2">
          Message <span className="text-copper">*</span>
        </label>
        <textarea
          id="cf-message"
          rows={6}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputCls} resize-y min-h-[140px]`}
          placeholder="Share your thoughts, proposal or enquiry…"
          maxLength={5000}
          required
        />
        <div className="mt-1.5 flex justify-between text-xs">
          <span className="text-copper">{errors.message}</span>
          <span className="text-charcoal/50">{values.message.length}/5000</span>
        </div>
      </div>
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-navy text-navy-foreground font-medium hover:bg-navy/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending…
            </>
          ) : (
            <>
              Send Message <Send size={16} />
            </>
          )}
        </button>
        <p className="mt-3 text-xs text-charcoal/60">
          Your details remain private and are used solely to respond to your enquiry.
        </p>
      </div>
    </form>
  );
}
