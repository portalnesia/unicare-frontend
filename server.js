const path = require('path')
const { createServerHandler } = require('next/dist/server/lib/render-server-standalone')

const express = require('express')
const helmet = require('helmet')
const { createProxyMiddleware } = require('http-proxy-middleware');

const dir = path.join(__dirname)
process.env.NODE_ENV = 'production'
process.chdir(__dirname)

// Make sure commands gracefully respect termination signals (e.g. from Docker)
// Allow the graceful termination to be manually configurable
if (!process.env.NEXT_MANUAL_SIG_HANDLE) {
    process.on('SIGTERM', () => process.exit(0))
    process.on('SIGINT', () => process.exit(0))
}

const currentPort = parseInt(process.env.PORT, 10) || 80
const hostname = '0.0.0.0'
const keepAliveTimeout = parseInt(process.env.KEEP_ALIVE_TIMEOUT, 10);
const nextConfig = { "env": {}, "eslint": { "ignoreDuringBuilds": false }, "typescript": { "ignoreBuildErrors": false, "tsconfigPath": "tsconfig.json" }, "distDir": "./.next", "cleanDistDir": true, "assetPrefix": "", "configOrigin": "next.config.js", "useFileSystemPublicRoutes": true, "generateEtags": true, "pageExtensions": ["tsx", "ts", "jsx", "js"], "poweredByHeader": false, "compress": true, "analyticsId": "", "images": { "deviceSizes": [640, 750, 828, 1080, 1200, 1920, 2048, 3840], "imageSizes": [16, 32, 48, 64, 96, 128, 256, 384], "path": "/_next/image", "loader": "default", "loaderFile": "", "domains": [], "disableStaticImages": false, "minimumCacheTTL": 60, "formats": ["image/webp"], "dangerouslyAllowSVG": false, "contentSecurityPolicy": "script-src 'none'; frame-src 'none'; sandbox;", "contentDispositionType": "inline", "remotePatterns": [], "unoptimized": false }, "devIndicators": { "buildActivity": true, "buildActivityPosition": "bottom-right" }, "onDemandEntries": { "maxInactiveAge": 15000, "pagesBufferLength": 2 }, "amp": { "canonicalBase": "" }, "basePath": "", "sassOptions": {}, "trailingSlash": false, "i18n": { "locales": ["en", "id"], "defaultLocale": "en" }, "productionBrowserSourceMaps": false, "optimizeFonts": true, "excludeDefaultMomentLocales": true, "serverRuntimeConfig": {}, "publicRuntimeConfig": {}, "reactStrictMode": true, "httpAgentOptions": { "keepAlive": true }, "outputFileTracing": true, "staticPageGenerationTimeout": 60, "swcMinify": true, "output": "standalone", "modularizeImports": { "@mui/material/styles": { "transform": "@mui/material/styles/{{member}}" }, "@mui/material/colors": { "transform": "@mui/material/colors/{{member}}" }, "@mui/lab/?(((\\w*)?/?)*)": { "transform": "@mui/lab/{{ matches.[1] }}/{{member}}" } }, "experimental": { "caseSensitiveRoutes": false, "useDeploymentId": false, "useDeploymentIdServerActions": false, "clientRouterFilter": true, "clientRouterFilterRedirects": false, "fetchCacheKeyPrefix": "", "middlewarePrefetch": "flexible", "optimisticClientCache": true, "manualClientBasePath": false, "legacyBrowsers": false, "newNextLinkBehavior": true, "cpus": 15, "memoryBasedWorkersCount": false, "sharedPool": true, "isrFlushToDisk": true, "workerThreads": false, "pageEnv": false, "optimizeCss": false, "nextScriptWorkers": false, "scrollRestoration": false, "externalDir": false, "disableOptimizedLoading": false, "gzipSize": true, "swcFileReading": true, "craCompat": false, "esmExternals": true, "appDir": true, "isrMemoryCacheSize": 52428800, "fullySpecified": false, "outputFileTracingRoot": "C:\\Users\\adity\\Northbit\\unicare\\unicare-frontend", "swcTraceProfiling": false, "forceSwcTransforms": false, "largePageDataBytes": 128000, "adjustFontFallbacks": false, "adjustFontFallbacksWithSizeAdjust": false, "typedRoutes": false, "instrumentationHook": false, "trustHostHeader": false }, "configFileName": "next.config.js", "transpilePackages": ["@mui/material", "@mui/x-date-pickers", "@mui/lab"], "compiler": { "reactRemoveProperties": true, "removeConsole": { "exclude": ["error"] }, "emotion": true } }

process.env.__NEXT_PRIVATE_STANDALONE_CONFIG = JSON.stringify(nextConfig)

createServerHandler({
    port: currentPort,
    hostname,
    dir,
    conf: nextConfig,
}).then((nextHandler) => {
    const server = express();

    const useApiProxy = (req, res, next) => {
        const apiProxy = createProxyMiddleware({
            target: process.env.NEXT_PUBLIC_API_URL,
            changeOrigin: true,
            headers: {
                host: process.env.NEXT_PUBLIC_API_URL
            },
            logLevel: 'error'
        });
        return apiProxy(req, res, next);
    }

    server.use(helmet.dnsPrefetchControl());
    // server.use(helmet.expectCt());
    server.use(helmet.frameguard());
    server.use(helmet.hidePoweredBy());
    server.use(helmet.hsts());
    server.use(helmet.ieNoOpen());
    server.use(helmet.noSniff());
    server.use(helmet.permittedCrossDomainPolicies());
    server.use(helmet.referrerPolicy({
        policy: "strict-origin-when-cross-origin"
    }));
    server.use(helmet.xssFilter());

    server.use("/api", useApiProxy);
    // server.use("/assets", useApiProxy);

    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use(nextHandler)



    const running = server.listen(currentPort, hostname, (err) => {
        if (err) throw err
        console.log(`>> Ready on http://${hostname}:${currentPort}`)
        if (process.send) process.send('ready')
    })

    if (
        !Number.isNaN(keepAliveTimeout) &&
        Number.isFinite(keepAliveTimeout) &&
        keepAliveTimeout >= 0
    ) {
        running.on('connection', function (socket) {
            socket.setTimeout(keepAliveTimeout)
        })
    }
})