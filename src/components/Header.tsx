"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useBookDemo } from "@/components/book-demo/BookDemoProvider";

const links = [
  { href: "/platform", label: "Platform", match: (p: string) => false },
  { href: "/capabilities", label: "Capabilities", match: (p: string) => p === "/capabilities" },
  { href: "/outcomes", label: "Outcomes", match: (p: string) => p === "/outcomes" },
  { href: "/use-cases", label: "Use Cases", match: (p: string) => p === "/use-cases" },
  { href: "/insights", label: "Blogs", match: () => false },
] as const;

export function Header() {
  const pathname = usePathname();
  const { openBookDemo } = useBookDemo();

  return (
    <motion.header
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.455, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 border-b border-[#E4E7EC] bg-white/90 text-[#101828] backdrop-blur-md"
    >
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
        <img src="/logo 2.svg" alt="EXPERGO" width={30} height={30} />
          <span className="text-2xl font-bold tracking-tight text-[#101828]">EXPERGO</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = l.match(pathname);
            const useCasesBlue = l.href === "/use-cases" && active;
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
            className="inline-flex items-center justify-center rounded-lg bg-linear-to-l from-[#0B64F4] to-[#0BABCB] px-4 py-2.5 text-sm font-semibold text-white transition-transform hover:opacity-95 active:scale-[0.98]"
          >
            Book Demo
          </button>
        </div>
      </div>
    </motion.header>
  );
}
