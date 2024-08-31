import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { useState, useRef } from 'react';
import logo from './../images/logo.png';
import {
  faCode,
  faEye,
  faLanguage,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const IndexPage: React.FC<PageProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory text-white">
      <header className="sticky top-0 w-full bg-primary py-4 z-10 flex items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          <img src={logo} alt="Logo" className="h-8" />
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
                href="#section-1"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 1
              </a>
            </li>
            <li>
              <a
                href="#section-2"
                className="text-white hover:text-highlight"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 2
              </a>
            </li>
            <li>
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
            </li>
          </ul>
        </nav>
      </header>

      <section
        id="section-1"
        className="h-screen flex flex-col items-center bg-secondary snap-start scroll-mt-16 pt-8"
      >
        <h1 className="text-white text-4xl mb-8">Section 1</h1>
        <div className="flex flex-wrap justify-center">
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h3 className="text-lg font-bold text-{#f8dc7c} pb-2">
              Key Extraction
            </h3>
            <p className="text-md">
              Extract translation keys from your code files with ease.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h3 className="text-lg font-bold pb-2">Wide Support</h3>
            <p className="text-md">
              Supports Angular, React, Next.js and basically anything that uses
              i18next translations can be configured.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h3 className="text-lg font-bold pb-2">Configuration Wizard</h3>
            <p className="text-md">
              Get up and running in no time using the build-in configuration
              wizard.
            </p>
          </div>
          <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faLanguage} />
            <h3 className="text-lg font-bold pb-2">Auto-Translations</h3>
            <p className="text-md">
              <b>(Beta Feature)</b> Automatically translate your existing
              translations to any of your supported languages using Google
              Translate or DeepL.
            </p>
          </div>
        </div>
      </section>
      <section
        id="section-2"
        className="h-screen flex items-center justify-center bg-green-500 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 2</h1>
      </section>
      <section
        id="section-3"
        className="h-screen flex items-center justify-center bg-red-500 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 3</h1>
      </section>
      <section
        id="section-4"
        className="h-screen flex items-center justify-center bg-yellow-500 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 4</h1>
      </section>
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
