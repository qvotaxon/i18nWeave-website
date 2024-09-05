import { init } from 'cookie-though';
import * as React from 'react';
import { graphql, type HeadFC, type PageProps } from 'gatsby';
import { useState, useRef, useEffect } from 'react';
import {
  faCheckDouble,
  faCode,
  faEye,
  faObjectGroup,
  faSmile,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';
import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/languageSelector';
import { I18nextContext, useI18next } from 'gatsby-plugin-react-i18next';
import { Config } from 'cookie-though/dist/types/types';

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language } = useI18next();

  useEffect(() => {
    setIsMenuOpen(false);
    document.documentElement.lang = language;
    const metaElement = document.querySelector('meta[name="content-language"]');
    if (!metaElement) {
      const newMetaElement = document.createElement('meta');
      newMetaElement.setAttribute('name', 'content-language');
      newMetaElement.setAttribute('content', language);
      document.head.appendChild(newMetaElement);
    } else {
      metaElement.setAttribute('content', language);
    }
  }, [language]);

  useEffect(() => {
    init({
      policies: [
        {
          id: 'essential',
          label: 'Essential Cookies',
          description:
            'We need to save some technical cookies, for the website to function properly.',
          category: 'essential',
        },
        {
          id: 'functional',
          label: 'Functional Cookies',
          category: 'functional',
          description: 'We need to save some basic preferences eg. language.',
        },
        {
          id: 'statistics',
          label: 'Statistics',
          category: 'statistics',
          description:
            'We need to save some technical cookies, for the website to function properly.',
        },
        {
          id: 'social',
          label: 'Social Media Cookies',
          category: 'social',
          description:
            'We need to save some social cookies, for the website to function properly.',
        },
      ],
      essentialLabel: 'Always on',
      permissionLabels: {
        accept: 'Accept',
        acceptAll: 'Accept all',
        decline: 'Decline',
      },
      cookiePreferenceKey: 'cookie-preferences',
      header: {
        title: 'Cookies, Anyone?',
        subTitle: "Yep, it's another one of *those* banners...",
        description:
          "We know, cookies aren't everyone's favorite snack, but they help me (the website's developer) give you the smoothest, bug-free experience possible. Just a few crumbs can make all the difference!",
      },
      cookiePolicy: {
        url: 'https://inthepocket.com/cookie-policy',
        label: 'Read the full cookie declaration',
      },
      customizeLabel: 'Customize',
    });
  }, []);

  //todo: uitzoeken layout

  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      <header className="sticky top-0 w-full bg-primary py-4 z-10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <StaticImage
            width={32}
            height={32}
            src="../images/logo.png"
            alt="i18nWeave Logo"
            className="h-8 w-8"
          />
          <span className="text-lg">i18nWeave</span>
        </div>

        <button
          type="button"
          aria-label="Toggle Menu"
          className="block lg:hidden relative text-white focus:outline-none z-10"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <div className={`hamburger ${isMenuOpen ? 'open' : ''}`}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </button>

        <nav
          ref={menuRef}
          className={`mt-16 lg:flex lg:items-center lg:static lg:p-0 absolute left-0 w-full bg-primary lg:bg-transparent lg:flex-row lg:space-x-4 transition-transform transform lg:mt-0 ${
            isMenuOpen ? 'translate-y-0 top-0 visible' : '-top-48 hidden'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 p-4 lg:ml-8 lg:p-0">
            <li>
              <a
                href="#features"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation:main.features')}
              </a>
            </li>
            <li>
              <a
                href="#getting-started"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                {t('navigation:main.gettingStarted')}
              </a>
            </li>
            {/* <li>
              <a
                href="#section-3"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 3
              </a>
            </li>
            <li>
              <a
                href="#section-4"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 4
              </a>
            </li> */}
          </ul>

          <LanguageSelector />
        </nav>
      </header>

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

          {/* <p className="my-4">{t('section.features.introduction.support')}</p> */}
        </div>

        <div className="flex flex-wrap justify-center max-w-screen-xl">
          {/* <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faLanguage} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Auto-Translate
            </h3>
            <p className="text-md">
              Automatically translate your keys to any of languages supported by
              Google Translate or DeepL.
            </p>
          </div> */}

          {/* md:w-1/4 */}
          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.keyExtraction.title')}
            </h3>
            <p className="text-md">
              {/* {t('section.features.keyExtraction.description')} */}
            </p>
          </div>

          {/* md:w-1/4 */}
          <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
            {' '}
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h3 className="text-lg font-bold text-variant-2 pb-2">
              {t('section.features.easyConfig.title')}
            </h3>
            <p className="text-md">
              {/* {t('section.features.easyConfig.description')} */}
            </p>
          </div>

          {/* md:w-1/4 */}
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

          {/* <h3 className="text-lg font-bold text-variant-1 pt-4 pb-2">
            Configuration Options
          </h3>

          <div>
            i18nWeave provides a wide range of configuration options to suit
            your needs. You can configure the extension to work with your
            existing project setup. Please have a look on the Examples page for
            more information on how to configure the extension. And to see the
            extension in action.
          </div> */}
        </div>
      </section>
      {/* <section
        id="section-3"
        className="h-screen flex items-center justify-center bg-variant-3 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 3</h1>
      </section>
      <section
        id="section-4"
        className="h-screen flex items-center justify-center bg-variant-4 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 4</h1>
      </section> */}
    </main>
  );
};

export default IndexPage;

// export const Head: HeadFC = ({ data, location }) => {
//   const context = React.useContext(I18nextContext);

//   useEffect(() => {
//     console.log(context.language);
//   }, [context.language]);

//   return (
//     <head>
//       <title>i18nWeave - Developer's i18n Companion</title>
//       <meta
//         name="description"
//         content="i18nWeave helps developers efficiently handle translations in their projects. Increase productivity and ensure consistency across multiple languages."
//       />
//       <meta
//         name="keywords"
//         content="i18n, react, next.js, angular, i18n-next, deepl, internationalization, VSCode extension, translations, developer tools"
//       />
//     </head>
//   );
// };

export const Head = () => (
  <>
    <title>i18nWeave - Developer's i18n Companion</title>
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
