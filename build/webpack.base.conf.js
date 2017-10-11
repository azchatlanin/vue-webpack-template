const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')

module.exports =  {
  entry: {
    app: path.join(__dirname, '..', 'src')
  },
  output: {
    path: process.env.NODE_ENV === 'production'
    ? config.prod.assetsRoot
    : config.dev.assetsRoot,
    filename: 'js/[name].js',
    publicPath: process.env.NODE_ENV === 'production'
    ? config.prod.assetsPublicPath
    : config.dev.assetsPublicPath
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
  plugins: [
    new ExtractTextPlugin(
      process.env.NODE_ENV === 'production'
      ? config.prod.stylePath
      : config.dev.stylePath
    )
  ]
}