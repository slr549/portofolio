import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaCalendar, FaMapMarkerAlt, FaBook } from 'react-icons/fa';

const Education = () => {
  const { language } = useLanguage();

  const educationData = {
    id: {
      title: "Pendidikan",
      subtitle: "Latar Belakang Akademik & Sertifikasi",
      description: "Pendidikan formal dan pembelajaran berkelanjutan dalam bidang teknologi informasi"
    },
    en: {
      title: "Education",
      subtitle: "Academic Background & Certifications",
      description: "Formal education and continuous learning in information technology"
    }
  };

  const education = [
    {
      id: 1,
      degree: "Sarjana Komputer",
      institution: "Universitas Dinamika",
      period: "Okt 2015",
      location: "Surabaya, Indonesia",
      description: "Fokus pada Software Engineering, Database Systems, dan Web Development",
      gpa: "3.8/4.0",
      courses: ["Algoritma", "Struktur Data", "Basis Data", "Jaringan Komputer", "AI"],
      achievements: [
        "Lulus dengan predikat Cum Laude",
        "Proyek akhir: Sistem Manajemen Rumah Sakit berbasis Web"
      ]
    }
  ];

  const certifications = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2022",
      credentialId: "AWS-2022-001",
      badgeColor: "from-orange-500 to-yellow-500"
    },
    {
      id: 2,
      name: "React Developer Certification",
      issuer: "Meta",
      date: "2021",
      credentialId: "META-REACT-2021",
      badgeColor: "from-blue-400 to-cyan-500"
    },
    {
      id: 3,
      name: "Java Programming Masterclass",
      issuer: "Udemy",
      date: "2020",
      credentialId: "UD-JAVA-2020",
      badgeColor: "from-purple-500 to-pink-500"
    },
    {
      id: 4,
      name: "Docker & Kubernetes Certified",
      issuer: "Docker Inc.",
      date: "2019",
      credentialId: "DOCKER-2019",
      badgeColor: "from-blue-500 to-blue-700"
    }
  ];

  return (
    <section id="education" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {educationData[language].title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {educationData[language].subtitle}
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            {educationData[language].description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Education */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-blue-50 to-white dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl"
            >
              {/* Timeline Header */}
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 dark:bg-blue-500 flex items-center justify-center mr-6">
                  <FaGraduationCap className="text-3xl text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {language === 'id' ? 'Pendidikan Formal' : 'Formal Education'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'id' ? 'Gelar Akademik' : 'Academic Degrees'}
                  </p>
                </div>
              </div>

              {/* Education Card */}
              {education.map((edu) => (
                <div key={edu.id} className="relative pl-10 pb-10">
                  {/* Timeline Line */}
                  <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-blue-200 dark:bg-blue-900"></div>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-4 top-0 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400"></div>

                  {/* Card Content */}
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                    {/* Degree & Institution */}
                    <div className="flex flex-wrap justify-between items-start mb-6">
                      <div>
                        <h4 className="text-2xl font-bold text-gray-900 dark:text-white">
                          {edu.degree}
                        </h4>
                        <h5 className="text-xl text-blue-600 dark:text-blue-400 font-semibold mt-2">
                          {edu.institution}
                        </h5>
                      </div>
                      <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 px-4 py-2 rounded-full font-bold">
                        GPA: {edu.gpa}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaCalendar className="mr-3 text-blue-500" />
                        {edu.period}
                      </div>
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <FaMapMarkerAlt className="mr-3 text-blue-500" />
                        {edu.location}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-700 dark:text-gray-300 mb-8">
                      {edu.description}
                    </p>

                    {/* Courses */}
                    <div className="mb-8">
                      <h6 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                        <FaBook className="mr-2 text-blue-500" />
                        {language === 'id' ? 'Mata Kuliah Penting' : 'Key Courses'}
                      </h6>
                      <div className="flex flex-wrap gap-3">
                        {edu.courses.map((course, idx) => (
                          <span 
                            key={idx}
                            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h6 className="font-bold text-gray-900 dark:text-white mb-4">
                        {language === 'id' ? 'Pencapaian' : 'Achievements'}
                      </h6>
                      <ul className="space-y-2">
                        {edu.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-500 mr-3 mt-1">✓</span>
                            <span className="text-gray-700 dark:text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Column - Certifications */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="sticky top-24"
            >
              {/* Certifications Header */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {language === 'id' ? 'Sertifikasi' : 'Certifications'}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'id' 
                    ? 'Kredensial profesional yang divalidasi' 
                    : 'Validated professional credentials'}
                </p>
              </div>

              {/* Certifications List */}
              <div className="space-y-6">
                {certifications.map((cert) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    className={`bg-gradient-to-br ${cert.badgeColor} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="font-bold text-lg mb-1">{cert.name}</h4>
                        <p className="text-white/90 text-sm">{cert.issuer}</p>
                      </div>
                      <div className="text-white/80 text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
                        {cert.date}
                      </div>
                    </div>
                    <div className="text-xs text-white/80 mb-3">
                      ID: {cert.credentialId}
                    </div>
                    <button className="w-full py-3 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-medium transition-colors">
                      {language === 'id' ? 'Lihat Credential' : 'View Credential'}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Continuous Learning */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mt-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8"
              >
                <h4 className="font-bold text-gray-900 dark:text-white text-xl mb-4">
                  {language === 'id' ? 'Pembelajaran Berkelanjutan' : 'Continuous Learning'}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {language === 'id'
                    ? 'Selalu mengikuti perkembangan teknologi terbaru melalui kursus online dan workshop'
                    : 'Always keeping up with the latest technology through online courses and workshops'}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    📚 50+ kursus diselesaikan
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    🎯 1000+ jam belajar
                  </span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;