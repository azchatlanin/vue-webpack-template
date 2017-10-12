const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const utils = require('./utils')
const config = require('../config')
const merge = require('webpack-merge')
const baseConf = require('./webpack.base.conf')

const env = config.prod.env

module.exports = merge(baseConf, {
  module: {
    rules: utils.styleLoaders({ 
      sourceMap: true,
      extract: true
    })
  },
  devtool: config.prod.productionSourceMap ? '#source-map' : false,
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Vue-webpack template step by step',
      filename: 'index.html',
      inject: true,
      hash: true,
      template: 'index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.prod.productionGzipExtensions.join('|') + ')$'
      ),
      /* deleteOriginalAssets: true, */
      threshold: 0,
      minRatio: 0.8
    }),
    new ExtractTextPlugin(config.prod.stylePath),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        warnings: false,
        drop_console: true,
        unsafe: true
      },
      sourceMap: true
    })
  ]
})