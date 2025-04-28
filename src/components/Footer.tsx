import React from 'react';
import { Github } from 'lucide-react';

interface FooterProps {
  theme: 'light' | 'dark';
}

const Footer: React.FC<FooterProps> = ({ theme }) => {
  return (
    <footer className={`mt-12 py-6 text-center ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`}>
      <div className="flex flex-col md:flex-row items-center justify-center gap-4">
        <p className="text-sm">
          © {new Date().getFullYear()} | AI Code Assistant | Built by CraftyEngineer | Built with React & TailwindCSS | 
        </p>
        <div className="flex items-center gap-4">
          <a
            href="https://github.com/CraftyEngineer/Snippy"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-1 text-sm hover:${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-800'
            } transition-colors`}
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;