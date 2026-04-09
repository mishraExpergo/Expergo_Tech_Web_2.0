/** CSS variable names from `@theme` in globals.css — use in Recharts / inline styles */
export const platformChart = {
  accent: "var(--color-platform-accent)",
  purple: "var(--color-platform-purple)",
  teal: "var(--color-platform-teal)",
  coral: "var(--color-platform-coral)",
  peach: "var(--color-platform-peach)",
  tealSoft: "var(--color-platform-teal-soft)",
  cardBorder: "var(--color-platform-card-border)",
} as const;

export const platformCardClass =
  "rounded-xl border border-[var(--color-platform-card-border)] bg-white p-5 cursor-pointer shadow-sm";

/** Fill CSS grid cells in the Platform bento layout */
export const platformCardLayout = "flex h-full min-h-0 flex-col";
