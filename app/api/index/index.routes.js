/**
 * Created by enpfeff on 5/9/16.
 */
"use strict";
const Router = require('express-promise-router');
const P = require('bluebird');

let router = Router();

router.get('*', (req, res, next) => {
    res.render('index', {});
    return P.resolve();
});

module.exports = router;