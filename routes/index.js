const keystone = require('keystone');
const middleware = require('./middleware');

const importRoutes = keystone.importer(__dirname);

// Common Middleware
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);

// Import Route Controllers
const routes = {
  views: importRoutes('./views'),
  api: importRoutes('./api'),
};

// Setup Route Bindings
// eslint-disable-next-line no-multi-assign
exports = module.exports = function (app) {
  // Views
  app.get('/', routes.views.index);
  app.get('/blog/:category?', routes.views.blog);
  app.get('/blog/post/:post', routes.views.post);
  app.get('/gallery', routes.views.gallery);
  app.all('/contact', routes.views.contact);

  // api
  app.get('/api/post/list', keystone.middleware.api, routes.api.posts.list);
  app.all('/api/post/create', keystone.middleware.api, routes.api.posts.create);
  app.get('/api/post/:id', keystone.middleware.api, routes.api.posts.get);
  app.all('/api/post/:id/update', keystone.middleware.api, routes.api.posts.update);
  app.get('/api/post/:id/remove', keystone.middleware.api, routes.api.posts.remove);
};
