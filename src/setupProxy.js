const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/mock', {
      target: 'http://localhost:9000',
      changeOrigin: true,
      logLevel: 'debug',
      pathRewrite(path, req) {
        const newPath = path.replace('/mock', '/mock/react-starter-kit');
        return `${newPath}.json`;
      },
    })
  );
};
