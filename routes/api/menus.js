const keystone = require('keystone');
const _ = require('lodash');

const Menu = keystone.list('Menu');

/**
 * List Menus
 */
exports.list = function (req, res) {
  Menu.model.find()
    .where('enabled', true)
    .exec((err, items) => {
      if (err) {
        return res.apiError('database error', err);
      }

      keystone.populateRelated(items, 'categories', (err) => {
        if (err) {
          return res.apiError('db populate error', err);
        }

        res.apiResponse({
          menus: items,
        });
      });
    });
};

/**
 * Get Menu by ID
 */
exports.get = function (req, res) {
  Menu.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }

    if (!item) {
      return res.apiError('not found');
    }

    res.apiResponse({
      menu: item,
    });
  });
};
