import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/content/blog-posts";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Blog — Guides, Tips & Halloween USA",
  description:
    "Halloween guides: shop Halloween to USA from India, best Halloween combos, Bhaiya Bhabhi sets, and 2026 festival tips from HalloweenReady.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-primary mb-2">Halloween Guides & Blog</h1>
      <p className="text-slate-600 mb-8">
        Expert guides on Halloween costumes, decorations, party planning, and shopping for USA delivery from
        HalloweenReady.
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="border border-slate-200 rounded-xl overflow-hidden hover:shadow-md transition bg-white flex flex-col"
          >
            <Link href={`/blog/${post.slug}`} className="block relative aspect-[16/10] bg-slate-100 flex items-center justify-center p-2">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-contain p-1"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </Link>
            <div className="p-5 flex flex-col flex-1 min-w-0">
              <time dateTime={post.publishedAt} className="text-xs text-slate-400">
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h2 className="text-lg font-bold text-primary mt-1 mb-2 leading-snug">
                <Link href={`/blog/${post.slug}`} className="hover:text-nav break-words">
                  {post.title}
                </Link>
              </h2>
              <p className="text-slate-600 text-sm mb-4 flex-1 break-words">{post.excerpt}</p>
              <Link href={`/blog/${post.slug}`} className="text-nav font-semibold text-sm hover:underline">
                Read full guide →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
