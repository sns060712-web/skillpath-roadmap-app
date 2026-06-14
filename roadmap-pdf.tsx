import React, { useState } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Tag, ChevronDown, ChevronUp, BookOpen, TrendingUp, ArrowRight } from "lucide-react";
import { blogPosts } from "@/lib/blog-data";

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`bg-card border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border-l-4 ${post.accentBorder}`}
      aria-label={post.title}
    >
      <div className="px-6 pt-6 pb-4">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full ${post.tagColor}`}>
            <Tag className="w-3 h-3" />
            {post.tag}
          </span>
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="text-xs text-muted-foreground">· {post.date}</span>
        </div>

        <h2 className="text-xl md:text-2xl font-extrabold text-foreground leading-snug mb-3">
          <span className="mr-2">{post.emoji}</span>
          {post.title}
        </h2>

        <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
          {post.intro}
        </p>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-2 space-y-6 border-t border-border/60 pt-5">
              {post.sections.map((section, i) => (
                <div key={i}>
                  <h3 className={`text-base font-bold mb-2 ${post.accentText}`}>
                    {section.heading}
                  </h3>
                  <p className="text-sm md:text-base text-foreground/80 leading-relaxed">
                    {section.body}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 pb-5 flex items-center gap-4 mt-1">
        <button
          onClick={() => setExpanded((e) => !e)}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${post.accentText} hover:underline underline-offset-2 transition-colors focus:outline-none`}
          aria-expanded={expanded}
        >
          {expanded ? (
            <><ChevronUp className="w-4 h-4" /> Show less</>
          ) : (
            <><ChevronDown className="w-4 h-4" /> Read preview</>
          )}
        </button>

        <Link
          href={`/blog/${post.slug}`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${post.accentText} hover:underline underline-offset-2 transition-colors ml-auto`}
        >
          Full article <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </motion.article>
  );
}

export function ExploreSkills() {
  return (
    <section
      className="w-full max-w-3xl mx-auto mt-20 mb-10"
      aria-label="Skill Blog — Trending Skills with Curated Learning Paths"
    >
      <header className="mb-10">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-primary bg-primary/10 px-3 py-1 rounded-full">
            <TrendingUp className="w-3.5 h-3.5" />
            Skill Blog
          </span>
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight leading-tight mb-3">
          Top Skills to Learn in 2026
        </h2>
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-2xl">
          In-depth, professionally written learning guides for the most in-demand tech skills of 2026 — covering career relevance, core concepts, tools, certifications, and a month-by-month roadmap to job-readiness.
        </p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <BookOpen className="w-3.5 h-3.5" />
            <span>{blogPosts.length} guides · Updated May 2026</span>
          </div>
          <Link href="/blog" className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline underline-offset-2">
            View all <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      <div className="flex flex-col gap-6">
        {blogPosts.map((post, i) => (
          <BlogCard key={post.id} post={post} index={i} />
        ))}
      </div>
    </section>
  );
}
