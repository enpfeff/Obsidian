/**
 * @summary Ian needs to change this
 * @module log
 * @memberof Ian needs to change this
 * @since 5/2/16
 */
'use strict';

const chalk = require('chalk');
const log = require('./app/utils/log');
const c = require('./app/utils/constants');

log.info(chalk.green('---------------------------------------------'));
log.info(chalk.green('Obsidian Application Started'));
log.info(chalk.green(`Environment:\t\t\t ${c.NODE_ENV}`));
log.info(chalk.green(`Port:\t\t\t\t ${c.PORT}`));
log.info(chalk.green('---------------------------------------------'));

