import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ctaGold, WhatsAppLink, ctaGhostDark } from "@/components/site/Cta";
import { Reveal } from "@/components/site/Reveal";
import { TourCard } from "@/components/site/TourCard";
import { TrailLine } from "@/components/site/TrailLine";
import { blogPosts, formatPostDate, getPost } from "@/data/blog";
import { tours } from "@/data/tours";
import { absolute, breadcrumbs, jsonLd, KEYWORDS, seo, SITE_URL } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Post not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    const path = `/blog/${p.slug}`;
    const { meta, links } = seo({
      title: p.title,
      description: p.excerpt,
      path,
      image: "/og/default.jpg",
      type: "article",
      publishedTime: p.date,
      author: p.author,
      keywords: [p.title, p.category, ...KEYWORDS.core],
    });
    return {
      meta,
      links,
      scripts: [
        jsonLd(
          breadcrumbs([
            { name: "Home", path: "/" },
            { name: "Field notes", path: "/blog" },
            { name: p.title, path },
          ]),
        ),
        jsonLd({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: p.title,
          description: p.excerpt,
          url: absolute(path),
          mainEntityOfPage: { "@type": "WebPage", "@id": absolute(path) },
          datePublished: p.date,
          dateModified: p.date,
          wordCount: p.readMinutes * 200,
          articleSection: p.category,
          inLanguage: "en",
          author: {
            "@type": "Person",
            name: p.author,
            worksFor: { "@id": `${SITE_URL}/#organization` },
          },
          publisher: { "@id": `${SITE_URL}/#organization` },
        }),
      ],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const related = tours.filter((t) => post.related_tour_slugs.includes(t.slug));
  const more = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="grain-dark pb-14 pt-12">
        <div className="container-editorial">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-mist/55">
            <Link to="/" className="hover:text-mist">
              Home
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <Link to="/blog" className="hover:text-mist">
              Field notes
            </Link>
            <ChevronRight className="h-3 w-3" aria-hidden />
            <span className="text-mist/85">{post.category}</span>
          </nav>
          <h1 className="mt-6 max-w-4xl text-3xl text-mist sm:text-4xl lg:text-6xl">
            {post.title}
          </h1>
          <p className="field-note mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-mist/55">
            <span>{formatPostDate(post.date)}</span>
            <span>{post.author}</span>
            <span>{post.readMinutes} min read</span>
            <span className="text-summit">{post.category}</span>
          </p>
          <TrailLine className="mt-8 w-full" />
        </div>
      </section>

      <img
        src={post.hero_image}
        alt=""
        aria-hidden
        className="h-[38vh] w-full object-cover md:h-[52vh]"
        width={1920}
        height={1080}
      />

      <article className="py-16 md:py-20">
        <div className="container-editorial grid gap-12 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="max-w-2xl">
            <p className="border-l-2 border-summit pl-5 text-xl leading-relaxed">{post.excerpt}</p>

            <div className="mt-12 space-y-8">
              {post.body.map((block, i) => (
                <Reveal key={i} delay={0}>
                  {block.h && <h2 className="text-2xl md:text-3xl">{block.h}</h2>}
                  {"p" in block ? (
                    <p className={`${block.h ? "mt-4" : ""} leading-relaxed text-muted-foreground`}>
                      {block.p}
                    </p>
                  ) : (
                    <ul className={`${block.h ? "mt-5" : ""} space-y-2.5`}>
                      {block.list.map((li) => (
                        <li key={li} className="flex gap-3 text-sm">
                          <span className="mt-2 h-1 w-3 shrink-0 bg-summit" aria-hidden />
                          <span className="text-muted-foreground">{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              ))}
            </div>

            <p className="field-note mt-14 border-t border-border pt-6 text-muted-foreground">
              Written by {post.author}, {formatPostDate(post.date)}
            </p>
          </div>

          <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="border border-border bg-card p-6">
              <p className="field-note text-muted-foreground">Planning around this?</p>
              <p className="mt-3 text-sm">
                Send your dates and we will tell you whether the timing in this post works for them.
              </p>
              <Link to="/contact" className={`${ctaGold} mt-6 w-full`}>
                Ask a question
              </Link>
              <WhatsAppLink
                className="mt-3 block bg-primary px-4 py-3 text-center text-sm text-primary-foreground transition-colors duration-300 hover:bg-savanna"
                message={`A question about "${post.title}"`}
              >
                WhatsApp us
              </WhatsAppLink>
            </div>
          </aside>
        </div>
      </article>

      {related.length > 0 && (
        <section className="border-t border-border bg-secondary py-16">
          <div className="container-editorial">
            <p className="eyebrow">Referenced in this post</p>
            <h2 className="mt-3 text-3xl">Itineraries that match</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
              {related.map((t) => (
                <TourCard key={t.slug} tour={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="grain-dark py-16">
        <div className="container-editorial">
          <p className="eyebrow">Keep reading</p>
          <ul className="mt-8 grid gap-px bg-mist/10 md:grid-cols-3">
            {more.map((p) => (
              <li key={p.slug} className="bg-savanna">
                <Link
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="flex h-full flex-col p-6 transition-colors duration-300 hover:bg-savanna-deep"
                >
                  <span className="field-note text-summit">{p.category}</span>
                  <span className="mt-2 font-display text-xl leading-tight text-mist">
                    {p.title}
                  </span>
                  <span className="mt-3 text-xs text-mist/55">{formatPostDate(p.date)}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/blog" className={ctaGhostDark}>
              All field notes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
