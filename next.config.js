/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_URL: process.env.BACKEND_URL,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    MONGODB_URI: process.env.MONGODB_URI,
    EMAIL_SERVER_USER: process.env.EMAIL_SERVER_USER,
    EMAIL_SERVER_PASSWORD: process.env.EMAIL_SERVER_PASSWORD,
    EMAIL_SERVER_HOST: process.env.EMAIL_SERVER_HOST,
    EMAIL_SERVER_PORT: process.env.EMAIL_SERVER_PORT,
    EMAIL_FROM: process.env.EMAIL_FROM,
    RECAPTCHA_SITE_KEY: process.env.RECAPTCHA_SITE_KEY,
    RECAPTCHA_SECRET_KEY: process.env.RECAPTCHA_SECRET_KEY,
    NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  },
  images: {
    domains: ["picsum.photos", "sgoatc.vercel.app", "botrix-bucket.s3.eu-west-3.amazonaws.com", "img.freepik.com", "cloudflare-ipfs.com", "loremflickr.com", "avatars.githubusercontent.com"],

  },
};

module.exports = nextConfig;
