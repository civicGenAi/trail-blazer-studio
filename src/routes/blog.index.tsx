import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/site/Reveal";
import { TrailLine } from "@/components/site/TrailLine";
import { blogCategories, blogPosts, formatPostDate } from "@/data/blog";
import { breadcrumbs, jsonLd, KEYWORDS, seo, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/")({
  head: () => {
    const { meta, links } = seo({
      title: "Tanzania Safari Field Notes",
      description:
        "When the Mara crossings actually happen, what Tanzania park fees cost in 2026, and whether the extra night on Machame is worth paying for.",
      path: "/blog",
      image: "/og/default.jpg",
      keywords: [
        ...KEYWORDS.core,
        "Tanzania safari blog",
        "when to visit Serengeti",
        "safari planning guide",
      ],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Field notes", path: "/blog" },
          ]),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Field notes",
          url: `${SITE_URL}/blog`,
          publisher: { "@id": `${SITE_URL}/#organization` },
          blogPost: blogPosts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `${SITE_URL}/blog/${p.slug}`,
            datePublished: p.date,
            author: { "@type": "Person", name: p.author },
          })),
        }),
      ],
    };
  },
  component: BlogIndex,
});

function BlogIndex() {
  const [category, setCategory] = useState<string>("All");
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const shown = posts.filter((p) => category === "All" || p.category === category);
  const lead = shown[0];
  const rest = shown.slice(1);

  return (
    <>
      <section className="grain-dark py-16">
        <div className="container-editorial">
          <p className="rise eyebrow">Field notes</p>
          <TrailLine className="rise-1 mt-4 w-full max-w-xs" />
          <h1 className="rise-2 mt-6 max-w-3xl text-4xl text-cream sm:text-5xl lg:text-6xl">
            What we learned <em className="font-normal italic">running the route</em>
          </h1>
          <p className="rise-3 mt-6 max-w-xl text-cream/70">
            Written from our own trip logs. Where a post quotes a success rate or a crossing
            frequency, the departures it is drawn from are named.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-secondary py-5">
        <div className="container-editorial">
          <ul className="flex flex-wrap gap-2">
            {blogCategories.map((c) => (
              <li key={c}>
                <button
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={`border px-4 py-2 text-sm transition-colors duration-300 ${
                    category === c
                      ? "border-gold text-gold"
                      : "border-border text-muted-foreground hover:border-primary"
                  }`}
                >
                  {c}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container-editorial">
          {shown.length === 0 ? (
            <p className="text-muted-foreground">No posts in this category yet.</p>
          ) : (
            <>
              {lead && (
                <Reveal>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: lead.slug }}
                    className="group grid gap-8 border-b border-border pb-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={lead.hero_image}
                        alt=""
                        className="img-zoom-slow aspect-[16/10] w-full object-cover"
                        width={1200}
                        height={750}
                      />
                    </div>
                    <div>
                      <p className="field-note text-gold">
                        Latest · {lead.category} · {lead.readMinutes} min
                      </p>
                      <h2 className="mt-4 text-4xl md:text-5xl">{lead.title}</h2>
                      <p className="mt-5 max-w-xl text-muted-foreground">{lead.excerpt}</p>
                      <p className="field-note mt-6 text-muted-foreground">
                        {formatPostDate(lead.date)} · {lead.author}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm text-primary">
                        Read the post <ArrowRight className="h-4 w-4" aria-hidden />
                      </span>
                    </div>
                  </Link>
                </Reveal>
              )}

              <div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                {rest.map((p, i) => (
                  <Reveal
                    key={p.slug}
                    as="article"
                    delay={(i % 3) * 80}
                    className="group flex flex-col"
                  >
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="flex h-full flex-col"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={p.hero_image}
                          alt=""
                          className="img-zoom-slow aspect-[4/3] w-full object-cover"
                          width={1200}
                          height={900}
                          loading="lazy"
                        />
                      </div>
                      <p className="field-note mt-5 text-muted-foreground">
                        {p.category} · {p.readMinutes} min
                      </p>
                      <h3 className="mt-3 text-2xl group-hover:text-primary">{p.title}</h3>
                      <p className="mt-3 flex-1 text-sm text-muted-foreground">{p.excerpt}</p>
                      <p className="field-note mt-5 border-t border-border pt-4 text-muted-foreground">
                        {formatPostDate(p.date)}
                      </p>
                    </Link>
                  </Reveal>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
