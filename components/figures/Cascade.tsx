"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS } from "./figure-tokens"
import { Caption } from "./Caption"

type Child = {
  name: string
  size: string
}

const PARENT_W = 240
const PARENT_H = 40
const CHILD_W = 116
const CHILD_H = 38
const TOP_Y = 8
const BUS_Y = TOP_Y + PARENT_H + 22
const CHILD_Y = BUS_Y + 22
const SIZE_LABEL_OFFSET = 18
const CHILD_GAP = 18
const SIDE_PAD = 24

export function Cascade({
  parentLabel,
  children,
  caption,
}: {
  parentLabel: string
  children: Child[]
  caption?: React.ReactNode
}) {
  if (children.length === 0) return null
  const totalChildW =
    children.length * CHILD_W + Math.max(0, children.length - 1) * CHILD_GAP
  const totalW = Math.max(totalChildW + SIDE_PAD * 2, PARENT_W + SIDE_PAD * 2)
  const totalH = CHILD_Y + CHILD_H + SIZE_LABEL_OFFSET + 12

  const childStartX = (totalW - totalChildW) / 2
  const childPositions = children.map((_, i) => ({
    x: childStartX + i * (CHILD_W + CHILD_GAP),
    w: CHILD_W,
  }))
  const childCenters = childPositions.map((p) => p.x + p.w / 2)
  const parentX = (totalW - PARENT_W) / 2

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
            width={PARENT_W}
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
            key={child.name}
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
              width={CHILD_W}
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
              fontSize={12}
              fontWeight={500}
              fill={FIGURE_TOKENS.child.label}
              dominantBaseline="middle"
              textAnchor="middle"
            >
              {child.name}
            </text>
            <text
              x={childCenters[i]}
              y={CHILD_Y + CHILD_H + SIZE_LABEL_OFFSET}
              fontFamily={FIGURE_FONT}
              fontSize={11}
              fontWeight={500}
              fill="rgba(246,245,242,0.55)"
              textAnchor="middle"
            >
              {child.size}
            </text>
          </motion.g>
        ))}
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}
