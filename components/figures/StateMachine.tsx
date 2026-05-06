"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS, type FigureNodeType } from "./figure-tokens"
import { Caption } from "./Caption"

type State = {
  name: string
  type: Extract<FigureNodeType, "past" | "current" | "future">
}

type LinearProps = {
  layout: "linear"
  states: State[]
  caption?: React.ReactNode
}

type VerticalProps = {
  layout: "vertical"
  states: State[]
  caption?: React.ReactNode
}

type BranchingProps = {
  layout: "branching"
  states: State[]
  branchAfterIndex: number
  branchLabel: string
  caption?: React.ReactNode
}

export type StateMachineProps = LinearProps | VerticalProps | BranchingProps

const LINEAR_NODE_W = 96
const LINEAR_NODE_H = 36
const LINEAR_GAP = 16

const VERTICAL_NODE_W = 168
const VERTICAL_NODE_H = 36
const VERTICAL_GAP = 18

const BRANCHING_NODE_W = 88
const BRANCHING_NODE_H = 32
const BRANCHING_GAP = 18
const BRANCHING_SPUR_Y = 92

function NodeStyle(type: FigureNodeType) {
  return FIGURE_TOKENS[type]
}

export function StateMachine(props: StateMachineProps) {
  if (props.layout === "vertical") {
    return <Vertical {...props} />
  }
  if (props.layout === "branching") {
    return <Branching {...props} />
  }
  return <Linear {...props} />
}

function Linear({ states, caption }: LinearProps) {
  const totalW = states.length * LINEAR_NODE_W + (states.length - 1) * LINEAR_GAP
  const totalH = LINEAR_NODE_H + 4

  return (
    <figure className="figure">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {states.slice(0, -1).map((_, i) => {
          const x1 = (i + 1) * LINEAR_NODE_W + i * LINEAR_GAP
          const x2 = (i + 1) * (LINEAR_NODE_W + LINEAR_GAP)
          return (
            <motion.line
              key={`c-${i}`}
              x1={x1}
              y1={LINEAR_NODE_H / 2}
              x2={x2}
              y2={LINEAR_NODE_H / 2}
              stroke={FIGURE_TOKENS.connector}
              strokeWidth={2}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: i * 0.07 + 0.18, duration: 0.3 },
                },
              }}
            />
          )
        })}
        {states.map((s, i) => {
          const x = i * (LINEAR_NODE_W + LINEAR_GAP)
          const style = NodeStyle(s.type)
          return (
            <motion.g
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.07, duration: 0.4 },
                },
              }}
            >
              <rect
                x={x}
                y={0}
                width={LINEAR_NODE_W}
                height={LINEAR_NODE_H}
                rx={LINEAR_NODE_H / 2}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={2}
                strokeDasharray={style.dasharray}
              />
              <text
                x={x + LINEAR_NODE_W / 2}
                y={LINEAR_NODE_H / 2}
                fontFamily={FIGURE_FONT}
                fontSize={12}
                fontWeight={500}
                fill={style.label}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {s.name}
              </text>
            </motion.g>
          )
        })}
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}

function Vertical({ states, caption }: VerticalProps) {
  const totalH =
    states.length * VERTICAL_NODE_H + (states.length - 1) * VERTICAL_GAP + 4
  const totalW = VERTICAL_NODE_W + 8

  return (
    <figure className="figure figure-narrow">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {states.slice(0, -1).map((_, i) => {
          const y1 = (i + 1) * VERTICAL_NODE_H + i * VERTICAL_GAP
          const y2 = (i + 1) * (VERTICAL_NODE_H + VERTICAL_GAP)
          return (
            <motion.line
              key={`c-${i}`}
              x1={totalW / 2}
              y1={y1}
              x2={totalW / 2}
              y2={y2}
              stroke={FIGURE_TOKENS.connector}
              strokeWidth={2}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: i * 0.09 + 0.2, duration: 0.3 },
                },
              }}
            />
          )
        })}
        {states.map((s, i) => {
          const y = i * (VERTICAL_NODE_H + VERTICAL_GAP)
          const x = (totalW - VERTICAL_NODE_W) / 2
          const style = NodeStyle(s.type)
          return (
            <motion.g
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.09, duration: 0.4 },
                },
              }}
            >
              <rect
                x={x}
                y={y}
                width={VERTICAL_NODE_W}
                height={VERTICAL_NODE_H}
                rx={VERTICAL_NODE_H / 2}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={2}
                strokeDasharray={style.dasharray}
              />
              <text
                x={totalW / 2}
                y={y + VERTICAL_NODE_H / 2}
                fontFamily={FIGURE_FONT}
                fontSize={12}
                fontWeight={500}
                fill={style.label}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {s.name}
              </text>
            </motion.g>
          )
        })}
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}

