const path = require('path')
const DotenvPlugin = require('dotenv-webpack')
const HtmlPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PreloadPlugin = require('preload-webpack-plugin')
const ScriptExtPlugin = require('script-ext-html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = (env, argv) => {
  const mode = (argv || {}).mode || 'development'
  const isProduction = mode === 'production'

  const targetBrowsers = isProduction
    ? ['>1% in JP']
    : ['last 2 chrome versions']

  const babelConfig = {
    presets: [
      [
        'vue-app',
        {
          targets: {
            browsers: targetBrowsers
          }
        }
      ]
    ],
    plugins: [...(isProduction ? ['minify-dead-code-elimination'] : [])]
  }

  const dotEnvPaths = [
    {
      path: 'env/.env', example: 'env/.env.example'
    },
    {
      path: `env/.env-${isProduction ? 'prod' : 'dev'}`,
      example: 'env/.env-mode.example'
    }
  ]

  const rules = [
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: isProduction
      }
    },
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: babelConfig
    },
    {
      test: /\.css$/,
      use: isProduction
        ? ExtractTextPlugin.extract({
            use: 'css-loader',
            fallback: 'vue-style-loader'
          })
        : ['vue-style-loader', 'css-loader']
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

          new ExtractTextPlugin({
            filename: '[name].css'
          })
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
    plugins
  }
}
