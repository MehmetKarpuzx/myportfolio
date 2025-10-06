"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

// --- Types ---
export type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  avatarSrc: string; // e.g. "/people/ahmet.jpg" (place under /public)
  rating?: number; // 1..5 (optional small stars)
  link?: string; // optional profile link
};

export type TestimonialsProps = {
  title?: string;
  subtitle?: string;
  items: Testimonial[];
  compact?: boolean; // "küçük" kart stili için
};

// --- Star rating (small) ---
function Stars({ value = 5 }: { value?: number }) {
  const full = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <div className="flex items-center gap-0.5" aria-label={`Rating: ${full}/5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`h-3 w-3 ${i < full ? "fill-yellow-400" : "fill-gray-300"}`}
          aria-hidden="true"
        >
          <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27Z"/>
        </svg>
      ))}
    </div>
  );
}

// --- Card ---
function TestimonialCard({ t, compact }: { t: Testimonial; compact?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20%" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className={`relative rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 backdrop-blur p-4 md:p-5 ${compact ? "max-h-[220px]" : ""}`}
    >
      <Quote className="absolute -top-3 -left-3 h-6 w-6 opacity-15" />
      <div className="flex items-start gap-3">
        <Image
          src={t.avatarSrc}
          alt={`${t.name} avatar`}
          width={56}
          height={56}
          className="rounded-full object-cover ring-2 ring-gray-100 dark:ring-zinc-800"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {t.link ? (
              <a href={t.link} target="_blank" rel="noreferrer" className="font-semibold hover:underline">
                {t.name}
              </a>
            ) : (
              <span className="font-semibold">{t.name}</span>
            )}
            {typeof t.rating === "number" && <Stars value={t.rating} />}
          </div>
          <p className="text-xs text-gray-500 dark:text-zinc-400">
            {[t.role, t.company].filter(Boolean).join(" • ")}
          </p>
        </div>
      </div>
      <p className={`mt-3 text-sm leading-relaxed text-gray-700 dark:text-zinc-200 ${compact ? "line-clamp-3" : ""}`}>
        “{t.quote}”
      </p>
    </motion.article>
  );
}

// --- Main component ---
export default function Testimonials({ title = "Referanslar", subtitle = "İnsanlar benim için neler söylüyor", items, compact = true }: TestimonialsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const scrollBy = (px: number) => scrollerRef.current?.scrollBy({ left: px, behavior: "smooth" });

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-6 md:mb-10 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
            <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-zinc-400">{subtitle}</p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button
              className="rounded-2xl border px-3 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800"
              onClick={() => scrollBy(-360)}
              aria-label="Geri"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="rounded-2xl border px-3 py-2 hover:bg-gray-50 dark:hover:bg-zinc-800"
              onClick={() => scrollBy(360)}
              aria-label="İleri"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile: yatay kaydırmalı, Desktop: grid */}
        <div className="md:hidden -mx-4 px-4">
          <div
            ref={scrollerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-zinc-700"
          >
            {items.map((t, i) => (
              <div key={i} className="min-w-[85%] snap-center">
                <TestimonialCard t={t} compact />
              </div>
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((t, i) => (
            <TestimonialCard key={i} t={t} compact={compact} />
          ))}
        </div>
      </div>
    </section>
  );
}

