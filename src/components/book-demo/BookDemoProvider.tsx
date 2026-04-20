"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { BookDemoModal, type BookDemoMode } from "./BookDemoModal";

type BookDemoContextValue = {
  openBookDemo: () => void;
  openExecutiveBrief: () => void;
  closeBookDemo: () => void;
};

const BookDemoContext = createContext<BookDemoContextValue | null>(null);

export function useBookDemo() {
  const ctx = useContext(BookDemoContext);
  if (!ctx) {
    throw new Error("useBookDemo must be used within BookDemoProvider");
  }
  return ctx;
}

export function BookDemoProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<BookDemoMode>("demo");
  const openBookDemo = useCallback(() => {
    setMode("demo");
    setOpen(true);
  }, []);
  const openExecutiveBrief = useCallback(() => {
    setMode("brief");
    setOpen(true);
  }, []);
  const closeBookDemo = useCallback(() => setOpen(false), []);

  return (
    <BookDemoContext.Provider value={{ openBookDemo, openExecutiveBrief, closeBookDemo }}>
      {children}
      <BookDemoModal open={open} onClose={closeBookDemo} mode={mode} />
    </BookDemoContext.Provider>
  );
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") {
    return String(node);
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(" ");
  }

  return "";
}

export function BookDemoButton({
  className,
  children,
  mode,
}: {
  className?: string;
  children: ReactNode;
  mode?: BookDemoMode;
}) {
  const { openBookDemo, openExecutiveBrief } = useBookDemo();
  const resolvedMode =
    mode ?? (/brief|breif/i.test(getNodeText(children)) ? "brief" : "demo");

  return (
    <button
      type="button"
      onClick={resolvedMode === "brief" ? openExecutiveBrief : openBookDemo}
      className={className}
    >
      {children}
    </button>
  );
}
