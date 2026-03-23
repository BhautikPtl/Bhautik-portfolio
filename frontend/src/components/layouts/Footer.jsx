import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { PORTFOLIO_DATA } from '../../utils/constants';

export const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bg-space-darker/50 border-t border-neon-purple/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold mb-4">Bhautik Vachhani</h3>
            <p className="text-gray-400 text-sm">{PORTFOLIO_DATA.shortIntro}</p>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-electric-blue transition">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-electric-blue transition">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-electric-blue transition">Projects</a></li>
              <li><a href="#" className="text-gray-400 hover:text-electric-blue transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold mb-4">Follow Me</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -3 }}
                href={PORTFOLIO_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-electric-blue transition"
              >
                <Github size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href={PORTFOLIO_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-electric-blue transition"
              >
                <Linkedin size={20} />
              </motion.a>
              <motion.a
                whileHover={{ y: -3 }}
                href={`mailto:${PORTFOLIO_DATA.email}`}
                className="text-gray-400 hover:text-electric-blue transition"
              >
                <Mail size={20} />
              </motion.a>
            </div>
          </div>
        </div>

        <div className="border-t border-neon-purple/10 pt-8 flex justify-between items-center">
          <p className="text-gray-500 text-sm">© 2024 Bhautik Vachhani. All rights reserved.</p>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ y: 0 }}
            onClick={scrollToTop}
            className="p-2 bg-electric-blue/20 hover:bg-electric-blue/30 rounded-lg transition"
          >
            <ArrowUp size={20} className="text-electric-blue" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
