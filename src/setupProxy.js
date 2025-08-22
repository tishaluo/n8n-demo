const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://192.168.0.201:8080', // 后端服务地址
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    })
  );
};