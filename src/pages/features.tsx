import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { LocaleLookUpInfo, type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { i18nKey } from '@i18n-weave/util/util-i18n-key';

import { type PageProps, graphql } from 'gatsby';
import { Trans, useTranslation } from 'gatsby-plugin-react-i18next';

i18nKey('section.features.automaticTranslation.limitations');

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
            <Trans i18nKey="section.features.automaticTranslation.limitations">
              <span className="font-bold"></span>
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="https://developers.deepl.com/docs/resources/supported-languages">
                DeepL Documentation
              </SecureLink>
            </Trans>
          </p>

          <p className="my-4">{t('section.features.tableView.introduction')}</p>

          <SecureLink
            to="/getting-started"
            className="button text-center w-full block text-white p-2 border-4 border-white text-2xl hover:text-highlight hover:border-highlight py-2 px-4 mx-0 md:mt-4 md:inline-block md:w-auto">
            {t('section.gettingStarted.buttons.getStarted')}
          </SecureLink>
        </div>
      </section>
    </Layout>
  );
};

export default FeaturesPage;

export const Head = (props: PageProps<LocaleLookUpInfo, PageContext>) => {
  const pageName = 'features';

  // Declare translation keys
  i18nKey(`seo.features.title`);
  i18nKey('seo.features.description');
  i18nKey('seo.features.keywords');

  return (
    <SEO
      pageName={pageName}
      title={'Features'}
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
