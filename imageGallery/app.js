/**
 * Module dependencies
 */
const express = require('express');
const path = require('path');

/**
 * Express server
 */
const app = express();

/**
 * Express config
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

/**
 * Set cache to 28 days
 */
const oneDay = 86400000;
app.use(express.static(path.join(__dirname, 'public'), { maxAge: oneDay * 28 }));

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s Express server listening on port %d in %s mode.', app.get('port'), app.get('env'));
});

module.exports = app;
