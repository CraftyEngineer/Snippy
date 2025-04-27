import React from 'react';
import { Sparkles } from 'lucide-react';

interface HeaderProps {
  theme: 'light' | 'dark';
}

const Header: React.FC<HeaderProps> = ({ theme }) => {
  return (
    <header className="text-center mt-8">
      <div className="flex items-center justify-center mb-2">
        <Sparkles size={32} className="text-blue-500 mr-2" />
        <h1 className="text-3xl md:text-4xl font-bold">
          Code Smarter with Snippy
        </h1>
      </div>
      <p className={`mt-2 text-lg ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
      }`}>
        Your AI-powered coding companion for quick, reliable code snippets
      </p>
    </header>
  );
};

export default Header