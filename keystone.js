/* eslint camelcase: 0 */
require('dotenv').config();

const keystone = require('keystone');
const handlebars = require('express-handlebars');

keystone.init({
  name: 'NextTEO Admin',
  brand: 'NextTEO',

  sass: 'public',
  static: 'public',
  favicon: 'public/favicon.ico',
  views: 'templates/views',
  'view engine': '.hbs',

  'custom engine': handlebars.create({
    layoutsDir: 'templates/views/layouts',
    partialsDir: 'templates/views/partials',
    defaultLayout: 'default',
    // eslint-disable-next-line no-new-require, new-cap
    helpers: new require('./templates/views/helpers')(),
    extname: '.hbs',
  }).engine,

  'auto update': true,
  session: true,
  auth: true,
  'user model': 'User',
  'cookie secret': 'keyboardcat',
});

keystone.import('models');

keystone.set('locals', {
  _: require('lodash'),
  env: keystone.get('env'),
  utils: keystone.utils,
  editable: keystone.content.editable,
});

keystone.set('routes', require('./routes'));

keystone.set('nav', {
  posts: [ 'posts', 'post-categories' ],
  galleries: 'galleries',
  enquiries: 'enquiries',
  users: 'users',
});

keystone.start();
