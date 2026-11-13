/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/supabase/:path*',
        destination: 'https://jsyjwaykeuntnlrdzxkxb.supabase.co/:path*',
      },
    ]
  },
}
module.exports = nextConfig
