import React, { useState, useEffect, useRef } from 'react';
import { useGoogleAnalytics } from './../libs/feat/feat-google-analytics/src/lib/google-analytics';
import { useMicrosoftClarity } from './../libs/feat/feat-microsoft-clarity/src/lib/microsoft-clarity';
import { getPreferences, init, onPreferencesChanged } from 'cookie-though';
import { graphql, type PageProps } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';
import {
  faCheckDouble,
  faCode,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '../components/languageSelector';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { CookiePreference } from 'cookie-though/dist/types/types';

/**
 * Updates the document's language metadata dynamically.
 * @param language - The current language to be set.
 */
const updateLanguageMeta = (language: string) => {
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
};

/**
 * Custom hook for handling cookie preferences and analytics consent.
 * Initializes Google Analytics and Microsoft Clarity based on user cookie preferences.
 */
const useCookieConsent = (
  googleAnalyticsTrackingId: string,
  microsoftClarityTrackingId: string
) => {
  const googleAnalytics = useGoogleAnalytics();
  const microsoftClarity = useMicrosoftClarity();

  useEffect(() => {
    googleAnalytics.initialize(googleAnalyticsTrackingId);
    microsoftClarity.initialize(microsoftClarityTrackingId);

    const updateConsentBasedOnPreferences = (userCookiePreferences: any) => {
      const statisticsCookie = userCookiePreferences.cookieOptions.find(
        (x: any) => x.id === 'statistics'
      ) as CookiePreference;
      if (statisticsCookie?.isEnabled) {
        microsoftClarity.consent();
        googleAnalytics.updateConsent({
          ad_user_data: 'granted',
          ad_personalization: 'granted',
          ad_storage: 'granted',
          analytics_storage: 'granted',
        });
      }
    };

    const userCookiePreferences = getPreferences();
    updateConsentBasedOnPreferences(userCookiePreferences);

    onPreferencesChanged(updateConsentBasedOnPreferences);
  }, [
    googleAnalytics,
    microsoftClarity,
    googleAnalyticsTrackingId,
    microsoftClarityTrackingId,
  ]);
};

const IndexPage: React.FC<PageProps> = () => {
  const googleAnalyticsTrackingId = '';
  const microsoftClarityTrackingId = '';
  const { t } = useTranslation();
  const { language } = useI18next();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    updateLanguageMeta(language);
  }, [language]);

  useCookieConsent(googleAnalyticsTrackingId, microsoftClarityTrackingId);

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
        // {
        //   id: 'functional',
        //   label: 'Functional Cookies',
        //   category: 'functional',
        //   description:
        //     'We need to save some basic preferences, e.g., language.',
        // },
        {
          id: 'statistics',
          label: 'Statistics',
          category: 'statistics',
          description:
            'We need to save some technical cookies, for the website to function properly.',
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
          'Cookies help us provide you with the smoothest experience possible.',
      },
      cookiePolicy: {
        url: 'https://i18nweave.com/cookie-policy',
        label: 'Read the full cookie declaration',
      },
      customizeLabel: 'Customize',
    });
  }, []);

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
          </div>

          <div className="flex flex-wrap justify-center max-w-screen-xl">
            <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
              <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
              <h3 className="text-lg font-bold text-variant-2 pb-2">
                {t('section.features.keyExtraction.title')}
              </h3>
            </div>
            <div className="w-2/6 text-center px-4 mb-4 lg:mb-8">
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
              {t(
                'section.gettingStarted.configureProject.description.partFour'
              )}{' '}
              .
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default IndexPage;

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
