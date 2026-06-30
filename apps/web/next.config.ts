/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
    experimental: {
        viewTransition: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'www.beeaerospace.com',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'jpouktmcsliceesoassj.supabase.co',
                pathname: '/**',
            }
        ]

    }
};

export default nextConfig;
