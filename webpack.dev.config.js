var webpack = require('webpack');
var path    = require('path');
var config  = require('./webpack.config.js');

config.output = {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/'
};

config.resolve = {
    root: [__dirname + '/src']
};
config.context = __dirname + '/src';

config.entry = config.entry.concat([,
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server']);

config.plugins = config.plugins.concat([

    // Adds webpack HMR support. It act's like livereload,
    // reloading page after webpack rebuilt modules.
    // It also updates stylesheets and inline assets without page reloading.
    new webpack.HotModuleReplacementPlugin()
]);

module.exports = config;