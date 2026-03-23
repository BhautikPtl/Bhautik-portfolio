import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send, X, Bot, User, Compass, ExternalLink, Mail, Code } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([
    { role: 'bot', text: "Hi! I'm Bhautik's AI assistant. I can guide you through his portfolio or answer your questions. Try asking to 'show projects'!" }
  ]);
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chat, loading]);

  const navigateTo = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      return true;
    }
    return false;
  };

  const handleAction = (query) => {
    setMessage(query);
    // Trigger handleSend manually or simulate it
    setTimeout(() => {
      const form = document.getElementById('chat-form');
      if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }, 10);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userText = message.trim();
    const userMsg = { role: 'user', text: userText };
    setChat(prev => [...prev, userMsg]);
    const currentMessage = userText.toLowerCase();
    setMessage('');
    setLoading(true);

    setTimeout(() => {
      let botResponse = "I'm still learning! You can ask me to 'show projects', 'go to about', or 'contact bhautik'.";
      let actions = [];
      
      if (currentMessage.includes('hi') || currentMessage.includes('hello')) {
        botResponse = "Hello! How can I assist you today? I can help you find specific sections of the site.";
        actions = ["Show Projects", "About Bhautik"];
      } else if (currentMessage.includes('project') || currentMessage.includes('work') || currentMessage.includes('show project')) {
        const success = navigateTo('projects');
        botResponse = success 
          ? "Sure! I've scrolled you down to the Projects section. Bhautik has some great full-stack work there." 
          : "He has several impressive full-stack projects! You can see them in the 'Recent Work' section.";
        actions = ["Contact Info", "Skills"];
      } else if (currentMessage.includes('skill') || currentMessage.includes('tech')) {
        botResponse = "Bhautik is proficient in React, Node.js, MongoDB, and modern CSS. He loves building scalable MERN stack applications.";
        actions = ["Go to About", "See Projects"];
      } else if (currentMessage.includes('contact') || currentMessage.includes('hire') || currentMessage.includes('email')) {
        navigateTo('contact');
        botResponse = "Taking you to the contact section! You can send an email directly to Bhautik from there.";
      } else if (currentMessage.includes('about') || currentMessage.includes('who is')) {
        navigateTo('about');
        botResponse = "Bhautik is a passionate BCA student and Developer. I've moved the page to his About section for you.";
        actions = ["Skills", "Projects"];
      }

      setChat(prev => [...prev, { role: 'bot', text: botResponse, actions }]);
      setLoading(false);
    }, 800);
  };

  return (
    <>
      <motion.button
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-tr from-primary to-accent rounded-2xl flex items-center justify-center shadow-2xl z-50 group hover:shadow-primary/30 transition-all"
      >
        <MessageCircle className="text-slate-950 group-hover:scale-110 transition-transform" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-20 left-4 right-4 md:left-auto md:right-6 md:w-96 max-h-[70vh] md:max-h-[600px] glass-card rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.4)] z-50 border border-white/10 flex flex-col"
            style={{ perspective: "1000px" }}
          >
            <div className="bg-gradient-to-r from-primary/20 to-accent/10 p-5 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary shadow-inner">
                  <Compass className="animate-pulse" size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Portfolio Guide</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                    <span className="text-[10px] text-slate-400 uppercase font-black">AI Assistant</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/10 p-2 rounded-xl transition-colors text-slate-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth bg-slate-950/40 scrollbar-thin scrollbar-thumb-white/5"
            >
              {chat.map((item, index) => (
                <div key={index} className="space-y-3">
                  <motion.div 
                    initial={{ opacity: 0, x: item.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] p-4 rounded-2xl flex gap-3 ${
                      item.role === 'user' 
                        ? 'bg-primary text-slate-950 rounded-tr-none font-medium' 
                        : 'glass border border-white/10 text-slate-200 rounded-tl-none shadow-xl'
                    }`}>
                      {item.role === 'bot' && <Bot size={16} className="mt-0.5 flex-shrink-0 opacity-50" />}
                      <p className="text-sm leading-relaxed">{item.text}</p>
                    </div>
                  </motion.div>
                  
                  {item.actions && (
                    <div className="flex flex-wrap gap-2 ml-9">
                      {item.actions.map(action => (
                        <motion.button
                          key={action}
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAction(action)}
                          className="px-3 py-1.5 rounded-full border border-white/10 glass text-[10px] font-bold text-primary hover:text-white transition-all uppercase tracking-tighter"
                        >
                          {action}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {loading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="glass p-4 rounded-2xl rounded-tl-none flex gap-2">
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 bg-primary/50 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>

            <div className="p-4 bg-black/40 border-t border-white/5 backdrop-blur-md">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(e)} // Pass event to handleSend
                  placeholder="Ask about projects..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-4 py-2.5 text-sm outline-none focus:ring-2 ring-primary/50 transition-all text-white placeholder:text-slate-500"
                />
                <button 
                  onClick={handleSend}
                  className="w-10 h-10 bg-primary text-slate-950 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
