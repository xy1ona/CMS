const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
    app.use(
        "/foo",
        createProxyMiddleware({
            target: process.env.SERVER_PORT+'manage',
            changeOrigin: true,
            pathRewrite: {
                "/foo": "",
            },
        })
    );
};