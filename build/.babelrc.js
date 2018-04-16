'use strict'

const browserslist = require('./browserslist')

const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: browserslist,
        modules: false,
        useBuiltIns: 'usage',
      }
    ],
    'vue'
  ],
  plugins: [
    '@babel/syntax-dynamic-import',
    '@babel/proposal-object-rest-spread',
    [
      'transform-imports',
      {
        vuetify: {
          transform: 'vuetify/es5/components/${member}',
          preventFullImport: true
        }
      }
    ],
    ...(isProduction
      ? [
          // on production
          'minify-dead-code-elimination'
        ]
      : [])
  ]
}
