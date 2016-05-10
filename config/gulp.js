/**
 * @summary Ian needs to change this
 * @module gulp
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

const path = require('path');
const c = require('../app/utils/constants');

function getConfig() {
    const ui = c.UI_LOCATION;
    const dist = c.UI_DIST;

    let config = {
        dist: dist,
        allDist: dist + '/**/*.*',

        clean: [dist, './.happypack'],

        fonts: {
            src: [
                path.normalize(ui + '/fonts/**/*.{otf,eot,svg,ttf,woff,woff2}'),
                './node_modules/material-design-icons/iconfont/*.{eot,ijmap,ttf,woff,woff2}',
                './node_modules/roboto-fontface/fonts/*.{eot,ijmap,ttf,woff,woff2}'
            ],
            dest: dist + '/vendor/fonts'
        },

        html: {
            src: [ui + '/**/*.html', '.app/views/index.ejs']
        },

        js: {
            // used for development watch
            src: [ui + '/**/*.js', ui + '/index.js', ui + '/translations/**/*.js'],
            all: [ui + '/**/*.*', ui + '/index.js', ui + '/translations/**/*.*']
        },
        images: {
            src: ui + '/images/**/*.*',
            dist: dist + '/images',

            // The optimization level 0 enables a set of optimization operations that require minimal effort.
            // There will be no changes to image attributes like bit depth or color type, and no recompression of
            // existing IDAT datastreams. The optimization level 1 enables a single IDAT compression trial. The trial
            // chosen is what. OptiPNG thinks it’s probably the most effective. The optimization levels 2 and higher
            // enable multiple IDAT compression trials; the higher the level, the more trials. progression - go from
            // lossless to lossy interlaced is for gifs
            imgOp: {
                optimizationLevel: 5,
                progressive: true,
                interlaced: true
            }
        },
        vendor: {
            distCss: dist + '/vendor/css',

            css: [
                './node_modules/angular-material/angular-material.min.css',
                './node_modules/material-design-icons/iconfont/material-icons.css',
                ui + '/fonts/*.css'
            ],

            distJs: dist + '/vendor/js',
            js: []
        }

    };

    return config;
}

module.exports.getConfig = getConfig;