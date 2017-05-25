const keystone = require('keystone');

const Types = keystone.Field.Types;

const MenuItem = new keystone.List('MenuItem', {
  sortable: true,
  autokey: { from: 'name', path: 'key', unique: true },
});

MenuItem.add({
  name: { type: String, required: true },
  enabled: { type: Types.Boolean, default: true },
});

MenuItem.relationship({ ref: 'Category', path: 'categoryChildren', refPath: 'menuParent' });

MenuItem.defaultColumns = 'name, enabled, sortOrder';
MenuItem.register();
