import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types";

export const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

/** Article card. `feature` is the large lead variant used at the top of a list. */
export function PostCard({ post, feature = false }: { post: Post; feature?: boolean }) {
  return (
    <article className={`group relative flex h-full overflow-hidden rounded-xl2 border border-sand-200 bg-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lift ${feature ? "flex-col lg:flex-row" : "flex-col"}`}>
      {post.image && (
        <div className={`relative shrink-0 overflow-hidden bg-sand-200 ${feature ? "aspect-[16/10] lg:aspect-auto lg:w-[55%]" : "aspect-[16/10]"}`}>
          <Image src={post.image.src} alt={post.image.alt} fill sizes={feature ? "(min-width: 1024px) 40vw, 100vw" : "(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
        </div>
      )}
      <div className={`flex flex-1 flex-col ${feature ? "p-6 sm:p-8 lg:justify-center" : "p-5"}`}>
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700">{post.category}</p>
        <h3 className={`mt-2 leading-snug group-hover:text-brand-800 ${feature ? "text-2xl sm:text-3xl" : "text-lg"}`}>
          <Link href={`/blog/${post.slug}/`} className="after:absolute after:inset-0 after:content-['']">{post.title}</Link>
        </h3>
        {feature && <p className="mt-3 text-ink-600">{post.excerpt}</p>}
        <p className="mt-auto pt-4 text-sm text-ink-500">
          <time dateTime={post.publishedOn}>{formatDate(post.publishedOn)}</time> · {post.readMinutes} min read
        </p>
      </div>
    </article>
  );
}
