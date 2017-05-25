const keystone = require('keystone');

const MenuItem = keystone.list('MenuItem');

/**
 * List Menus
 */
exports.list = function (req, res) {
  MenuItem.model.find()
    .where('enabled', true)
    .populate('categoryChildren')
    .exec((err, items) => {
      if (err) {
        return res.apiError('database error', err);
      }

      res.apiResponse({
        menuItems: items,
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
