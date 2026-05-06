"use client"

import { motion, type Variants } from "framer-motion"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const diamondVariants: Variants = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 18 },
  },
}

const progressVariants: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1.1, ease: "easeOut", delay: 0.4 } },
}

export function DiamondTrack({
  marks,
  activeIndex = 0,
  label,
}: {
  marks: string[]
  activeIndex?: number
  label: string
}) {
  const safeIndex = Math.max(0, Math.min(activeIndex, marks.length - 1))
  const positions = marks.map((_, i) => 60 + i * 120)
  return (
    <figure aria-label={label} className="figure-shell">
      <motion.svg
        viewBox="0 0 520 80"
        fill="none"
        className="figure-svg"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
      >
        <line
          x1={30}
          y1={40}
          x2={490}
          y2={40}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.2}
        />
        {positions.map((x, i) => {
          const isActive = i === safeIndex
          return (
            <motion.path
              key={i}
              d={`M${x} 40 l12 -12 l12 12 l-12 12 z`}
              fill={isActive ? "#ee5a24" : "transparent"}
              stroke={isActive ? "transparent" : "currentColor"}
              strokeWidth={2}
              variants={diamondVariants}
            />
          )
        })}
        <motion.rect
          x={30}
          y={62}
          width={Math.max(0, positions[safeIndex] - 18)}
          height={3}
          rx={1.5}
          fill="#ee5a24"
          opacity={0.35}
          style={{ transformOrigin: "left center" }}
          variants={progressVariants}
        />
      </motion.svg>
      <figcaption className="sr-only">
        {marks.map((m, i) => `${m}${i === activeIndex ? " (current)" : ""}`).join(", ")}
      </figcaption>
    </figure>
  )
}
