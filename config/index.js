'use strict'
const path = require('path')

module.exports = {
  prod:{
    assetsRoot: path.join(__dirname, '..', 'dist'),
    assetsPublicPath: '/',
    stylePath: 'css/styles.css',
    env: {
      NODE_ENV: JSON.stringify('production')
    },
    productionSourceMap: true,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    assetsRoot: path.join(__dirname, '..', 'dist'),
    assetsPublicPath: '/',
    stylePath: 'css/styles.css',
    env: {
      NODE_ENV: JSON.stringify('development')
    },
    port: process.env.PORT || 8080,
    host: process.env.HOST || 'localhost'
  }
}