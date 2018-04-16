const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const DotenvPlugin = require('dotenv-webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractCSSPlugin = require('mini-css-extract-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const PreloadPlugin = require('preload-webpack-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (env, argv) => {
  const mode = (argv || {}).mode || 'development'
  const isProduction = mode === 'production'
  process.env.NODE_ENV = isProduction ? 'production' : 'development'

  const dotEnvPaths = [
    {
      path: 'env/.env',
      example: 'env/.env.example'
    },
    {
      path: `env/.env-${isProduction ? 'prod' : 'dev'}`,
      example: 'env/.env-mode.example'
    }
  ]

  function generateCSSRule(loaders) {
    return {
      use: [
        isProduction ? ExtractCSSPlugin.loader : 'vue-style-loader',
        ...loaders
      ]
    }
  }
  
  const rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: require('./.babelrc')
    },
    {
      test: /\.css$/,
      ...generateCSSRule(['css-loader'])
    },
    {
      test: /\.styl$/,
      ...generateCSSRule(['css-loader', 'stylus-loader'])
    },
    {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'img/[name].[hash:7].[ext]'
      }
    }
  ]

  const plugins = [
    ...dotEnvPaths.map(
      p =>
        new DotenvPlugin({
          path: resolve(p.path),
          safe: resolve(p.example),
          systemvars: true
        })
    ),
    new VueLoaderPlugin(),
    new HtmlPlugin({
      filename: 'index.html',
      template: resolve('./src/index.html'),
      minify: {
        caseSensitive: isProduction,
        collapseBooleanAttributes: isProduction,
        collapseInlineTagWhitespace: isProduction,
        collapseWhitespace: isProduction,
        removeAttributeQuotes: isProduction,
        removeComments: isProduction,
        html5: isProduction
      }
    }),
    ...(isProduction
      ? [
          // on production build
          new PreloadPlugin({
            rel: 'preload',
            include: 'initial'
          }),
          new PreloadPlugin({
            rel: 'prefetch',
            include: 'asyncChunks'
          }),
          new ScriptExtPlugin({
            defaultAttribute: 'defer'
          }),
          new ExtractCSSPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
          }),
          new OptimizeCSSPlugin()
        ]
      : [])
  ]

  const optimization = {
    ...(isProduction
      ? {
          // on production
          splitChunks: {
            name: 'vendor',
            chunks: 'initial'
          }
        }
      : {})
  }

  return {
    mode,
    entry: {
      app: resolve('./src/index.js')
    },
    output: {
      path: resolve('./public'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        vue$: 'vue/dist/vue.runtime.esm.js',
        '@': resolve('./src')
      }
    },
    module: {
      rules
    },
    plugins,
    optimization
  }
}
