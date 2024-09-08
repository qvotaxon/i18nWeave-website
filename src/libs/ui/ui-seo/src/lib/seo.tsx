import React from 'react';

type SEOProps = {
  title: string;
  description: string;
  keywords: string;
};

const availableLanguages = ['en', 'nl', 'de', 'fr', 'es'];

const getCurrentLanguage = (pathname: string): string => {
  const pathSegments = pathname.split('/').filter(Boolean);
  const potentialLang = pathSegments[0];
  return availableLanguages.includes(potentialLang) ? potentialLang : 'en';
};

export const SEO: React.FC<SEOProps> = ({ title, description, keywords }) => {
  const { pathname, origin } = typeof window !== 'undefined' ? window.location : { pathname: '/', origin: 'https://i18nweave.com' };
  const language = getCurrentLanguage(pathname);
  const originalPath = pathname.replace(`/${language}`, '') || '/';
  const baseUrl = origin;

  const canonicalUrl = `${baseUrl}${language === 'en' ? '' : `/${language}`}${originalPath === '/' ? '' : originalPath}`;

  return (
    <>
      <title>i18nWeave - {title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      {availableLanguages.map((lang) => (
        <link
          key={lang}
          rel="alternate"
          href={`${baseUrl}${lang === 'en' ? '' : `/${lang}`}${originalPath === '/' ? '' : originalPath}`}
          hrefLang={lang}
        />
      ))}
    </>
  );
};

export default SEO;