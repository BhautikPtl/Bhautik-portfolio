import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send } from 'lucide-react';
import { useState } from 'react';
import { chatbotAPI } from '../../utils/api';
import { Spinner } from './Modal';

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm Bhautik's portfolio assistant. How can I help you?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { id: Date.now(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await chatbotAPI.sendMessage(input);
      const botMessage = { id: Date.now() + 1, text: response.data.response, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { id: Date.now() + 1, text: "Sorry, I couldn't process that. Try again!", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-96 h-[500px] bg-space-dark border border-neon-purple/20 rounded-2xl shadow-2xl flex flex-col z-50"
          >
            <div className="bg-gradient-glow p-4 rounded-t-2xl flex justify-between items-center">
              <h3 className="text-white font-bold">Chat Assistant</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/10 p-1 rounded transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-electric-blue text-white rounded-br-none'
                      : 'bg-neon-purple/20 text-white border border-neon-purple/30 rounded-bl-none'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-neon-purple/20 text-white border border-neon-purple/30 rounded-lg rounded-bl-none px-4 py-2">
                    <Spinner size="sm" />
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-neon-purple/10 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me something..."
                className="flex-1 bg-space-darker/50 text-white placeholder-gray-400 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-electric-blue/50 transition"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSend}
                disabled={isLoading}
                className="bg-electric-blue hover:bg-electric-blue/80 text-white p-2 rounded-lg transition disabled:opacity-50"
              >
                <Send size={20} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        animate={{ scale: isOpen ? 0 : 1 }}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-glow rounded-full shadow-glow-blue flex items-center justify-center text-white z-40 group"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 bg-neon-purple/30 rounded-full"
        />
        <MessageCircle size={24} className="relative" />
      </motion.button>
    </>
  );
};
