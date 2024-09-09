import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { type PageProps, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

const FeaturesPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 [@media_(max-height:666px)]:h-fit">
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl w-5/6">
          <h1 className="text-white text-4xl mb-8">
            {t('section.features.title')}
          </h1>

          <p className="my-4">
            {t('section.features.automaticKeyExtraction.introduction')}
          </p>

          <p className="mt-2">
            <span>
              {t('section.features.automaticTranslation.introduction')}
            </span>
          </p>
          <p className="my-2">
            <span className="font-bold">Limitations:</span> The DeepL
            integration in i18nWeave supports the languages listed here:{' '}
            <SecureLink
              className="text-white underline hover:text-highlight hover:border-highlight"
              to="https://developers.deepl.com/docs/resources/supported-languages">
              DeepL Docs
            </SecureLink>
            .
          </p>

          <p className="my-4">{t('section.features.tableView.introduction')}</p>

          <SecureLink
            to="/getting-started"
            className="button text-center w-full block text-white p-2 border-4 border-white text-2xl hover:text-highlight hover:border-highlight mt-8 md:mt-4 md:inline-block md:w-auto">
            {t('section.gettingStarted.buttons.getStarted')}
          </SecureLink>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
  return (
    <SEO
      title="Developer's i18n Companion"
      description="Install and configure the i18nWeave extension for Visual Studio Code. Instructions for Windows, Linux, and macOS."
      keywords="i18next, i18n, react, next.js, angular, i18n-next, deepl, internationalization, VSCode extension, Windows, Linux, macOS"
      pageContext={props.pageContext}
      pathname={props.location.pathname}
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
