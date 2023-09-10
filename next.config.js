/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    localeDetection: false,
  },
  reactStrictMode: true,
}

module.exports = nextConfig
