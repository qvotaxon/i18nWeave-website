import * as React from 'react';
import { PageProps, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import LanguageSelector from '../libs/ui/ui-language-selector/src/lib/language-selector';
import {Layout} from '@i18n-weave/ui/ui-layout';

const NotFoundPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <Layout>
      <section className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center">
        <h1 className="text-4xl">{t('404.pageNotFound.title')}</h1>
        <p className='text-2xl pt-6'>{t('404.pageNotFound.errorMessage')}</p>
        <p className='text-6xl pt-6'>¯\_(ツ)_/¯</p>
        <StaticImage
          src="../images/404.png"
          alt="404 Error"
          placeholder="blurred"
          layout="fixed"
          width={300}
          height={300}
        />
      </section>
    </Layout>
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

export default NotFoundPage;

export const Head = () => (
  <>
    <title>i18nWeave - Page Not Found</title>
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
