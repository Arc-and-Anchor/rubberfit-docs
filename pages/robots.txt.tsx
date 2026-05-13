import type { GetServerSideProps } from "next";

const robots = `User-agent: *
Allow: /

Sitemap: https://docs.rubberfit.app/sitemap.xml
`;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader("Content-Type", "text/plain");
  res.write(robots);
  res.end();

  return {
    props: {},
  };
};

export default function Robots() {
  return null;
}
