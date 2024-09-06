import { CookiePreference } from 'cookie-though/dist/types/types';
import { StaticImage } from 'gatsby-plugin-image';
import { LanguageSelector } from '@i18n-weave/ui/ui-language-selector';
import { ReactNode } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import { useTranslation } from 'react-i18next';
import { useGoogleAnalytics } from '@i18n-weave/util/util-google-analytics';
import { useMicrosoftClarity } from '@i18n-weave/util/util-microsoft-clarity';
import {
  getPreferences,
  hide,
  init,
  onPreferencesChanged,
  show,
} from 'cookie-though';

interface LayoutProps {
  children: ReactNode;
}

const googleAnalyticsTrackingId = 'G-GY3TDG8CD7';
const microsoftClarityTrackingId = 'nxvf26q0wz';

export const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  const { t } = useTranslation();
  const { language } = useI18next();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const hasSetCookiePreferences = localStorage.getItem(
      'cookiePreferencesSet'
    );
    init({
      policies: [
        {
          id: 'essential',
          label: t('cookies.essential.label'),
          description: t('cookies.essential.description'),
          category: 'essential',
        },
        {
          id: 'functional',
          label: t('cookies.functional.label'),
          category: 'essential',
          description: t('cookies.functional.description'),
        },
        {
          id: 'statistics',
          label: t('cookies.statistics.label'),
          category: 'statistics',
          description: t('cookies.statistics.description'),
        },
      ],
      essentialLabel: t('cookies.general.essentialLabel'),
      permissionLabels: {
        accept: t('cookies.general.permissionLabels.accept'),
        acceptAll: t('cookies.general.permissionLabels.acceptAll'),
        decline: t('cookies.general.permissionLabels.decline'),
      },
      cookiePreferenceKey: 'cookie-preferences',
      header: {
        title: t('cookies.general.header.title'),
        subTitle: t('cookies.general.header.subTitle'),
        description: t('cookies.general.header.description'),
      },
      cookiePolicy: {
        url: 'https://i18nweave.com/cookie-policy',
        label: t('cookies.general.cookiePolicy.label'),
      },
      customizeLabel: t('cookies.general.customizeLabel'),
    });

    if (hasSetCookiePreferences) {
      hide();
    }
  }, []);

  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      <header className="sticky top-0 w-full bg-primary py-4 z-10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <StaticImage
            width={32}
            height={32}
            src="../../../../../images/logo.png"
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

      {children}
    </main>
  );
};

export default Layout;
