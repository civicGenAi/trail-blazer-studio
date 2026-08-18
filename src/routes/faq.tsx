import { createFileRoute, Link } from "@tanstack/react-router";
import { AccordionRow } from "@/components/site/Accordion";
import { ctaGhostDark, ctaGold, WhatsAppLink } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { TrailLine } from "@/components/site/TrailLine";
import { generalFaq } from "@/data/site";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — visas, park fees, tipping and packing" },
      {
        name: "description",
        content:
          "Deposit terms, 2026 park fees, visa costs, tipping ranges, luggage limits and what to pack for a 24-degree temperature spread.",
      },
      { property: "og:title", content: "Safari FAQ" },
      {
        property: "og:description",
        content: "Thirteen questions we are asked before every trip, answered with numbers.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const total = generalFaq.reduce((n, g) => n + g.items.length, 0);

  return (
    <>
      <section className="grain-dark py-16 md:py-20">
        <div className="container-editorial">
          <p className="rise eyebrow">Frequently asked</p>
          <TrailLine className="rise-1 mt-4 w-full max-w-xs" />
          <h1 className="rise-2 mt-6 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            {total} questions we are asked <em className="font-normal italic">before every trip</em>
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-cream/70">
            Figures are current for 2026 and come from the published TANAPA and NCAA schedules. If
            something here is out of date, tell us and we will correct it.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.35fr_0.65fr]">
          <nav aria-label="FAQ sections" className="lg:sticky lg:top-28 lg:self-start">
            <p className="field-note text-muted-foreground">On this page</p>
            <ul className="mt-4 space-y-2">
              {generalFaq.map((g) => (
                <li key={g.category}>
                  <a
                    href={`#${slugify(g.category)}`}
                    className="text-sm text-foreground link-underline"
                  >
                    {g.category}{" "}
                    <span className="font-mono text-xs text-muted-foreground">
                      ({g.items.length})
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-14">
            {generalFaq.map((group) => (
              <section key={group.category} id={slugify(group.category)} className="scroll-mt-28">
                <h2 className="text-3xl">{group.category}</h2>
                <div className="mt-6 border-t border-border">
                  {group.items.map((item) => (
                    <AccordionRow key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="grain-dark py-20">
        <div className="container-editorial grid gap-8 md:grid-cols-[1.3fr_1fr] md:items-end">
          <Reveal>
            <h2 className="text-4xl text-cream md:text-5xl">Not answered here?</h2>
            <p className="mt-5 max-w-xl text-cream/70">
              Send the question. If it is a good one we will add it to this page with your first
              name on it, unless you would rather we did not.
            </p>
          </Reveal>
          <Reveal delay={80} className="flex flex-wrap gap-3 md:justify-end">
            <Link to="/contact" className={ctaGold}>
              Ask a question
            </Link>
            <WhatsAppLink className={ctaGhostDark} message="A question that isn't in your FAQ:">
              WhatsApp us
            </WhatsAppLink>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
