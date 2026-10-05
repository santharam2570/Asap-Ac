"use client";

import { useState, type FormEvent } from "react";
import { Icon } from "@/components/ui/Icon";
import { buttonClasses } from "@/components/ui/Button";
import { submitEnquiry, type EnquiryPayload } from "@/lib/api";

interface EnquiryFormProps {
  courseOptions: { slug: string; title: string }[];
  defaultCourse?: string;
  source?: EnquiryPayload["source"];
  compact?: boolean;
}

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-400 transition focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none";

export function EnquiryForm({ courseOptions, defaultCourse, source = "contact", compact }: EnquiryFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const phone = String(data.get("phone") ?? "").replace(/\s+/g, "");

    if (!/^\+?\d{10,13}$/.test(phone)) {
      setStatus("error");
      setError("Please enter a valid phone number.");
      return;
    }

    setStatus("submitting");
    setError("");
    try {
      await submitEnquiry({
        name: String(data.get("name")).trim(),
        email: String(data.get("email")).trim(),
        phone,
        course: String(data.get("course") ?? "") || undefined,
        mode: String(data.get("mode") ?? "") || undefined,
        message: String(data.get("message") ?? "").trim() || undefined,
        source,
      });
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-2xl bg-brand-50 p-8 text-center">
        <span className="mx-auto flex size-14 items-center justify-center rounded-full bg-brand-600 text-white">
          <Icon name="check" className="size-7" strokeWidth={2.5} />
        </span>
        <h3 className="mt-5 text-xl font-bold">Thank you!</h3>
        <p className="mt-2 text-sm text-ink-600">
          We&apos;ve received your enquiry. Our counsellor will contact you within 24 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-5 text-sm font-semibold text-brand-600 hover:underline"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Full name">
          <input name="name" required minLength={2} autoComplete="name" placeholder="Your name" className={inputClass} />
        </Field>
        <Field label="Phone">
          <input
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98xxx xxxxx"
            className={inputClass}
          />
        </Field>
      </div>
      <Field label="Email">
        <input
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className={inputClass}
        />
      </Field>
      <div className={compact ? "space-y-4" : "grid gap-4 sm:grid-cols-2"}>
        <Field label="Interested course">
          <select name="course" defaultValue={defaultCourse ?? ""} className={inputClass}>
            <option value="">Not sure yet – need guidance</option>
            {courseOptions.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.title}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Preferred mode">
          <select name="mode" defaultValue="online" className={inputClass}>
            <option value="online">Live online</option>
            <option value="classroom">Classroom</option>
            <option value="weekend">Weekend batch</option>
            <option value="corporate">Corporate training</option>
          </select>
        </Field>
      </div>
      {!compact && (
        <Field label="Message (optional)">
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your background or questions…"
            className={inputClass}
          />
        </Field>
      )}

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className={buttonClasses("primary", "lg", "w-full")}
      >
        {status === "submitting" ? "Sending…" : "Request a Call Back"}
        {status !== "submitting" && <Icon name="arrowRight" className="size-5" />}
      </button>
      <p className="text-center text-xs text-ink-400">We respect your privacy. No spam, ever.</p>
    </form>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-ink-700">{label}</span>
      {children}
    </label>
  );
}
