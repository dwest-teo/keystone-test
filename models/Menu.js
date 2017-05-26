const keystone = require('keystone');

const Types = keystone.Field.Types;

const Menu = new keystone.List('Menu', {
  sortable: true,
  autokey: { from: 'name', path: 'key', unique: true },
});

Menu.add({
  name: { type: String, required: true },
  enabled: { type: Types.Boolean, default: true },
});

Menu.relationship({ ref: 'Category', path: 'categories', refPath: 'menu' });
Menu.defaultColumns = 'name, enabled, sortOrder';

Menu.schema.set('toJSON', {
  transform: (doc, rtn, options) => {
    rtn.categories = doc.categories.map(child => ({
      id: child._id,
      key: child.key,
      name: child.name,
      url: child.url,
    }));

    return {
      id: rtn._id,
      key: rtn.key,
      name: rtn.name,
      categories: rtn.categories,
      pages: {},
    };
  },
});

Menu.register();
