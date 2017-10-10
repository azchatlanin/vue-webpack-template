const webpack = require('webpack')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const utils = require('./utils')

module.exports = {
  module: {
    rules: utils.styleLoaders({ 
      sourceMap: true,
      extract: true
    })
  },
  devtool: '#source-map',
  plugins: [
    new ProgressBarPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.(js|css|html|svg)$/,
      /* deleteOriginalAssets: true, */
      threshold: 0,
      minRatio: 0.8
    })
  ]
}