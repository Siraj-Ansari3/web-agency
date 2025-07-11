import React, { useEffect, useState } from "react";
import { useLocation }       from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const GetQuoteButton = () => {
  const { pathname } = useLocation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // don’t return early—just suppress the button:
  const hidden = pathname === "/" || pathname.startsWith("/about") || pathname.startsWith("/services") || pathname === "/portfolio";

  return (
    <AnimatePresence>
      { hidden && show && (
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, type: "spring", bounce: 0.3 }}
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
            else window.location.href = "/contact";
          }}
          className="fixed z-50 bottom-6 left-1/2 -translate-x-1/2
                     px-4 py-2.5 rounded-full bg-gradient-to-r
                     from-red-500 via-red-600 to-red-700
                     text-white font-semibold text-xs 
                     hover:scale-105 active:scale-95
                     transition-all duration-300 focus:outline-none
                     focus:ring-2 focus:ring-red-400/50 subtle-glow cursor-pointer"
        >
          <span className="inline-flex items-center gap-1">
            <svg
              className="w-3 h-3 animate-bounce"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 17l4 4 4-4m-4-5v9"
              />
            </svg>
            Get a Free Quote
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default GetQuoteButton;
