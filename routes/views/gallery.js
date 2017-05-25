const keystone = require('keystone');

// eslint-disable-next-line no-multi-assign
exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // Set locals
  locals.section = 'gallery';

  // Load the galleries by sortOrder
  view.query('galleries', keystone.list('Gallery').model.find().sort('sortOrder'));

  // Render the view
  view.render('gallery');
};
