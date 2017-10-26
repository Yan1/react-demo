const webpack = require('webpack');
const path = require('path');

let plugins = [
  new webpack.DllPlugin({  // 会根据entry打包并生成manifest.json
    path: 'manifest.json',
    name: '[name]_[chunkhash]',
    context: __dirname,
  })
]
let vendor = ['moment', 'antd'] // 开发环境，将antd放入vendor中，以提高热更新速度

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name]_[chunkhash].js',
    library: '[name]_[chunkhash]',
  },
  entry: {
    vendor: vendor,
  },
  plugins: plugins
}