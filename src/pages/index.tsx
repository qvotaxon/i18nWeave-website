import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { useState, useEffect, useRef } from 'react';
import logo from './../images/logo.png';

const IndexPage: React.FC<PageProps> = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  return (
    <main className="font-sans h-screen overflow-y-scroll snap-y snap-mandatory">
      <header className="sticky top-0 w-full bg-gray-800 text-white py-4 z-10 flex items-center justify-between px-4">
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
          className={`mt-16 lg:flex lg:items-center lg:static lg:p-0 absolute top-0 left-0 w-full bg-gray-800 lg:bg-transparent lg:flex-row lg:space-x-4 transition-transform transform opacity-0 ${
            isMenuOpen
              ? 'translate-y-0 opacity-100'
              : '-translate-y-1 opacity-0'
          }`}
        >
          <ul className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 p-4 lg:p-0">
            <li>
              <a
                href="#section-1"
                className="text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 1
              </a>
            </li>
            <li>
              <a
                href="#section-2"
                className="text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 2
              </a>
            </li>
            <li>
              <a
                href="#section-3"
                className="text-white hover:text-gray-400"
                onClick={() => setIsMenuOpen(false)}
              >
                Section 3
              </a>
            </li>
            <li>
              <a
                href="#section-4"
                className="text-white hover:text-gray-400"
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
        className="h-screen flex justify-center bg-blue-500 snap-start scroll-mt-16"
      >
        <h1 className="text-white text-4xl">Section 1</h1>
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
