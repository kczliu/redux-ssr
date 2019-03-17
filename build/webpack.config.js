const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
const isDev = process.env.NODE_ENV == "development"
config = {
    entry:{
        app: path.join(__dirname, '../APP.js')
    },
    output: {
        filename: "[name].[hash:4].js",
        path:path.join(__dirname,'../dist'),
        publicPath: "/public"
    },
    module:{
        rules: [
            {
                test:/.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template:path.join(__dirname,'../client/template.html')
        })
    ]

}
if(isDev){
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
        }
    }
}
module.exports = config