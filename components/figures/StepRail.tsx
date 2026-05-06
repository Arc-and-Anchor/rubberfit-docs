"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const stationVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 250, damping: 20 },
  },
}

const puckVariants: Variants = {
  hidden: { x: -8, opacity: 0 },
  show: {
    x: [-8, 97, 202, 307, 412],
    opacity: [0, 1, 1, 1, 1],
    transition: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatDelay: 1 },
  },
}

export function StepRail({ steps, label }: { steps: string[]; label: string }) {
  const stationXs = steps.map((_, i) => 50 + i * 105)
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 500 70"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <line
          x1={30}
          y1={35}
          x2={470}
          y2={35}
          stroke="currentColor"
          strokeWidth={2}
          strokeDasharray="6 6"
          opacity={0.3}
        />
        {stationXs.map((x, i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={35}
            r={10}
            stroke="#ee5a24"
            strokeWidth={2}
            fill="transparent"
            variants={stationVariants}
          />
        ))}
        {stationXs.map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={35}
            r={3}
            fill="#ee5a24"
            opacity={i === 0 ? 1 : 0.3}
          />
        ))}
        <motion.rect
          x={50}
          y={52}
          width={16}
          height={5}
          rx={2.5}
          fill="#ee5a24"
          variants={puckVariants}
        />
      </motion.svg>
      <figcaption className="sr-only">
        {steps.map((s, i) => `${i + 1}. ${s}`).join(", ")}
      </figcaption>
    </figure>
  )
}
