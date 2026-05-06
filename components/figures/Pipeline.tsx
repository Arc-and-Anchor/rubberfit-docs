"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS } from "./figure-tokens"
import { Caption } from "./Caption"

type Stage = {
  index: string
  name: string
  active?: boolean
}

const BAR_W = 220
const BAR_H = 36
const GAP = 12
const START_X = 24
const NUM_X = START_X + 14
const NAME_X = START_X + 50

export function Pipeline({
  stages,
  caption,
  captionNumber,
}: {
  stages: Stage[]
  caption?: React.ReactNode
  captionNumber?: string
}) {
  const totalH = stages.length * BAR_H + (stages.length - 1) * GAP + 4
  const totalW = BAR_W + START_X * 2

  return (
    <figure className="figure figure-narrow">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {stages.slice(0, -1).map((_, i) => (
          <motion.line
            key={`c-${i}`}
            x1={START_X + BAR_W / 2}
            y1={(i + 1) * BAR_H + i * GAP}
            x2={START_X + BAR_W / 2}
            y2={(i + 1) * (BAR_H + GAP)}
            stroke={FIGURE_TOKENS.connector}
            strokeWidth={2}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { delay: i * 0.06 + 0.2, duration: 0.3 },
              },
            }}
          />
        ))}
        {stages.map((s, i) => {
          const y = i * (BAR_H + GAP)
          const isActive = !!s.active
          const stroke = isActive ? FIGURE_TOKENS.current.stroke : FIGURE_TOKENS.past.stroke
          const fill = isActive ? FIGURE_TOKENS.current.fill : "transparent"
          const numColor = isActive ? FIGURE_TOKENS.current.label : "rgba(246,245,242,0.5)"
          const nameColor = isActive ? FIGURE_TOKENS.current.label : FIGURE_TOKENS.past.label
          return (
            <motion.g
              key={s.name}
              variants={{
                hidden: { opacity: 0, x: -8 },
                visible: {
                  opacity: 1,
                  x: 0,
                  transition: { delay: i * 0.06, duration: 0.4 },
                },
              }}
            >
              <rect
                x={START_X}
                y={y}
                width={BAR_W}
                height={BAR_H}
                rx={4}
                fill={fill}
                stroke={stroke}
                strokeWidth={isActive ? 2 : 1.5}
              />
              <text
                x={NUM_X}
                y={y + BAR_H / 2}
                fontFamily={FIGURE_FONT}
                fontSize={11}
                fontWeight={500}
                fill={numColor}
                dominantBaseline="middle"
                textAnchor="start"
              >
                {s.index}
              </text>
              <text
                x={NAME_X}
                y={y + BAR_H / 2}
                fontFamily={FIGURE_FONT}
                fontSize={12}
                fontWeight={500}
                fill={nameColor}
                dominantBaseline="middle"
                textAnchor="start"
              >
                {s.name}
              </text>
            </motion.g>
          )
        })}
      </motion.svg>
      {caption ? <Caption number={captionNumber}>{caption}</Caption> : null}
    </figure>
  )
}
