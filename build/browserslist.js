'use strict'

const isProduction = process.env.NODE_ENV === 'production'

module.exports = isProduction ? ['>1% in JP'] : ['last 2 chrome versions']
