/**
 * @summary Ian needs to change this
 * @module log
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

const winston = require('winston');
const _ = require('lodash');
const c = require('./constants');

let transports = [
    new winston.transports.Console({
        level: c.LOG_LEVEL,
        colorize: true,
        timestamp: true
    })
];

let logger = new (winston.Logger)({
    transports: transports
});

function log(level, msg) {
    if (_.isUndefined(msg)) {
        msg = level;
        level = 'verbose';
    }

    logger.log(level, msg);
}

module.exports = log;
module.exports.error = _.partial(log, 'error');
module.exports.warn = _.partial(log, 'warn');
module.exports.info = _.partial(log, 'info');
module.exports.verbose = _.partial(log, 'verbose');
module.exports.debug = _.partial(log, 'debug');
module.exports.trace = _.partial(log, 'verbose');

        