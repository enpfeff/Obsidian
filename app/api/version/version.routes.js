/**
 * Created by enpfeff on 5/9/16.
 */
"use strict";
const Router = require('express-promise-router');
const pkgJson = require('../../../package.json');
const P = require('bluebird');

let router = Router();
router.get('/', buildVersion);

function buildVersion(req, res) {
    const VERSIONS = {
        version: pkgJson.version
    };

    res.json(VERSIONS);
    return P.resolve();
}

module.exports = router;