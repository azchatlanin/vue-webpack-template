const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const config = require('../config')

module.exports =  {
  entry: {
    app: path.join(__dirname, '..', 'src/app.js')
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
  ],
  module: {
    rules: [ 
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [path.join(__dirname, '..', 'src')]
      },     
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('img', '[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: path.join('fonts', '[name].[hash:7].[ext]')
        }
      }
    ]
  }
}