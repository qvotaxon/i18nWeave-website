import type { GatsbyConfig } from 'gatsby';

const siteUrl = process.env.URL || `https://i18nweave.com`;

/** @type {*} */
const config: GatsbyConfig = {
  siteMetadata: {
    title: `i18nWeave - Developer's i18n Companion`,
    siteUrl: siteUrl,
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
        siteUrl: siteUrl,
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
    'gatsby-plugin-fontawesome-css',
    'gatsby-plugin-pnpm-gatsby-5',
    'gatsby-plugin-postcss',
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sitemap',
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        output: `/sitemap/`, // Define your sitemap directory output
        createLinkInHead: true, // Adding a link to the sitemap in the <head>
        entryLimit: 45000, // Default entry limit
        excludes: ['/404', '/404.html', '/*/404', '/*/404.html'], // Exclude 404 pages
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
                pageContext
              }
            }
          }
        `,
        resolveSiteUrl: () => siteUrl, // Resolving site URL from environment variable or fallback

        // Custom resolvePages function to filter and map pages
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: { nodes: any[] };
        }) => {
          // Filtering pages with required conditions
          return allPages
            .filter(
              page =>
                page.pageContext &&
                page.pageContext.i18n &&
                page.pageContext.i18n.routed === false &&
                !page.path.includes('404')
            )
            .map(page => {
              const { path, pageContext } = page;
              const { i18n } = pageContext;
              return {
                path,
                i18n,
              };
            });
        },

        // Custom serialize function to format the sitemap entries
        serialize: ({ path, i18n }: { path: string; i18n: any }) => {
          const { defaultLanguage, languages, originalPath } = i18n;
          const fullUrl = siteUrl + (originalPath || path);

          // Generate links for different languages
          const links = [
            { lang: defaultLanguage || 'en', url: fullUrl },
            { lang: 'x-default', url: fullUrl },
          ];

          languages.forEach((lang: string) => {
            if (lang !== defaultLanguage) {
              links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` });
            }
          });

          // Return the sitemap entry with required fields
          return {
            url: fullUrl,
            changefreq: 'daily',
            priority: originalPath === '/' ? 1.0 : 0.7,
            links,
          };
        },
      },
    },
  ],
};

export default config;
