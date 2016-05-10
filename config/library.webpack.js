/**
 * @summary Ian needs to change this
 * @module library.webpack.js
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

var webpack = require('webpack');
var path = require('path');

const c = require('../app/utils/constants');

function init(prod) {
    var ret = {
        resolve: {
            root: [path.resolve(c.UI_LOCATION + "/vendor/js")],
            extensions: ['', '.json', '.js']
        },

        loaders: [
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ],

        entry: {
            // These should be the names of folders in node_modules
            vendor: [
                'angular',
                'jquery'
            ]
        },

        devtool: "source-map",

        output: {
            filename: '[name].bundle.js',
            path: c.UI_DIST,

            // The name of the global variable which the library's
            // require() function will be assigned to
            library: '[name]_lib'
        },

        plugins: [
            new webpack.DllPlugin({
                // The path to the manifest file which maps between
                // modules included in a bundle and the internal IDs
                // within that bundle
                path: [c.UI_DIST, '[name]-manifest.json'].join('/'),
                // The name of the global variable which the library's
                // require function has been assigned to. This must match the
                // output.library option above
                name: '[name]_lib'
            })
        ]
    };

    if (prod) {
        //no source maps
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


module.exports =  init;
