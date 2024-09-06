import { useGoogleAnalytics } from './../libs/feat/feat-google-analytics/src/lib/google-analytics';
import { useMicrosoftClarity } from './../libs/feat/feat-microsoft-clarity/src/lib/microsoft-clarity';
import {
  getPreferences,
  hide,
  init,
  onPreferencesChanged,
  show,
} from 'cookie-though';
import * as React from 'react';
import { graphql, type PageProps } from 'gatsby';
import { useState, useRef, useEffect } from 'react';
import {
  faCheckDouble,
  faCode,
  faCookie,
  faCookieBite,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';
import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/languageSelector';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { CookiePreference } from 'cookie-though/dist/types/types';

const IndexPage: React.FC<PageProps> = () => {
  const googleAnalyticsTrackingId = 'G-GY3TDG8CD7';
  const microsoftClarityTrackingId = 'nxvf26q0wz';
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { language } = useI18next();
  const googleAnalytics = useGoogleAnalytics();
  const microsoftClarity = useMicrosoftClarity();

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
    googleAnalytics.initialize(googleAnalyticsTrackingId);
    microsoftClarity.initialize(microsoftClarityTrackingId);

    const userCookiePreferences = getPreferences();

    if (
      (
        userCookiePreferences.cookieOptions.filter(
          (x) => x.id === 'statistics'
        )[0] as CookiePreference
      ).isEnabled
    ) {
      microsoftClarity.consent();

      googleAnalytics.updateConsent({
        ad_user_data: 'granted',
        ad_personalization: 'granted',
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }

    onPreferencesChanged((userCookiePreferences) => {
      if (
        (
          userCookiePreferences.cookieOptions.filter(
            (x) => x.id === 'statistics'
          )[0] as CookiePreference
        ).isEnabled
      ) {
        microsoftClarity.consent();

        googleAnalytics.updateConsent({
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          ad_storage: 'granted',
          analytics_storage: 'granted',
        });
      } else {
        googleAnalytics.updateConsent({
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          ad_storage: 'granted',
          analytics_storage: 'granted',
        });
      }

      localStorage.setItem('cookiePreferencesSet', 'true');
    });
  }, []);

  // useEffect(() => {
  //   const userCookiePreferences = getPreferences();

  //   console.log(userCookiePreferences);
  // }, [onPreferencesChanged]);

  useEffect(() => {
    const hasSetCookiePreferences = localStorage.getItem(
      'cookiePreferencesSet'
    );
    init({
      policies: [
        {
          id: 'essential',
          label: 'Essential Cookies',
          description:
            'We need to save some technical cookies, for the website to function properly.',
          category: 'essential',
        },
        // {
        //   id: 'functional',
        //   label: 'Functional Cookies',
        //   category: 'functional',
        //   description: 'We need to save some basic preferences eg. language.',
        // },
        {
          id: 'statistics',
          label: 'Statistics',
          category: 'statistics',
          description:
            'We need to save some technical cookies, for the website to function properly.',
        },
        // {
        //   id: 'social',
        //   label: 'Social Media Cookies',
        //   category: 'social',
        //   description:
        //     'We need to save some social cookies, for the website to function properly.',
        // },
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
        url: 'https://i18nweave.com/cookie-policy',
        label: 'Read the full cookie declaration',
      },
      customizeLabel: 'Customize',
    });

    if (hasSetCookiePreferences) {
      hide();
    }
  }, []);

  //todo: uitzoeken layout

  return (
    <>
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

        <div className="fixed left-5 bottom-5">
          <svg
            width="33"
            height="33"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Change Cookie Preferences"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M20.5 14C21.4008 14 22.251 13.7834 23.0014 13.3996C23.0005 13.4329 23 13.4664 23 13.5C23 15.0583 24.0184 16.3788 25.426 16.8321C23.7905 22.1414 18.8459 26 13 26C5.8203 26 0 20.1797 0 13C0 5.8203 5.8203 0 13 0C13.954 0 14.884 0.102758 15.7795 0.29781C15.292 0.899245 15 1.66552 15 2.5C15 3.53742 15.4514 4.46941 16.1684 5.11034C15.4364 6.04443 15 7.22125 15 8.5C15 11.5376 17.4624 14 20.5 14ZM11 7C11 7.55228 10.5523 8 10 8C9.44772 8 9 7.55228 9 7C9 6.44772 9.44772 6 10 6C10.5523 6 11 6.44772 11 7ZM12 13C12 14.1046 11.1046 15 10 15C8.89543 15 8 14.1046 8 13C8 11.8954 8.89543 11 10 11C11.1046 11 12 11.8954 12 13ZM17 20C17.5523 20 18 19.5523 18 19C18 18.4477 17.5523 18 17 18C16.4477 18 16 18.4477 16 19C16 19.5523 16.4477 20 17 20ZM10 19.5C10 20.3284 9.32843 21 8.5 21C7.67157 21 7 20.3284 7 19.5C7 18.6716 7.67157 18 8.5 18C9.32843 18 10 18.6716 10 19.5Z"
              className="fill-primary hover:fill-highlight cursor-pointer"
              onClick={() => show()}
            ></path>
          </svg>
        </div>

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
              {t(
                'section.gettingStarted.configureProject.description.partFour'
              )}{' '}
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
    </>
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
