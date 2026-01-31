import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { language, toggleLanguage, translations } = useLanguage();

  return (
    <nav className="fixed w-full z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-800 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400">CV </span>RR
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navHome}
            </a>
            <a href="#about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navAbout}
            </a>
            <a href="#skills" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navSkills}
            </a>
            <a href="#experience" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navExperience}
            </a>
            <a href="../index.html" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navPortofolio}
            </a>
            <a href="#contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              {translations[language].navContact}
            </a>

            {/* Language Switcher */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => toggleLanguage('id')}
                className={`px-3 py-1 rounded-full text-sm ${language === 'id' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                ID
              </button>
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 rounded-full text-sm ${language === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}
              >
                EN
              </button>
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-gray-700 dark:text-gray-300">
            ☰
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;