import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Header from './components/Header';
import CodeGenerator from './components/CodeGenerator';
import CodeDisplay from './components/CodeDisplay';
import Footer from './components/Footer';
import Features from './components/Features';

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleGenerateCode = async (prompt: string) => {
    setLoading(true);
    setError(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (prompt.trim() === '') {
        throw new Error('Please enter a programming task.');
      }
      
      const mockResponse = `// Generated code for: ${prompt}\n\nfunction exampleSolution() {\n  // This is where the actual generated code would be\n  console.log("Solving: ${prompt}");\n  \n  // Example implementation\n  return "Solution implementation";\n}\n\nexampleSolution();`;
      
      setGeneratedCode(mockResponse);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setGeneratedCode('');
    setError(null);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <Navbar theme={theme} onThemeToggle={toggleTheme} />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header theme={theme} />
        <Features theme={theme} />
        <main className="mt-8 space-y-6">
          <CodeGenerator 
            onGenerate={handleGenerateCode} 
            onClear={handleClear} 
            loading={loading}
            theme={theme}
          />
          
          {error && (
            <div className={`p-4 rounded-md ${
              theme === 'dark' ? 'bg-red-900/50 text-red-200' : 'bg-red-100 text-red-700'
            }`}>
              {error}
            </div>
          )}
          
          {generatedCode && !error && (
            <CodeDisplay code={generatedCode} theme={theme} />
          )}
        </main>
        <Footer theme={theme} />
      </div>
    </div>
  );
}

export default App