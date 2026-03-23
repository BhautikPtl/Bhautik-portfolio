import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button, Container, GradientText, Section } from '../../components/ui/Button';
import { fadeInUp, staggerContainer } from '../../utils/animations';
import { messagesAPI } from '../../utils/api';
import { Mail, MessageSquare, Phone, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { useToast } from '../../hooks/useToast';

export const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toasts, showToast, removeToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill all fields', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await messagesAPI.create(formData);
      showToast('Message sent successfully! 🎉', 'success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      showToast('Failed to send message', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-space-darker min-h-screen pt-24">
      <Section>
        <Container>
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12"
          >
            {/* Left Content */}
            <motion.div variants={fadeInUp}>
              <h1 className="text-5xl font-bold text-white mb-6">
                Get In <GradientText>Touch</GradientText>
              </h1>
              <p className="text-xl text-gray-400 mb-8">
                Have a project in mind or just want to chat? Feel free to reach out!
              </p>

              <div className="space-y-6">
                {/* Email */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex gap-4 p-4 rounded-xl bg-space-dark/40 border border-neon-purple/10 hover:border-electric-blue/30 transition"
                >
                  <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="text-electric-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email</h3>
                    <a href="mailto:vachhanib485@gmail.com" className="text-gray-400 hover:text-electric-blue transition">
                      vachhanib485@gmail.com
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex gap-4 p-4 rounded-xl bg-space-dark/40 border border-neon-purple/10 hover:border-neon-purple/30 transition"
                >
                  <div className="w-12 h-12 bg-neon-purple/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="text-neon-purple" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone</h3>
                    <a href="tel:+916353904121" className="text-gray-400 hover:text-neon-purple transition">
                      +91 6353904121
                    </a>
                  </div>
                </motion.div>

                {/* Location */}
                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex gap-4 p-4 rounded-xl bg-space-dark/40 border border-neon-purple/10 hover:border-electric-blue/30 transition"
                >
                  <div className="w-12 h-12 bg-electric-blue/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-electric-blue" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Location</h3>
                    <p className="text-gray-400">Junagadh, Gujarat, India</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Form */}
            <motion.form
              variants={fadeInUp}
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              <div>
                <label className="block text-white mb-2 font-medium">Your Name</label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  whileFocus={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                  className="w-full bg-space-dark/40 border border-neon-purple/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition"
                  placeholder="Bhautik..."
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Email Address</label>
                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  whileFocus={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                  className="w-full bg-space-dark/40 border border-neon-purple/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Message</label>
                <motion.textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  whileFocus={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
                  rows="5"
                  className="w-full bg-space-dark/40 border border-neon-purple/20 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-electric-blue/50 transition resize-none"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>

              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </motion.form>
          </motion.div>
        </Container>
      </Section>

      {/* Toasts */}
      <div className="fixed bottom-4 right-4 z-50 space-y-3">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ y: 100, opacity: 0, x: 400 }}
            animate={{ y: 0, opacity: 1, x: 0 }}
            exit={{ y: 100, opacity: 0 }}
            className="min-w-80"
            onClick={() => removeToast(toast.id)}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className={`px-6 py-4 rounded-lg backdrop-blur-lg border flex items-center gap-3 cursor-pointer transition ${
                toast.type === 'success'
                  ? 'bg-green-500/20 border-green-500/30 text-green-300'
                  : 'bg-red-500/20 border-red-500/30 text-red-300'
              }`}
            >
              {toast.type === 'success' ? (
                <CheckCircle size={20} />
              ) : (
                <AlertCircle size={20} />
              )}
              <span className="font-medium">{toast.message}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
