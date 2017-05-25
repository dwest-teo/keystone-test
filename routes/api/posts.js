const keystone = require('keystone');

const Post = keystone.list('Post');

/**
 * List Posts
 */
exports.list = function (req, res) {
  // eslint-disable-next-line array-callback-return
  Post.model.find((err, items) => {
    if (err) {
      return res.apiError('database error', err);
    }

    res.apiResponse({
      posts: items,
    });
  });
};

/**
 * Get Post by ID
 */
exports.get = function (req, res) {
  Post.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }

    if (!item) {
      return res.apiError('not found');
    }

    res.apiResponse({
      post: item,
    });
  });
};

/**
 * Create a Post
 */
exports.create = function (req, res) {
  // eslint-disable-next-line new-cap
  const item = new Post.model();
  const data = (req.method === 'POST') ? req.body : req.query;

  item.getUpdateHandler(req).process(data, (err) => {
    if (err) {
      return res.apiError('error', err);
    }

    res.apiResponse({
      post: item,
    });
  });
};

/**
 * Get Post by ID
 */
exports.update = function (req, res) {
  Post.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }
    if (!item) {
      return res.apiError('not found');
    }

    const data = (req.method === 'POST') ? req.body : req.query;

    item.getUpdateHandler(req).process(data, (err) => {
      if (err) {
        return res.apiError('create error', err);
      }

      res.apiResponse({
        post: item,
      });
    });
  });
};

/**
 * Delete Post by ID
 */
exports.remove = function (req, res) {
  Post.model.findById(req.params.id).exec((err, item) => {
    if (err) {
      return res.apiError('database error', err);
    }
    if (!item) {
      return res.apiError('not found');
    }

    item.remove((err) => {
      if (err) {
        return res.apiError('database error', err);
      }

      return res.apiResponse({
        success: true,
      });
    });
  });
};
