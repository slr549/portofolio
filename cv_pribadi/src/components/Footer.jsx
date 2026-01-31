import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
// import { useTheme } from '../contexts/ThemeContext';
import { FaHeart, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const { language } = useLanguage();
  // const { isDarkMode } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gray-900 dark:bg-black text-gray-300 py-12">
      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center hover:from-blue-700 hover:to-purple-700 transition-all hover:scale-110 shadow-lg"
      >
        <FaArrowUp className="text-white" />
      </button>

      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Copyright */}
          <div className="mb-6 md:mb-0 text-center md:text-left">
            <div className="text-2xl font-bold text-white mb-2">
              <span className="text-blue-400">Raki</span> Raihan
            </div>
            <p className="text-gray-400">
              © {currentYear} {language === 'id' ? 'Hak Cipta Dilindungi' : 'All Rights Reserved'}
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-6 md:mb-0">
            <a href="#home" className="text-gray-400 hover:text-white transition">
              {language === 'id' ? 'Beranda' : 'Home'}
            </a>
            <a href="#about" className="text-gray-400 hover:text-white transition">
              {language === 'id' ? 'Tentang' : 'About'}
            </a>
            <a href="#experience" className="text-gray-400 hover:text-white transition">
              {language === 'id' ? 'Pengalaman' : 'Experience'}
            </a>
            <a href="#contact" className="text-gray-400 hover:text-white transition">
              {language === 'id' ? 'Kontak' : 'Contact'}
            </a>
          </div>

          {/* Made with Love */}
          <div className="flex items-center text-gray-400">
            {language === 'id' ? 'Dibuat dengan' : 'Made with'}
            <FaHeart className="mx-2 text-red-500 animate-pulse" />
            {language === 'id' ? 'di Bogor' : 'in Bogor'}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Info */}
        <div className="text-center text-gray-500 text-sm">
          <p>
            {language === 'id' 
              ? 'CV profesional Raki Raihan - Perangkat Lunak, UI/UX Desain, Desain Grapis, & Web Developer'
              : 'Raki Raihan\'s professional CV -Software, UI/UX Design, Graphic Design, & Web Developer'}
          </p>
          <p className="mt-2">
            {language === 'id'
              ? 'Email: rakiraihanazhar156.com | Telp: (+62) 812-1377-2570'
              : 'Email: rakiraihanazhar156.com | Phone: (+62) 812-1377-2570'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;