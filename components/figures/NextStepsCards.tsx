"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import type { ReactNode } from "react"

export type NextStepItem = {
  title: string
  description: string
  href: string
  icon: ReactNode
}

export function NextStepsCards({ items }: { items: NextStepItem[] }) {
  return (
    <div className="next-steps-grid">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ delay: i * 0.06, duration: 0.35 }}
        >
          <Link href={item.href} className="next-steps-card">
            <span className="next-steps-icon" aria-hidden="true">
              {item.icon}
            </span>
            <span className="next-steps-body">
              <span className="next-steps-title">{item.title}</span>
              <span className="next-steps-desc">{item.description}</span>
              <span className="next-steps-arrow">
                Read docs
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  width="14"
                  height="14"
                  aria-hidden="true"
                >
                  <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </span>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

/* ============================================================
   Icon set — 32px stroke-only, currentColor inherits
   ============================================================ */

function IconSvg({ children }: { children: ReactNode }) {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  )
}

export function IconOperatorRoles() {
  return (
    <IconSvg>
      <path d="M16 4 L24 8 V17 Q16 26 8 17 V8 Z" />
      <circle cx="16" cy="14" r="2.6" />
      <path d="M11.5 21 Q16 17 20.5 21" />
    </IconSvg>
  )
}

export function IconReorderRules() {
  return (
    <IconSvg>
      <path d="M6 12 H22" />
      <path d="M19 9 L22 12 L19 15" />
      <path d="M26 22 H10" />
      <path d="M13 25 L10 22 L13 19" />
      <circle cx="6" cy="12" r="1.4" fill="currentColor" stroke="none" />
      <circle cx="26" cy="22" r="1.4" fill="currentColor" stroke="none" />
    </IconSvg>
  )
}

export function IconFreeRoam() {
  return (
    <IconSvg>
      <rect x="5" y="5" width="22" height="22" rx="2" />
      <circle cx="16" cy="16" r="2" fill="currentColor" stroke="none" />
      <path d="M16 12 V8 M19 11 L16 8 L13 11" />
      <path d="M16 20 V24 M13 21 L16 24 L19 21" />
      <path d="M12 16 H8 M11 13 L8 16 L11 19" />
      <path d="M20 16 H24 M21 13 L24 16 L21 19" />
    </IconSvg>
  )
}

export function IconBrandedPDF() {
  return (
    <IconSvg>
      <path d="M9 4 H20 L25 9 V28 H9 Z" />
      <path d="M20 4 V9 H25" />
      <rect x="13" y="14" width="8" height="3" />
      <line x1="13" y1="20" x2="21" y2="20" />
      <line x1="13" y1="23" x2="19" y2="23" />
    </IconSvg>
  )
}

export function IconAutoNest() {
  return (
    <IconSvg>
      <rect x="5" y="6" width="22" height="20" rx="1" />
      <path d="M8 11 L13 11 L12 16 L8 15 Z" fill="currentColor" stroke="none" opacity="0.7" />
      <path d="M15 12 L21 13 L22 18 L16 19 Z" />
      <path d="M9 18 L14 18 L13 23 L9 22 Z" />
      <path d="M16 21 L23 22 L23 24 L17 24 Z" />
    </IconSvg>
  )
}

export function IconFreeRoamCanvas() {
  return (
    <IconSvg>
      <rect x="5" y="5" width="22" height="22" rx="1" />
      <path d="M9 19 L14 13 L18 17 L23 11" />
      <circle cx="14" cy="13" r="1.6" fill="currentColor" stroke="none" />
      <circle cx="18" cy="17" r="1.6" fill="currentColor" stroke="none" />
    </IconSvg>
  )
}
