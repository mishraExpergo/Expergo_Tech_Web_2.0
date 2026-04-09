"use client";

import type { ReactNode } from "react";
import { BookDemoProvider } from "@/components/book-demo/BookDemoProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <BookDemoProvider>{children}</BookDemoProvider>;
}
