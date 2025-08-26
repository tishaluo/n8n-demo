const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://107.182.190.54:30003', // 后端服务地址
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};