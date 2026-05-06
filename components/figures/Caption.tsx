"use client"

import { motion } from "framer-motion"

export function Caption({
  number,
  children,
}: {
  number?: string
  children: React.ReactNode
}) {
  return (
    <motion.figcaption
      className="figure-caption"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {number ? <span className="figure-caption-num">{number}</span> : null}
      <span>{children}</span>
    </motion.figcaption>
  )
}
