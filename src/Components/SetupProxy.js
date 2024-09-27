const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://stage-merchant-report.sabpaisa.in',
      changeOrigin: true,
      secure: false, // This may be required if the server uses self-signed certificates
      onProxyReq: (proxyReq, req, res) => {
        // Remove headers that might cause problems
        proxyReq.removeHeader('Origin');
      }
    })
  );
};
