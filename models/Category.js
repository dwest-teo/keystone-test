const keystone = require('keystone');

const Types = keystone.Field.Types;

const Category = new keystone.List('Category', {
  autokey: { from: 'name', path: 'key', unique: true },
  // drilldown: 'parent',
});

Category.add({
  name: { type: String, required: true },
  image: { type: Types.CloudinaryImage },
  description: { type: String },
  parent: { type: Types.Relationship, ref: 'Category', many: false, collapse: true },
  enabled: { type: Types.Boolean, default: true },
  urlSchema: { type: Types.Select, options: 'Default, Manual', default: 'Default' },
  manualUrl: { type: String, dependsOn: { urlSchema: 'Manual' } },
});

Category.relationship({ ref: 'Category', path: 'children', refPath: 'parent' });

// Category.schema.virtual('derivedUrl').get(function () {
//   if (this.parent) {
//     return `${this.parent.url}/${this.key}/`;
//   }

//   return `/shop/${this.key}/`;
// });

// Category.schema.post('init', function () {
//   this.url = this.derivedUrl;
// });

// Category.schema.pre('save', function (next) {
//   if (this.parent) {
//     this.url = `${this.parent.url}/${this.key}`;
//   } else {
//     this.url = `/shop/${this.key}/`;
//   }

//   next();
// });

Category.defaultSort = 'parent';
Category.defaultColumns = 'name, parent, enabled';
Category.register();
