"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.18, delayChildren: 0.1 } },
}

const parentVariants: Variants = {
  hidden: { y: -10, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.4 } },
}

const lineVariants: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 0.35, transition: { duration: 0.6 } },
}

const childVariants: Variants = {
  hidden: { scale: 0.85, y: 10, opacity: 0 },
  show: {
    scale: 1,
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 280, damping: 20 },
  },
}

export function Cascade({ label }: { label: string }) {
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 400 140"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <motion.rect
          x={120}
          y={10}
          width={160}
          height={40}
          rx={3}
          stroke="currentColor"
          strokeWidth={2}
          fill="transparent"
          variants={parentVariants}
        />
        <motion.path
          d="M65 80 v-15 h135 v15 M200 80 v15 M315 80 v-15 h17 v15"
          stroke="currentColor"
          strokeWidth={1.5}
          opacity={0.3}
          fill="none"
          variants={lineVariants}
        />
        <motion.rect
          x={20}
          y={95}
          width={90}
          height={30}
          rx={3}
          stroke="#ee5a24"
          strokeWidth={2}
          fill="transparent"
          variants={childVariants}
        />
        <motion.rect
          x={125}
          y={95}
          width={70}
          height={30}
          rx={3}
          stroke="#ee5a24"
          strokeWidth={2}
          fill="transparent"
          variants={childVariants}
        />
        <motion.rect
          x={210}
          y={95}
          width={60}
          height={30}
          rx={3}
          stroke="#ee5a24"
          strokeWidth={2}
          fill="transparent"
          variants={childVariants}
        />
        <motion.rect
          x={285}
          y={95}
          width={95}
          height={30}
          rx={3}
          stroke="#ee5a24"
          strokeWidth={2}
          fill="transparent"
          variants={childVariants}
        />
      </motion.svg>
      <figcaption className="sr-only">
        A parent roll fragmenting into four child offcuts of varying sizes.
      </figcaption>
    </figure>
  )
}
