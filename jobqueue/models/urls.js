const Promise = require('bluebird');
const request = Promise.promisify(require('request'));
const chalk = require('chalk');
const db = require('../db/db');

Promise.promisifyAll(request);

function insertErrorToDb(id, url) {
  db.none('update urls set data=$1 where id=$2', ['Error fetching URL.', id]);
  console.log(chalk.bgRed('X') + ' Error fecthing: ' + url + ' id: ' + id);
}

/**
 * Get URL and update DB
 */
function urlWorkers(url, id) {
  request(url).then((html) => {

    if (html.statusCode === 200) {
      // Add URL
      html = html.body.replace(/src="\//gi, 'src="' + url + '/');

      db.none('update urls set data=$1 where id=$2', [html, id])
        .then((data) => {
          console.log(chalk.bgGreen('✓') + ' URL saved: ', url);
        })
        .catch((err) => {
          insertErrorToDb(id, url);
        });
    } else {
      insertErrorToDb(id, url);
    }
    
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

        // fire off worker
        urlWorkers(url, id);

        res.redirect('/url?id=' + id + '&url=' + url);
      })
      .catch(function (error) {
         return next (error);
      });
  };
};

/**
 * Get URL from given ID
 */
exports.getURL = (id, url) => {
  console.log(chalk.blue('✓') + ' fetching id: ', id);
  
  return (res, next) => {
    db.one('select * from urls where id=$1', [id])
      .then(resp => {
        if (resp.data === 'Fetching URL...') {
          // display fetching...
          res.render('postedUrl', {
            id: id,
            url: url
          });
        } else {
          res.send(resp.data);
        }
      })
      .catch((err) => {
        return next (err);
      });
  };
};
