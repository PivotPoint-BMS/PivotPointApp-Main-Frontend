/** @type {import('next').NextConfig} */

const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})

module.exports = withPWA({
  reactStrictMode: true,
  distDir: "build",
  async redirects() {
    return [
      {
        source: "/",
        destination: "/app/crm/dashboard",
        permanent: true,
      },
      {
        source: "/app",
        destination: "/app/crm/dashboard",
        permanent: true,
      },
      {
        source: "/auth",
        destination: "/auth/login",
        permanent: true,
      },
      {
        source: "/app/crm",
        destination: "/app/crm/dashboard",
        permanent: true,
      },
      {
        source: "/app/hrm",
        destination: "/app/hrm/dashboard",
        permanent: true,
      },
      {
        source: "/app/fm",
        destination: "/app/fm/dashboard",
        permanent: true,
      },
      {
        source: "/app/im",
        destination: "/app/im/dashboard",
        permanent: true,
      },
      {
        source: "/app/pm",
        destination: "/app/pm/dashboard",
        permanent: true,
      },
      {
        source: "/app/scm",
        destination: "/app/scm/dashboard",
        permanent: true,
      },
    ]
  },
  i18n: {
    locales: ["en", "fr", "ar"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },
})
