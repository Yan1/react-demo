const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackCleanupPlugin = require('webpack-cleanup-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const AssertsHtmlPlugin = require('add-asset-html-webpack-plugin')

const isProduction = (function () {
  const NODE_ENV = process.env.NODE_ENV || 'development'
  console.log(NODE_ENV)
  return NODE_ENV === 'production'
})()

let envConfig
if(isProduction) {
  envConfig = require('./webpack/webpack.pro.config')
} else {
  envConfig = require('./webpack/webpack.dev.config')
}

const alias = {
  API : path.resolve('./src/api/index.tsx')
}

let plugins = [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    title: '运维平台',
    template: path.resolve('src/index.html'),
  }),
  new webpack.ProvidePlugin({ // 会自动加载，模块中再import不会导致重复加载
    React: 'react',
    ReactDOM: 'react-dom',
    
    $: "jquery",
    jQuery: "jquery",
    "window.jQuery": "jquery",

    "_": "lodash",
    "moment": "moment"
  }),
  new webpack.optimize.OccurrenceOrderPlugin,
  new webpackCleanupPlugin({ // 清空输出文件夹
    // preview: true, // 打印出会被删除的，但实际上并未删除的文件
    exclude: ["important.json"]
  }),
  new ExtractTextWebpackPlugin("[name].[contenthash].css"), // 合并css
  new webpack.optimize.CommonsChunkPlugin({ // 用于分析多个入口文件的共用代码
    name: 'commons',
    filename: 'commons.[hash].js',
    minChunks: Infinity
  }),
  new webpack.DllReferencePlugin({
    context: __dirname,
    manifest: require('./manifest.json'),
  }),
  new AssertsHtmlPlugin({
    includeSourcemap: false,
    filepath: path.resolve(__dirname, './dist', require('./manifest.json').name + '.js')
  }),
  new webpack.HotModuleReplacementPlugin()
]
plugins.concat(envConfig.plugins)

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: 'name].[chunkhash].js',
    publicPath: '/', // 自动添加 css js 文件绝对路径 
    path: __dirname + '/dist'
  },

  devtool: envConfig.devtool,
  resolve: {
    alias,
    extensions: ['.ts', '.tsx', '.js', '.json'] // 可以忽略的后缀名
  },

  module: {
    rules: [
      {test: /\.tsx?$/, loader: 'awesome-typescript-loader', exclude: /node_modules/},
      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},

      {
        test: /\.(less|css)$/,
        use: ExtractTextWebpackPlugin.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
        }],
        // use style-loader in development
        fallback: "style-loader"
        })
      },
      {
        test: /\.(woff|svg|eot|ttf)(\?.*)?$/,
        loader: 'url-loader?limit=5000',
        // TODO
        query: {
          useRelativePath: true
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=819200'  // 819200字节
      }
    ]
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: alias
  },
  externals: {
    // 'react': 'React',  // 加了此法，则需手动在html引入
    // 'react-dom': 'ReactDOM',
  }
}