const nodeExternals = require('webpack-node-externals');

module.exports = {
    reactStrictMode: true,
    env: {
        AZURE_KEY: process.env.AZURE_KEY,
    },
    webpack: (config, { isServer }) => {
        // client-side compilation
        if (!isServer) {
            config.externals = [
                {
                    'utf-8-validate': 'commonjs utf-8-validate',
                    bufferutil: 'commonjs bufferutil',
                },
            ];
        }

        return config;
    },
};
