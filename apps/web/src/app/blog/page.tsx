import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { listAllBlogPosts } from "@/lib/content/seo-blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Halloween Blog — Guides for Decor, Costumes & Parties",
  description:
    "Practical Halloween guides: indoor and outdoor decorations, costumes, party supplies, and 2026 planning tips from HalloweenReady.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = listAllBlogPosts();
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 overflow-x-hidden">
      <h1 className="text-3xl font-bold text-primary mb-2">Halloween guides and blog</h1>
      <p className="text-slate-600 mb-8">
        Practical articles on{" "}
        <Link href="/categories/home-decoration" className="text-nav hover:underline">
          Halloween decorations
        </Link>
        ,{" "}
        <Link href="/categories/costumesandaccessories" className="text-nav hover:underline">
          Halloween costumes
        </Link>
        , and party planning for USA delivery. For a season overview, start with the{" "}
        <Link href="/halloween-guide" className="text-nav hover:underline">
          Halloween planning guide
        </Link>
        .
      </p>
      <div className="grid gap-6 sm:grid-cols-2">
        {posts.map((post) => (
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
