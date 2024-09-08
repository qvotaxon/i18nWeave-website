import type { GatsbyConfig } from 'gatsby';

/** @type {*} */
const config: GatsbyConfig = {
  siteMetadata: {
    title: `i18nWeave - Developer's i18n Companion`,
    siteUrl: 'https://i18nweave.com',
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/locales`,
        name: `locale`,
      },
    },
    {
      resolve: `gatsby-plugin-react-i18next`,
      options: {
        localeJsonSourceName: `locale`, // name given to gatsby-source-filesystem plugin
        languages: [`en`, `nl`, `de`, `fr`, `es`],
        defaultLanguage: `en`,
        siteUrl: `https://i18nweave.com`,
        trailingSlash: 'always', // include if you are using trailingSlash in gatsby config
        i18nextOptions: {
          interpolation: {
            escapeValue: false, // not needed for react as it escapes by default
          },
          keySeparator: '.',
          nsSeparator: ':',
          defaultNS: `common`, // set common as the default namespace
          ns: [`common`, `navigation`], // specify the namespaces to load
        },
        pages: [
          {
            matchPath: '/:lang?',
            getLanguageFromPath: false,
          },
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-canonical-urls',
      options: {
        siteUrl: `https://i18nweave.com`,
      },
    },
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-pnpm-gatsby-5',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'i18nWeave',
        icon: 'src/images/logo.png',
      },
    },
  ],
};

export default config;
