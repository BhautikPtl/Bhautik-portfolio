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
    <section id="contact" className="py-20 bg-background/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto glass rounded-3xl md:rounded-[2.5rem] overflow-hidden grid md:grid-cols-2 border border-white/5">
          <div className="p-8 md:p-10 bg-gradient-to-br from-primary to-accent text-background flex flex-col justify-between text-center md:text-left">
            <div>
              <h2 className="text-4xl font-bold mb-6 italic">Let's connect</h2>
              <p className="text-background/80 mb-8">
                Have a project in mind? Or just want to say hi? Feel free to reach out. I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background/10 rounded-2xl flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-background/60">Email me</div>
                    <div className="font-medium">vachhanib485@gmail.com</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-background/10 rounded-2xl flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <div>
                    <div className="text-sm text-background/60">Location</div>
                    <div className="font-medium">Junagadh, Gujarat, India</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-background/10 flex gap-6">
              <a href="https://github.com/BhautikPtl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold hover:text-background/70 transition-colors uppercase tracking-widest">
                <Github size={20} /> GitHub
              </a>
              <a href="https://www.linkedin.com/in/bhautik-vachhani-427540304" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-bold hover:text-background/70 transition-colors uppercase tracking-widest">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>

          <div className="p-10 bg-background">
            {status === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2 italics">Message Sent!</h3>
                <p className="text-slate-400">Thank you for reaching out. I'll get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-primary font-bold uppercase tracking-widest text-sm hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Your Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="text" 
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-primary outline-none transition-all text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input 
                      required
                      type="email" 
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-6 focus:ring-2 ring-primary outline-none transition-all text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400 ml-1">Message</label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-6 text-slate-500" size={18} />
                    <textarea 
                      required
                      rows={4}
                      placeholder="What's on your mind?"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full bg-white/5 border border-white/5 rounded-3xl py-4 pl-12 pr-6 focus:ring-2 ring-primary outline-none transition-all resize-none text-white"
                    />
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={status === 'loading'}
                  className="w-full py-4 bg-primary text-background rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                  {status === 'loading' ? 'Sending...' : (
                    <>Send Message <Send size={18} /></>
                  )}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
