const express = require('express')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const hostn = "localhost";
const app = next({ dev })
const helmet = require('helmet')
const { createProxyMiddleware } = require('http-proxy-middleware');

app.prepare().then(() => {
    const port = parseInt(process.env.PORT, 10) || 3000
    const server = express()
    const handle = app.getRequestHandler()

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

    server.use(handle);
    server.listen(port, hostn, (err) => {
        if (err) throw err
        console.log(`>> Ready on http://${hostn}:${port}`)
        if (process.send) process.send('ready')
    })
})