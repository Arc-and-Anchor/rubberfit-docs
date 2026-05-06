/* Shared color + typography tokens for body figures.
   Built for dark mode (#0F1216 bg). The light-mode site uses Mill paper as bg
   and inverts via the .dark/.light scoping in figures.css. */

export type NodeStyle = {
  stroke: string
  fill: string
  label: string
  dasharray?: string
}

export const FIGURE_TOKENS: Record<
  "past" | "current" | "future" | "exception" | "parent" | "child",
  NodeStyle
> & { connector: string; exceptionConnector: string } = {
  past: {
    stroke: "rgba(246,245,242,0.45)",
    fill: "transparent",
    label: "rgba(246,245,242,0.7)",
  },
  current: {
    stroke: "#ee5a24",
    fill: "rgba(238,90,36,0.08)",
    label: "#ee5a24",
  },
  future: {
    stroke: "rgba(246,245,242,0.3)",
    fill: "transparent",
    label: "rgba(246,245,242,0.5)",
    dasharray: "4 3",
  },
  exception: {
    stroke: "rgba(238,90,36,0.55)",
    fill: "rgba(238,90,36,0.04)",
    label: "rgba(238,90,36,0.85)",
    dasharray: "4 2",
  },
  parent: {
    stroke: "#f6f5f2",
    fill: "rgba(246,245,242,0.04)",
    label: "#f6f5f2",
  },
  child: {
    stroke: "#ee5a24",
    fill: "rgba(238,90,36,0.06)",
    label: "rgba(246,245,242,0.9)",
  },
  connector: "rgba(246,245,242,0.55)",
  exceptionConnector: "rgba(238,90,36,0.5)",
}

export const FIGURE_FONT =
  "ui-monospace, SFMono-Regular, 'JetBrains Mono', Menlo, monospace"

export type FigureNodeType =
  | "past"
  | "current"
  | "future"
  | "exception"
  | "parent"
  | "child"
