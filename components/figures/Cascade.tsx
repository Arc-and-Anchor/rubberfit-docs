"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS } from "./figure-tokens"
import { Caption } from "./Caption"

type Child = {
  label: string
  width: number
}

const PARENT_H = 40
const CHILD_H = 36
const TOP_Y = 8
const BUS_Y = TOP_Y + PARENT_H + 22
const CHILD_Y = BUS_Y + 22
const CHILD_GAP = 16
const SIDE_PAD = 24

export function Cascade({
  parentLabel,
  children,
  caption,
  captionNumber,
}: {
  parentLabel: string
  children: Child[]
  caption?: React.ReactNode
  captionNumber?: string
}) {
  if (children.length === 0) return null
  const totalChildW =
    children.reduce((acc, c) => acc + c.width, 0) +
    Math.max(0, children.length - 1) * CHILD_GAP
  const totalW = totalChildW + SIDE_PAD * 2
  const totalH = CHILD_Y + CHILD_H + 8

  let cursor = SIDE_PAD
  const childPositions = children.map((c) => {
    const x = cursor
    cursor += c.width + CHILD_GAP
    return { x, w: c.width }
  })
  const childCenters = childPositions.map((p) => p.x + p.w / 2)
  const parentW = Math.min(280, totalW * 0.55)
  const parentX = (totalW - parentW) / 2

  return (
    <figure className="figure">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.g
          variants={{
            hidden: { opacity: 0, y: -6 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
          }}
        >
          <rect
            x={parentX}
            y={TOP_Y}
            width={parentW}
            height={PARENT_H}
            rx={4}
            fill={FIGURE_TOKENS.parent.fill}
            stroke={FIGURE_TOKENS.parent.stroke}
            strokeWidth={2}
          />
          <text
            x={totalW / 2}
            y={TOP_Y + PARENT_H / 2}
            fontFamily={FIGURE_FONT}
            fontSize={12}
            fontWeight={500}
            fill={FIGURE_TOKENS.parent.label}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {parentLabel}
          </text>
        </motion.g>
        <motion.g
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } },
          }}
        >
          <line
            x1={totalW / 2}
            y1={TOP_Y + PARENT_H}
            x2={totalW / 2}
            y2={BUS_Y}
            stroke={FIGURE_TOKENS.connector}
            strokeWidth={2}
          />
          <line
            x1={childCenters[0]}
            y1={BUS_Y}
            x2={childCenters[childCenters.length - 1]}
            y2={BUS_Y}
            stroke={FIGURE_TOKENS.connector}
            strokeWidth={2}
            strokeLinecap="round"
          />
          {childCenters.map((cx, i) => (
            <line
              key={`drop-${i}`}
              x1={cx}
              y1={BUS_Y}
              x2={cx}
              y2={CHILD_Y}
              stroke={FIGURE_TOKENS.connector}
              strokeWidth={2}
            />
          ))}
        </motion.g>
        {children.map((child, i) => (
          <motion.g
            key={child.label}
            variants={{
              hidden: { opacity: 0, y: 8 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { delay: 0.32 + i * 0.07, duration: 0.4 },
              },
            }}
          >
            <rect
              x={childPositions[i].x}
              y={CHILD_Y}
              width={child.width}
              height={CHILD_H}
              rx={4}
              fill={FIGURE_TOKENS.child.fill}
              stroke={FIGURE_TOKENS.child.stroke}
              strokeWidth={1.5}
            />
            <text
              x={childCenters[i]}
              y={CHILD_Y + CHILD_H / 2}
              fontFamily={FIGURE_FONT}
              fontSize={11}
              fontWeight={500}
              fill={FIGURE_TOKENS.child.label}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {child.label}
            </text>
          </motion.g>
        ))}
      </motion.svg>
      {caption ? <Caption number={captionNumber}>{caption}</Caption> : null}
    </figure>
  )
}
