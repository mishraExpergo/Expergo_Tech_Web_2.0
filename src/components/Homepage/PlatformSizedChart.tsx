"use client";

import { useLayoutEffect, useRef, useState, type ReactElement } from "react";
import { ResponsiveContainer } from "recharts";

type PlatformSizedChartProps = {
  /** Sizing shell for the chart (fixed height below lg, flex growth at lg+). */
  className: string;
  children: ReactElement;
};

/**
 * Recharts v3 `ResponsiveContainer` with percentage width/height initially renders
 * nothing until a positive size exists; on some mobile flex layouts that frame
 * never arrives. Measuring the box and passing numeric dimensions avoids that.
 */
export function PlatformSizedChart({ className, children }: PlatformSizedChartProps) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [[w, h], setWh] = useState(() => [320, 200] as [number, number]);

  useLayoutEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const read = () => {
      const r = el.getBoundingClientRect();
      const nw = Math.max(1, Math.round(r.width));
      const nh = Math.max(1, Math.round(r.height));
      setWh((prev) => (prev[0] === nw && prev[1] === nh ? prev : [nw, nh]));
    };

    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={boxRef} className={className}>
      <ResponsiveContainer width={w} height={h}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
