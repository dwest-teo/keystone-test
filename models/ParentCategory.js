const keystone = require('keystone');

const Types = keystone.Field.Types;

const ParentCategory = new keystone.List('ParentCategory', {
  autokey: { from: 'name', path: 'key', unique: true },
});

ParentCategory.add({
  name: { type: String, required: true },
  url: { type: String, required: true, default: '/shop/category/' },
  image: { type: Types.CloudinaryImage },
  description: { type: String },
});

ParentCategory.relationship({ ref: 'Subcategory', path: 'subcategories', refPath: 'parent' });

ParentCategory.register();