function Branching({
  states,
  branchAfterIndex,
  branchLabel,
  caption,
}: BranchingProps) {
  const totalW =
    states.length * BRANCHING_NODE_W + (states.length - 1) * BRANCHING_GAP
  const totalH = BRANCHING_SPUR_Y + BRANCHING_NODE_H + 4
  const exceptionStyle = NodeStyle("exception")
  const branchX =
    branchAfterIndex * (BRANCHING_NODE_W + BRANCHING_GAP) + BRANCHING_NODE_W / 2

  return (
    <figure className="figure">
      <motion.svg
        viewBox={`0 0 ${totalW} ${totalH}`}
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {states.slice(0, -1).map((_, i) => {
          const x1 = (i + 1) * BRANCHING_NODE_W + i * BRANCHING_GAP
          const x2 = (i + 1) * (BRANCHING_NODE_W + BRANCHING_GAP)
          return (
            <motion.line
              key={`c-${i}`}
              x1={x1}
              y1={BRANCHING_NODE_H / 2}
              x2={x2}
              y2={BRANCHING_NODE_H / 2}
              stroke={FIGURE_TOKENS.connector}
              strokeWidth={2}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { delay: i * 0.07 + 0.18, duration: 0.3 },
                },
              }}
            />
          )
        })}
        {states.map((s, i) => {
          const x = i * (BRANCHING_NODE_W + BRANCHING_GAP)
          const style = NodeStyle(s.type)
          return (
            <motion.g
              key={s.name}
              variants={{
                hidden: { opacity: 0, y: 6 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { delay: i * 0.07, duration: 0.4 },
                },
              }}
            >
              <rect
                x={x}
                y={0}
                width={BRANCHING_NODE_W}
                height={BRANCHING_NODE_H}
                rx={BRANCHING_NODE_H / 2}
                fill={style.fill}
                stroke={style.stroke}
                strokeWidth={2}
                strokeDasharray={style.dasharray}
              />
              <text
                x={x + BRANCHING_NODE_W / 2}
                y={BRANCHING_NODE_H / 2}
                fontFamily={FIGURE_FONT}
                fontSize={11}
                fontWeight={500}
                fill={style.label}
                dominantBaseline="middle"
                textAnchor="middle"
              >
                {s.name}
              </text>
            </motion.g>
          )
        })}
        <motion.path
          d={`M ${branchX} ${BRANCHING_NODE_H} V ${BRANCHING_SPUR_Y}`}
          stroke={FIGURE_TOKENS.exceptionConnector}
          strokeWidth={2}
          strokeDasharray="4 2"
          fill="none"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { delay: 0.4, duration: 0.3 },
            },
          }}
        />
        <motion.g
          variants={{
            hidden: { opacity: 0, y: 6 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { delay: 0.5, duration: 0.4 },
            },
          }}
        >
          <rect
            x={branchX - BRANCHING_NODE_W / 2}
            y={BRANCHING_SPUR_Y}
            width={BRANCHING_NODE_W}
            height={BRANCHING_NODE_H}
            rx={BRANCHING_NODE_H / 2}
            fill={exceptionStyle.fill}
            stroke={exceptionStyle.stroke}
            strokeWidth={2}
            strokeDasharray={exceptionStyle.dasharray}
          />
          <text
            x={branchX}
            y={BRANCHING_SPUR_Y + BRANCHING_NODE_H / 2}
            fontFamily={FIGURE_FONT}
            fontSize={11}
            fontWeight={500}
            fill={exceptionStyle.label}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {branchLabel}
          </text>
        </motion.g>
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}
