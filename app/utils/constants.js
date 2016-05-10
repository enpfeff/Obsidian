/**
 * @summary Ian needs to change this
 * @module log
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

const _ = require('lodash');

function isTrueParam(x) {
    return _.isString(x) ? (x === 'true') : !!x;
}


// UI BUILD
const uiLocation = './app/ui';
module.exports.UI_ENV = process.env.UI_ENV || 'development';
module.exports.UI_LOCATION = uiLocation;
module.exports.UI_DIST = './dist';

// NODE ENVIRONMENT
module.exports.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports.PORT = process.env.PORT || 3000;
module.exports.COMPRESSION = isTrueParam(process.env.COMPRESSION) || false;

// LOGGING OPTIONS
module.exports.LOG_LEVEL = process.env.LOG_LEVEL || 'info';
module.exports.LOG_TO_FILE = isTrueParam(process.env.LOG_TO_FILE) || false;
module.exports.LOG_FILE = process.env.LOG_FILE || 'app.log';
