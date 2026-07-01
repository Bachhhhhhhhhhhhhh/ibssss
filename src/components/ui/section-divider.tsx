"use client";

import { motion } from "framer-motion";

export function SectionDivider() {
  return (
    <div className="relative py-2">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="consulting-divider max-w-4xl mx-auto"
      />
    </div>
  );
}