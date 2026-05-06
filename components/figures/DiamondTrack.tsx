"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS } from "./figure-tokens"
import { Caption } from "./Caption"

type Milestone = {
  quarter: string
  headline: string
  type: "past" | "current" | "future"
}

const ROW_Y = 30
const SIDE_PAD = 60
const COL_W = 130
const HALF = 14

export function DiamondTrack({
  milestones,
  caption,
}: {
  milestones: Milestone[]
  caption?: React.ReactNode
}) {
  const totalW = SIDE_PAD * 2 + (milestones.length - 1) * COL_W
  const totalH = ROW_Y + 80
  const xs = milestones.map((_, i) => SIDE_PAD + i * COL_W)

  return (
    <figure className="figure">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {milestones.slice(0, -1).map((_, i) => (
          <motion.line
            key={`c-${i}`}
            x1={xs[i] + HALF}
            y1={ROW_Y}
            x2={xs[i + 1] - HALF}
            y2={ROW_Y}
            stroke={FIGURE_TOKENS.connector}
            strokeWidth={2}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: i * 0.1 + 0.2, duration: 0.3 },
              },
            }}
          />
        ))}
        {milestones.map((m, i) => {
          const style = FIGURE_TOKENS[m.type]
          const dasharray = style.dasharray
          const quarterColor = m.type === "current" ? "#ee5a24" : "rgba(246,245,242,0.85)"
          return (
            <motion.g
              key={m.quarter}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.1, duration: 0.4 },
                },
              }}
            >
              <path
                d={`M ${xs[i]} ${ROW_Y - HALF} L ${xs[i] + HALF} ${ROW_Y} L ${xs[i]} ${ROW_Y + HALF} L ${xs[i] - HALF} ${ROW_Y} Z`}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={2}
                strokeDasharray={dasharray}
                strokeLinejoin="round"
              />
              <text
                x={xs[i]}
                y={ROW_Y + HALF + 22}
                fontFamily={FIGURE_FONT}
                fontSize={13}
                fontWeight={600}
                fill={quarterColor}
                textAnchor="middle"
              >
                {m.quarter}
              </text>
              <text
                x={xs[i]}
                y={ROW_Y + HALF + 40}
                fontFamily={FIGURE_FONT}
                fontSize={11}
                fontWeight={500}
                fill="rgba(246,245,242,0.6)"
                textAnchor="middle"
              >
                {m.headline}
              </text>
            </motion.g>
          )
        })}
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}
