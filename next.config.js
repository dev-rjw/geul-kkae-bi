// @ts-check
// 환경 변수에서 호스트 이름 추출
const SUPABASE_API_URL = process.env.NEXT_PUBLIC_SUPABASE_API_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_API_URL).hostname
  : '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: SUPABASE_API_URL,
      },
    ],
  },
};

module.exports = nextConfig;
