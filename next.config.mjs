/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {

            config.resolve.fallback = {
                ...config.resolve.fallback,
                canvas: false,
            };

            config.externals.push({
                canvas: 'canvas'
            });
        }


        config.module.rules.push({
            test: /\.node$/,
            use: 'ignore-loader',
        });

        return config;
    },
};

export default nextConfig;