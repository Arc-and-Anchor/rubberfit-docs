"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.22 } },
}

const docVariants: Variants = {
  hidden: { x: -10, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.45 } },
}

const linkVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
}

const checkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.5 } },
}

export function LinkFlow({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 320 80"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <motion.g variants={docVariants}>
          <rect
            x={10}
            y={20}
            width={50}
            height={40}
            rx={3}
            stroke="currentColor"
            strokeWidth={2}
            fill="transparent"
          />
          <line
            x1={18}
            y1={32}
            x2={52}
            y2={32}
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.3}
          />
          <line
            x1={18}
            y1={42}
            x2={44}
            y2={42}
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.3}
          />
        </motion.g>
        <path
          d="M70 40 h22"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.4}
        />
        <motion.g variants={linkVariants}>
          <path
            d="M105 40 a10 10 0 0 1 10 -10 h10 a10 10 0 0 1 0 20 h-10 a10 10 0 0 1 -10 -10 z"
            stroke="currentColor"
            strokeWidth={2}
            fill="transparent"
          />
          <path
            d="M135 40 a10 10 0 0 1 10 -10 h10 a10 10 0 0 1 0 20 h-10 a10 10 0 0 1 -10 -10 z"
            stroke="currentColor"
            strokeWidth={2}
            fill="transparent"
          />
        </motion.g>
        <path
          d="M175 40 h22"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.4}
        />
        <circle cx={232} cy={40} r={18} stroke="#ee5a24" strokeWidth={2} fill="transparent" />
        <motion.path
          d="M222 40 l7 7 l13 -13"
          stroke="#ee5a24"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          variants={checkVariants}
        />
      </motion.svg>
      <figcaption className="sr-only">
        A document is signed and shared, the link verified.
      </figcaption>
    </figure>
  )
}
