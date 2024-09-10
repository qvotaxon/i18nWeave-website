import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import {
  faCheckDouble,
  faCode,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type PageProps, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center [@media_(max-height:666px)]:h-fit">
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl">
          <h1 className="text-white text-4xl mb-8">
            {t('section.i18nWeave.introduction.title')}
          </h1>

          <p className="my-4">
            {t('section.features.introduction.description')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center max-w-screen-xl">
          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.keyExtraction.title')}
            </h2>
          </div>

          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            {' '}
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.easyConfig.title')}
            </h2>
          </div>

          <div className="w-1/3 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCheckDouble} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.foss.title')}
            </h2>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faAngular} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.angular.title')}
            </h2>
            <p className="text-md">
              {t('section.features.support.angular.description')}
            </p>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faReact} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.react.title')}
            </h2>
            <p className="text-md">
              {t('section.features.support.react.description')}
            </p>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.custom.title')}
            </h2>
            <p className="text-md">
              {t('section.features.support.custom.description')}
            </p>
          </div>
        </div>
      </section>
      <section
        id="getting-started"
        className="h-screen flex flex-col items-center bg-variant-2 snap-start scroll-mt-16 pt-8 [@media_(max-height:666px)]:h-fit [@media_(max-height:666px)]:py-8">
        <h3 className="text-primary text-4xl mb-8 text-center max-w-screen-xl">
          {t('section.gettingStarted.title')}
        </h3>

        <div className="w-5/6 text-primary max-w-screen-xl text-lg">
          <div>
            <p className="my-4">
              {t('section.gettingStarted.configurationWizard.introduction')}
            </p>
            <p className="my-4">
              {t('section.gettingStarted.librarySupport.introduction')}
            </p>
            {/* <p className="my-4">
              {t('section.gettingStarted.examples.introduction')}
            </p> */}
          </div>
        </div>

        <div className="mt-8 w-5/6 max-w-screen-xl">
          <SecureLink
            to="/getting-started"
            className="button text-center w-full block md:inline md:w-auto text-primary p-2 mx-0 border-4 border-primary text-2xl hover:text-white hover:border-white">
            {t('section.gettingStarted.buttons.getStarted')}
          </SecureLink>
          <SecureLink
            to="/features"
            className="button text-center w-full block md:inline md:w-auto text-primary p-2 mx-0 md:mx-4 border-4 border-primary text-2xl hover:text-white hover:border-white mt-4 md:mt-0">
            {t('section.gettingStarted.buttons.features')}
          </SecureLink>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
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
