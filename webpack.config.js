const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const baseConfig = {
  entry: {
    app: path.join(__dirname, 'src')
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  stats: {
    colors: true,
    modules: true,
    reasons: true,
    errorDetails: true
  },
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
    })
  ]
}
const productionConfig = () => {
  const config = {
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
  return merge(baseConfig, config)
}
const developmentConfig = () => {
  const config = {
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
    plugins: [      
      new webpack.WatchIgnorePlugin([
        path.join(__dirname, 'node_modules')
      ]),
      
      new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: ['You appication is running here http://localhost:8080', 'You appication is running here http://localhost:8080'],
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
  return merge(baseConfig, config)
}

module.exports = (env) => {
  console.log('env = ', env)
  if (env === 'production') return productionConfig()
  return developmentConfig()
}