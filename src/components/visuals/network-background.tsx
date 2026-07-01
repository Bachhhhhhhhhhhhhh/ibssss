"use client";

import { motion } from "framer-motion";

const NODES = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 80,
  y: 10 + Math.random() * 80,
  size: 2 + Math.random() * 3,
  delay: Math.random() * 3,
}));

const CONNECTIONS = NODES.slice(0, 12).map((node, i) => ({
  from: node,
  to: NODES[(i + 7) % NODES.length],
}));

export function NetworkBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      <svg
        className="absolute inset-0 w-full h-full opacity-30"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Connection lines */}
        {CONNECTIONS.map((conn, i) => (
          <motion.line
            key={i}
            x1={conn.from.x}
            y1={conn.from.y}
            x2={conn.to.x}
            y2={conn.to.y}
            stroke="rgba(15, 118, 110, 0.3)"
            strokeWidth="0.08"
            strokeDasharray="1 1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}

        {/* Nodes */}
        {NODES.map((node) => (
          <motion.circle
            key={node.id}
            cx={node.x}
            cy={node.y}
            r={node.size * 0.15}
            fill="rgba(15, 118, 110, 0.5)"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{
              duration: 3 + node.delay,
              repeat: Infinity,
              delay: node.delay,
            }}
          />
        ))}

        {/* Central symbiosis hub */}
        <motion.circle
          cx="50"
          cy="50"
          r="8"
          fill="none"
          stroke="rgba(15, 118, 110, 0.15)"
          strokeWidth="0.1"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [0.8, 1.1, 0.8], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="rgba(15, 118, 110, 0.2)"
          initial={{ scale: 0 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </svg>
    </div>
  );
}