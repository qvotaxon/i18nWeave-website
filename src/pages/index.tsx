import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { useState, useRef } from 'react';
import {
  faCode,
  faEye,
  faLanguage,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';

const IndexPage: React.FC<PageProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      <header className="sticky top-0 w-full bg-primary py-4 z-10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <StaticImage
            width={32}
            height={32}
            src="../images/logo.png"
            alt="Logo"
            className="h-8"
          />
          <span className="text-lg">i18nWeave</span>
        </div>

        <button
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
          className={`mt-16 lg:flex lg:items-center lg:static lg:p-0 absolute top-0 left-0 w-full bg-primary lg:bg-transparent lg:flex-row lg:space-x-4 transition-transform transform opacity-0 ${
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1 opacity-0'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 p-4 lg:p-0">
            <li>
              <a
                href="#features"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
            </li>
            <li>
              <a
                href="#getting-started"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Getting Started
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
        </nav>
      </header>

      <section
        id="features"
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8"
      >
        <div className="pb-16">
          <h1 className="text-white text-4xl mb-8 text-center">
            Seamlessly Manage Your Translations
          </h1>
          <p className="text-center">
            i18nWeave helps you efficiently handle translations in your
            projects. Increase productivity and ensure consistency across
            multiple projects.
          </p>
        </div>

        <div className="flex flex-wrap justify-center">
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faLanguage} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Auto-Translate
            </h3>
            <p className="text-md">
              Automatically translate your keys to any of languages supported by
              Google Translate or DeepL.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Easy Config
            </h3>
            <p className="text-md">
              Get up and running in no time using the build-in configuration
              wizard.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Auto-Key Extraction
            </h3>
            <p className="text-md">
              Extract translation keys from your code files with ease.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Wide Support
            </h3>
            <p className="text-md">
              Supports Angular, Next.js and basically anything that uses i18next
              translations can be configured.
            </p>
          </div>
        </div>
      </section>
      <section
        id="getting-started"
        className="h-screen flex flex-col items-center bg-variant-2 snap-start scroll-mt-16 pt-8"
      >
        <h1 className="text-white text-4xl mb-8 text-center">
          Getting Started
        </h1>
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
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <html lang="en" />
    <title>Home Page</title>
  </>
);
