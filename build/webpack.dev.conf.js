const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const utils = require('./utils')
const config = require('../config')

const env = config.dev.env
const host = config.dev.host
const port = config.dev.port

module.exports = {
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    host: host,
    port: port
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: true })
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue-webpack template step by step',
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),      
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules')
    ]),
    new ExtractTextPlugin(config.dev.stylePath),
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You appication is running here http://localhost:8080'],
        notes: ['Some additionsl notes to be displayed unpon successful compilatioin']
      },
      clearConsole: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),    
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}