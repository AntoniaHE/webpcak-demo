const path = require('path')

const config = require('./config.json');
// 用于压缩js
const uglify = require('uglifyjs-webpack-plugin')
// 用于html文件的发布
const htmlPlugin = require('html-webpack-plugin')
// 用于提取css
const extractTextPlugin = require('extract-text-webpack-plugin')
// 减少冗余的css代码
const glob = require('glob')
const purifyCSSPlugin = require('purifycss-webpack')

const entry = require('./webpack_config/entry_webpack.js')

const website = {
  publicPath: `http://192.168.1.7:${config.port}/`
}
if(process.env.type === 'build'){
  website.publicPath = `http://192.168.1.7:${config.port}/`
}else{
  website.publicPath = 'http://team.zbj.com/'
}
console.log(JSON.stringify(process.argv))
console.log('config-' + config.name)

const webpack  = require('webpack')

// 静态资源集中打包
const copyWebpackPlugin= require('copy-webpack-plugin')
module.exports = {
  //入口文件的配置项
  entry: entry.path,
  //出口文件的配置项
  output:{
    // 获取了项目的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // 打包后的文件名称
    filename: '[name].js'
    // publicPath: website.publicPath
  },
  //模块：例如解读CSS,图片如何转换，压缩
  module:{
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
        // use: [
        //   {
        //     loader: 'style-loader'
        //   },
        //   {
        //     loader: 'css-loader'
        //   },
        //   {
        //     loader: 'postcss-loader'
        //   }
        // ]
        // css提取
        // loader: extractTextPlugin.extract({
        //   fallback: 'style-loader',
        //   use: ['style-loader', 'css-loader', 'postcss-loader']
        // })
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
        // loader: extractTextPlugin.extract({
        //   fallback: 'less-loader',
        //   use: ['less-loader', 'css-loader']
        // })
      },
      {
        test: /\.scss$/,
        use: ['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|gif)/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 500000
          }
        }
      },
      {
        test: /\.(htm|html)$/i,
        use:[ 'html-withimg-loader'] 
      },
      {
        test: /\.(jsx|js)$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      }
    ]
  },
  //插件，用于生产模版和各项功能
  plugins:[
    new uglify(),
    new htmlPlugin({
      minify: {
        removeAttributeQuotes: true
      },
      // hash: true,
      template: './src/index.html'
    }),
    // 去掉冗余的css代码，purifycss根据这个配置会遍历你的文件，查找哪些css被使用了。
    new purifyCSSPlugin({
      paths: glob.sync(path.join(__dirname, 'src/*.html'))
    }),
    // 通过webpack的方式引入jQuery
    // new webpack.ProvidePlugin({
    //   $: 'jquery'
    // }),
    new webpack.BannerPlugin('hemei 版权所有'),
    // 集中打包静态资源
    new copyWebpackPlugin([{
      from:__dirname+'/src/public',
      to:'./public'
    }]),
    // 热更新
    new webpack.HotModuleReplacementPlugin()
    // webpack3的写法
    // new webpack.optimization.splitChunks({
    //     //name对应入口文件中的名字，我们起的是jQuery
    //     name:'jquery',
    //     //把文件打包到哪里，是一个路径
    //     filename:'dist/js/jquery.min.js',
    //     //最小打包的文件模块数，这里直接写2就好
    //     minChunks: 2
    // })
    // new extractTextPlugin('[name].css')
  ],
  //配置webpack开发服务功能
  devServer: {
    //设置基本目录结构
    contentBase:path.resolve(__dirname,'dist'),
    //服务器的IP地址，可以使用IP也可以使用localhost
    host:'localhost',
    //服务端压缩是否开启
    compress:true,
    //配置服务端口号
    port: config.port
  },
  performance: {
    hints: false
  },
  watchOptions:{
    //检测修改的时间，以毫秒为单位
    poll:1000, 
    //防止重复保存而发生重复编译错误。这里设置的500是半秒内重复保存，不进行打包操作
    aggregateTimeout:500, 
    //不监听的目录
    ignored:/node_modules/, 
  },
  optimization: {
    splitChunks: {
      //name对应入口文件中的名字，我们起的是jQuery
      name:'jquery',
      //最小打包的文件模块数，这里直接写2就好
      minChunks: 2
    }
  }
}