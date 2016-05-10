var webpackInit = require('./app.webpack.js'),
    LiveReloadPlugin = require('webpack-livereload-plugin'),
    config = webpackInit('../dist/vendor-manifest.json', false);

// by default, this does not inject a script. Use the remote-livereload Chrome
// plugin for that.
config.plugins.push(new LiveReloadPlugin());

module.exports = config;
