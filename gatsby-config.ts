import type { GatsbyConfig } from 'gatsby';
/** @type {*} */
const config: GatsbyConfig = {
  siteMetadata: {
    title: `i18nWeave - Developer's i18n Companion`,
    siteUrl: `https://i18nweave.com`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-pnpm-gatsby-5',
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-google-gtag`,
      options: {
        trackingIds: [
          'G-GY3TDG8CD7', // Google Analytics / GA
        ],
        pluginConfig: {
          head: true,
        },
      },
    },
    'gatsby-plugin-image',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'i18nWeave',
        icon: 'src/images/logo.png',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
  ],
};

export default config;
