"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Menu, X } from "lucide-react";
import { useBookDemo } from "@/components/book-demo/BookDemoProvider";

const links = [
  { href: "/platform", label: "Platform", match: (p: string) => false },
  {
    href: "/capabilities",
    label: "Capabilities",
    match: (p: string) => p === "/capabilities" || p.startsWith("/capabilities/"),
  },
  { href: "/outcomes", label: "Outcomes", match: (p: string) => p === "/outcomes" },
  { href: "/use-cases", label: "Use Cases", match: (p: string) => p === "/use-cases" },
  { href: "/insights", label: "Insights", match: (p: string) => p === "/insights" },    
] as const;

const capabilityLinks = [
  {
    href: "/capabilities/lighthouse",
    label: "Lighthouse",
    description: "Early stress detection and portfolio concentration monitoring.",
  },
  {
    href: "/capabilities/regulas",
    label: "Regulus",
    description: "Governance, regulatory alignment, and audit-ready signal control.",
  },
  {
    href: "/capabilities/command-center",
    label: "Command Center",
    description: "Operational prioritisation, escalation, and execution workflows.",
  },
  {
    href: "/capabilities/bureau-360",
    label: "Bureau 360",
    description: "External risk signals, exposure shifts, and borrower behaviour tracking.",
  },
] as const;

export function Header() {
  const pathname = usePathname();
  const { openBookDemo } = useBookDemo();
  const [capabilitiesOpen, setCapabilitiesOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.455, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-[#E4E7EC] bg-white/90 text-brand-ink backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <img src="/logo 2.svg" alt="EXPERGO" width={30} height={30} />
          <span className="text-2xl font-bold tracking-tight text-brand-ink">EXPERGO</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.match(pathname);
            const useCasesBlue = l.href === "/use-cases" && active;

            if (l.href === "/capabilities") {
              return (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={() => setCapabilitiesOpen(true)}
                  onMouseLeave={() => setCapabilitiesOpen(false)}
                  onFocus={() => setCapabilitiesOpen(true)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
                      setCapabilitiesOpen(false);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      setCapabilitiesOpen(false);
                    }
                  }}
                >
                  <Link
                    href={l.href}
                    aria-haspopup="true"
                    aria-expanded={capabilitiesOpen}
                    className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#101828] ${
                      active
                        ? "text-[#344054] underline decoration-2 decoration-[#16B2C3] underline-offset-8"
                        : "text-[#344054]"
                    }`}
                  >
                    {l.label}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${
                        capabilitiesOpen ? "rotate-180 text-[#16B2C3]" : "text-[#667085]"
                      }`}
                      strokeWidth={2}
                      aria-hidden
                    />
                  </Link>

                  <div
                    className={`absolute left-1/2 top-full  z-50 w-[360px] -translate-x-1/2 pt-5 transition duration-200 ${
                      capabilitiesOpen
                        ? "pointer-events-auto visible translate-y-0 opacity-100"
                        : "pointer-events-none invisible translate-y-2 opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden rounded-lg border border-[#D8DEE8] bg-white shadow-[0_20px_45px_rgba(16,24,40,0.14)]">
                      {/* <div className="border-b border-[#EEF2F6] px-4 py-3">
                        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#1D68D5]">
                          Capabilities
                        </p>
                        <p className="mt-1 text-sm leading-5 text-[#667085]">
                          Continuous risk control across every portfolio signal.
                        </p>
                      </div> */}
                      <div className="p-2">
                        {capabilityLinks.map((item) => {
                          const itemActive = pathname === item.href;

                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setCapabilitiesOpen(false)}
                              className={`group block rounded-md px-3 py-3 transition ${
                                itemActive ? "bg-[#EAF5FF]" : "hover:bg-[#F4FAFB]"
                              }`}
                            >
                              <span
                                className={`block text-sm font-semibold ${
                                  itemActive ? "text-[#1D68D5]" : "text-[#101828] group-hover:text-[#1497A8]"
                                }`}
                              >
                                {item.label}
                              </span>
                              <span className="mt-1 block text-xs leading-5 text-[#667085]">
                                {item.description}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-[#101828] ${
                  useCasesBlue
                    ? "font-semibold text-[#1D68D5]"
                    : active
                      ? "text-[#344054] underline decoration-2 decoration-[#16B2C3] underline-offset-8"
                      : "text-[#344054]"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openBookDemo}
            className="hidden sm:inline-flex items-center justify-center rounded-lg bg-linear-to-l from-[#0B64F4] to-[#0BABCB] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:opacity-95 active:scale-[0.98]"
          >
            Book Demo
          </button>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-[#344054] hover:bg-gray-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <X className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="block h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#E4E7EC] bg-white absolute top-full left-0 right-0 w-full shadow-[0_10px_20px_rgba(0,0,0,0.05)] overflow-hidden"
          >
            <div className="space-y-1 px-4 pb-4 pt-2 sm:px-6">
              {links.map((l) => {
                const active = l.match(pathname);
                const useCasesBlue = l.href === "/use-cases" && active;

                if (l.href === "/capabilities") {
                  return (
                    <div key={l.href} className="py-2">
                      <div className="flex items-center justify-between px-3 text-base font-semibold text-[#344054]">
                        {l.label}
                      </div>
                      <div className="mt-2 space-y-1 pl-4">
                        {capabilityLinks.map((item) => {
                          const itemActive = pathname === item.href;
                          return (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={`block rounded-md px-3 py-2 text-sm font-medium ${
                                itemActive
                                  ? "bg-[#EAF5FF] text-[#1D68D5]"
                                  : "text-[#667085] hover:bg-[#F4FAFB] hover:text-[#1497A8]"
                              }`}
                            >
                              {item.label}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={l.href}
                    href={l.href}
                    className={`block rounded-md px-3 py-2 text-base font-semibold ${
                      useCasesBlue
                        ? "bg-[#EAF5FF] text-[#1D68D5]"
                        : active
                          ? "bg-gray-50 text-[#16B2C3]"
                          : "text-[#344054] hover:bg-gray-50 hover:text-[#101828]"
                    }`}
                  >
                    {l.label}
                  </Link>
                );
              })}
              <div className="pt-4 sm:hidden">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openBookDemo();
                  }}
                  className="w-full inline-flex items-center justify-center rounded-lg bg-linear-to-l from-[#0B64F4] to-[#0BABCB] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:opacity-95 active:scale-[0.98]"
                >
                  Book Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
