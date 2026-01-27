import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';

const Hero = () => {
  const { language, translations } = useLanguage();

  // Animasi variants
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 bg-gradient-to-br from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Badge */}
          <motion.div 
            variants={fadeInUp}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6"
          >
            <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
            {translations[language].heroTitle}
          </motion.div>

          {/* Nama */}
          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-4"
          >
            Ayu Permatasari
          </motion.h1>

          {/* Role dengan animasi typewriter */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {translations[language].heroSubtitle}
              <span className="ml-2 text-blue-600 dark:text-blue-400">|</span>
            </h2>
          </motion.div>

          {/* Deskripsi */}
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl"
          >
            {translations[language].heroDescription}
            <br />
            <span className="text-gray-500 dark:text-gray-500">
              10+ tahun pengalaman • Fullstack Developer • Problem Solver
            </span>
          </motion.p>

          {/* Tombol */}
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl text-center"
            >
              {translations[language].contactMe}
            </a>
            
            <a
              href="/cv-ayu-permatasari.pdf" // Ganti dengan path file CV kamu
              download
              className="px-8 py-4 border-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl text-center"
            >
              {translations[language].downloadCV} (PDF)
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={fadeInUp}
            className="grid grid-cols-3 gap-8 mt-20 pt-10 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Tahun Pengalaman</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">50+</div>
              <div className="text-gray-600 dark:text-gray-400">Proyek Selesai</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Kepuasan Klien</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            variants={fadeInUp}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;