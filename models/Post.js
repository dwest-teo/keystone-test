const keystone = require('keystone');

const Types = keystone.Field.Types;

const Post = new keystone.List('Post', {
  map: { name: 'title' },
  autokey: { path: 'slug', from: 'title', unique: true },
});

Post.add({
  title: {
    type: String,
    required: true,
  },
  state: {
    type: Types.Select,
    options: 'draft, published, archived',
    default: 'draft',
    index: true,
  },
  featured: {
    type: Types.Boolean,
    default: false,
    dependsOn: { state: 'published' },
  },
  author: {
    type: Types.Relationship,
    ref: 'User',
    index: true,
  },
  publishedDate: {
    type: Types.Date,
    index: true,
    dependsOn: { state: 'published' },
  },
  image: { type: Types.CloudinaryImage },
  content: {
    brief: {
      type: Types.Textarea,
      height: 150,
    },
    extended: {
      type: Types.Markdown,
      height: 400,
    },
  },
  categories: {
    type: Types.Relationship,
    ref: 'PostCategory',
    many: true,
  },
});

Post.schema.virtual('content.full').get(function () {
  return this.content.extended || this.content.brief;
});

Post.schema.set('toJSON', {
  transform: (doc, rtn, options) => {
    rtn.id = rtn._id;
    delete rtn._id;
    delete rtn.__v;

    const { email, name } = doc.author;
    rtn.author = { id: doc.author._id, email, name };

    rtn.categories = doc.categories.map(c => ({ id: c._id, key: c.key, name: c.name }));
  }
})

Post.defaultColumns = 'title, state|20%, author|20%, publishedDate|20%';
Post.register();
