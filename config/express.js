/**
 * @summary Ian needs to change this
 * @module express
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

const path = require('path');
const favicon = require('serve-favicon');
const c = require('../app/utils/constants');
const logger = require('morgan');
const bodyParser = require('body-parser');
const compression = require('compression');
const errorHandler = require('errorhandler');

function init(app) {
    // Set up what the View Engine and View Directory are
    const VIEW_DIR = path.normalize([__dirname, '..', 'app', 'api', 'views'].join('/'));
    app.set('view engine', 'ejs');
    app.set('views', VIEW_DIR);
    
    // Favicon
    //app.use(favicon([VIEW_DIR, 'favicon.ico'].join('/')));
    
    // Some Apps need the port set
    app.set('port', c.PORT);
    
    // GZIP Compression
    if (c.COMPRESSION) app.use(compression());
    
    // if we are in Dev mode show stacks
    if(c.NODE_ENV === 'development') app.use(errorHandler({dumpExceptions: true, showStack: true}));
    
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(noCache);
    
    return app;
}

function noCache(req, res, next) {
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
}


module.exports = init;