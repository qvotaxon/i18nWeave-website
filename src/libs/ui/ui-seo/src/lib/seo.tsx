import React from 'react';

export type LocaleLookUpInfo = {
  translationStrings: any;
  locales: {
    edges: Array<{ node: { ns: string; data: string; language: string } }>;
  };
} & { langKey: string; slug: string };
type Resources = { [key: string]: { [key: string]: any } };

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
  pageName: string;
  title: string;
  description: string;
  keywords: string;
  pathname: string;
  pageContext: PageContext;
  pageData: LocaleLookUpInfo;
  noIndex?: boolean;
};

export const SEO: React.FC<SEOProps> = ({
  pageName,
  title,
  description,
  keywords,
  pathname,
  pageContext,
  pageData,
  noIndex,
}) => {
  const currentLanguage = pageContext.language;
  const origin =
    typeof window !== 'undefined'
      ? window.location.origin
      : 'https://i18nweave.com';
  const originalPath = pathname.replace(`/${currentLanguage}`, '') || '/';
  const canonicalUrl = `${origin}${currentLanguage === 'en' ? '' : `/${currentLanguage}`}${originalPath === '/' ? (currentLanguage === 'en' ? '' : '/') : originalPath}`;

  const resources: Resources = {};
  const language = pageContext.language;

  pageData.locales.edges.forEach(edge => {
    const { ns, data, language } = edge.node;
    const parsedData = JSON.parse(data);

    if (!resources[language]) {
      resources[language] = {};
    }
    resources[language][ns] = parsedData;
  });

  title = resources[language]['common']['seo'][pageName]['title'] ?? title;
  description =
    resources[language]['common']['seo'][pageName]['description'] ??
    description;
  keywords =
    resources[language]['common']['seo'][pageName]['keywords'] ?? keywords;

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
