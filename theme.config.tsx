import React from "react";
import type { DocsThemeConfig } from "nextra-theme-docs";
import { useConfig } from "nextra-theme-docs";

const SITE_URL = "https://docs.rubberfit.app";
const PREVIEW_IMAGE_URL = `${SITE_URL}/social-preview.png`;

const RubberfitMark = () => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
    <svg width="22" height="22" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect
        x="2.5"
        y="2.5"
        width="27"
        height="27"
        stroke="currentColor"
        strokeWidth="2"
      />
      <rect x="10" y="10" width="12" height="12" fill="#ee5a24" />
    </svg>
    <span style={{ fontWeight: 600, fontSize: 18, letterSpacing: "-0.01em" }}>
      Rubberfit
    </span>
    <span
      style={{
        fontFamily: "ui-monospace, JetBrains Mono, monospace",
        fontSize: 10,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        opacity: 0.6,
        marginLeft: 4,
      }}
    >
      Docs
    </span>
  </span>
);

function DocsHead() {
  const { frontMatter, title: pageTitle } = useConfig();
  const description =
    frontMatter.description ??
    "Documentation for RubberFit — setup, operations, security, and troubleshooting for rubber-roll manufacturing teams.";
  const title =
    pageTitle === "Introduction" ? "RubberFit Docs" : `${pageTitle} - RubberFit Docs`;

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="RubberFit Docs" />
      <meta property="og:image" content={PREVIEW_IMAGE_URL} />
      <meta property="og:image:alt" content="RubberFit Docs" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={PREVIEW_IMAGE_URL} />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <meta name="theme-color" content="#ee5a24" />
    </>
  );
}

const config: DocsThemeConfig = {
  logo: <RubberfitMark />,
  project: {
    link: "https://github.com/Arc-and-Anchor/rubberfit-docs",
  },
  docsRepositoryBase:
    "https://github.com/Arc-and-Anchor/rubberfit-docs/blob/main",
  footer: {
    content: (
      <span>
        © {new Date().getFullYear()} Rubberfit · Built by{" "}
        <a
          href="https://www.arcanchor.com"
          target="_blank"
          rel="noreferrer"
          style={{ borderBottom: "1px solid currentColor" }}
        >
          Arc &amp; Anchor
        </a>{" "}
        — Las Vegas, NV
      </span>
    ),
  },
  color: {
    hue: 16,
    saturation: 86,
  },
  search: {
    placeholder: "Search docs…",
  },
  toc: {
    backToTop: true,
  },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  head: DocsHead,
  darkMode: true,
  nextThemes: {
    defaultTheme: "light",
  },
};

export default config;
