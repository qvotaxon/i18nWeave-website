import React from 'react';

export type PageContext = {
  language: string;
  i18n: {
    language: string;
    languages: string[];
    defaultLanguage: string;
    generateDefaultLanguagePage: boolean;
    routed: boolean;
    originalPath: string;
    path: string;
  };
};

type SEOProps = {
  title: string;
  description: string;
  keywords: string;
  pathname: string;
  pageContext: PageContext;
  noIndex?: boolean;
};

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  pathname,
  pageContext,
  noIndex,
}) => {
  const currentLanguage = pageContext.language;
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://i18nweave.com';
  const originalPath = pathname.replace(`/${currentLanguage}`, '') || '/';
  const canonicalUrl = `${origin}${currentLanguage === 'en' ? '' : `/${currentLanguage}`}${originalPath === '/' ? (currentLanguage === 'en' ? '' : '/') : originalPath}`;

  return (
    <html lang={currentLanguage}>
      <head>
        <title>i18nWeave - {title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        {noIndex && <meta name="robots" content="noindex" />}

        {pageContext.i18n.languages
          .filter(x => x !== currentLanguage)
          .map(lang => (
            <link
              key={lang}
              rel="alternate"
              href={`${origin}${lang === 'en' ? '' : `/${lang}`}${originalPath === '/' ? (lang === 'en' ? '' : '/') : originalPath}`}
              hrefLang={lang}
            />
          ))}
      </head>
    </html>
  );
};

export default SEO;
