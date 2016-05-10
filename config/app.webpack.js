/**
 * @summary Define build/conversion steps for ... the app? ...
 * @module AppWebpack
 * @memberof UI
 * @since 2/16/16
 * @copyright Copyright (c) 2016 NETSCOUT
 */

'use strict';

const webpack = require('webpack');
const path = require('path');
const c = require('../app/utils/constants');
const ngCacheLoader = require('ng-cache-loader');
const ngAnnotate = require('ng-annotate-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');

const uiLocation = c.UI_LOCATION;
const dist = c.UI_DIST;
let happyThreadPool = HappyPack.ThreadPool({size: 5});

function init(manifest, prod) {
    var ret = {
        devtool: "eval",
        stats: {
            colors: true,
            modules: true,
            reasons: true,
            errorDetails: true
        },
        resolve: {
            root: [path.resolve("./vendor/js")],
        },
        plugins: [
            new webpack.DllReferencePlugin({
                context: '.',
                manifest: require(manifest)
            }),
            new webpack.ProvidePlugin({
                jQuery: 'jquery',
                $: 'jquery',
                'window.jQuery': 'jquery',
                _: 'lodash',
                angular: 'angular',
            }),
            new HappyPack({
                id: 'js',
                threadPool: happyThreadPool,
                loaders: ['ng-annotate', 'nginject?deprecate', "babel-loader?presets[]=es2015,cacheDirectory"],
                cache: true,
                enabled: true
            }),
            new HappyPack({
                id: 'styles',
                threadPool: happyThreadPool,
                loaders: ['style', 'css?sourceMap', 'sass?sourceMap'],
                cache: true,
                enabled: true
            })
        ],
        entry: {
            app: path.normalize(__dirname + '/../' + uiLocation + '/index.js')
        },
        output: {
            path: dist,
            filename: 'bundle.js'
        },
        module: {
            loaders: [
                {
                    test: /jquery$/,
                    loader: 'expose?jQuery'
                },

                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'happypack/loader?id=js'
                },

                {
                    test: /\.scss$/,
                    loader: 'happypack/loader?id=styles'
                },

                {
                    test: /\.html$/,
                    exclude: /node_modules/,
                    loader: "ng-cache"
                },
                {
                    test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                    loader: 'file?name=public/fonts/[name].[ext]'
                }
            ]
        },
        sassLoader: {
            includePaths: []
        }
    };

    if (prod) {
        // we dont want source maps
        ret.devtool = '';
        // minimize code in production
        ret.plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                sourceMap: false,
                compress: {
                    warnings: false,
                    sequences: true,
                    dead_code: true,
                    conditionals: true,
                    booleans: true,
                    unused: true,
                    if_return: true,
                    join_vars: true,
                    drop_console: true
                },
                mangle: {
                    except: ['$', 'exports', 'require']
                },
                output: {
                    comments: false
                }
            })
        );
    }

    return ret;
}


module.exports = init;
