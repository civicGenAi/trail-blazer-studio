import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { ctaGhostLight, WhatsAppLink } from "@/components/site/Cta";
import { EnquiryForm } from "@/components/site/EnquiryForm";
import { Reveal } from "@/components/site/Reveal";
import { TrailLine } from "@/components/site/TrailLine";
import { enquiryBenefits } from "@/data/destinations";
import { bookingSteps, company } from "@/data/site";
import { breadcrumbs, jsonLd, KEYWORDS, seo, SITE_NAME, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => {
    const { meta, links } = seo({
      title: "Plan Your Tanzania Safari",
      description:
        "Send your dates and group size for a day-by-day draft with named lodges, drive times and an itemised price. We reply within one working day.",
      path: "/contact",
      image: "/og/contact.jpg",
      keywords: [
        ...KEYWORDS.brand,
        "book a Tanzania safari",
        "safari enquiry Arusha",
        "custom safari quote",
      ],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" },
          ]),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "TravelAgency",
            name: SITE_NAME,
            email: company.email,
            telephone: "+255700000000",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Njiro Road",
              addressLocality: "Arusha",
              addressCountry: "TZ",
            },
          },
        }),
      ],
    };
  },
  component: ContactPage,
});

function ContactPage() {
  return (
    <>
      <section className="grain-dark py-16 md:py-20">
        <div className="container-editorial">
          <p className="rise eyebrow">Contact</p>
          <TrailLine className="rise-1 mt-4 w-full max-w-xs" />
          <h1 className="rise-2 mt-6 max-w-3xl text-4xl text-mist sm:text-5xl lg:text-6xl">
            Send dates and group size.{" "}
            <em className="font-normal italic">That is enough to start.</em>
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-mist/70">
            You get a day-by-day draft with named lodges, drive times and an itemised price. Two
            rounds of changes are included and nothing is payable until you confirm.
          </p>

          <dl className="rise-4 mt-12 grid gap-px bg-mist/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: <Mail className="h-4 w-4" />, k: "Email", v: company.email },
              {
                icon: <MessageCircle className="h-4 w-4" />,
                k: "WhatsApp",
                v: company.phoneDisplay,
              },
              { icon: <Clock className="h-4 w-4" />, k: "Office hours", v: company.officeHours },
              { icon: <MapPin className="h-4 w-4" />, k: "Office", v: company.address },
            ].map((c) => (
              <div key={c.k} className="bg-savanna p-6">
                <dt className="field-note flex items-center gap-2 text-mist/50">
                  <span className="text-summit">{c.icon}</span>
                  {c.k}
                </dt>
                <dd className="mt-2.5 text-sm text-mist">{c.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-editorial grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <h2 className="text-3xl md:text-4xl">Enquiry</h2>
            <p className="mt-3 max-w-xl text-muted-foreground">
              Everything except name, email and a line about your plans is optional. The more you
              give us, the closer the first draft lands.
            </p>
            <div className="mt-9">
              <EnquiryForm />
            </div>
          </Reveal>

          <Reveal delay={90} className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card p-7">
              <h2 className="text-2xl">What happens next</h2>
              <ol className="mt-6 space-y-6">
                {bookingSteps.map((s) => (
                  <li key={s.step} className="flex gap-4">
                    <span className="field-note flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-summit/60 text-summit">
                      {s.step}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-base">{s.title}</span>
                      <span className="mt-1.5 block text-sm text-muted-foreground">{s.body}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <ul className="mt-8 space-y-2.5 border-t border-border pt-6 text-sm">
                {enquiryBenefits.map((b) => (
                  <li key={b} className="flex gap-3">
                    <span className="mt-2 h-1 w-3 shrink-0 bg-summit" aria-hidden />
                    {b}
                  </li>
                ))}
              </ul>
              <WhatsAppLink
                className={`${ctaGhostLight} mt-7 w-full`}
                message="Hello, I'd like to plan a Tanzania safari."
              >
                Prefer WhatsApp? Message us
              </WhatsAppLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
