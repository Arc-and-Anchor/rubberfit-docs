"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
}

const chamberVariants: Variants = {
  hidden: { scaleY: 0, opacity: 0, originY: 1 },
  show: { scaleY: 1, opacity: 1, transition: { duration: 0.35 } },
}

const heatVariants: Variants = {
  hidden: { x: 10, opacity: 0 },
  show: {
    x: [10, 80, 150, 220, 290, 360, 430],
    opacity: [0, 1, 1, 1, 1, 1, 0],
    transition: { duration: 2.6, ease: "linear", repeat: Infinity, repeatDelay: 0.6 },
  },
}

export function Pipeline({ stages, label }: { stages: string[]; label: string }) {
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 520 90"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        {stages.map((_, i) => {
          const x = 10 + i * 70
          return (
            <motion.rect
              key={i}
              x={x}
              y={30}
              width={60}
              height={40}
              rx={2}
              stroke="currentColor"
              strokeWidth={2}
              fill="transparent"
              variants={chamberVariants}
            />
          )
        })}
        {stages.slice(0, -1).map((_, i) => {
          const x1 = 70 + i * 70
          return (
            <line
              key={i}
              x1={x1}
              y1={50}
              x2={x1 + 10}
              y2={50}
              stroke="currentColor"
              strokeWidth={2}
              opacity={0.3}
            />
          )
        })}
        <path
          d="M430 50 h30 M455 50 l-6 -6 M455 50 l-6 6"
          stroke="#ee5a24"
          strokeWidth={2}
        />
        <motion.rect
          x={0}
          y={47}
          width={20}
          height={6}
          rx={3}
          fill="#ee5a24"
          variants={heatVariants}
        />
      </motion.svg>
      <figcaption className="sr-only">
        {stages.map((s, i) => `${i + 1}. ${s}`).join(", ")}
      </figcaption>
    </figure>
  )
}
