/**
 * Module dependencies
 */
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const chalk = require('chalk');
const errorHandler = require('errorhandler');
const path = require('path');

/**
 * Load env variables
 */
dotenv.load({ path: '.env' });

/**
 * Controllers 
 */
const urlController = require('./controllers/urlController');

/**
 * Express server
 */
const app = express();

/**
 * Express config
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Set cache to 28 days
 */
const oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay * 28 }));

/**
 * Routes
 */
app.get('/', urlController.index);
app.get('/url/:id?/:url?', urlController.get);
app.post('/', urlController.post);

/**
 * Error Handler
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', chalk.green('✓'), app.get('port'), app.get('env'));
});

module.exports = app;
