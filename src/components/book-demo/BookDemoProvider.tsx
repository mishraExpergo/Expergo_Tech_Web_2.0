"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { BookDemoModal } from "./BookDemoModal";

type BookDemoContextValue = {
  openBookDemo: () => void;
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
  const openBookDemo = useCallback(() => setOpen(true), []);
  const closeBookDemo = useCallback(() => setOpen(false), []);

  return (
    <BookDemoContext.Provider value={{ openBookDemo, closeBookDemo }}>
      {children}
      <BookDemoModal open={open} onClose={closeBookDemo} />
    </BookDemoContext.Provider>
  );
}

export function BookDemoButton({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { openBookDemo } = useBookDemo();
  return (
    <button type="button" onClick={openBookDemo} className={className}>
      {children}
    </button>
  );
}
