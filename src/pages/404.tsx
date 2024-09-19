import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
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
        <SecureLink
          className="button text-center w-fit block md:w-auto text-white py-2 px-4 mt-8 mx-0 border-4 border-white text-2xl hover:text-highlight hover:border-highlight"
          to="/">
          {t('404.goToHome')}
        </SecureLink>
      </section>
    </Layout>
  );
};

export default NotFoundPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
  return (
    <SEO
      title="Developer's i18n Companion"
      description=""
      keywords=""
      pageContext={props.pageContext}
      pathname={props.location.pathname}
      noIndex={true}
    />
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
