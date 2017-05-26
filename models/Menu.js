const keystone = require('keystone');
const _ = require('lodash');

const Types = keystone.Field.Types;

const Menu = new keystone.List('Menu', {
  sortable: true,
  autokey: { from: 'name', path: 'key', unique: true },
});

Menu.add({
  name: { type: String, required: true },
  enabled: { type: Types.Boolean, default: true },
  content: {
    brief: { type: Types.Html, wysiwyg: true, height: 150 },
    extended: { type: Types.Html, wysiwyg: true, height: 400 },
  },
});

Menu.relationship({ ref: 'Category', path: 'categoryChildren', refPath: 'menuParent' });
Menu.defaultColumns = 'name, enabled, sortOrder';

Menu.schema.set('toJSON', {
  transform: (doc, rtn, options) => {
    rtn.categoryChildren = _.map(doc.categoryChildren, c => _.pick(c, 'key', 'name', 'url'));
    return _.pick(rtn, 'key', 'name', 'categoryChildren');
  },
});

Menu.register();
