/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  output: 'export', // Enable static HTML export
  basePath: '', // Update if deploying to a subdirectory
  trailingSlash: true, // Add trailing slashes to URLs
}

export default nextConfig