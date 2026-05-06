"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

const skylineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: "easeInOut" },
  },
}

const sunRise: Variants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.6, duration: 0.7, ease: "easeOut" },
  },
}

const productPulse: Variants = {
  hidden: { opacity: 0, x: -6 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.85 + i * 0.08, duration: 0.4 },
  }),
}

export function BuiltByCard() {
  return (
    <motion.aside
      className="builtby-card"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={cardVariants}
    >
      <motion.div className="builtby-art" aria-hidden="true">
        <svg viewBox="0 0 220 132" fill="none" className="builtby-svg">
          <line
            x1="0"
            y1="118"
            x2="220"
            y2="118"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.18"
          />
          <motion.circle
            cx="170"
            cy="62"
            r="22"
            fill="rgba(238,90,36,0.16)"
            stroke="#ee5a24"
            strokeWidth="1.5"
            variants={sunRise}
          />
          <motion.path
            d="M0 118 L24 118 L24 90 L36 90 L36 110 L52 110 L52 80 L68 80 L68 70 L80 70 L80 110 L96 110 L96 60 L108 60 L108 70 L120 70 L120 100 L138 100 L138 78 L152 78 L152 86 L168 86 L168 96 L196 96 L196 88 L220 88 L220 118 Z"
            fill="rgba(238,90,36,0.06)"
            stroke="currentColor"
            strokeOpacity="0.55"
            strokeWidth="1.6"
            strokeLinejoin="round"
            variants={skylineDraw}
          />
          <motion.path
            d="M86 60 L88 64 L92 64 L89 66 L90 70 L86 68 L82 70 L83 66 L80 64 L84 64 Z"
            fill="#ee5a24"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { delay: 1.2, duration: 0.4 },
              },
            }}
          />
          <motion.path
            d="M134 56 L136 60 L140 60 L137 62 L138 66 L134 64 L130 66 L131 62 L128 60 L132 60 Z"
            fill="#ee5a24"
            opacity="0.65"
            variants={{
              hidden: { opacity: 0, scale: 0 },
              visible: {
                opacity: 0.7,
                scale: 1,
                transition: { delay: 1.4, duration: 0.4 },
              },
            }}
          />
        </svg>
      </motion.div>
      <div className="builtby-body">
        <span className="builtby-eyebrow">Our workshop</span>
        <h3 className="builtby-title">Las Vegas, Nevada</h3>
        <p className="builtby-desc">
          Arc &amp; Anchor — the consulting firm and product studio behind
          Rubberfit, Sigilix.ai, and the Predict Market Bot. Working remote
          across the U.S. with the home base in Vegas.
        </p>
        <ul className="builtby-products" aria-label="Other Arc & Anchor products">
          <motion.li custom={0} variants={productPulse}>
            <span className="builtby-dot" aria-hidden="true" />
            Rubberfit
          </motion.li>
          <motion.li custom={1} variants={productPulse}>
            <span className="builtby-dot" aria-hidden="true" />
            Sigilix.ai
          </motion.li>
          <motion.li custom={2} variants={productPulse}>
            <span className="builtby-dot" aria-hidden="true" />
            Predict Market Bot
          </motion.li>
        </ul>
        <div className="builtby-cta">
          <Link
            href="https://www.arcanchor.com"
            className="builtby-link"
            target="_blank"
            rel="noreferrer"
          >
            arcandanchor.com
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M5 11 L11 5 M6 5 H11 V10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
          <Link
            href="https://www.arcanchor.com/about-us"
            className="builtby-link builtby-link--secondary"
            target="_blank"
            rel="noreferrer"
          >
            Meet the creators
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path
                d="M6 4 L10 8 L6 12"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>
    </motion.aside>
  )
}
