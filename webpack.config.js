const merge = require('webpack-merge')
const baseConf = require('./build/webpack.base.conf')
const prodConf = require('./build/webpack.prod.conf')
const devConf = require('./build/webpack.dev.conf')

module.exports = (env) => {
  console.log('env = ', env)
  if (env === 'production') return merge(baseConf, prodConf)
  return merge(baseConf, devConf)
}