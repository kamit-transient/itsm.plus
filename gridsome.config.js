var embedConfig = {
  'enabledProviders': ['Youtube', 'Vimeo', 'Gist', 'Codepen', 'JSFiddle', 'Giphy'], 
  'Youtube': {
    template: './src/embedTemplates/Youtube.hbs',
  },
  'Vimeo': {
    template: './src/embedTemplates/Vimeo.hbs',
  },
  'Giphy': {
    template: './src/embedTemplates/Giphy.hbs',
  },
  'JSFiddle': {
    template: './src/embedTemplates/JSFiddle.hbs',
    secureConnection: true
  },
  'Codepen': {
    template: './src/embedTemplates/Codepen.hbs',
  },

};

module.exports = {
  siteName: 'ITSMPlus',
  siteUrl: 'https://www.itsm.plus',
  permalinks: {
    trailingSlash:false
  },
  icon: {
    favicon: {
      src: './src/resources/images/favicon.png',
      sizes: [16, 32, 96]
    },
    touchicon: {
      src: './src/resources/images/favicon.png',
      sizes: [76, 152, 120, 167],
      precomposed: true
    }
  },
  plugins: [
    {
      use: '@noxify/gridsome-source-git',
      options: {
        name: 'git-content',
        remote: 'https://github.com/ITSMPlus/content.git',
        target: 'git-content',
        pattern: ['**/*.md'],
        typeName: 'GitNode'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Article',
        baseDir: './git-content/articles',
        path: '**/*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            ['@noxify/gridsome-plugin-remark-embed', embedConfig]
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'News',
        baseDir: './git-content/news',
        path: '*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
        remark: {
          plugins: [
            ['@noxify/gridsome-plugin-remark-embed', embedConfig]
          ]
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Credits',
        baseDir: './content/credits',
        path: '*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'CustomPage',
        baseDir: './content/pages',
        path: '*.md'
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        typeName: 'Resource',
        baseDir: './git-content/resources',
        path: '*.md',
        refs: {
          tags: {
            typeName: 'Tag',
            create: true
          }
        },
      }
    },
    {
      use: '@gridsome/plugin-sitemap',
      options: {
        cacheTime: 600000, // default
        config: {
          '/articles/*': {
            changefreq: 'weekly',
            priority: 0.7
          },
          '/news/*': {
            changefreq: 'weekly',
            priority: 0.5
          }
        }
      }
    },
    {
      use: 'gridsome-plugin-robots-txt',
      options: {
        policy: [{
          userAgent: "*",
          allow: "/",
          disallow: "/search",
          crawlDelay: 2,
          cleanParam: "ref /articles/"
        }]
      }
    }
  ],
  transformers: {
    remark: {
      plugins: [
        'remark-autolink-headings',
        'remark-attr',
        ['gridsome-plugin-remark-prismjs-all', {
          noInlineHighlight: false,
          showLineNumbers: false,
        }]
      ]
    }
  },
  templates: {
    Article: [{
      path: '/articles/:title',
      component: './src/templates/Article.vue'
    }],
    Tag: [{
      path: '/tag/:title',
      component: './src/templates/Tag.vue'
    }],
    News: [{
      path: '/news/:title',
      component: './src/templates/News.vue'
    }],
    CustomPage: [{
      path:'/pages/:title',
      component: './src/templates/CustomPage.vue'
    }],
    /*Resource: [
      {
        path: '/resources/filter/type/:type',
        component: './src/templates/ResourceTypeFilter.vue'
      },
      {
        path: '/resources/filter/tags/:tag',
        component: './src/templates/ResourceTagFilter.vue'
      }
    ]*/
  },
  chainWebpack: config => {
    config.resolve.alias.set('@customPageImage', '@/../content/pages');
    config.module
      .rule('css')
      .oneOf('normal')
      .use('postcss-loader')
      .tap(options => {
        options.plugins.unshift(...[
          require('postcss-import'),
          require('postcss-nested')
        ]);

        if (process.env.NODE_ENV === 'production') {
          options.plugins.push(...[
            require('@fullhuman/postcss-purgecss')({
              content: [
                'src/assets/**/*.css',
                'src/**/*.vue',
                'src/**/*.js'
              ],

              whitelist: ['svg-inline--fa'],
              whitelistPatterns: [/shiki/, /fa-$/]
            })
          ]);
        }
        return options;
      });
  }
};