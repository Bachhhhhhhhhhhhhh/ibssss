"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  dark?: boolean;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
      className={cn(
        "mb-20 max-w-4xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {label && (
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.5em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.25em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-label mb-6"
        >
          {label}
        </motion.span>
      )}
      <h2 className="font-serif text-4xl font-normal leading-[1.08] text-sand md:text-5xl lg:text-6xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg max-w-2xl mx-auto text-balance">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}