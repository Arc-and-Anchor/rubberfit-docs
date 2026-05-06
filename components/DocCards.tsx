"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import styles from "./DocCards.module.css";

/* ============================================================
   Card frame
   ============================================================ */
function DocCard({
  href,
  num,
  label,
  title,
  body,
  visual,
  external,
}: {
  href: string;
  num: string;
  label: string;
  title: string;
  body: string;
  visual: React.ReactNode;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={styles.card}
    >
      <div className={styles.visual}>{visual}</div>
      <div className={styles.body}>
        <span className={styles.eyebrow}>
          {num} / {label}
        </span>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.descr}>{body}</p>
        <span className={styles.arrow}>
          Read docs
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/* ============================================================
   Visual 1 — Quickstart: blade + ruler + cut piece
   ============================================================ */
const v1Strip: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.6, ease: "circOut" } },
};
const v1Blade: Variants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 0.3, duration: 0.5, ease: "backOut" },
  },
};
const v1Piece: Variants = {
  hidden: { x: 0, y: 0, opacity: 0 },
  visible: {
    x: 10,
    y: 12,
    opacity: 1,
    transition: { delay: 0.6, duration: 0.5, ease: "easeOut" },
  },
};
const v1Spark: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1, transition: { delay: 0.8, duration: 0.2 } },
};

function QuickstartVisual() {
  return (
    <motion.svg
      viewBox="0 0 120 100"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* Ruler baseline */}
      <line x1="10" y1="82" x2="110" y2="82" stroke="currentColor" strokeWidth="1" opacity="0.15" />
      <line x1="10" y1="82" x2="10" y2="86" stroke="currentColor" strokeWidth="1" opacity="0.3" />
      <line x1="110" y1="82" x2="110" y2="86" stroke="currentColor" strokeWidth="1" opacity="0.3" />

      {/* Material strip */}
      <motion.rect
        x="10"
        y="60"
        width="100"
        height="6"
        rx="1"
        fill="currentColor"
        opacity="0.2"
        style={{ originX: 0.05, originY: 0.65 }}
        variants={v1Strip}
      />

      {/* Blade */}
      <motion.g variants={v1Blade}>
        <path d="M58 8 L62 8 L60 52 Z" fill="#ee5a24" />
        <line x1="60" y1="8" x2="60" y2="52" stroke="#ee5a24" strokeWidth="2" />
      </motion.g>

      {/* Cut piece — first cut, with vertical drift idle */}
      <motion.g
        variants={v1Piece}
        animate={{ y: [12, 14, 12] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.2 }}
      >
        <rect x="85" y="60" width="16" height="6" rx="1" fill="#ee5a24" />
      </motion.g>

      {/* Spark */}
      <motion.circle cx="105" cy="63" r="2" fill="#ee5a24" variants={v1Spark} />
    </motion.svg>
  );
}

/* ============================================================
   Visual 2 — Cutting engine: irregular polygons snapping into a sheet
   ============================================================ */
const v2Sheet: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 0.3,
    transition: { duration: 0.8, ease: "easeInOut" },
  },
};
const v2PartA: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.5, duration: 0.6, ease: "backOut" },
  },
};
const v2PartB: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 0.18,
    transition: { delay: 0.7, duration: 0.6, ease: "backOut" },
  },
};
const v2PartC: Variants = {
  hidden: { y: -20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 0.18,
    transition: { delay: 0.6, duration: 0.6, ease: "backOut" },
  },
};
const v2Dot: Variants = {
  hidden: { opacity: 0.2 },
  visible: (i: number) => ({
    opacity: [0.2, 1, 0.2],
    transition: {
      repeat: Infinity,
      duration: 2,
      ease: "easeInOut",
      delay: i * 0.3,
    },
  }),
};

function EngineVisual() {
  return (
    <motion.svg
      viewBox="0 0 120 100"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      <motion.path
        d="M10 10 H110 V90 H10 Z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        variants={v2Sheet}
      />

      <motion.path d="M20 70 L50 70 L45 50 L20 55 Z" fill="#ee5a24" variants={v2PartA} />
      <motion.path d="M55 75 L85 75 L90 55 L60 50 Z" fill="currentColor" variants={v2PartB} />
      <motion.path d="M20 20 L50 20 L45 40 L20 35 Z" fill="currentColor" variants={v2PartC} />

      <g>
        <motion.rect x="20" y="92" width="3" height="3" fill="currentColor" variants={v2Dot} custom={0} />
        <motion.rect x="28" y="92" width="3" height="3" fill="currentColor" variants={v2Dot} custom={1} />
        <motion.rect x="36" y="92" width="3" height="3" fill="#ee5a24" variants={v2Dot} custom={2} />
        <motion.rect x="44" y="92" width="3" height="3" fill="currentColor" variants={v2Dot} custom={3} />
      </g>
    </motion.svg>
  );
}

/* ============================================================
   Visual 3 — Inventory: lineage tree (parent roll → job + offcut)
   ============================================================ */
const v3Parent: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};
const v3LineL: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.5, delay: 0.3, ease: "easeInOut" },
  },
};
const v3LineR: Variants = {
  hidden: { pathLength: 0 },
  visible: {
    pathLength: 1,
    transition: { duration: 0.5, delay: 0.4, ease: "easeInOut" },
  },
};
const v3Job: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 0.18,
    scale: 1,
    transition: { delay: 0.6, duration: 0.4 },
  },
};
const v3Offcut: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.7, duration: 0.4 },
  },
};
const v3Po: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.6, transition: { delay: 0.9 } },
};

