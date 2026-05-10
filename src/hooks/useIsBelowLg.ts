"use client";

import { useSyncExternalStore } from "react";

/** Tailwind `lg` breakpoint (1024px). */
const QUERY = "(max-width: 1023px)";

function subscribe(onStoreChange: () => void) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onStoreChange);
  return () => mq.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** True below the `lg` breakpoint — matches mobile/tablet platform layout. */
export function useIsBelowLg() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
