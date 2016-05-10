/**
 * @summary Ian needs to change this
 * @module gulpfile.js
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

'use strict';

var gulp = require("gulp");
var sass = require('gulp-sass');
var gutil = require("gulp-util");
var chalk = require('chalk');
var webpack = require("webpack");
var concatCss = require('gulp-concat-css');
var del = require('del');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var runSequence = require('run-sequence');
var cssNano = require('gulp-cssnano');
var path = require('path');
var replace = require('gulp-replace');
var imageOp = require('gulp-image-optimization');
const c = require('./app/utils/constants');
const _ = require('lodash');
const gulpConfig = require('./config/gulp');

// determine if we are in a production build
var env = c.UI_ENV;
var prod = (env === 'production' || false);
var config = gulpConfig.getConfig(prod);

var libWebpackConfig = require('./config/library.webpack');
var appWebpackConfig = require('./config/app.webpack');

// State Production or Not
gutil.log(chalk.green('---------------------------------------------'));
prod ? gutil.log(chalk.red('Using Production Mode')) : gutil.log(chalk.green('Using Dev Mode'));
gutil.log(chalk.green('---------------------------------------------'));

// we need this to end the the live reload correctly
process.on('SIGINT', interupt);
process.on('SIGTERM', interupt);

function interupt() {
    process.exit(0);
}

var tasks = {
    // cleaning up the dist folder more than likely
    clean: function () {
        return del(config.clean);
    },

    fonts: function () {
        return gulp.src(config.fonts.src)
            .pipe(gulp.dest(config.fonts.dest));
    },

    lint: function () {
        return gulp.src(config.js.src).pipe(jshint())
            .pipe(jshint.reporter(stylish))
            .pipe(jshint.reporter('fail'));
    },
    
    buildLib: function (done) {
        webpack(libWebpackConfig(prod), function (err, stats) {
            if (err) {
                throw new gutil.PluginError("webpack", err);
            }
            gutil.log("[webpack]", stats.toString({
                // output options
            }));
            done();
        });
    },

    //webpack build the js
    buildJs: function (done) {
        webpack(appWebpackConfig(path.normalize(__dirname + "/" + c.UI_DIST + '/vendor-manifest.json'), prod), function (err, stats) {
            if (err) throw new gutil.PluginError("webpack", err);

            gutil.log("[webpack]", stats.toString({
                colors: true
            }));
            done();
        });
    },

    normalizeCss: function () {
        return gulp.src(config.dist + '/app.css')
            .pipe(gulp.dest(config.dist));
    },

    buildImgs: function () {
        return gulp.src(config.images.src)
            .pipe(imageOp(config.images.imgOp))
            .pipe(gulp.dest(config.images.dist));
    },

    vendorCss: function () {
        let pipeline = gulp.src(config.vendor.css)
            .pipe(concatCss('vendor.bundle.css'), {rebaseUrls: false})
            .pipe(replace('../material-design-icons/iconfont', '../fonts'))
            .pipe(replace('../../fonts', '../fonts'));

        if (prod) {
            pipeline = pipeline.pipe(cssNano());
        }

        return pipeline.pipe(gulp.dest(config.vendor.distCss));
    },

    watch: {
        js: function () {
            gulp.watch(config.js.src, ['lint']);
        }
    }

};

//lint JS assets only
var deps = [];

// GULP inner tasks not first class citizens
gulp.task('lint', tasks.lint);
gulp.task('clean', tasks.clean);
gulp.task("buildJs", deps, tasks.buildJs);
gulp.task('vendorCss', deps, tasks.vendorCss);
gulp.task('buildImgs', deps, tasks.buildImgs);
gulp.task('lib', deps, tasks.buildLib);
gulp.task('fonts', deps, tasks.fonts);
gulp.task('buildAll', ['buildJs'], tasks.normalizeCss);


/*********************************************************************************
 * Main Gulp build task
 */

gulp.task('build', function (done) {
    runSequence('clean', ['vendorCss', 'lib', 'buildImgs'], 'fonts', 'buildAll', function () {
        done();
    });
});


/*********************************************************************************
 * Main Gulp build task for DEVELOPMENT
 */

gulp.task('setupDev', function (done) {
    runSequence('clean', ['vendorCss', 'lib', 'buildImgs'], 'fonts', function () {
        done();
    });
});


/*********************************************************************************
 * Main Gulp build task for Linting Code
 */

gulp.task('watch', function(done) {
    runSequence('lint',function() {
        tasks.watch.js();     
    });

    gutil.log(chalk.green('---------------------------'));
    gutil.log(chalk.green('Watching For Changes'));
    gutil.log(chalk.green('---------------------------'));

    done();

});
