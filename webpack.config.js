// TODO: Refactor this config file, Add production config.the
// TODO: Check for good loaders and plugin to approve app.

var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: 'source-map',
    context: __dirname + '/src',
    entry: [
        './app/app.drv.js'
    ],
    plugins: [
        new webpack.optimize.CommonsChunkPlugin( /* chunkName= */ "vendor", /* filename= */ "vendor.bundle.js"),
        new webpack.ProvidePlugin({
            "_": "lodash",
            "$": "jquery"
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'index.html',
            inject: 'body',
            hash: true
        })
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: 'ng-annotate!babel?presets[]=es2015' },
            { test: /\.less$/, loader: 'style!css!less?root=.' },
            { test: /\.css$/, loader: 'style!css?root=.' },
            { test: /\.json$/, loader: "json" },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" },
            { test: /\.html$/, exclude: /(node_modules|bower_components)/, loader: "raw" },
            { test: /\.(jpe?g|png|gif|svg)$/i, loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
            }
        ]
    }
};
