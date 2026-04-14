"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

export function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("expergo_cookie_consent");
    if (!consent) {
      // Small delay to let the page load before the banner elegantly slides in
      const timer = setTimeout(() => setIsVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("expergo_cookie_consent", "accepted");
    setIsVisible(false);
  };

  const declineCookies = () => {
    localStorage.setItem("expergo_cookie_consent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: 24, y: 12, opacity: 0 }}
          animate={{ x: 0, y: 0, opacity: 1 }}
          exit={{ x: 24, y: 12, opacity: 0 }}
          transition={{ type: "spring", damping: 26, stiffness: 260 }}
          className="fixed bottom-4 right-4 z-[100] w-[min(17.5rem,calc(100vw-2rem))]"
        >
          <div className="rounded-xl bg-white p-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-[#E8E9EB]">
            <h3 className="text-xs font-semibold tracking-tight text-[#1F1F1F]">Cookies</h3>
            <p className="mt-1.5 text-[11px] leading-snug text-[#5D6B78]">
              We use cookies to improve the site and measure traffic. See our{" "}
              <Link href="#" className="font-semibold text-[#1497A8] hover:text-[#12AFC0] underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={declineCookies}
                className="inline-flex flex-1 items-center justify-center rounded-md border border-[#E8E9EB] bg-white px-2.5 py-1.5 text-[11px] font-semibold text-[#1F1F1F] transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1497A8] focus:ring-offset-1 active:scale-[0.98]"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="inline-flex flex-1 items-center justify-center rounded-md bg-[#15B5C1] px-2.5 py-1.5 text-[11px] font-semibold text-white shadow-sm transition-all hover:bg-[#13adbc] focus:outline-none focus:ring-2 focus:ring-[#15B5C1] focus:ring-offset-1 active:scale-[0.98]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
