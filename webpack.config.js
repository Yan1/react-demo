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
  Bundle: path.resolve('./src/utils/Bundle'),
  Fetch: path.resolve('./src/utils/Fetch'),
  Platform: path.resolve('./src/components/platform'),
  Utils: path.resolve('./src/utils'),
  API : path.resolve('./src/utils/api'),
  User: path.resolve('./src/components/platform/user'),
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
    exclude: ["important.json", "config.js"]
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
  new webpack.HotModuleReplacementPlugin(),

  // new webpack.optimize.DedupePlugin(),  //查找相等或近似的模块，避免在最终生成的文件中出现重复的模块。
  // new webpack.optimize.OccurenceOrderPlugin(),  //按引用频度来排序 ID，以便达到减少文件大小的效果
  new webpack.optimize.AggressiveMergingPlugin({
    minSizeReduce: 1.5,
    moveToParents: true
}),
]
plugins.concat(envConfig.plugins)

module.exports = {
  entry: ['./src/index.tsx'],
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
    publicPath: '/', // 自动添加 css js 文件绝对路径 
    path: __dirname + '/dist'
  },

  devtool: envConfig.devtool,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'] // 可以忽略的后缀名
  },

  module: {
    rules: [
      /* {
        enforce: "pre",                
        test: /\.(ts|tsx)?$/, 
        loader: 'tslint-loader',
        exclude: [resolve(__dirname, "node_modules")],
      }, */         
      {
        test: /\.tsx?$/, 
        loader: 'awesome-typescript-loader', 
        // exclude: /\.bundle\.tsx?$/
      },

      {enforce: 'pre', test: /\.js$/, loader: 'source-map-loader'},
      /* {
        test: /\.bundle\.tsx?$/, 
        use: [
          {
            loader: 'bundle-loader?lazy'
          },
          {
            loader: 'awesome-typescript-loader'
          }
        ],
      }, */
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
    alias: alias // TODO 不知为何，tsconfig.json中配置了paths，vscode中能正确提示，但编译不通过，故依然使用此方法
  },
  externals: {
    // 'react': 'React',  // 加了此法，则需手动在html引入
    // 'react-dom': 'ReactDOM',
  }
}