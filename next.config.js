/** @type {import('next').NextConfig} */

const nextTranslate = require('next-translate');

module.exports = nextTranslate({
  reactStrictMode: false,
  webpack: (config, { isServer, webpack }) => {
    return config;
  },
  images: {
    domains: [
      'api.viettelmanufacturing.vn',
      'viettelhightech.com',
      'vmc-container.s3.ap-southeast-1.amazonaws.com',
    ],
  },
});
