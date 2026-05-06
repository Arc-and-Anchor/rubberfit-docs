"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.4 } },
}

const stageVariants: Variants = {
  hidden: { y: 12, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.5 } },
}

const partVariants: Variants = {
  hidden: { scale: 0.6, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 380, damping: 18 },
  },
}

const checkVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
}

export function PressFlow({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 420 100"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <motion.rect
          x={10}
          y={25}
          width={80}
          height={50}
          rx={4}
          stroke="currentColor"
          strokeWidth={2}
          fill="transparent"
          variants={stageVariants}
        />
        <path
          d="M100 50 h20"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.4}
        />
        <motion.g variants={stageVariants}>
          <rect
            x={140}
            y={25}
            width={80}
            height={50}
            rx={4}
            stroke="currentColor"
            strokeWidth={2}
            fill="transparent"
          />
          <motion.rect
            x={150}
            y={35}
            width={28}
            height={18}
            rx={2}
            stroke="#ee5a24"
            strokeWidth={1.5}
            fill="transparent"
            variants={partVariants}
          />
          <motion.rect
            x={182}
            y={35}
            width={28}
            height={18}
            rx={2}
            stroke="#ee5a24"
            strokeWidth={1.5}
            fill="transparent"
            variants={partVariants}
          />
          <path
            d="M180 15 v-8 M176 11 l4 -4 4 4"
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.5}
          />
        </motion.g>
        <path
          d="M240 50 h20"
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="4 4"
          opacity={0.4}
        />
        <motion.g variants={stageVariants}>
          <rect
            x={270}
            y={25}
            width={80}
            height={50}
            rx={4}
            stroke="currentColor"
            strokeWidth={2}
            fill="transparent"
          />
          <motion.path
            d="M290 50 l10 10 l20 -20"
            stroke="#ee5a24"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            variants={checkVariants}
          />
        </motion.g>
      </motion.svg>
      <figcaption className="sr-only">
        Three stages: blank stock, nested layout, committed cut.
      </figcaption>
    </figure>
  )
}
