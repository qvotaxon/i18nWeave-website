import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { i18nKey } from '@i18n-weave/util/util-i18n-key';

import { type PageProps, graphql } from 'gatsby';
import { Trans, useTranslation } from 'react-i18next';

i18nKey('policies:cookies.typesOfCookies.essential');
i18nKey('policies:cookies.typesOfCookies.performance');
i18nKey('policies:cookies.typesOfCookies.languageCookie');
i18nKey('policies:cookies.useOfCookies.googleAnalytics');
i18nKey('policies:cookies.useOfCookies.microsoftClarity');
i18nKey('policies:cookies.useOfCookies.languageCookie');
i18nKey('policies:cookies.contact.text');

const CookiePolicyPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section className="flex flex-col items-center bg-variant-1 pt-8">
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl w-5/6">
          <h1 className="text-white text-4xl mb-8">
            {t('policies:cookies.title')}
          </h1>
          <h2 className="text-white text-2xl mb-4">
            {t('policies:cookies.introduction.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:cookies.introduction.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:cookies.typesOfCookies.title')}
          </h2>
          <div className="text-white text-lg mb-4">
            <ol className="pl-8">
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:cookies.typesOfCookies.essential">
                  <b>Essential Cookies:</b>
                </Trans>
              </li>
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:cookies.typesOfCookies.performance">
                  <b>Performance and Analytical Cookies:</b>
                </Trans>
              </li>
              <li className="list-item list-decimal pb-1">
                <Trans i18nKey="policies:cookies.typesOfCookies.languageCookie">
                  <b>Language Preference Cookie:</b>
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
                <Trans i18nKey="policies:cookies.useOfCookies.googleAnalytics">
                  <b>Google Analytics:</b>
                </Trans>
              </li>
              <li className="list-item list-disc pb-1">
                <Trans i18nKey="policies:cookies.useOfCookies.microsoftClarity">
                  <b>Microsoft Clarity:</b>
                </Trans>
              </li>
              <li className="list-item list-disc pb-1">
                <Trans i18nKey="policies:cookies.useOfCookies.languageCookie">
                  <b>Language Cookie:</b>
                </Trans>
              </li>
            </ul>
          </div>

          <h2 className="text-white text-2xl mb-4">
            {t('policies:cookies.managingCookies.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:cookies.managingCookies.textOne')}
          </p>
          <p className="text-white text-lg mb-4">
            {t('policies:cookies.managingCookies.textTwo')}
          </p>
          <ul className="pl-8">
            <li className="list-item list-disc pb-1">
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="https://support.google.com/chrome/answer/95647">
                Google Chrome
              </SecureLink>
            </li>
            <li className="list-item list-disc pb-1">
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer">
                Mozilla Firefox
              </SecureLink>
            </li>
            <li className="list-item list-disc pb-1">
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-0406-49b9-37d7-00bb623566c0">
                Microsoft Edge
              </SecureLink>
            </li>
            <li className="list-item list-disc pb-1">
              <SecureLink
                className="text-white underline hover:text-highlight hover:border-highlight"
                to="https://support.apple.com/en-us/guide/safari/sfri11471/mac">
                Safari
              </SecureLink>
            </li>
          </ul>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:cookies.changesToPolicy.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            {t('policies:cookies.changesToPolicy.text')}
          </p>

          <h2 className="text-white text-2xl mb-4 mt-8">
            {t('policies:cookies.contact.title')}
          </h2>
          <p className="text-white text-lg mb-4">
            <Trans i18nKey="policies:cookies.contact.text">
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

export default CookiePolicyPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
  return (
    <SEO
      title="Cookie Policy"
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
