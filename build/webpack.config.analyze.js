const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = (env, argv) => {
  const config = require('./webpack.config')(env, argv)
  config.plugins.push(new BundleAnalyzerPlugin())
  return config
}