import type { Metadata } from "next";

import { Header } from "@/components/Header";
import { BookDemoButton } from "@/components/book-demo/BookDemoProvider";
import AegisProblemSection from "@/app/capabilities/decide/aegis/AegisProblemSection";
import AegisShiftCards from "@/app/capabilities/decide/aegis/AegisShiftCards";
import AegisArchitecturalOutcomes from "@/app/capabilities/decide/aegis/AegisArchitecturalOutcomes";
import AegisBeforeAfterShift from "@/app/capabilities/decide/aegis/AegisBeforeAfterShift";

export const metadata: Metadata = {
  title: "Aegis | Expergo",
  description:
    "Most portfolios don't fail from lack of data—they fail when signals aren't interpreted and actions don't move outcomes. Aegis fixes this at the source.",
};

export default function AegisPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1 w-full min-w-0 overflow-x-hidden bg-white">
        <section className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-14 pt-20 sm:pt-24 lg:pt-10 pb-12 sm:pb-16">
          <div className="max-w-1xl">
            <h1 className="font-heading max-w-4xl text-[30px] font-bold leading-[1.1] tracking-tight text-brand-ink sm:text-4xl md:text-[52px]">
              Risk doesn&apos;t need <br /> better visibility.
              <br />
              It needs <span className="text-brand-teal">better outcomes.</span>
            </h1>

            <p className="mt-8 es-body max-w-2xl text-pretty">
              Most portfolios don&apos;t fail from lack of data. They fail because signals aren&apos;t interpreted,
              priorities are wrong, and actions don&apos;t move outcomes.{" "}
              <br />Aegis fixes this at the source.
            </p>

            <BookDemoButton
              mode="demo"
              className="mt-10 inline-flex items-center justify-center rounded-xl bg-brand-blue px-8 py-3 text-sm sm:text-base font-semibold text-white transition-opacity hover:opacity-95 active:scale-[0.98]"
            >
              Book a Demo
            </BookDemoButton>

            <div
              className="mt-10 max-w-4xl rounded-xl border border-brand-border bg-[#F5F7FA] px-3.5 py-3 sm:mt-12 sm:px-5 sm:py-3.5"
              role="region"
              aria-label="How Aegis improves outcomes"
            >
              <style
                dangerouslySetInnerHTML={{
                  __html: `
                    @keyframes aegis-oc-dot-pulse {
                      0%, 100% {
                        transform: scale(1);
                        box-shadow: 0 0 0 0 rgba(29, 104, 213, 0.45);
                      }
                      55% {
                        transform: scale(1.2);
                        box-shadow: 0 0 0 7px rgba(29, 104, 213, 0);
                      }
                    }
                    @keyframes aegis-oc-dot-ring {
                      0% {
                        opacity: 0.55;
                        transform: translate(-50%, -50%) scale(1);
                      }
                      100% {
                        opacity: 0;
                        transform: translate(-50%, -50%) scale(2.2);
                      }
                    }
                    .aegis-oc-dot {
                      display: block;
                      width: 7px;
                      height: 7px;
                      margin-top: 0.2rem;
                      border-radius: 9999px;
                      background: linear-gradient(145deg, #1d68d5, #16b2c3);
                      animation: aegis-oc-dot-pulse 2.1s ease-in-out infinite;
                    }
                    .aegis-oc-card:nth-child(1) .aegis-oc-dot {
                      animation-delay: 0s;
                    }
                    .aegis-oc-card:nth-child(2) .aegis-oc-dot {
                      animation-delay: 0.35s;
                    }
                    .aegis-oc-card:nth-child(3) .aegis-oc-dot {
                      animation-delay: 0.7s;
                    }
                    .aegis-oc-dot-wrap {
                      position: relative;
                      flex-shrink: 0;
                      display: flex;
                      width: 12px;
                      height: 12px;
                      align-items: center;
                      justify-content: center;
                      margin-top: 0.08rem;
                      overflow: visible;
                    }
                    .aegis-oc-dot-wrap::after {
                      content: "";
                      position: absolute;
                      left: 50%;
                      top: 50%;
                      width: 7px;
                      height: 7px;
                      border-radius: 9999px;
                      border: 1px dotted rgba(29, 104, 213, 0.55);
                      transform: translate(-50%, -50%) scale(1);
                      transform-origin: center;
                      animation: aegis-oc-dot-ring 2.1s ease-out infinite;
                      pointer-events: none;
                    }
                    .aegis-oc-card:nth-child(1) .aegis-oc-dot-wrap::after {
                      animation-delay: 0s;
                    }
                    .aegis-oc-card:nth-child(2) .aegis-oc-dot-wrap::after {
                      animation-delay: 0.35s;
                    }
                    .aegis-oc-card:nth-child(3) .aegis-oc-dot-wrap::after {
                      animation-delay: 0.7s;
                    }
                    .aegis-oc-dot-wrap .aegis-oc-dot {
                      margin-top: 0;
                    }
                    .aegis-oc-card {
                      cursor: pointer;
                      border-radius: 0.5rem;
                      padding: 0.4rem 0.35rem;
                      transition:
                        transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
                        box-shadow 0.32s ease,
                        background-color 0.28s ease;
                      -webkit-tap-highlight-color: transparent;
                    }
                    .aegis-oc-card:hover {
                      transform: translateY(-4px);
                      background-color: rgba(255, 255, 255, 0.96);
                      box-shadow: 0 10px 28px rgba(16, 24, 40, 0.08), 0 4px 12px rgba(29, 104, 213, 0.08);
                    }
                    .aegis-oc-card:active {
                      transform: translateY(-1px);
                      box-shadow: 0 4px 14px rgba(16, 24, 40, 0.06);
                      transition-duration: 0.12s;
                    }
                    .aegis-oc-card .min-w-0 p {
                      transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease;
                    }
                    .aegis-oc-card:hover .min-w-0 p:first-of-type {
                      transform: translateX(3px);
                      color: #1557b8;
                    }
                    .aegis-oc-card:hover .min-w-0 p:last-of-type {
                      transform: translateX(2px);
                      color: #0f172a;
                    }
                    .aegis-oc-card:hover .aegis-oc-dot {
                      animation-play-state: paused;
                      filter: brightness(1.15) saturate(1.05);
                    }
                    .aegis-oc-card:hover .aegis-oc-dot-wrap::after {
                      animation-play-state: paused;
                      opacity: 0.45;
                      transform: translate(-50%, -50%) scale(1.25);
                    }
                    @media (prefers-reduced-motion: reduce) {
                      .aegis-oc-dot,
                      .aegis-oc-dot-wrap::after {
                        animation: none !important;
                      }
                      .aegis-oc-dot-wrap::after {
                        display: none;
                      }
                      .aegis-oc-card,
                      .aegis-oc-card:hover,
                      .aegis-oc-card:active {
                        transform: none !important;
                        box-shadow: none !important;
                        background-color: transparent !important;
                      }
                      .aegis-oc-card:hover .min-w-0 p:first-of-type,
                      .aegis-oc-card:hover .min-w-0 p:last-of-type {
                        transform: none !important;
                      }
                      .aegis-oc-card:hover .aegis-oc-dot {
                        filter: none !important;
                      }
                    }
                  `,
                }}
              />
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                <div className="aegis-oc-card sm:border-r sm:border-brand-border sm:pr-4">
                  <div className="flex items-start gap-2">
                    <span className="aegis-oc-dot-wrap" aria-hidden>
                      <span className="aegis-oc-dot" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold leading-tight text-brand-blue sm:text-xs">Signals</p>
                      <p className="mt-0.5 font-heading text-xs font-bold leading-snug text-brand-ink sm:text-[13px]">
                        Interpreted, not displayed
                      </p>
                    </div>
                  </div>
                </div>
                <div className="aegis-oc-card sm:border-r sm:border-brand-border sm:pr-4">
                  <div className="flex items-start gap-2">
                    <span className="aegis-oc-dot-wrap" aria-hidden>
                      <span className="aegis-oc-dot" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold leading-tight text-brand-blue sm:text-xs">Trajectories</p>
                      <p className="mt-0.5 font-heading text-xs font-bold leading-snug text-brand-ink sm:text-[13px]">
                        Direction over status
                      </p>
                    </div>
                  </div>
                </div>
                <div className="aegis-oc-card">
                  <div className="flex items-start gap-2">
                    <span className="aegis-oc-dot-wrap" aria-hidden>
                      <span className="aegis-oc-dot" />
                    </span>
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold leading-tight text-brand-blue sm:text-xs">Actions</p>
                      <p className="mt-0.5 font-heading text-xs font-bold leading-snug text-brand-ink sm:text-[13px]">
                        Linked to outcomes
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <AegisProblemSection />
        <AegisShiftCards />
        <AegisArchitecturalOutcomes />
        <AegisBeforeAfterShift />
      </main>
    </div>
  );
}
