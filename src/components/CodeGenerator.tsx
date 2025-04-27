import React, { useState } from 'react';
import { Play, RefreshCw, X, Wand2 } from 'lucide-react';
import CodeDisplay from './CodeDisplay';

interface CodeGeneratorProps {
  theme: 'light' | 'dark';
}

const CodeGenerator: React.FC<CodeGeneratorProps> = ({ theme }) => {
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setGeneratedCode(null);

    try {
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate code. Please try again.');
      }

      const data = await response.json();
      setGeneratedCode(data.generatedCode);
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setPrompt('');
    setGeneratedCode(null);
    setError(null);
  };

  const suggestions = [
    "Create a function to reverse a string",
    "Write a binary search implementation",
    "Generate a React component for a modal",
    "Create an Express.js REST API endpoint",
  ];

  return (
    <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow-md'}`}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="userPrompt"
            className={`block mb-2 text-sm font-medium ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}
          >
            What would you like me to help you with?
          </label>
          <div className="relative">
            <Wand2 size={18} className="absolute left-3 top-3 text-gray-400" />
            <textarea
              id="userPrompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="E.g., Write a Python function to sort a list of numbers"
              className={`w-full p-3 pl-10 border rounded-md focus:ring-2 focus:outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 border-gray-600 text-white focus:ring-blue-500/50'
                  : 'bg-white border-gray-300 text-gray-900 focus:ring-blue-500/50'
              }`}
              rows={4}
              required
            />
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPrompt(suggestion)}
                className={`text-xs px-3 py-1 rounded-full ${
                  theme === 'dark'
                    ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            disabled={loading}
            className={`flex items-center justify-center py-2 px-4 font-medium rounded-md ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            } flex-1`}
          >
            {loading ? (
              <>
                <RefreshCw size={18} className="animate-spin mr-2" />
                Generating...
              </>
            ) : (
              <>
                <Play size={18} className="mr-2" />
                Generate Code
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            className={`flex items-center justify-center py-2 px-4 font-medium rounded-md ${
              theme === 'dark'
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-200'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
          >
            <X size={18} className="mr-2" />
            Clear
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-sm text-red-500">{error}</p>}

      {generatedCode && (
        <div className="mt-6">
          <CodeDisplay code={generatedCode} theme={theme} />
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;