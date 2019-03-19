module.exports = {
    module:{
        rules: [
            {
                test:/.js$/,
                loader:"babel-loader",
                exclude:/node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.js','.css']
    }
}