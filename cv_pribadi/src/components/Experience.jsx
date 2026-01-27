import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Experience = () => {
  const { language, translations } = useLanguage();

  const experiences = [
    {
      id: 1,
      title: "Pengembang Perangkat Lunak",
      company: "Tenaga Penjual",
      period: "Februari 2020 - Sekarang",
      location: "Remote / Surabaya",
      description: [
        "Bekerja bersama manajer produk untuk memahami persyaratan",
        "Layanan dirancang dan dikembangkan untuk ditinggalkan dengan pelanggan",
        "Solusi end-to-end yang dibuat dengan teknologi canggih web, seluler, dan cloud",
        "Membimbing anggota tim baru termasuk ulasan kode harian"
      ],
      tech: ["React", "Node.js", "AWS", "MongoDB", "Docker"]
    },
    {
      id: 2,
      title: "Pengembang Perangkat Lunak Junior",
      company: "Netflix",
      period: "November 2016 - Desember 2019",
      location: "Jakarta / Remote",
      description: [
        "Terintegrasi dengan alat internal dan kode lama yang telah direfaktorisasi",
        "Bekerja dengan tim dukungan untuk memastikan perbaikan bug dalam waktu singkat",
        "Bahasa pemrograman otodidak dan aspek keamanan",
        "Skrip otomasi yang dikembangkan menggunakan PowerShell, Bash, dan Java"
      ],
      tech: ["Java", "PowerShell", "Bash", "Python", "Security"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'id' ? 'Pengalaman Kerja' : 'Work Experience'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'id' 
              ? 'Perjalanan profesional saya dalam pengembangan perangkat lunak' 
              : 'My professional journey in software development'}
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          {experiences.map((exp, index) => (
            <motion.div 
              key={exp.id}
              variants={itemVariants}
              className="relative mb-12"
            >
              {/* Timeline Line */}
              <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-6 h-6 rounded-full bg-blue-600 dark:bg-blue-500 z-10"></div>
              
              {/* Timeline Connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-3 md:left-1/2 top-6 bottom-0 w-0.5 bg-blue-300 dark:bg-blue-700 transform md:-translate-x-1/2"></div>
              )}

              {/* Card */}
              <div className={`ml-10 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-800">
                  
                  {/* Title & Company */}
                  <div className="mb-6">
                    <div className="flex items-center mb-2">
                      <FaBriefcase className="text-blue-600 dark:text-blue-400 mr-3" />
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {exp.title}
                      </h3>
                    </div>
                    <h4 className="text-xl font-semibold text-blue-600 dark:text-blue-400">
                      {exp.company}
                    </h4>
                  </div>

                  {/* Period & Location */}
                  <div className={`flex flex-wrap gap-4 mb-6 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaCalendarAlt className="mr-2" />
                      {exp.period}
                    </div>
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <FaMapMarkerAlt className="mr-2" />
                      {exp.location}
                    </div>
                  </div>

                  {/* Description */}
                  <ul className="space-y-3 mb-8">
                    {exp.description.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="text-blue-500 mr-3 mt-1">▸</span>
                        <span className="text-gray-700 dark:text-gray-300">{item}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech Stack */}
                  <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                    {exp.tech.map((tech, idx) => (
                      <span 
                        key={idx}
                        className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {language === 'id' 
              ? 'Ingin tahu lebih banyak tentang pengalaman saya?' 
              : 'Want to know more about my experience?'}
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
          >
            {language === 'id' ? 'Hubungi Saya' : 'Contact Me'}
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;