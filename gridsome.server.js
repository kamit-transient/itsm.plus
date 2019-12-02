const slugify = require('@sindresorhus/slugify');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const yaml = require('js-yaml');

module.exports = function (api) {
  
  const slugReplacement = {
    replacement: '-', // replace spaces with replacement
    remove: /[^\w\s-]/g, // regex to remove characters
    lower: true 
  };

  api.loadSource(({addSchemaResolvers}) => {

    addSchemaResolvers({
      Article: {
        excerpt(obj) {
          var longText = (obj.excerpt.length > 200) ? '...' : '';
          return obj.excerpt.replace(/^(.{200}[^\s]*).*/, "$1" + longText);
        }
      },
      News: {
        excerpt(obj) {
          var longText = (obj.excerpt.length > 200) ? '...' : '';
          return obj.excerpt.replace(/^(.{200}[^\s]*).*/, "$1" + longText);
        }
      }
    });

  });


  api.onCreateNode(options => {
    if (options.internal.typeName === 'Article') {  
      options.recordType = options.internal.typeName;
      options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
      options.slug = slugify(options.title, slugReplacement);
      return {
        ...options
      };
    }

    if (options.internal.typeName === 'News') {
      options.recordType = options.internal.typeName;
      options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
      options.slug = slugify(options.title, slugReplacement);
      return {
        ...options
      };
    }

    if (options.internal.typeName === 'Tag') {   
      options.recordType = options.internal.typeName;
      options.slug = slugify(options.title, slugReplacement);
      return {
        ...options
      };
    }

    if (options.internal.typeName === 'Resource') {
      options.recordType = options.internal.typeName;
      options.tags = (typeof options.tags === 'string') ? options.tags.split(',').map(string => string.trim()) : options.tags;
      return {
        ...options
      };
    }

    if (options.internal.typeName === 'CustomPage') {
      options.recordType = options.internal.typeName;
      options.sidebar = (options.sidebar) ? true : false;
      return {
        ...options
      };
    }

  });

  api.beforeBuild(({store}) => {

    const collectionArticle = store.getCollection('Article')._collection;
    
    const articles = collectionArticle.data.map(record => {
      return _.pick(record, ['title', 'path', 'excerpt', 'content', 'tags', 'recordType']);
    });

    const collectionNews = store.getCollection('News')._collection;

    const news = collectionNews.data.map(record => {
      return _.pick(record, ['title', 'path', 'excerpt', 'content', 'tags', 'recordType']);
    });

    const output = {
      dir: './static',
      name: 'search.json'
    };

    const records = _.merge(articles, news);

    const outputPath = path.resolve(process.cwd(), output.dir);
    const outputPathExists = fs.existsSync(outputPath);
    const fileName = output.name.endsWith('.json') ? output.name : `${output.name}.json`;

    if (outputPathExists) {
      fs.writeFileSync(path.resolve(process.cwd(), output.dir, fileName), JSON.stringify(records));
    } else {
      fs.mkdirSync(outputPath);
      fs.writeFileSync(path.resolve(process.cwd(), output.dir, fileName), JSON.stringify(records));
    }
    
  });
};