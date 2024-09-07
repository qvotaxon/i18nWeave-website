import * as React from 'react';

import {Layout} from '@i18n-weave/ui/ui-layout';
import {type PageProps, graphql} from 'gatsby';
import {useTranslation} from 'react-i18next';

const FeaturesPage: React.FC<PageProps> = () => {
    const {t} = useTranslation();

    return (
        <Layout>
            <section
                id="features"
                className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 [@media_(max-height:666px)]:h-fit">
                <div className="pb-4 px-4 lg:px-12 lg:pb-16 max-w-screen-xl w-5/6">
                    <h1 className="text-white text-4xl mb-8">
                        {t('section.features.title')}
                    </h1>

                    <p className="my-4">
                        {t('section.features.automaticKeyExtraction.introduction')}
                    </p>

                    <p className='mt-2'>    
                        <span>{t('section.features.automaticTranslation.introduction')}</span>
                    </p>
                    <p className='my-2'><span className='font-bold'>Limitations:</span> The DeepL integration in i18nWeave supports the languages listed here: <a className='text-primary hover:underline' href='https://developers.deepl.com/docs/resources/supported-languages'>DeepL Docs</a>.</p>

                    <p className='my-4'>
                    {t('section.features.tableView.introduction')}
                    </p>

                    <a href="/getting-started"
                        className="button text-center w-full block md:inline md:w-auto text-white p-2 md-0 border-4 border-white text-2xl hover:text-primary hover:border-primary mt-8">
                        {t('section.gettingStarted.buttons.getStarted')}
                    </a>
                </div>
            </section>
        </Layout>
    );
};

export default FeaturesPage;

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
