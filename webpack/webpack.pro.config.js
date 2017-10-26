const webpack = require('webpack')

module.exports = {
  devtool: false,
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      comments: false,        //去掉注释
      test: /\.(j|t)sx?$/,
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
}