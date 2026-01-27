import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
// import Experience from './components/Experience';
// import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
          <Navbar />
          <Hero />
          <About />
          {/* <Experience /> */}
          {/* <Skills /> */}
          <Education />
          <Contact />
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;

/* 
import React from 'react';
// 1. Import Router
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Import Komponen Portfolio Utama
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';

// 2. Import Komponen CV (Sesuaikan path folder-nya)
import CvPage from './cv_pribadi/src/App'; 

// Buat komponen khusus untuk Halaman Utama (Home) agar rapi
function HomePage() {
  return (
    <>
      <Navbar /> {/* Navbar mungkin hanya ada di Home, atau bisa ditaruh di luar Routes *//*/}
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Education />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
          
          {/* 3. Bungkus dengan Router *//*}*/
          /* <Router>
            <Routes>
              {/* Route untuk Halaman Utama (Portfolio) *//*}*/
              /* <Route path="/" element={<HomePage />} />

              {/* Route untuk Halaman CV *//*/}
              /* <Route path="/cv" element={<CvPage />} />
            </Routes>
          </Router>

        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App; */