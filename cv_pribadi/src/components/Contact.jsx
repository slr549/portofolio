import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from 'framer-motion';
import { 
  FaEnvelope, FaPhone, FaMapMarkerAlt, 
  FaPaperPlane, FaCheckCircle, FaLinkedin, FaGithub 
} from 'react-icons/fa';

const Contact = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const contactData = {
    id: {
      title: "Kontak",
      subtitle: "Mari Berkolaborasi",
      description: "Tertarik bekerja sama? Hubungi saya melalui form atau kontak langsung",
      formTitle: "Kirim Pesan",
      nameLabel: "Nama Lengkap",
      emailLabel: "Alamat Email",
      subjectLabel: "Subjek",
      messageLabel: "Pesan Anda",
      submitButton: "Kirim Pesan",
      submittingButton: "Mengirim...",
      successMessage: "Pesan berhasil dikirim! Saya akan membalas segera.",
      contactInfo: "Informasi Kontak",
      locationTitle: "Lokasi",
      socialTitle: "Media Sosial"
    },
    en: {
      title: "Contact",
      subtitle: "Let's Collaborate",
      description: "Interested in working together? Reach out via form or direct contact",
      formTitle: "Send Message",
      nameLabel: "Full Name",
      emailLabel: "Email Address",
      subjectLabel: "Subject",
      messageLabel: "Your Message",
      submitButton: "Send Message",
      submittingButton: "Sending...",
      successMessage: "Message sent successfully! I'll reply as soon as possible.",
      contactInfo: "Contact Information",
      locationTitle: "Location",
      socialTitle: "Social Media"
    }
  };

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "rakiraihanazhar156.com",
      link: "mailto:rakiraihanazhar156.com",
      color: "text-red-500 bg-red-100 dark:bg-red-900/30"
    },
    {
      icon: <FaPhone />,
      title: "Phone",
      value: "(+62) 812-1377-2570",
      link: "tel:+6281213772570",
      color: "text-green-500 bg-green-100 dark:bg-green-900/30"
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Location",
      value: "Bogor, Indonesia",
      link: "https://maps.google.com/?q=J.+Diponegoro+165-191,+Darma,+Kec.+Wonokromo,+Surabaya",
      color: "text-blue-500 bg-blue-100 dark:bg-blue-900/30"
    }
  ];

  const socialLinks = [
    {
      icon: <FaLinkedin />,
      name: "LinkedIn",
      url: "https://linkedin.com/in/raki-raihan",
      color: "hover:bg-blue-600 hover:text-white"
    },
    {
      icon: <FaGithub />,
      name: "GitHub",
      url: "https://github.com/raki-raihan",
      color: "hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-black"
    }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 2000);
  };

  const data = contactData[language];

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {data.subtitle}
          </p>
          <p className="text-gray-500 dark:text-gray-500 mt-2">
            {data.description}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {data.formTitle}
            </h3>

            {/* Success Message */}
            {isSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-xl flex items-center"
              >
                <FaCheckCircle className="text-xl mr-3" />
                {data.successMessage}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name & Email */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {data.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {data.emailLabel}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  {data.subjectLabel}
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder={language === 'id' ? 'Subjek pesan' : 'Message subject'}
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 mb-2">
                  {data.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                  placeholder={language === 'id' ? 'Tulis pesan Anda di sini...' : 'Write your message here...'}
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 rounded-xl font-semibold text-lg transition-all flex items-center justify-center ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {data.submittingButton}
                  </>
                ) : (
                  <>
                    {data.submitButton}
                    <FaPaperPlane className="ml-3" />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {/* Contact Info Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
                {data.contactInfo}
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <a
                    key={index}
                    href={info.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mr-6 ${info.color}`}>
                      <div className="text-2xl">
                        {info.icon}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        {info.title}
                      </div>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Social Media Card */}
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
              <h3 className="text-2xl font-bold mb-8">
                {data.socialTitle}
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all group ${social.color}`}
                  >
                    <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">
                      {social.icon}
                    </div>
                    <div className="font-semibold">
                      {social.name}
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <FaMapMarkerAlt className="mr-3 text-blue-500" />
                {data.locationTitle}
              </h3>
              
              <div className="h-64 rounded-2xl overflow-hidden mb-6 relative">
                {/* Placeholder for Google Maps */}
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-4">📍</div>
                    <p className="text-gray-600 dark:text-gray-400">
                      Surabaya, Indonesia
                    </p>
                  </div>
                </div>
                
                {/* Map Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                J. Diponegoro 165-191, Darma, Kec. Wonokromo, Surabaya, Jawa Timur
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;