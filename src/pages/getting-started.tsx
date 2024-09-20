import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { LocaleLookUpInfo, type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { i18nKey } from '@i18n-weave/util/util-i18n-key';

import { type PageProps, graphql } from 'gatsby';
import { Trans, useTranslation } from 'react-i18next';

i18nKey('section.gettingStarted.configureProject.description');

const GettingStartedPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-2 text-primary snap-start scroll-mt-16 pt-8 [@media_(max-height:666px)]:h-fit">
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl w-5/6">
          <h1 className="text-4xl mb-8">{t('section.gettingStarted.title')}</h1>
          <h2 className="text-lg font-bold text-variant-1 pb-2">
            {t('section.gettingStarted.installExtension.title')}
          </h2>
          <div>
            {t('section.gettingStarted.installExtension.description')}{' '}
            <SecureLink
              className="text-primary underline hover:text-white hover:border-white"
              to="https://marketplace.visualstudio.com/items?itemName=qvotaxon.i18nweave">
              Visual Studio Code Marketplace.
            </SecureLink>
          </div>
          <h2 className="text-lg font-bold text-variant-1 pt-4 pb-2">
            {t('section.gettingStarted.configureProject.title')}
          </h2>
          <Trans i18nKey="section.gettingStarted.configureProject.description">
            <code className="text-secondary"></code>{' '}
            <code className="text-secondary"></code>{' '}
            <code className="text-secondary"></code>
          </Trans>
          <SecureLink
            to="/features"
            className="button text-center w-full block text-primary border-4 border-primary text-2xl hover:text-white hover:border-white py-2 px-4 mt-8 mx-0 md:mt-4 md:w-fit">
            {t('section.gettingStarted.buttons.features')}
          </SecureLink>
        </div>
      </section>
    </Layout>
  );
};

export default GettingStartedPage;

export const Head = (props: PageProps<LocaleLookUpInfo, PageContext>) => {
  const pageName = 'gettingStarted';

  // Declare translation keys
  i18nKey(`seo.gettingStarted.title`);
  i18nKey('seo.gettingStarted.description');
  i18nKey('seo.gettingStarted.keywords');

  return (
    <SEO
      pageName={pageName}
      title="Getting Started with i18nWeave"
      description="Learn how to install and configure the i18nWeave VS Code extension to scan your code and extract translation keys into i18next files."
      keywords="i18nWeave, i18next, VS Code extension, extract translation keys, configure i18nWeave, localization, translation sync"
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