function InventoryVisual() {
  return (
    <motion.svg
      viewBox="0 0 120 100"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* Parent roll */}
      <motion.rect
        x="30"
        y="8"
        width="60"
        height="12"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        variants={v3Parent}
      />

      {/* Connector traces */}
      <motion.path
        d="M60 20 V35 H20 V48"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        variants={v3LineL}
      />
      <motion.path
        d="M60 35 H100 V48"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        variants={v3LineR}
      />

      {/* Child: job */}
      <motion.rect
        x="8"
        y="48"
        width="40"
        height="12"
        rx="1"
        fill="currentColor"
        variants={v3Job}
      />

      {/* Child: offcut — orange + breathing */}
      <motion.rect
        x="72"
        y="48"
        width="40"
        height="12"
        rx="1"
        fill="#ee5a24"
        variants={v3Offcut}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut", delay: 1.2 }}
        style={{ transformOrigin: "92px 54px" }}
      />

      {/* PO tag */}
      <motion.path
        d="M55 78 H75 V84 L71 88 H55 Z"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        variants={v3Po}
      />
      <motion.text
        x="65"
        y="86"
        textAnchor="middle"
        fontFamily="ui-monospace, monospace"
        fontSize="6"
        letterSpacing="0.18em"
        fill="currentColor"
        opacity="0.6"
        variants={v3Po}
      >
        PO
      </motion.text>
    </motion.svg>
  );
}

/* ============================================================
   Visual 4 — Security: defense-in-depth gate (RLS / RBAC / signed URL)
   ============================================================ */
const v4Frame: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6 } },
};
const v4BoltTop: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.5, ease: "circOut" },
  },
};
const v4BoltMid: Variants = {
  hidden: { x: 30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.6, duration: 0.5, ease: "circOut" },
  },
};
const v4BoltBot: Variants = {
  hidden: { x: -30, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { delay: 0.8, duration: 0.5, ease: "circOut" },
  },
};
const v4Doc: Variants = {
  hidden: { y: -40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay: 1.0, duration: 0.6, type: "spring", stiffness: 80 },
  },
};

function SecurityVisual() {
  return (
    <motion.svg
      viewBox="0 0 120 100"
      initial="hidden"
      animate="visible"
      aria-hidden="true"
    >
      {/* Channel frame */}
      <motion.path
        d="M35 10 H85 V90 H35 Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        variants={v4Frame}
      />

      {/* RLS bolt — row-divider marks */}
      <motion.g variants={v4BoltTop}>
        <path d="M20 24 H60 V32 H20 Z" fill="currentColor" opacity="0.18" />
        <line x1="30" y1="24" x2="30" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="40" y1="24" x2="40" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="50" y1="24" x2="50" y2="32" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </motion.g>

      {/* RBAC bolt — split with orange aperture */}
      <motion.g variants={v4BoltMid}>
        <rect x="60" y="46" width="14" height="8" rx="1" fill="currentColor" opacity="0.18" />
        <rect x="86" y="46" width="14" height="8" rx="1" fill="currentColor" opacity="0.18" />
        <circle cx="80" cy="50" r="3" fill="#ee5a24" />
      </motion.g>

      {/* Signed-URL bolt + signature wave */}
      <motion.g variants={v4BoltBot}>
        <path d="M20 68 H60 V76 H20 Z" fill="currentColor" opacity="0.18" />
        <path
          d="M20 80 Q30 76 40 80 T60 80"
          stroke="#ee5a24"
          strokeWidth="1.5"
          fill="none"
        />
      </motion.g>

      {/* Document token — drops + bobs */}
      <motion.g
        variants={v4Doc}
        animate={{ y: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1.6 }}
      >
        <path d="M56 42 H66 V48 L62 52 H56 Z" fill="#ee5a24" />
        <path d="M62 48 H66 L62 52 Z" fill="#ee5a24" opacity="0.6" />
      </motion.g>
    </motion.svg>
  );
}

/* ============================================================
   Public — DocCards grid
   ============================================================ */
export function DocCards() {
  return (
    <div className={styles.grid}>
      <DocCard
        href="/getting-started/quickstart"
        num="01"
        label="Quickstart"
        title="Quickstart"
        body="Sign up, scan your first roll, run a Pack, and ship the cut — under 15 minutes."
        visual={<QuickstartVisual />}
      />
      <DocCard
        href="/cutting-engine/overview"
        num="02"
        label="Engine"
        title="Cutting engine"
        body="How Auto Nest and Free-roam work, and what the Rust + sparrow GLS pipeline does under the hood."
        visual={<EngineVisual />}
      />
      <DocCard
        href="/inventory/rolls"
        num="03"
        label="Inventory"
        title="Roll & offcut model"
        body="Roll lineage, offcuts as first-class inventory, reorder rules, suppliers, POs."
        visual={<InventoryVisual />}
      />
      <DocCard
        href="/security/posture"
        num="04"
        label="Security"
        title="Security posture"
        body="RLS at the database, six-role RBAC enforced twice, audit log, and the SOC 2 roadmap."
        visual={<SecurityVisual />}
      />
    </div>
  );
}
