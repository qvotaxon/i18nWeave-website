import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { PageProps, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center [@media_(max-height:666px)]:h-fit">
        <h1 className="text-4xl">{t('404.pageNotFound.title')}</h1>
        <p className="text-2xl pt-6">{t('404.pageNotFound.errorMessage')}</p>
        <p className="text-6xl pt-6">¯\_(ツ)_/¯</p>
      </section>
    </Layout>
  );
};

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

export default NotFoundPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
  const { t } = useTranslation();

  return (
    <SEO
      title="Developer's i18n Companion"
      description="i18nWeave helps developers efficiently handle i18next translations in their projects. Increase productivity and ensure consistency across multiple languages."
      keywords="i18next, i18n, react, next.js, angular, i18n-next, deepl, internationalization, VSCode extension, translations, developer tools"
      pageContext={props.pageContext}
      pathname={props.location.pathname}
    />
  );
};
