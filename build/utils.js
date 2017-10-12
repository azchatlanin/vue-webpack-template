const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

exports.cssLoaders = function (options) {
  options = options || {}

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: options.extract,
      sourceMap: options.sourceMap
    }
  }

  function generateLoaders (loader) {
    let loaders = [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader,
        options: {
          sourceMap: options.sourceMap
        }
      })
    }

    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      })
    } else {
      return ['style-loader'].concat(loaders)
    }
  }

  return {
    css: generateLoaders(),
    styl: generateLoaders('stylus-loader'),
    stylus: generateLoaders('stylus-loader')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  
  return output
}