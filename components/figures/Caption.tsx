"use client"

import { motion } from "framer-motion"

export function Caption({ children }: { children: React.ReactNode }) {
  return (
    <motion.figcaption
      className="figure-caption"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: 0.2, duration: 0.4 }}
    >
      {children}
    </motion.figcaption>
  )
}
