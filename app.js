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
const express = require('express');
const expressConfig = require('./config/express');
const routeSetup = require('./app/api/api.routes');

// Express Object Init
let app = express();

// Sets View Engine and Express Middleware
app = expressConfig(app);

// Sets up the routes for the API
app = routeSetup(app);

// Listens on the chosen PORT 
app.listen(c.PORT);

// Log to the screen general Information
log.info(chalk.green('---------------------------------------------'));
log.info(chalk.green('Obsidian Application Started'));
log.info(chalk.green(`Environment:\t\t\t ${c.NODE_ENV}`));
log.info(chalk.green(`Port:\t\t\t\t ${c.PORT}`));
log.info(chalk.green('---------------------------------------------'));

// Expose the App in case we want to Cluster
module.exports = app;