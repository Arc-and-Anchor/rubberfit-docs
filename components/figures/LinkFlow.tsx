"use client"

import { motion } from "framer-motion"
import { FIGURE_FONT, FIGURE_TOKENS } from "./figure-tokens"
import { Caption } from "./Caption"

const ACCENT = "#ee5a24"
const NEUTRAL = "rgba(246,245,242,0.85)"
const LABEL = "rgba(246,245,242,0.7)"
const CENTER_Y = 44

export function LinkFlow({
  caption,
}: {
  caption?: React.ReactNode
}) {
  return (
    <figure className="figure">
      <motion.svg
        viewBox="0 0 380 110"
        className="figure-svg"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.line
          x1={76}
          y1={CENTER_Y}
          x2={148}
          y2={CENTER_Y}
          stroke={FIGURE_TOKENS.connector}
          strokeWidth={2}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { delay: 0.25, duration: 0.4 },
            },
          }}
        />
        <motion.line
          x1={216}
          y1={CENTER_Y}
          x2={288}
          y2={CENTER_Y}
          stroke={FIGURE_TOKENS.connector}
          strokeWidth={2}
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { delay: 0.5, duration: 0.4 },
            },
          }}
        />
        <motion.g
          variants={{
            hidden: { opacity: 0, x: -10 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
          }}
        >
          <path
            d="M30 18 H60 L72 30 V72 H30 Z"
            fill="none"
            stroke={NEUTRAL}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <path
            d="M60 18 V30 H72"
            fill="none"
            stroke={NEUTRAL}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <line x1={38} y1={42} x2={64} y2={42} stroke={NEUTRAL} strokeWidth={1.5} opacity={0.55} />
          <line x1={38} y1={50} x2={62} y2={50} stroke={NEUTRAL} strokeWidth={1.5} opacity={0.55} />
          <line x1={38} y1={58} x2={56} y2={58} stroke={NEUTRAL} strokeWidth={1.5} opacity={0.55} />
          <text
            x={51}
            y={94}
            fontFamily={FIGURE_FONT}
            fontSize={11}
            fontWeight={500}
            fill={LABEL}
            textAnchor="middle"
          >
            PDF rendered
          </text>
        </motion.g>
        <motion.g
          variants={{
            hidden: { opacity: 0, scale: 0.85 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0.35, duration: 0.4 },
            },
          }}
        >
          <circle
            cx={182}
            cy={CENTER_Y}
            r={24}
            fill="rgba(238,90,36,0.06)"
            stroke={ACCENT}
            strokeWidth={2}
          />
          <path
            d="M182 31 L195 38 V48 Q182 60 169 48 V38 Z"
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.6}
            strokeLinejoin="round"
          />
          <path
            d="M178 45 L181 48 L187 41"
            fill="none"
            stroke={ACCENT}
            strokeWidth={1.8}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={182}
            y={94}
            fontFamily={FIGURE_FONT}
            fontSize={11}
            fontWeight={500}
            fill={LABEL}
            textAnchor="middle"
          >
            Signed URL
          </text>
        </motion.g>
        <motion.g
          variants={{
            hidden: { opacity: 0, x: 10 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { delay: 0.55, duration: 0.4 },
            },
          }}
        >
          <circle
            cx={324}
            cy={CENTER_Y}
            r={24}
            fill="rgba(238,90,36,0.06)"
            stroke={ACCENT}
            strokeWidth={2}
          />
          <path
            d="M313 44 L321 52 L335 38"
            fill="none"
            stroke={ACCENT}
            strokeWidth={2.4}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x={324}
            y={94}
            fontFamily={FIGURE_FONT}
            fontSize={11}
            fontWeight={500}
            fill={LABEL}
            textAnchor="middle"
          >
            Customer opens
          </text>
        </motion.g>
      </motion.svg>
      {caption ? <Caption>{caption}</Caption> : null}
    </figure>
  )
}
