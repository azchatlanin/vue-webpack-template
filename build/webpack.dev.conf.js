const path = require('path')
const webpack = require('webpack')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const utils = require('./utils')

module.exports = {
  devServer: {
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    },
    host: process.env.HOST,
    port: process.env.PORT
  },
  module: {
    rules: utils.styleLoaders({ sourceMap: true })
  },
  plugins: [      
    new webpack.WatchIgnorePlugin([
      path.join(__dirname, 'node_modules')
    ]),
    
    new FriendlyErrorsPlugin({
      compilationSuccessInfo: {
        messages: ['You appication is running here http://localhost:8080'],
        notes: ['Some additionsl notes to be displayed unpon successful compilatioin']
      },
      onErrors: function (severity, errors) {
/*         console.log('severity = ', severity)
        console.log('errors = ', errors) */
      },
      clearConsole: true
    }),
    new webpack.NoEmitOnErrorsPlugin(),    
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development')
      }
    })
  ]
}