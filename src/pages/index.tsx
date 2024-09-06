import { useTranslation } from 'react-i18next';
import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import {
  faCheckDouble,
  faCode,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import { Layout } from '@i18n-weave/ui/ui-layout';

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center"
      >
        <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl">
          <h1 className="text-white text-4xl mb-8">
            {t('section.features.title')}
          </h1>

          <p className="my-4">
            {t('section.features.introduction.description')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center max-w-screen-xl">
          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.keyExtraction.title')}
            </h3>
          </div>

          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            {' '}
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.easyConfig.title')}
            </h3>
          </div>

          <div className="w-1/3 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCheckDouble} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.foss.title')}
            </h3>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faAngular} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.angular.title')}
            </h3>
            <p className="text-md">
              {t('section.features.support.angular.description')}
            </p>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faReact} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.react.title')}
            </h3>
            <p className="text-md">
              {t('section.features.support.react.description')}
            </p>
          </div>

          <div className="w-2/6 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.support.custom.title')}
            </h3>
            <p className="text-md">
              {t('section.features.support.custom.description')}
            </p>
          </div>
        </div>
      </section>
      <section
        id="getting-started"
        className="h-screen flex flex-col items-center bg-variant-2 snap-start scroll-mt-16 pt-8"
      >
        <h2 className="text-primary text-4xl mb-8 text-center max-w-screen-xl">
          {t('section.gettingStarted.title')}
        </h2>

        <div className="w-5/6 text-primary max-w-screen-xl">
          <h2 className="text-lg font-bold text-variant-1 pb-2">
            {t('section.gettingStarted.installExtension.title')}
          </h2>

          <div>
            {t('section.gettingStarted.installExtension.description')}{' '}
            <a
              className="text-primary underline"
              href="https://marketplace.visualstudio.com/items?itemName=qvotaxon.i18nweave"
            >
              Visual Studio Code Marketplace.
            </a>
          </div>

          <h2 className="text-lg font-bold text-variant-1 pt-4 pb-2">
            {t('section.gettingStarted.configureProject.title')}
          </h2>

          <div>
            {t('section.gettingStarted.configureProject.description.partOne')}{' '}
            <code className="text-secondary">`Configure i18nWeave`</code>{' '}
            {t('section.gettingStarted.configureProject.description.partTwo')}{' '}
            <code className="text-secondary">Ctrl+Shift+P</code>
            {t(
              'section.gettingStarted.configureProject.description.partThree'
            )}{' '}
            <code className="text-secondary">Cmd+Shift+P</code>{' '}
            {t('section.gettingStarted.configureProject.description.partFour')}{' '}
            .
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default IndexPage;

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
