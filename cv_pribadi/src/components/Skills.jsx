import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  FaJs, FaReact, FaNodeJs, FaPython, FaJava, 
  FaAws, FaDocker, FaGitAlt, FaDatabase 
} from 'react-icons/fa';
import { SiTypescript, SiMongodb, SiPostgresql, SiTailwindcss } from 'react-icons/si';

const Skills = () => {
  const { language } = useLanguage();

  const skillCategories = [
    {
      id: 1,
      title: language === 'id' ? 'Kemampuan Teknis' : 'Technical Skills',
      skills: [
        { name: 'JavaScript', level: 95, icon: <FaJs />, color: '#F7DF1E' },
        { name: 'React.js', level: 90, icon: <FaReact />, color: '#61DAFB' },
        { name: 'TypeScript', level: 85, icon: <SiTypescript />, color: '#3178C6' },
        { name: 'Node.js', level: 88, icon: <FaNodeJs />, color: '#339933' },
        { name: 'Python', level: 80, icon: <FaPython />, color: '#3776AB' },
        { name: 'Java', level: 75, icon: <FaJava />, color: '#007396' },
        { name: 'Tailwind CSS', level: 92, icon: <SiTailwindcss />, color: '#06B6D4' },
      ]
    },
    {
      id: 2,
      title: language === 'id' ? 'Kemampuan Analitik' : 'Analytical Skills',
      skills: [
        { name: language === 'id' ? 'Pemecahan Masalah' : 'Problem Solving', level: 98 },
        { name: language === 'id' ? 'Analisis Sistem' : 'System Analysis', level: 92 },
        { name: language === 'id' ? 'Arsitektur Software' : 'Software Architecture', level: 90 },
        { name: language === 'id' ? 'Optimasi Kinerja' : 'Performance Optimization', level: 85 },
        { name: language === 'id' ? 'Debugging' : 'Debugging', level: 95 },
      ]
    },
    {
      id: 3,
      title: language === 'id' ? 'Teknologi & Tools' : 'Technologies & Tools',
      skills: [
        { name: 'AWS', level: 82, icon: <FaAws />, color: '#FF9900' },
        { name: 'Docker', level: 78, icon: <FaDocker />, color: '#2496ED' },
        { name: 'Git', level: 90, icon: <FaGitAlt />, color: '#F05032' },
        { name: 'MongoDB', level: 85, icon: <SiMongodb />, color: '#47A248' },
        { name: 'PostgreSQL', level: 80, icon: <SiPostgresql />, color: '#4169E1' },
        { name: 'Database Design', level: 88, icon: <FaDatabase />, color: '#336791' },
      ]
    }
  ];

  const softSkills = [
    { name: language === 'id' ? 'Motivasi Diri' : 'Self Motivation', level: 96 },
    { name: language === 'id' ? 'Adaptasi' : 'Adaptability', level: 94 },
    { name: language === 'id' ? 'Komunikasi' : 'Communication', level: 88 },
    { name: language === 'id' ? 'Kepemimpinan' : 'Leadership', level: 82 },
    { name: language === 'id' ? 'Manajemen Waktu' : 'Time Management', level: 90 },
    { name: language === 'id' ? 'Kolaborasi Tim' : 'Team Collaboration', level: 92 },
  ];

  return (
    <section id="skills" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {language === 'id' ? 'Keahlian & Kemampuan' : 'Skills & Expertise'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {language === 'id' 
              ? 'Kombinasi kemampuan teknis dan soft skills yang saya kembangkan selama 10+ tahun' 
              : 'Combination of technical abilities and soft skills developed over 10+ years'}
          </p>
        </motion.div>

        {/* Technical Skills Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow"
            >
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 pb-4 border-b border-gray-200 dark:border-gray-800">
                {category.title}
              </h3>
              
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center">
                        {skill.icon && (
                          <span className="text-xl mr-3" style={{ color: skill.color }}>
                            {skill.icon}
                          </span>
                        )}
                        <span className="font-medium text-gray-900 dark:text-white">
                          {skill.name}
                        </span>
                      </div>
                      <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {skill.level}%
                      </span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1 }}
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
                        style={{ 
                          backgroundColor: skill.color || undefined,
                          background: skill.color ? undefined : 'linear-gradient(90deg, #3B82F6, #8B5CF6)'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-white"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            {language === 'id' ? 'Soft Skills & Karakter' : 'Soft Skills & Character'}
          </h3>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
            {softSkills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-colors"
              >
                <div className="text-4xl mb-4">
                  {skill.level > 90 ? '⭐' : skill.level > 80 ? '🌟' : '💫'}
                </div>
                <div className="font-bold text-lg mb-2">{skill.name}</div>
                <div className="text-sm opacity-90">{skill.level}%</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mt-12 text-gray-600 dark:text-gray-400"
        >
          <div className="flex items-center">
            <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded mr-2"></div>
            <span>{language === 'id' ? 'Tingkat Kemampuan' : 'Skill Level'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600/20 rounded mr-2"></div>
            <span>{language === 'id' ? 'Penguasaan Sedang' : 'Intermediate'}</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-blue-600 rounded mr-2"></div>
            <span>{language === 'id' ? 'Ahli' : 'Expert'}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;