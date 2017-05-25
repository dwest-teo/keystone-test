const keystone = require('keystone');

const Category = keystone.list('Category');

/**
 * List Posts
 */
exports.list = function (req, res) {
  // eslint-disable-next-line array-callback-return
  Category.model.find()

    .exec((err, items) => {
      if (err) {
        return res.apiError('database error', err);
      }

      res.apiResponse({
        categories: items,
      });
    });
};

/**
 * Get Post by ID
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
