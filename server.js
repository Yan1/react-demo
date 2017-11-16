const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const openBrowserWebpackPlugin = require('open-browser-webpack-plugin')
const shelljs = require('shelljs')

shelljs.cp('./src/config/index.js', './dist/config.js')

const PORT = process.env.PORT || 3001
const url = 'http://localhost:' + PORT

let webpackConfig = require('./webpack.config')
webpackConfig.entry.unshift('webpack-dev-server/client?' + url, 'webpack/hot/dev-server')
webpackConfig.plugins.push(new openBrowserWebpackPlugin({url}))

const compiler = Webpack(webpackConfig)

const server = new WebpackDevServer(compiler, {
  historyApiFallback: true,
  disableHostCheck: true,
  compress: true,
  inline: true,
  stats: {colors: true},
  open: true,
  hot: true,
  noInfo: true,  // 会将很多打包的信息去掉
})

server.listen(PORT, () => {
  console.log('Starting server on ' + url);
})