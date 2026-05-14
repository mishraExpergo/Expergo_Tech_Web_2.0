"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

/** Tailwind `lg` — used so the blue panel height matches the left column only on desktop. */
const LG_MEDIA = "(min-width: 1024px)";

const ease = [0.22, 1, 0.36, 1] as const;

const POINTER_STROKE = "#15B5C1";

/** Figma export: 279×51, full bracket path, stroke #15B5C1 / 2px (same asset scaled per row). */
const POINTER_VIEWBOX = "0 0 279 51" as const;
/** Bottom segment extends further left (was H98.5636) so open side feels more balanced at equal frame widths. */
const POINTER_PATH =
  "M0 1H266C272.627 1 278 6.37258 278 13V38C278 44.6274 272.627 50 266 50H40" as const;

function PointerFrameSvg({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox={POINTER_VIEWBOX}
      fill="none"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <path d={POINTER_PATH} stroke={POINTER_STROKE} strokeWidth={2} />
    </svg>
  );
}

const pointers: readonly { n: number; text: string }[] = [
  { n: 1, text: "Signals are not interpreted" },
  { n: 2, text: "Priorities are wrong" },
  { n: 3, text: "Actions don't move outcomes" },
];

export default function AegisProblemSection() {
  const leftColRef = useRef<HTMLDivElement>(null);
  const [leftHeightPx, setLeftHeightPx] = useState<number>();

  useLayoutEffect(() => {
    const el = leftColRef.current;
    if (!el) return;

    const update = () => {
      if (typeof window === "undefined") return;
      if (!window.matchMedia(LG_MEDIA).matches) {
        setLeftHeightPx(undefined);
        return;
      }
      setLeftHeightPx(Math.round(el.getBoundingClientRect().height));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    const mq = window.matchMedia(LG_MEDIA);
    mq.addEventListener("change", update);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="mx-auto w-full max-w-7xl lg:pt-24 px-6 sm:px-10 lg:px-14 pb-20 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-center text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">THE PROBLEM</p>
        <h2 className="mx-auto mt-4 max-w-4xl text-center font-heading text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl">
          <span className="block text-brand-ink">Early signals exist. Teams act. Yet</span>
          <span className="mt-1 block text-brand-teal">outcomes don&apos;t move.</span>
        </h2>

        <div className="mt-12 grid min-h-0 gap-10 lg:mt-14 lg:grid-cols-2 lg:gap-12 lg:items-start">
          <div ref={leftColRef} className="flex min-h-0 w-full max-w-xl flex-col">
            <p className="es-body text-left text-pretty text-brand-muted">
              Delinquency persists. Roll-forward continues. Losses recur. Not because data is missing — but because the
              chain from signal to outcome is broken.
            </p>

            <div className="mt-10 flex w-full flex-col gap-5 sm:gap-6" role="list">
              {pointers.map((item, i) => (
                <motion.div
                  key={item.n}
                  initial={{ opacity: 0, x: -18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.1, ease }}
                  className="flex w-full max-w-xl items-center gap-3 sm:gap-4"
                  role="listitem"
                >
                  <div className="flex w-10 shrink-0 items-center justify-end sm:w-12" aria-hidden>
                    <span className="border-0 bg-transparent font-heading text-[2.25rem] font-bold leading-none text-[#E5E7EB] shadow-none tabular-nums outline-none ring-0 sm:text-[3rem]">
                      {item.n}
                    </span>
                  </div>
                  <div className="relative min-h-[51px] flex-1 min-w-0 py-3 pl-4 pr-5 sm:min-h-[52px] sm:py-3.5 sm:pl-5 sm:pr-6">
                    <PointerFrameSvg className="pointer-events-none absolute inset-0 h-[51px] w-full sm:h-[52px]" />
                    <p className="relative z-[1] font-heading text-base font-semibold leading-snug text-brand-ink sm:text-lg">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div
            className="flex min-h-0 flex-col justify-center rounded-2xl border border-[#1F2937] bg-[#1F2937] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.12)] sm:p-8 lg:shrink-0 lg:overflow-hidden lg:px-7 lg:py-6"
            style={leftHeightPx != null ? { height: `${leftHeightPx}px` } : undefined}
          >
            <p className="text-pretty font-heading text-lg font-semibold leading-snug text-white sm:text-xl md:text-2xl lg:text-2xl lg:leading-snug xl:text-3xl xl:leading-snug">
              Aegis is the interpretation layer that converts signals into clear risk states, forward{" "}
              <span className="text-brand-teal">trajectories and actionable priorities.</span>
            </p>
          </div>
        </div>

        <motion.div
          className="mx-auto mt-16 max-w-3xl  lg:pt-24 text-center sm:mt-20"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.45, ease }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-blue">OUTCOMES DELIVERED</p>
          <h3 className="mt-4 font-heading text-3xl font-bold leading-[1.15] tracking-tight text-brand-ink sm:text-4xl md:text-5xl">
            Seven shifts. <span className="text-brand-teal">Measurable.</span>
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-pretty es-body text-brand-muted">
            Each outcome traces back to the same architectural choice: interpretation over display.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
