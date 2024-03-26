const webpack = require('webpack')
const path = require('path')

/**
 * @type { import("webpack-cli").ConfigOptions }
 */
module.exports = {
  entry: './dist/index.js',

  resolve: {
    extensions: ['.js'],
    alias: {
      Cltp: path.resolve(__dirname, './dist/index.js')
    }
  },
  output: {
    clean: true,
    path: path.resolve(__dirname, 'dist/browser'),
    filename: 'cltp.min.js',
    library: 'Cltp',
    libraryTarget: 'window'
  }
}
