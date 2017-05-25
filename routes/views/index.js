const keystone = require('keystone');

// eslint-disable-next-line no-multi-assign
exports = module.exports = function (req, res) {
  const view = new keystone.View(req, res);
  const locals = res.locals;

  // locals.section is used to set the currently selected
  // item in the header navigation.
  locals.section = 'home';

  // Render the view
  view.render('index');
};
