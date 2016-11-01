const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const chalk = require('chalk');
const db = require('../db/db');

Promise.promisifyAll(request);

/**
 * Get URL and update DB
 */
function urlWorkers(url, id) {
  request(url, (error, response, html) => {
    if (error) { 
      reject(error);
    }

    db.none('update urls set data=$1 where id=$2', [html, id])
      .then((data) => {
        console.log(chalk.bgGreen('✓') + ' URL saved: ', url);
      })
      .catch((err) => {
        db.none('update urls set data=$1 where id=$2', ['Error fetching URL.', id]);
        console.log(chalk.bgRex('X') + ' Error fecthing: ' + url + ' id: ' + id);
      });
  });
} 

/**
 * POST URL
 */
exports.postURL = (url) => {
  console.log(chalk.blue('✓') + ' postURL: ', url);

  return (res, next) => {
    db.one('insert into urls(url) values($1) returning id', [url])
      .then(function (data) {
        const id = data.id;

        console.log('id: ', id);

        // fire off worker
        urlWorkers(url, id);

        // display fetching...
        res.render('postedUrl', {
          id: id,
          url: url
        });
      })
      .catch(function (error) {
         return next (error);
      });
  };
};

/**
 * Get URL from given ID
 */
exports.getURL = (id) => {
  console.log(chalk.blue('✓') + ' fetching id: ', id);
  
  return (res) => {
    db.one('select * from urls where id=$1', [id])
      .then(resp => {
        res.status(200).send(resp.data);
      })
      .catch((err) => {
        return next (err);
      });
  };
};
