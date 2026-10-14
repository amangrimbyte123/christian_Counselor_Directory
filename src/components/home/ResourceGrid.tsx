import Link from "next/link";
import type { Post } from "@/types";
import { PostCard } from "@/components/blog/PostCard";
import { Icon } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Misc";

export function ResourceGrid({ posts }: { posts: Post[] }) {
  const [lead, ...rest] = posts;
  if (!lead) return null;
  return (
    <section className="section bg-sand-100" aria-labelledby="resources">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6" data-reveal>
          <SectionHeading id="resources" eyebrow="Learn" title="Christian marriage resources"
            intro="Practical, plain-language guides for Christian couples on marriage, faith and getting support. General information only, not medical advice." />
          <Link href="/blog/" className="link-arrow">All articles <Icon name="arrow" className="h-4 w-4" /></Link>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          <div className="lg:col-span-3" data-reveal><PostCard post={lead} feature /></div>
          {rest.slice(0, 3).map((p) => <div key={p.slug} data-reveal><PostCard post={p} /></div>)}
        </div>
      </div>
    </section>
  );
}
