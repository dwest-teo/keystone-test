const keystone = require('keystone');
const _ = require('lodash');

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

MenuItem.schema.set('toJSON', {
  transform: (doc, rtn, options) => {
    rtn.categoryChildren = _.map(doc.categoryChildren, c => _.pick(c, 'key', 'name', 'url'));
    return _.pick(rtn, 'key', 'name', 'categoryChildren');
  },
});

MenuItem.register();
