const webpack = require('webpack');
const path = require('path');

let plugins = [
  new webpack.DllPlugin({  // 会根据entry打包并生成manifest.json
    path: 'manifest.json',
    name: '[name]_[chunkhash]',
    context: __dirname,
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")  // react会根据此变量来确定打包dev还是pro版本
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,        //去掉注释
    test: /(\.jsx|\.js)$/,
    mangle: {
      except: ['exports', 'require']
    },
    compress: {
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
      warnings: false
    }
  })
]

let vendor = ['moment']

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