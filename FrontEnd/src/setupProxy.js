const { createProxyMiddleware } = require('http-proxy-middleware');
// var cors = require('cors');

module.exports = function (app) {
    // app.use(cors()); // Use this after the variable declaration

    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8086/api/',
            changeOrigin: true,
        })
    );
};