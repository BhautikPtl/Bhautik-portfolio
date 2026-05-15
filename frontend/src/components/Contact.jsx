import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, User, MessageSquare, CheckCircle, Github, Linkedin } from 'lucide-react';
import { messagesAPI } from '../utils/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await messagesAPI.create(formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,0.1)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-24 relative">
          {/* Background Glow */}
          <div className="absolute inset-0 top-1/2 -translate-y-1/2 h-40 bg-gradient-to-r from-red-500/20 to-pink-500/20 blur-3xl pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight whitespace-normal">
              Let's <span className="bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 bg-clip-text text-transparent drop-shadow-lg">Connect</span>
            </h2>
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ delay: 0.3, duration: 1, ease: "easeInOut" }}
            className="h-1.5 w-48 bg-gradient-to-r from-red-400 to-pink-500 mx-auto rounded-full shadow-[0_0_20px_rgba(239,68,68,0.8)]"
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-lg text-gray-300 font-semibold tracking-wide max-w-2xl mx-auto"
          >
            Have a project in mind? Let's discuss new projects, creative ideas, or opportunities to bring your visions to life.
          </motion.p>
        </div>

        {/* Contact Container */}
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 relative">
            {/* Left Side - Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              {/* Card Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 flex flex-col justify-between hover:border-red-400/50 transition-[border-color,background] duration-200 group-hover:from-white/15 group-hover:to-white/8">
                
                {/* Gradient Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                <div>
                  <h3 className="text-2xl font-black mb-8 group-hover:text-red-300 transition-colors">Get in Touch</h3>
                  
                  <div className="space-y-6">
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 cursor-default"
                    >
                      <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center text-red-400 border border-red-500/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <Mail size={20} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Email</div>
                        <div className="font-semibold text-white">vachhanib485@gmail.com</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-4 cursor-default"
                    >
                      <div className="w-12 h-12 bg-pink-500/20 rounded-xl flex items-center justify-center text-pink-400 border border-pink-500/30 flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                        <User size={20} />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-gray-400 font-semibold">Location</div>
                        <div className="font-semibold text-white">Junagadh, Gujarat, India</div>
                      </div>
                    </motion.div>
                  </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex gap-4">
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -3 }}
                    href="https://github.com/BhautikPtl" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <Github size={18} /> GitHub
                  </motion.a>
                  <motion.a 
                    whileHover={{ scale: 1.1, y: -3 }}
                    href="https://www.linkedin.com/in/bhautik-vachhani-427540304" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-sm font-bold text-white hover:border-red-400/50 hover:bg-red-500/10 transition-all duration-200"
                  >
                    <Linkedin size={18} /> LinkedIn
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative"
            >
              {/* Card Glow Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-red-500/30 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 blur-lg" />
              
              {/* Card */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:border-red-400/50 transition-[border-color,background] duration-200 group-hover:from-white/15 group-hover:to-white/8">
                
                {/* Gradient Line Top */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-pink-400 to-orange-400 rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                
                {status === 'success' ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mb-6 border border-emerald-500/30">
                      <CheckCircle size={40} />
                    </div>
                    <h3 className="text-2xl font-black mb-2">Message Sent!</h3>
                    <p className="text-gray-400 mb-8">Thank you for reaching out. I'll get back to you shortly.</p>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setStatus('idle')}
                      className="px-6 py-2 bg-red-500/20 border border-red-400/50 rounded-lg text-red-400 font-bold uppercase tracking-widest text-sm hover:bg-red-500/30 transition-all"
                    >
                      Send Another
                    </motion.button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Name</label>
                      <input 
                        required
                        type="text" 
                        placeholder="Your name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:border-red-400/50 focus:bg-white/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:border-red-400/50 focus:bg-white/10 outline-none transition-all duration-200"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Message</label>
                      <textarea 
                        required
                        rows={4}
                        placeholder="Your message..."
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-white placeholder-gray-500 focus:border-red-400/50 focus:bg-white/10 outline-none transition-all resize-none duration-200"
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={status === 'loading'}
                      type="submit"
                      className="w-full py-3 bg-gradient-to-r from-red-500/30 to-pink-500/20 border border-red-400/50 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:border-red-300 hover:shadow-[0_0_20px_rgba(239,68,68,0.3)] transition-all duration-200 disabled:opacity-50"
                    >
                      {status === 'loading' ? 'Sending...' : (
                        <>Send Message <Send size={18} /></>
                      )}
                    </motion.button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
