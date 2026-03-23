import { Heart, Github, Linkedin, Instagram } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="container mx-auto px-6 text-center">
        <div className="text-3xl font-black mb-8 tracking-tighter bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Bhautik <span className="text-primary">Vachhani</span>
        </div>
        
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: <Github size={20} />, href: 'https://github.com/BhautikPtl' },
            { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/bhautik-vachhani-427540304' },
            { icon: <Instagram size={20} />, href: '#' }
          ].map((social, i) => (
            <a 
              key={i} 
              href={social.href} 
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-slate-400 hover:text-blue-400 hover:scale-110 transition-all"
            >
              {social.icon}
            </a>
          ))}
        </div>

        <p className="text-slate-500 text-sm italic">
          © {currentYear} Bhautik Vachhani. Made with <Heart size={14} className="inline text-red-500" /> & Passion.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
