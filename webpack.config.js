var webpack = require('webpack')
var path = require('path')
var inProduction = (process.env.NODE_ENV === 'production')
const ExtractTextPlugin = require("extract-text-webpack-plugin"); 

module.exports = {
    entry: {
        app: [
            './src/main.js',
            './src/main.scss'
        ]
    },

    output: {
        path: path.resolve(__dirname,'./dist'),
        filename: '[name].js'
    },

    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    // use: ['css-loader','sass-loader'],
                    use: [
                        {
                            loader: 'css-loader',
                            //options: {url: false}
                        },
                        'sass-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.png|jpe?g|gif$/,
                loader: 'file-loader',
                options: {
                    name: 'images/[name].[hash].[ext]'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin("[name].css"),
        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        })
    ]
}

if(inProduction){
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}