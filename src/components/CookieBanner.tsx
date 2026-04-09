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
          initial={{ y: "120%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[100] p-4 sm:p-6 pb-6"
        >
          <div className="mx-auto max-w-5xl rounded-2xl bg-white p-5 shadow-[0_-8px_30px_-15px_rgba(0,0,0,0.1),0_8px_30px_rgba(0,0,0,0.12)] border border-[#E8E9EB] sm:flex sm:items-center sm:justify-between sm:p-6 lg:p-8">
            <div className="flex-1 pr-4">
              <h3 className="es-heading-section font-semibold tracking-tight text-[#1F1F1F]">Cookie Consent</h3>
              <p className="mt-2 text-sm text-[#5D6B78] leading-[1.6]">
                We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
                By clicking "Accept All", you consent to our use of cookies. Read more in our{" "}
                <Link href="#" className="font-semibold text-[#1497A8] hover:text-[#12AFC0] underline underline-offset-2">
                  Privacy Policy
                </Link>.
              </p>
            </div>
            <div className="mt-5 flex flex-shrink-0 flex-col gap-3 sm:mt-0 sm:flex-row sm:items-center">
              <button
                onClick={declineCookies}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg border border-[#E8E9EB] bg-white px-5 py-2.5 text-sm font-semibold text-[#1F1F1F] transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#1497A8] focus:ring-offset-2 active:scale-95"
              >
                Decline
              </button>
              <button
                onClick={acceptCookies}
                className="inline-flex min-w-[120px] items-center justify-center rounded-lg bg-[#15B5C1] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#13adbc] focus:outline-none focus:ring-2 focus:ring-[#15B5C1] focus:ring-offset-2 active:scale-95"
              >
                Accept All
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
