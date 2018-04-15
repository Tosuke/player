const history = require('connect-history-api-fallback')
const convert = require('koa-connect')

module.exports = (env, argv) => {
  const config = require('./webpack.config')(env, argv)
  const serveConfig = {
    add(app, middleware, options) {
      // history api fallback
      app.use(convert(history()))
    }
  }
  config.serve = serveConfig
  return config
}
