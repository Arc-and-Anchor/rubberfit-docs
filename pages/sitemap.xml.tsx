import type { GetServerSideProps } from "next";

const SITE_URL = "https://docs.rubberfit.app";

const paths = [
  "",
  "/getting-started/quickstart",
  "/getting-started/setup",
  "/getting-started/first-cut",
  "/cutting-engine/overview",
  "/cutting-engine/auto-nest",
  "/cutting-engine/free-roam",
  "/cutting-engine/performance",
  "/inventory/rolls",
  "/inventory/offcuts",
  "/inventory/purchase-orders",
  "/inventory/reorder-rules",
  "/inventory/suppliers",
  "/jobs/lifecycle",
  "/jobs/operator-assignment",
  "/jobs/customer-pdfs",
  "/barcode/labels",
  "/barcode/scanning",
  "/audit-history/cut-history",
  "/audit-history/admin-audit-log",
  "/roles-rbac/the-six-roles",
  "/roles-rbac/permission-matrix",
  "/security/posture",
  "/security/data-handling",
  "/security/soc2-roadmap",
  "/troubleshooting/common-issues",
  "/troubleshooting/contact-support",
];

function buildSitemap() {
  const lastmod = new Date().toISOString();
  const urls = paths
    .map(
      (path) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${lastmod}</lastmod>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "application/xml");
  res.write(buildSitemap());
  res.end();

  return {
    props: {},
  };
};

export default function Sitemap() {
  return null;
}
