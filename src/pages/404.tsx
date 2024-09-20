import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { LocaleLookUpInfo, type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { i18nKey } from '@i18n-weave/util/util-i18n-key';

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

export const Head = (props: PageProps<LocaleLookUpInfo, PageContext>) => {
  const pageName = '404';

  // Declare translation keys
  i18nKey(`seo.404.title`);
  i18nKey('seo.404.description');
  i18nKey('seo.404.keywords');

  return (
    <SEO
      pageName={pageName}
      title={`Page Not Found`}
      description={
        'Automatically scan your code and extract translation keys into i18next files. The i18nWeave VS Code extension syncs translations with your codebase.'
      }
      keywords={
        'i18next, vscode extension, scan code, extract translation keys'
      }
      pathname={props.location.pathname}
      pageContext={props.pageContext}
      pageData={props.data}
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
