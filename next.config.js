/** @type {import('next').NextConfig} */
const nextConfig = {
  "output": "export",
  "distDir": "dist",
  env: {
    TIME_ZONE: { timeZone: "Asia/Ho_Chi_Minh" },
    LOCAL_CODE: "vi-VN",
  },
};

module.exports = nextConfig;
