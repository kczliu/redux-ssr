const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.base')
const isDev = process.env.NODE_ENV == "development"
config = webpackMerge(baseConfig,{
    entry:{
        app: path.join(__dirname, '../APP.js')
    },
    output: {
        filename: "[name].[hash:4].js",
        path:path.join(__dirname,'../dist'),
        publicPath: "/public"
    },
    plugins: [
        new htmlWebpackPlugin({
            template:path.join(__dirname,'../client/template.html')
        }),
        new htmlWebpackPlugin({
            template: '!!ejs-compiled-loader!'+path.join(__dirname,'../client/server.template.ejs'),
            filename:'server.ejs'
        })
    ]

})

if(isDev){
    config.devtool = "#cheap-module-eval-source-map"
    config.entry={
        app:['react-hot-loader/patch',path.join(__dirname, '../APP.js')]
    }
    config.devServer = {
        host:'0.0.0.0',
        port:'8888',
        contentBase:path.join(__dirname,'../dist'),
        hot:true,
        overlay:{
            errors:true
        },
        publicPath:'/public',
        historyApiFallback:{
            index:'/public/index.html'
        },
        proxy:{
            '/api':'http://localhost:3333'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
}
module.exports = config