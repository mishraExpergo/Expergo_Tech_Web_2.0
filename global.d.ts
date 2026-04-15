/// <reference types="react" />
/// <reference types="react-dom" />


export {};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
    gtag: (...args: unknown[]) => void;
  }
}