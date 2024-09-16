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
        trailingSlash: false, // include if you are using trailingSlash in gatsby config
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
        createLinkInHead: true,
        entryLimit: 45000,
        excludes: ['/404', '/404.html', '/*/404', '/*/404.html'],
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
        resolveSiteUrl: ({ site }: any) => site.siteMetadata.siteUrl, // Ensure siteUrl is retrieved correctly

        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: { nodes: any[] };
        }) => {
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

        serialize: ({ path, i18n }: { path: string; i18n: any }) => {
          const { defaultLanguage, languages, originalPath } = i18n;
          const fullUrl = `${siteUrl}${originalPath || path}`; // Correct URL concatenation

          const links = [
            { lang: defaultLanguage || 'en', url: fullUrl },
            { lang: 'x-default', url: fullUrl },
          ];

          languages.forEach((lang: string) => {
            if (lang !== defaultLanguage) {
              links.push({ lang, url: `${siteUrl}/${lang}${originalPath}` });
            }
          });

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
