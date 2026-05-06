"use client"

import Link from "next/link"
import { motion, type Variants } from "framer-motion"

export type SeeAlsoLink = {
  title: string
  href: string
  blurb?: string
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
}

export function SeeAlso({
  links,
  heading = "See also",
}: {
  links: SeeAlsoLink[]
  heading?: string
}) {
  if (links.length === 0) return null
  return (
    <section className="see-also" aria-label={heading}>
      <h2 className="see-also-heading">
        <span className="see-also-heading-mark" aria-hidden="true" />
        {heading}
      </h2>
      <motion.div
        className="see-also-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {links.map((link) => (
          <motion.div
            key={link.href}
            variants={itemVariants}
            className="see-also-item"
          >
            <Link href={link.href} className="see-also-link">
              <span className="see-also-title">
                <span>{link.title}</span>
                <svg
                  className="see-also-arrow"
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M6 12 L10 8 L6 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                </svg>
              </span>
              {link.blurb ? (
                <span className="see-also-blurb">{link.blurb}</span>
              ) : null}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
