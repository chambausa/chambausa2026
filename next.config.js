/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Enable ISR for license pages
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  async redirects() {
    return [
      // WordPress slug → v5 slug redirects
      {
        source: '/licencia-electricista-nuevo-mexico',
        destination: '/licencia-electricista-new-mexico',
        permanent: true,
      },
      {
        source: '/licencia-plomeria-california',
        destination: '/licencia-plomero-california',
        permanent: true,
      },
      {
        source: '/licencia-plomeria-texas',
        destination: '/licencia-plomero-texas',
        permanent: true,
      },
      {
        source: '/licencia-plomeria-florida',
        destination: '/licencia-plomero-florida',
        permanent: true,
      },
      {
        source: '/licencia-plomeria-new-york',
        destination: '/licencia-plomero-new-york',
        permanent: true,
      },
      // Old newyork (no hyphen) redirect
      {
        source: '/licencia-electricista-newyork',
        destination: '/licencia-electricista-new-york',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
