import React from 'react';
import { Zap, Code2, Sparkles, Clock } from 'lucide-react';

interface FeaturesProps {
  theme: 'light' | 'dark';
}

const Features: React.FC<FeaturesProps> = ({ theme }) => {
  const features = [
    {
      icon: <Zap className="text-yellow-500" size={24} />,
      title: 'Lightning Fast',
      description: 'Get code snippets in seconds'
    },
    {
      icon: <Code2 className="text-blue-500" size={24} />,
      title: 'Multiple Languages',
      description: 'Supports all major programming languages'
    },
    {
      icon: <Sparkles className="text-purple-500" size={24} />,
      title: 'AI-Powered',
      description: 'Smart suggestions and optimizations'
    },
    {
      icon: <Clock className="text-green-500" size={24} />,
      title: 'Time-Saving',
      description: 'Focus on solving problems, not syntax'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
      {features.map((feature, index) => (
        <div
          key={index}
          className={`p-4 rounded-lg ${
            theme === 'dark' 
              ? 'bg-gray-800 hover:bg-gray-700' 
              : 'bg-white hover:bg-gray-50 shadow-md'
          }`}
        >
          <div className="flex items-center space-x-3">
            {feature.icon}
            <h3 className="font-semibold">{feature.title}</h3>
          </div>
          <p className={`mt-2 text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features