"use client"

import { motion, type Variants } from "framer-motion"

type LinearLayout = {
  layout: "linear"
  states: string[]
  activeIndex?: number
}

type VerticalLayout = {
  layout: "vertical"
  states: string[]
  activeIndex?: number
}

type BranchingLayout = {
  layout: "branching"
  states: string[]
  branchIndex: number
  branchLabel: string
  activeIndex?: number
}

export type StateMachineProps = LinearLayout | VerticalLayout | BranchingLayout

const ACCENT = "#ee5a24"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.15 } },
}

const pillVariants: Variants = {
  hidden: { scale: 0.85, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: "spring", stiffness: 220, damping: 22 },
  },
}

const branchVariants: Variants = {
  hidden: { y: -8, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { delay: 0.7, duration: 0.4 } },
}

export function StateMachine(props: StateMachineProps) {
  const activeIndex = props.activeIndex ?? 0

  if (props.layout === "vertical") {
    const { states } = props
    const rowHeight = 54
    const totalHeight = states.length * rowHeight + 4
    return (
      <figure
        aria-label={`State diagram: ${states.join(" → ")}`}
        className="figure-shell"
      >
        <motion.svg
          viewBox={`0 0 220 ${totalHeight}`}
          fill="none"
          className="figure-svg"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
        >
          {states.map((_, i) => {
            const y = i * rowHeight + 4
            const isActive = i === activeIndex
            return (
              <motion.g key={i} variants={pillVariants}>
                <rect
                  x={20}
                  y={y}
                  width={180}
                  height={32}
                  rx={6}
                  fill={isActive ? ACCENT : "transparent"}
                  stroke={isActive ? "transparent" : "currentColor"}
                  strokeWidth={2}
                />
                {i < states.length - 1 ? (
                  <path
                    d={`M110 ${y + 36} v${rowHeight - 36 - 4}`}
                    stroke="currentColor"
                    strokeWidth={2}
                    opacity={0.3}
                  />
                ) : null}
              </motion.g>
            )
          })}
        </motion.svg>
        <figcaption className="sr-only">
          {states.map((s, i) => `${i + 1}. ${s}`).join(", ")}
        </figcaption>
      </figure>
    )
  }

  if (props.layout === "branching") {
    const { states, branchIndex, branchLabel } = props
    const colWidth = 110
    const totalWidth = states.length * colWidth + 20
    const branchPillX = branchIndex * colWidth + 30
    return (
      <figure
        aria-label={`State diagram: ${states.join(" → ")} with branch to ${branchLabel}`}
        className="figure-shell"
      >
        <motion.svg
          viewBox={`0 0 ${totalWidth} 130`}
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
            x2={(states.length - 1) * colWidth + 90}
            y2={35}
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.2}
          />
          {states.map((_, i) => {
            const x = i * colWidth + 30
            const isActive = i === activeIndex
            return (
              <motion.rect
                key={i}
                x={x}
                y={23}
                width={70}
                height={24}
                rx={12}
                fill={isActive ? ACCENT : "transparent"}
                stroke={isActive ? "transparent" : "currentColor"}
                strokeWidth={2}
                variants={pillVariants}
              />
            )
          })}
          <motion.path
            d={`M${branchPillX + 35} 47 v25`}
            stroke="currentColor"
            strokeWidth={2}
            opacity={0.3}
            variants={branchVariants}
          />
          <motion.rect
            x={branchPillX}
            y={80}
            width={70}
            height={24}
            rx={12}
            stroke="currentColor"
            strokeWidth={2}
            strokeDasharray="3 3"
            fill="transparent"
            variants={branchVariants}
          />
        </motion.svg>
        <figcaption className="sr-only">
          {states.map((s, i) => `${i + 1}. ${s}`).join(", ")}; branch from{" "}
          {states[branchIndex]} to {branchLabel}
        </figcaption>
      </figure>
    )
  }

  // linear
  const { states } = props
  const colWidth = 110
  const totalWidth = states.length * colWidth + 20
  return (
    <figure
      aria-label={`State diagram: ${states.join(" → ")}`}
      className="figure-shell"
    >
      <motion.svg
        viewBox={`0 0 ${totalWidth} 70`}
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
          x2={(states.length - 1) * colWidth + 90}
          y2={35}
          stroke="currentColor"
          strokeWidth={2}
          opacity={0.2}
        />
        {states.map((_, i) => {
          const x = i * colWidth + 30
          const isActive = i === activeIndex
          return (
            <motion.rect
              key={i}
              x={x}
              y={23}
              width={70}
              height={24}
              rx={12}
              fill={isActive ? ACCENT : "transparent"}
              stroke={isActive ? "transparent" : "currentColor"}
              strokeWidth={2}
              variants={pillVariants}
            />
          )
        })}
      </motion.svg>
      <figcaption className="sr-only">
        {states.map((s, i) => `${i + 1}. ${s}`).join(", ")}
      </figcaption>
    </figure>
  )
}
