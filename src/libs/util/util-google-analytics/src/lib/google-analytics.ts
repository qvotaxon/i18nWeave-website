import { gtag, initDataLayer, install } from 'ga-gtag';

type GoogleAnalyticsConsent = {
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
};

export function useGoogleAnalytics() {
  const initialize = (trackingId: string) => {
    initDataLayer();
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
    });
    install(trackingId);
  };

  const updateConsent = (consent: GoogleAnalyticsConsent) => {
    gtag('consent', 'update', consent);
  };

  return {
    initialize,
    updateConsent,
  };
}
