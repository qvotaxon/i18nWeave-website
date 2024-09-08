import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';

import { type PageProps, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

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
          {t('section.gettingStarted.configureProject.description.partOne')}{' '}
          <code className="text-secondary">`Configure i18nWeave`</code>{' '}
          {t('section.gettingStarted.configureProject.description.partTwo')}{' '}
          <code className="text-secondary">Ctrl+Shift+P</code>
          {t(
            'section.gettingStarted.configureProject.description.partThree'
          )}{' '}
          <code className="text-secondary">Cmd+Shift+P</code>{' '}
          {t('section.gettingStarted.configureProject.description.partFour')} .
          <SecureLink
            to="/features"
            className="button text-center w-full block text-primary p-2 border-4 border-primary text-2xl hover:text-white hover:border-white mt-8 md:w-fit">
            {t('section.gettingStarted.buttons.features')}
          </SecureLink>
        </div>
      </section>
    </Layout>
  );
};

export default GettingStartedPage;

export const Head = () => (
  <>
    <title>i18nWeave - Developer&apos;s i18n Companion</title>
    <meta
      name="description"
      content="i18nWeave helps developers efficiently handle translations in their projects. Increase productivity and ensure consistency across multiple languages."
    />
    <meta
      name="keywords"
      content="i18n, react, next.js, angular, i18n-next, deepl, internationalization, VSCode extension, translations, developer tools"
    />
  </>
);

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
