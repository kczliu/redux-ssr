const path = require('path')
const webpackMerge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.base')
module.exports = webpackMerge(baseConfig,{
    target: "node",
    entry:{
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: "server-entry.js",
        path:path.join(__dirname,'../dist'),
        publicPath: "/public",
        libraryTarget: "commonjs2"
    },
    plugins:[
        new webpack.DefinePlugin({
            'process.env.API_BASE':'"http:127.0.0.1:3333"'
        })
    ]
})