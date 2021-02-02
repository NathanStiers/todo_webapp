const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use('/api', proxy({
    target: 'https://todo-api-devv.herokuapp.com/',
    changeOrigin: true,
    pathRewrite: {
        '^/api/': '/' // remove base path
      },
  }));
};
