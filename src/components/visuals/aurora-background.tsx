"use client";

import { motion } from "framer-motion";

export function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Base mesh */}
      <div className="absolute inset-0 bg-[#060a09]" />

      {/* Aurora blobs */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 w-[70%] h-[70%] rounded-full opacity-30 animate-aurora"
        style={{
          background: "radial-gradient(circle, rgba(15,118,110,0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      <motion.div
        className="absolute -bottom-1/4 -right-1/4 w-[60%] h-[60%] rounded-full opacity-25 animate-aurora"
        style={{
          background: "radial-gradient(circle, rgba(22,101,52,0.35) 0%, transparent 70%)",
          filter: "blur(80px)",
          animationDelay: "-7s",
        }}
      />
      <motion.div
        className="absolute top-1/3 right-1/4 w-[40%] h-[40%] rounded-full opacity-20 animate-aurora"
        style={{
          background: "radial-gradient(circle, rgba(201,169,98,0.25) 0%, transparent 70%)",
          filter: "blur(60px)",
          animationDelay: "-14s",
        }}
      />

      {/* Grid overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(45,212,191,0.5)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Radial vignette center glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_40%,rgba(15,118,110,0.08)_0%,transparent_60%)]" />
    </div>
  );
}