module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  api: 'http://127.0.0.1:3366',
  app: {
    title: 'webpack-serve'
  }
})