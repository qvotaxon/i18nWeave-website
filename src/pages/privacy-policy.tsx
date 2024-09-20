import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { LocaleLookUpInfo, type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { i18nKey } from '@i18n-weave/util/util-i18n-key';

import { type PageProps, graphql } from 'gatsby';
import { Trans, useTranslation } from 'react-i18next';

i18nKey('policies:privacyPolicy.dataCollection.googleAnalytics');
i18nKey('policies:privacyPolicy.dataCollection.microsoftClarity');
i18nKey('policies:privacyPolicy.dataCollection.languageCookie');
i18nKey('policies:privacyPolicy.contact.text');

const PrivacyPolicyPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="flex flex-col items-center bg-variant-1 pt-8">
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl w-5/6">
          <h1 className="text-white text-4xl mb-8">
            {t('policies:privacyPolicy.title')}
          </h1>
          <h2 className="text-white text-2xl mb-4">
            {t('policies:privacyPolicy.introduction.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.introduction.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.dataCollection.title')}
          </h2>
          <div className="text-white text-lg mb-4">
            <ol className="pl-8">
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:privacyPolicy.dataCollection.googleAnalytics">
                  <b>Google Analytics:</b>
                </Trans>
              </li>
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:privacyPolicy.dataCollection.microsoftClarity">
                  <b>Microsoft Clarity:</b>
                </Trans>
              </li>
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:privacyPolicy.dataCollection.languageCookie">
                  <b>Language Cookie:</b>
                </Trans>
              </li>
            </ol>
          </div>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.useOfData.title')}
          </h2>
          <div className="text-white text-lg mb-4">
            <p className="mb-4">{t('policies:privacyPolicy.useOfData.text')}</p>
            <ul className="pl-8">
              <li className="list-item list-disc pb-1">
                {t('policies:privacyPolicy.useOfData.improve')}
              </li>
              <li className="list-item list-disc pb-1">
                {t('policies:privacyPolicy.useOfData.analyze')}
              </li>
              <li className="list-item list-disc pb-1">
                {t('policies:privacyPolicy.useOfData.monitor')}
              </li>
            </ul>
          </div>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.dataSharing.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.dataSharing.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.dataSecurity.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.dataSecurity.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.internationalDataTransfer.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.internationalDataTransfer.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.childPrivacy.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.childPrivacy.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.changesToPolicy.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:privacyPolicy.changesToPolicy.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:privacyPolicy.contact.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            <Trans i18nKey="policies:privacyPolicy.contact.text">
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="mailto:privacy@i18nweave.com">
                privacy@i18nweave.com
              </SecureLink>
            </Trans>
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicyPage;

export const Head = (props: PageProps<LocaleLookUpInfo, PageContext>) => {
  const pageName = 'privacyPolicy';

  // Declare translation keys
  i18nKey(`seo.privacyPolicy.title`);
  i18nKey('seo.privacyPolicy.description');
  i18nKey('seo.privacyPolicy.keywords');

  return (
    <SEO
      pageName={pageName}
      title={'Privacy Policy'}
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
