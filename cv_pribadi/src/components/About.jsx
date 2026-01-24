import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FaUser, FaCode, FaLightbulb, FaRocket } from 'react-icons/fa';

const About = () => {
  const { language } = useLanguage();

  const aboutData = {
    id: {
      title: "Tentang Saya",
      subtitle: "Software Technician & Fullstack Developer",
      description: "Saya Ayu Permatasari, seorang Teknisi Perangkat Lunak dengan pengalaman lebih dari 10 tahun dalam merancang dan mengembangkan sistem perangkat lunak. Saya mahir dalam berbagai teknologi dan dapat bekerja di berbagai platform dengan beragam alat pengembangan.",
      secondParagraph: "Saya dapat bekerja secara mandiri maupun sebagai bagian dari tim, dengan fokus pada kualitas kode, arsitektur yang scalable, dan solusi inovatif untuk masalah kompleks.",
      personalInfo: {
        email: "sautau@email.com",
        phone: "(081) 230-865-865",
        location: "J. Diponegoro 165-191, Darma, Kec. Wonokromo, Surabaya",
        experience: "10+ Tahun"
      },
      qualities: [
        {
          icon: <FaCode />,
          title: "Coding Expert",
          desc: "Ahli dalam berbagai bahasa pemrograman dan framework"
        },
        {
          icon: <FaLightbulb />,
          title: "Problem Solver",
          desc: "Analisis dan solusi untuk masalah kompleks"
        },
        {
          icon: <FaRocket />,
          title: "Fast Learner",
          desc: "Adaptasi cepat dengan teknologi baru"
        },
        {
          icon: <FaUser />,
          title: "Team Player",
          desc: "Kolaborasi efektif dalam tim"
        }
      ]
    },
    en: {
      title: "About Me",
      subtitle: "Software Technician & Fullstack Developer",
      description: "I'm Ayu Permatasari, a Software Technician with over 10 years of experience in designing and developing software systems. I'm proficient in various technologies and can work across multiple platforms with diverse development tools.",
      secondParagraph: "I can work independently or as part of a team, focusing on code quality, scalable architecture, and innovative solutions to complex problems.",
      personalInfo: {
        email: "sautau@email.com",
        phone: "(081) 230-865-865",
        location: "J. Diponegoro 165-191, Darma, Kec. Wonokromo, Surabaya",
        experience: "10+ Years"
      },
      qualities: [
        {
          icon: <FaCode />,
          title: "Coding Expert",
          desc: "Expert in various programming languages and frameworks"
        },
        {
          icon: <FaLightbulb />,
          title: "Problem Solver",
          desc: "Analysis and solutions for complex problems"
        },
        {
          icon: <FaRocket />,
          title: "Fast Learner",
          desc: "Quick adaptation to new technologies"
        },
        {
          icon: <FaUser />,
          title: "Team Player",
          desc: "Effective collaboration in teams"
        }
      ]
    }
  };

  const data = aboutData[language];

  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {data.title}
            </h2>
            
            <h3 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-8">
              {data.subtitle}
            </h3>

            <div className="space-y-6 text-lg text-gray-700 dark:text-gray-300 mb-10">
              <p>{data.description}</p>
              <p>{data.secondParagraph}</p>
            </div>

            {/* Personal Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {Object.entries(data.personalInfo).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    {key === 'email' && '✉️'}
                    {key === 'phone' && '📱'}
                    {key === 'location' && '📍'}
                    {key === 'experience' && '⏳'}
                  </div>
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {key === 'email' ? (language === 'id' ? 'Email' : 'Email') :
                       key === 'phone' ? (language === 'id' ? 'Telepon' : 'Phone') :
                       key === 'location' ? (language === 'id' ? 'Lokasi' : 'Location') :
                       (language === 'id' ? 'Pengalaman' : 'Experience')}
                    </div>
                    <div className="font-medium text-gray-900 dark:text-white">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              href="#contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-xl"
            >
              {language === 'id' ? 'Ayo Berkolaborasi!' : "Let's Collaborate!"}
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </a>
          </motion.div>

          {/* Right Column - Qualities Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {data.qualities.map((quality, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-all"
              >
                <div className="text-blue-600 dark:text-blue-400 text-3xl mb-4">
                  {quality.icon}
                </div>
                <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {quality.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {quality.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;