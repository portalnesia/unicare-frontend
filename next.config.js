/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config')
const { withSuperjson } = require('next-superjson')

const nextConfig = {
    i18n,
    output: 'standalone',
    reactStrictMode: true,
    poweredByHeader: false,
    swcMinify: process.env.NODE_ENV === "production",
    modularizeImports: {
        '@mui/material/styles': {
            transform: '@mui/material/styles/{{member}}',
        },
        '@mui/material/colors': {
            transform: '@mui/material/colors/{{member}}',
        },
        // '@mui/icons-material/?(((\\w*)?/?)*)': {
        //     transform: '@mui/icons-material/{{ matches.[1] }}/{{member}}',
        // },
        '@mui/lab/?(((\\w*)?/?)*)': {
            transform: '@mui/lab/{{ matches.[1] }}/{{member}}',
        },
        // '@mui/styles/?(((\\w*)?/?)*)': {
        //     transform: '@mui/styles/{{ matches.[1] }}/{{member}}',
        // },
    },
    transpilePackages: [
        '@mui/material',
        // '@mui/styled-engine',
        '@mui/x-date-pickers',
        '@mui/lab',
        // '@mui/styles',
        // '@mui/base',
        // '@mui/system',
        // '@mui/icons-material'
    ],
    compiler: {
        reactRemoveProperties: process.env.NODE_ENV === "production",
        ...(process.env.NODE_ENV === "production" ? {
            removeConsole: {
                exclude: ['error']
            }
        } : {}),
        emotion: true
    },
    webpack: (config, { dev, isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                mariadb: false,
                dns: false,
                process: false,
                child_process: false,
                perf_hooks: false
            }
            config.externals['node-fetch'] = 'fetch';
            config.externals['fetch'] = 'fetch';
            config.externals.push('pg-hstore')
        }
        // if (dev) {
        //     config.devtool = 'cheap-module-source-map';
        // }
        config.output.sourcePrefix = "";
        config.module.exprContextCritical = false;
        config.module.unknownContextCritical = false;
        config.module.rules.push(
            {
                test: /\.wasm$/,
                type: 'javascript/auto',
                loader: 'file-loader',
                options: {
                    publicPath: '/_next/static/',
                    outputPath: 'static/',
                    name: '[contenthash].[ext]',
                },
            }
        )
        return config;
    }
}

module.exports = withSuperjson()(nextConfig)
