'use strict';

// gulp utilities
const gulp = require('gulp');
const install = require('gulp-install');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');
const bump = require('gulp-bump');

// node utilities
const path  = require('path');
const fs = require('fs');

// webpack utilities
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

// karma
// var karma = require('karma');
// var karmaServer = karma.server;

// dev root foldernp
const root = path.join(__dirname, 'src');

// ports
const ports = {
    dev: 8080
};

gulp.task('default', () => {
    // default
});

gulp.task("bundle", ["webpack:bundle"]);

gulp.task("serve", ["webpack:serve"]);

gulp.task("webpack:bundle", (callback) => {
    const webpackDistConfig = require('./webpack.dist.config.js');
    // run webpack
    webpack(webpackDistConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack bundle]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("webpack:serve", (callback) => {
    const webpackDevConfig = require('./webpack.dev.config');
    const compiler = webpack(webpackDevConfig);

    new WebpackDevServer(compiler, {
        contentBase: root,
        quiet: false,
        noInfo: false,
        lazy: false,
        hot: false,
        watchDelay: 300,
        stats: {
            colors: true
        }
    }).listen(ports.dev, 'localhost', (err) => {

        if (err) {
            throw new gutil.PluginError('webpack-dev-server', err);
        }

        gutil.log('[webpack-dev-server]', 'http://localhost:' + ports.dev);
    });
    callback();
});

/**
 * Configure the eslint task
 */
// gulp.task('lint', () => {
//     return gulp.src([`${root}/**/*.js`, `!${root}/assets/**/*`])
//         .pipe(eslint({
//             extends: 'eslint:recommended',
//             parserOptions: {
//                 ecmaFeatures: {
//                     "jsx": true,
//                     "modules": true
//                 }
//             },
//             globals: {
//                 'jQuery':false,
//                 '$':true,
//                 'angular': true,
//                 '_': true,
//                 'require': true
//             },
//             envs: [
//                 'browser'
//             ]
//         }))
//         .pipe(eslint.format())
//         .pipe(eslint.failAfterError());
// });

/**
 * Install all node modules before running the app
 */
gulp.task('install', (callback) => {
    gulp.src('./package.json')
        .pipe(install());
    callback();
});


// gulp test:unit, runs unit test suite
// gulp.task('test:unit', function () {
//     karmaServer.start({
//         configFile: __dirname + '/karma.conf.js',
//         singleRun: true
//     });
// });

// // gulp test, runs full test suite
// gulp.task('test', ['test:unit']);

// gulp task to create new version
gulp.task('bump', function(callback){
  gulp.src('./package.json')
  .pipe(bump())
  .pipe(gulp.dest('./'));
  callback();
});

// gulp task bundle version
gulp.task("webpack:version", (callback) => {
    const packageConfig = JSON.parse(fs.readFileSync('./package.json', 'utf8'));
    const webpackDistConfig = require('./webpack.dist.config.js');
    webpackDistConfig.output = {
        filename: 'bundle.js',
        path: path.resolve(__dirname, packageConfig.version)
    };
    // run webpack
    webpack(webpackDistConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack bundle]", stats.toString({
            // output options
        }));
        callback();
    });
});

gulp.task("version", ['bump', 'webpack:version']);
