import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },
    experimental: {
        optimizePackageImports: ["@chakra-ui/react"],
    },
    // Optional: Add transpilePackages if using other UI libraries
    transpilePackages: [
        '@chakra-ui/react',
        '@chakra-ui/system',
        '@chakra-ui/theme-tools',
    ],
};

export default nextConfig;