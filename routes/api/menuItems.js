const keystone = require('keystone');
const _ = require('lodash');

const MenuItem = keystone.list('MenuItem');

/**
 * List Menus
 */
exports.list = function (req, res) {
  MenuItem.model.find()
    .where('enabled', true)
    .exec((err, items) => {
      if (err) {
        return res.apiError('database error', err);
      }

      keystone.populateRelated(items, 'categoryChildren', (err) => {
        if (err) {
          return res.apiError('db populate error', err);
        }

        const pop = _.map(items, item => _.pick(item, 'key', 'name', 'categoryChildren'));

        res.apiResponse({
          menuItems: pop,
        });
      });
    });
};

/**
 * Get Menu by ID
 */
exports.get = function (req, res) {
  MenuItem.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }

    if (!item) {
      return res.apiError('not found');
    }

    res.apiResponse({
      menuItem: item,
    });
  });
};
