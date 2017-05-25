const keystone = require('keystone');

const Types = keystone.Field.Types;

const Subcategory = new keystone.List('Subcategory', {
  autokey: { from: 'name', path: 'key', unique: true },
  drilldown: 'parent',
});

Subcategory.add({
  name: { type: String, required: true },
  url: { type: Types.Url, required: true, default: '/shop/category/subcategory/' },
  image: { type: Types.CloudinaryImage },
  description: { type: String },
  parent: { type: Types.Relationship, ref: 'ParentCategory', many: false },
});

Subcategory.register();
