const urlModel = require('../models/urls');

/**
 * Load homepage
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

/**
 * GET URL
 */
exports.get = (req, res, next) => {
  let id = req.params.id || req.query.id;
  let url = req.params.url;

  if (!id) {
    res.status(404).send('<h1>Error! No ID given.</h1>');
    res.end();
  }

  urlModel.getURL(id, url)(res, next);
};

/**
 * POST URL
 */
exports.post = (req, res, next) => {
  let url = req.body.url;

  if (!url) {
    res.status(404).send('<h1>Error! No URL given.</h1>');
  }

  urlModel.postURL(url)(res, next);
};
