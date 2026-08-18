import { useState, type FormEvent } from "react";
import { Check } from "lucide-react";
import { ctaGold } from "./Cta";
import { tours } from "@/data/tours";

type Errors = Partial<Record<"name" | "email" | "message", string>>;

/**
 * Client-side enquiry form. No backend is wired yet, so submission is
 * validated and acknowledged locally, and the state text says exactly that
 * rather than implying an email was sent.
 */
export function EnquiryForm({
  compact = false,
  tourSlug,
}: {
  compact?: boolean;
  tourSlug?: string;
}) {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const next: Errors = {};
    if (name.length < 2) next.name = "Enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) next.email = "Enter a valid email address.";
    if (message.length < 10) next.message = "Tell us the dates and group size, at least a line.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(true);
    }, 400);
  }

  if (sent) {
    return (
      <div className="border border-border bg-card p-8" role="status">
        <Check className="h-6 w-6 text-primary" aria-hidden />
        <h3 className="mt-4 text-2xl">Enquiry captured</h3>
        <p className="mt-3 text-sm text-muted-foreground">
          This site is not yet connected to our booking inbox, so nothing has been emailed. Send the
          same details to book@arushawildlifesafaris.com or on WhatsApp and we will reply within one
          working day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-6 text-sm text-primary link-underline"
        >
          Write another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Name" name="name" error={errors.name} autoComplete="name" />
        <FormField
          label="Email"
          name="email"
          type="email"
          error={errors.email}
          autoComplete="email"
        />
      </div>
      <div className={compact ? "grid gap-4" : "grid gap-4 sm:grid-cols-2"}>
        <FormField label="Travel dates" name="dates" placeholder="e.g. 12–20 August 2026" />
        <FormField
          label="Adults and children"
          name="party"
          placeholder="e.g. 2 adults, 1 child (9)"
        />
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="field-note text-muted-foreground">Itinerary of interest</span>
        <select name="tour" defaultValue={tourSlug ?? ""} className="select-field">
          <option value="">Not decided yet</option>
          {tours.map((t) => (
            <option key={t.slug} value={t.slug}>
              {t.title}
            </option>
          ))}
          <option value="custom">Custom route</option>
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="field-note text-muted-foreground">What are you planning?</span>
        <textarea
          name="message"
          rows={compact ? 4 : 5}
          className="input-field"
          placeholder="Parks you want, budget per person, anything fixed in your dates."
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "err-message" : undefined}
        />
        {errors.message && (
          <span id="err-message" className="text-xs text-destructive">
            {errors.message}
          </span>
        )}
      </label>

      <button
        type="submit"
        disabled={busy}
        className={`${ctaGold} justify-self-start disabled:opacity-60`}
      >
        {busy ? "Checking your details…" : "Send enquiry"}
      </button>
      <p className="text-xs text-muted-foreground">
        We reply within one working day. No newsletter, no third-party sharing.
      </p>
    </form>
  );
}

function FormField({
  label,
  name,
  type = "text",
  error,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string | undefined;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="field-note text-muted-foreground">{label}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder ?? ""}
        autoComplete={autoComplete ?? ""}
        className="input-field"
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `err-${name}` : undefined}
      />
      {error && (
        <span id={`err-${name}`} className="text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}
