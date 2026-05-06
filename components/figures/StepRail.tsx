"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT } from "./figure-tokens"
import { Caption } from "./Caption"

const NODE_R = 14
const TOP = 28
const LABEL_Y = TOP + NODE_R + 22
const SIDE_PAD = 24
const ACCENT = "#ee5a24"
const TRACK = "rgba(246,245,242,0.18)"
const NODE_STROKE = "rgba(246,245,242,0.45)"
const NODE_FILL = "rgba(246,245,242,0.04)"
const LABEL_COLOR = "rgba(246,245,242,0.7)"
const ACTIVE_LABEL = "#ee5a24"
const ACTIVE_NUM = "#0F1216"

export function StepRail({
  steps,
  activeIndex = 0,
  caption,
}: {
  steps: string[]
  activeIndex?: number
  caption?: React.ReactNode
}) {
  const safeIndex = Math.max(0, Math.min(activeIndex, steps.length - 1))
  const COL_W = 110
  const totalW = SIDE_PAD * 2 + (steps.length - 1) * COL_W
  const totalH = LABEL_Y + 12
  const xs = steps.map((_, i) => SIDE_PAD + i * COL_W)

  return (
    <figure className="figure">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.line
          x1={xs[0]}
          y1={TOP}
          x2={xs[xs.length - 1]}
          y2={TOP}
          stroke={TRACK}
          strokeWidth={3}
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0 },
            visible: { pathLength: 1, transition: { duration: 0.6 } },
          }}
        />
        {steps.map((s, i) => {
          const isActive = i === safeIndex
          const isPast = i < safeIndex
          const fill = isActive ? ACCENT : NODE_FILL
          const stroke = isActive || isPast ? ACCENT : NODE_STROKE
          const numColor = isActive ? ACTIVE_NUM : "rgba(246,245,242,0.85)"
          const labelColor = isActive ? ACTIVE_LABEL : LABEL_COLOR
          return (
            <motion.g
              key={s}
              variants={{
                hidden: { opacity: 0, scale: 0.8 },
                visible: {
                  opacity: 1,
                  scale: 1,
                  transition: { delay: i * 0.08, duration: 0.3 },
                },
              }}
            >
              <circle
                cx={xs[i]}
                cy={TOP}
                r={NODE_R}
                fill={fill}
                stroke={stroke}
                strokeWidth={2}
              />
              <text
                x={xs[i]}
                y={TOP}
                fontFamily={FIGURE_FONT}
                fontSize={11}
                fontWeight={600}
                fill={numColor}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {i + 1}
              </text>
              <text
                x={xs[i]}
                y={LABEL_Y}
                fontFamily={FIGURE_FONT}
                fontSize={11}
                fontWeight={500}
                fill={labelColor}
                textAnchor="middle"
              >
                {s}
              </text>
            </motion.g>
          )
        })}
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}
