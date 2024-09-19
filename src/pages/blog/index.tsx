import * as React from 'react';

import { Layout } from '@i18n-weave/ui/ui-layout';
import { SecureLink } from '@i18n-weave/ui/ui-secure-link';
import { type PageContext, SEO } from '@i18n-weave/ui/ui-seo';

import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';
import {
  faCheckDouble,
  faCode,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { type PageProps, graphql } from 'gatsby';
import { useTranslation } from 'react-i18next';

const IndexPage: React.FC<PageProps> = () => {
  const { t } = useTranslation();

  return (
    <Layout>
      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center [@media_(max-height:666px)]:h-fit">
        Blogs Posts
        <SecureLink to="/blog/posts/my-first-post">My First Post</SecureLink>
      </section>
    </Layout>
  );
};

export default IndexPage;

export const Head = (props: PageProps<PageProps, PageContext>) => {
  return (
    <SEO
      title="Developer's i18n Companion"
      description="i18nWeave helps developers efficiently handle i18next translations in their projects. Increase productivity and ensure consistency across multiple languages."
      keywords="i18next, i18n, react, next.js, angular, i18n-next, deepl, internationalization, VSCode extension, translations, developer tools"
      pageContext={props.pageContext}
      pathname={props.location.pathname}
    />
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
