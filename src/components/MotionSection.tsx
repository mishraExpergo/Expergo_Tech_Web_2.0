"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export type SectionVariant = "fade-up" | "fade" | "slide-left" | "slide-right";

type Props = {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Scroll-in style; default fade-up */
  variant?: SectionVariant;
  /** Hero / above-the-fold: run on mount instead of intersection */
  animateOnMount?: boolean;
  /** Extra delay in seconds (stagger feel between blocks) */
  delay?: number;
};

const variantMotion: Record<
  SectionVariant,
  { initial: { opacity: number; y?: number; x?: number }; animate: Record<string, number> }
> = {
  "fade-up": {
    initial: { opacity: 0, y: 36 },
    animate: { opacity: 1, y: 0 },
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  },
  "slide-left": {
    initial: { opacity: 0, x: -40 },
    animate: { opacity: 1, x: 0 },
  },
  "slide-right": {
    initial: { opacity: 0, x: 40 },
    animate: { opacity: 1, x: 0 },
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

export function MotionSection({
  children,
  className,
  id,
  variant = "fade-up",
  animateOnMount = false,
  delay = 0,
}: Props) {
  const reduce = useReducedMotion();
  const v = variantMotion[variant];

  const transition = {
    duration: 0.605,
    ease,
    delay: reduce ? 0 : delay,
  };

  if (reduce) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  if (animateOnMount) {
    return (
      <motion.section
        id={id}
        className={className}
        initial={v.initial}
        animate={v.animate}
        transition={transition}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      className={className}
      initial={v.initial}
      whileInView={v.animate}
      viewport={{ once: true, margin: "-12% 0px -8% 0px", amount: 0.2 }}
      transition={transition}
    >
      {children}
    </motion.section>
  );
}
