/**
 * Created by enpfeff on 5/9/16.
 */
"use strict";
const express = require('express');
const Router = require('express-promise-router');
const c = require('../utils/constants');
const path = require('path');

const v1Router = require('./v1.routes');
const indexRouter = require('./index/index.routes');
const versionRouter = require('./version/version.routes');
const authRouter = require('./auth/auth.routes');

function init(app) {
    // Static file Definitions
    const UI_DIST_PATH = path.normalize([__dirname, '../..', c.UI_DIST].join('/'));
    app.use(express.static(path.normalize(UI_DIST_PATH)));
    
    //  API Route Definitions
    let router = Router();
    router.use('/version', versionRouter);
    router.use('/auth', authRouter);
    router.use('/v1', v1Router);
    router.use('/', indexRouter);
    
    // Attach it to the app 
    app.use(router);
    
    return app;
}

module.exports = init;