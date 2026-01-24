import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('id');

  const translations = {
    id: {
      heroTitle: "Halo, saya",
      heroSubtitle: "Teknisi Perangkat Lunak",
      heroDescription: "Pengembang perangkat lunak berpengalaman dengan lebih dari 10 tahun dalam merancang dan mengembangkan sistem.",
      downloadCV: "Unduh CV",
      contactMe: "Hubungi Saya",
      navHome: "Beranda",
      navAbout: "Tentang",
      navSkills: "Keahlian",
      navExperience: "Pengalaman",
      navEducation: "Pendidikan",
      navContact: "Kontak",
    },
    en: {
      heroTitle: "Hello, I'm",
      heroSubtitle: "Software Technician",
      heroDescription: "Experienced software developer with 10+ years in designing and developing systems.",
      downloadCV: "Download CV",
      contactMe: "Contact Me",
      navHome: "Home",
      navAbout: "About",
      navSkills: "Skills",
      navExperience: "Experience",
      navEducation: "Education",
      navContact: "Contact",
    }
  };

  const toggleLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};