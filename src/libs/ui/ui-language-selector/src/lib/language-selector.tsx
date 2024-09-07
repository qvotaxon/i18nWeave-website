import { useI18next } from 'gatsby-plugin-react-i18next';
import React, { useEffect, useRef, useState } from 'react';
import { FlagIcon, FlagIconCode } from 'react-flag-kit';

export const LanguageSelector: React.FC = () => {
  const { languages, changeLanguage, language } = useI18next();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative px-4 pb-4 z-20 text-left flex flex-col lg:absolute lg:inline-block lg:right-0 lg:px-0"
      ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className=" inline-flex items-center px-4 py-2 lg:mt-4 text-sm font-medium text-white bg-primary border border-gray-300 rounded-md shadow-sm hover:bg-secondary hover:text-primary focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500">
        <FlagIcon
          code={
            language === 'en' ? 'US' : (language.toUpperCase() as FlagIconCode)
          }
          style={{ width: '1.5rem', height: '1rem' }}
          className="mr-2 h-4"
        />
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="outline-white outline-1 outline w-full z-10 bg-primary border border-primary rounded-md shadow-lg lg:right-0 lg:w-48 lg:absolute">
          <div className="py-1">
            {languages.map(lng => (
              <button
                type="button"
                key={lng}
                onClick={e => {
                  e.preventDefault();
                  changeLanguage(lng);
                  setIsOpen(false); // Close dropdown after language change
                }}
                className="flex items-center px-4 py-2 w-full text-sm text-white hover:bg-secondary hover:text-primary hover:font-bold">
                <FlagIcon
                  code={
                    lng === 'en' ? 'US' : (lng.toUpperCase() as FlagIconCode)
                  }
                  style={{ width: '1.5rem', height: '1rem' }}
                  className="mr-2 h-4"
                />
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
