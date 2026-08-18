import { createFileRoute, Link } from "@tanstack/react-router";
import { ctaGhostDark, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { SectionHead, StatStrip } from "@/components/site/Section";
import { TrailLine } from "@/components/site/TrailLine";
import { bookingSteps, company, trustPoints, whyUs } from "@/data/site";
import { images } from "@/data/tours";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Arusha Wildlife Safaris — how we operate" },
      {
        name: "description",
        content:
          "An Arusha-based operator running its own vehicles and salaried guides since 2014. What we own, how we price, and how a booking works.",
      },
      { property: "og:title", content: "About Arusha Wildlife Safaris" },
      {
        property: "og:description",
        content: "Own workshop, nine Land Cruisers, guides on salary, itemised pricing.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="grain-dark pb-16 pt-16 md:pb-20 md:pt-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div>
            <p className="rise eyebrow">About us</p>
            <TrailLine className="rise-1 mt-4 w-full max-w-xs" />
            <h1 className="rise-2 mt-6 text-4xl text-cream sm:text-5xl lg:text-6xl">
              Eleven years running the same
              <br />
              <em className="font-normal italic">northern circuit</em>
            </h1>
            <p className="rise-3 mt-6 max-w-lg text-cream/70">
              We started in {company.founded} with two vehicles and one route. The company is still
              in Arusha, still owns its fleet, and still runs private trips only.
            </p>
          </div>
          <img
            src={images.serengeti}
            alt="Land Cruiser on a gravel track in the central Serengeti"
            className="rise-4 aspect-[4/3] w-full object-cover"
            width={1200}
            height={900}
          />
        </div>

        <div className="container-editorial mt-12">
          <StatStrip dark stats={trustPoints} />
        </div>
      </section>

      {/* The operating story — offset column */}
      <section className="py-20 md:py-28">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
          <Reveal>
            <p className="eyebrow">How we work</p>
            <h2 className="mt-4 text-4xl md:text-5xl">The parts most operators subcontract</h2>
          </Reveal>
          <Reveal delay={80} className="space-y-5 text-lg leading-relaxed text-muted-foreground">
            <p>
              Most Arusha companies are brokers. They sell a route, then buy the vehicle, the guide
              and the camp from whoever has capacity that week. It works until something breaks, at
              which point nobody in the chain owns the problem.
            </p>
            <p>
              We went the other way. Nine Land Cruisers, a workshop on Njiro Road, twelve guides on
              annual salary, and direct contracts with the camps we use. It costs more to hold, and
              it is the reason a broken half-shaft in the northern Serengeti is a four-hour delay
              rather than a lost day.
            </p>
            <p>
              What we do not own, we say so. Balloon flights, domestic aircraft and Zanzibar
              transfers are bought in, and they are listed as such on the itinerary.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Principles */}
      <section className="border-y border-border bg-secondary py-20">
        <div className="container-editorial">
          <Reveal>
            <SectionHead eyebrow="What that buys you" title="Four operating decisions" />
          </Reveal>
          <ol className="mt-12 grid gap-px bg-border md:grid-cols-2">
            {whyUs.map((w, i) => (
              <Reveal key={w.title} as="li" delay={(i % 2) * 80} className="bg-background p-8">
                <span className="field-note text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-4 text-2xl">{w.title}</h3>
                <p className="mt-3 text-muted-foreground">{w.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Booking process, on the trail line */}
      <section className="py-20 md:py-24">
        <div className="container-editorial">
          <Reveal>
            <SectionHead
              eyebrow="How a booking works"
              title="Four steps, no deposit until step three"
            />
          </Reveal>
          <ol className="mt-12 grid gap-10 md:grid-cols-4">
            {bookingSteps.map((s, i) => (
              <Reveal key={s.step} as="li" delay={i * 80} className="relative">
                <span className="field-note flex h-11 w-11 items-center justify-center rounded-full border border-gold/60 text-gold">
                  {s.step}
                </span>
                {i < bookingSteps.length - 1 && (
                  <span
                    className="trail-dotted-x absolute left-14 top-5 hidden w-[calc(100%-3.5rem)] md:block"
                    style={{ backgroundSize: "100% 100%" }}
                    aria-hidden
                  />
                )}
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Where we are */}
      <section className="border-t border-border bg-secondary py-20">
        <div className="container-editorial grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Where we are</p>
            <h2 className="mt-4 text-4xl">{company.address}</h2>
            <dl className="mt-8 divide-y divide-border border-y border-border">
              {[
                { k: "Coordinates", v: company.coordinates },
                { k: "Office hours", v: company.officeHours },
                { k: "Email", v: company.email },
                { k: "WhatsApp", v: company.phoneDisplay },
                { k: "Nearest airport", v: "Kilimanjaro International (JRO), 50 km" },
              ].map((r) => (
                <div
                  key={r.k}
                  className="flex flex-wrap items-baseline justify-between gap-4 py-3.5"
                >
                  <dt className="field-note text-muted-foreground">{r.k}</dt>
                  <dd className="text-sm">{r.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={80}>
            <img
              src={images.ngorongoro}
              alt="The Ngorongoro crater floor seen from the rim road"
              className="aspect-[4/3] w-full object-cover"
              width={1200}
              height={900}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      <section className="grain-dark py-20">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <Reveal>
            <h2 className="text-4xl text-cream md:text-5xl">
              Ask us something specific and we will answer specifically
            </h2>
            <p className="mt-5 max-w-xl text-cream/70">
              Vehicle age, guide tenure, which camps we hold contracts with — all fair questions,
              and all answerable in one reply.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className={ctaGold}>
              Contact us
            </Link>
            <WhatsAppLink className={ctaGhostDark} message="A question about how you operate:">
              WhatsApp us
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}
