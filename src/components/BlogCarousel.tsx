"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { MotionSection } from "./MotionSection";

type CarouselPost = {
  slug: string;
  tag: string;
  title: string;
  image: string;
};

const FALLBACK_POSTS: CarouselPost[] = [
  {
    slug: "",
    tag: "LENDING",
    title: "Why Early Warning Systems Are No Longer Optional for Lenders",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "",
    tag: "STRATEGY",
    title: "From Spreadsheets to Signals: Operating Models for Risk Teams",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "",
    tag: "RISK",
    title: "Portfolio Heatmaps That Executives Actually Use",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "",
    tag: "COMPLIANCE",
    title: "Controls and Evidence Trails for Modern Risk Workflows",
    image:
      "https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80",
  },
];

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.085 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

type BlogCarouselProps = {
  theme?: "light" | "dark";
  /** Heading + dots alignment (default left — same across marketing pages) */
  align?: "center" | "left";
};

export function BlogCarousel({ theme = "light", align = "left" }: BlogCarouselProps) {
  const [activeDot, setActiveDot] = useState(0);
  const [posts, setPosts] = useState<CarouselPost[]>(FALLBACK_POSTS);
  const [fromSanity, setFromSanity] = useState(false);
  const reduce = useReducedMotion();
  const isDark = theme === "dark";
  const isLeft = align === "left";

  useEffect(() => {
    let cancelled = false;
    fetch("/api/insights")
      .then((r) => r.json() as Promise<{ posts?: CarouselPost[] }>)
      .then((data) => {
        if (cancelled || !data.posts?.length) return;
        setPosts(data.posts);
        setFromSanity(true);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <MotionSection
      id="insights"
      variant="slide-left"
      className={
        isDark
          ? "border-t border-white/[0.06] bg-[#050912]/40 px-4 py-20 backdrop-blur-[1px] sm:px-6 lg:px-8"
          : "bg-white px-4 py-20 sm:px-6 lg:px-8"
      }
    >
      <div className="md:py-10 py-0 mx-auto max-w-6xl font-poppins">
        <div className={isLeft ? "text-left" : "text-center"}>
          <p className="text-[16px] uppercase text-[#0B64F4]">Insights</p>
          <h2
            className={`mt-3 text-[36px] font-semibold tracking-tight ${
              isDark ? "text-white" : "text-[#101828]"
            }`}
          >
            From the EarlySafe Blog
          </h2>
        </div>

        <motion.div
          className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          variants={reduce ? undefined : container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-40px" }}
        >
          {posts.map((post) => (
            <motion.article
              key={post.slug ? post.slug : post.title}
              variants={reduce ? undefined : item}
              transition={{ duration: 0.455, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? undefined : { y: -5 }}
              className="overflow-hidden rounded-2xl border border-[#E4E7EC] bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative aspect-[16/10] w-full">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-[#667085]">
                  {post.tag}
                </p>
                <h3 className="mt-2 text-base font-semibold leading-snug text-[#101828]">
                  {post.title}
                </h3>
                <Link
                  href={post.slug ? `/insights/${post.slug}` : "/insights"}
                  className="mt-4 inline-flex text-sm font-semibold text-[#1D68D5] transition hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {fromSanity ? (
          <div className={`mt-8 ${isLeft ? "text-left" : "text-center"}`}>
            <Link
              href="/insights"
              className="text-sm font-semibold text-[#1D68D5] hover:underline"
            >
              View all insights →
            </Link>
          </div>
        ) : null}

        <div className={`mt-8 flex gap-2 ${isLeft ? "justify-start" : "justify-center"}`}>
          {posts.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Highlight article ${i + 1}`}
              onClick={() => setActiveDot(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === activeDot
                  ? "bg-[#1D68D5]"
                  : isDark
                    ? "bg-white/25 hover:bg-white/45"
                    : "bg-[#D0D5DD] hover:bg-[#98A2B3]"
              }`}
            />
          ))}
        </div>
      </div>
    </MotionSection>
  );
}
