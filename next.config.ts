import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/github",
        destination: "https://github.com/Krishmahajan334",
        permanent: true,
      },
      {
        source: "/linkedin",
        destination: "https://in.linkedin.com/in/krish-mahajan-617b50206",
        permanent: true,
      },
      {
        source: "/instagram",
        destination: "https://www.instagram.com/mahajanclicks.io",
        permanent: true,
      },
      {
        source: "/linktree",
        destination: "https://linktr.ee/krishmahajan1008",
        permanent: true,
      },
      {
        source: "/resume",
        destination: "/Krish_Mahajan_Resume_P.pdf",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
