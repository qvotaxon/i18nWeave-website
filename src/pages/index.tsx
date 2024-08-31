import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { useState, useRef } from 'react';
import {
  faCode,
  faEye,
  faObjectGroup,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StaticImage } from 'gatsby-plugin-image';
import { faAngular, faReact } from '@fortawesome/free-brands-svg-icons';

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
            isMenuOpen ? 'translate-y-0 top-0' : '-translate-y-1 -top-48'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 p-4 lg:ml-8 lg:p-0">
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
        className="h-screen flex flex-col items-center bg-variant-1 snap-start scroll-mt-16 pt-8 text-center"
      >
        <div className="pb-16 w-5/6">
          <h1 className="text-white text-4xl mb-8">
            Seamlessly Manage Your Translations
          </h1>

          <p className="my-4">
            Manage your translations with ease using the i18nWeave VSCode
            extension. i18nWeave provides a wide range of features to help you
            manage your translations and keep your translations in sync with
            your codebase.
          </p>

          <p className="my-4">
            Support for Angular, Next.js and basically anything that uses
            i18next translations can be configured.
          </p>
        </div>

        <div className="flex flex-wrap justify-center">
          {/* <div className="w-1/2 md:w-1/4 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faLanguage} />
            <h3 className="text-lg font-bold text-highlight pb-2">
              Auto-Translate
            </h3>
            <p className="text-md">
              Automatically translate your keys to any of languages supported by
              Google Translate or DeepL.
            </p>
          </div> */}

          {/* md:w-1/4 */}
          <div className="w-1/2 lg:w-1/5 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faEye} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              Auto-Key Extraction
            </h2>
            <p className="text-md">
              Extract translation keys from your code files with ease.
            </p>
          </div>

          {/* md:w-1/4 */}
          <div className="w-1/2 lg:w-1/5 text-center mb-8 px-4">
            {' '}
            <FontAwesomeIcon className="text-4xl pb-2" icon={faObjectGroup} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              Easy Config
            </h2>
            <p className="text-md">
              Get up and running in no time using the build-in configuration
              wizard.
            </p>
          </div>

          {/* md:w-1/4 */}
          {/* <div className="w-1/3 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">
              Wide Support
            </h2>
            <p className="text-md">
              Supports Angular, Next.js and basically anything that uses i18next
              translations can be configured.
            </p>
          </div> */}

          <div className="w-1/3 lg:w-1/5 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faAngular} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">Angular</h2>
            <p className="text-md">Supports Angular i18next</p>
          </div>

          <div className="w-1/3 lg:w-1/5 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faReact} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">React</h2>
            <p className="text-md">Supports React i18next</p>
          </div>

          <div className="w-1/3 lg:w-1/5 text-center mb-8 px-4">
            <FontAwesomeIcon className="text-4xl pb-2" icon={faCode} />
            <h2 className="text-lg font-bold text-variant-2 pb-2">Custom</h2>
            <p className="text-md">Supports any project using i18next</p>
          </div>
        </div>
      </section>
      <section
        id="getting-started"
        className="h-screen flex flex-col items-center bg-variant-2 snap-start scroll-mt-16 pt-8"
      >
        <h1 className="text-primary text-4xl mb-8 text-center">
          Getting Started
        </h1>

        <div className="w-5/6 text-primary">
          <h2 className="text-lg font-bold text-variant-1 pb-2">
            Install the Extension
          </h2>

          <div>
            Search for the i18nWeave extension in the Visual Studio Code
            extensions window or visit the{' '}
            <a
              className="text-primary underline"
              href="https://marketplace.visualstudio.com/items?itemName=qvotaxon.i18nweave"
            >
              Visual Studio Code Marketplace.
            </a>
          </div>

          <h2 className="text-lg font-bold text-variant-1 pt-4 pb-2">
            Configure Your Project
          </h2>

          <div>
            Open the command palette and run the{' '}
            <code className="text-secondary">`Configure i18nWeave`</code>{' '}
            command. Follow the instructions to set up your project. To open the
            command palette, press{' '}
            <code className="text-secondary">Ctrl+Shift+P</code> on
            Windows/Linux or <code className="text-secondary">Cmd+Shift+P</code>{' '}
            on macOS.
          </div>

          {/* <h3 className="text-lg font-bold text-variant-1 pt-4 pb-2">
            Configuration Options
          </h3>

          <div>
            i18nWeave provides a wide range of configuration options to suit
            your needs. You can configure the extension to work with your
            existing project setup. Please have a look on the Examples page for
            more information on how to configure the extension. And to see the
            extension in action.
          </div> */}
        </div>
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
