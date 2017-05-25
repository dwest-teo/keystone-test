const keystone = require('keystone');

const Category = keystone.list('Category');

/**
 * List Categories
 */
exports.list = function (req, res) {
  // eslint-disable-next-line array-callback-return
  Category.model.find((err, items) => {
    if (err) {
      return res.apiError('database error', err);
    }

    res.apiResponse({
      categories: items,
    });
  });
};

/**
 * Get Category by ID
 */
exports.get = function (req, res) {
  Category.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }

    if (!item) {
      return res.apiError('not found');
    }

    res.apiResponse({
      category: item,
    });
  });
};
