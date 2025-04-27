import React, { useState, useEffect } from 'react';
import { Check, Clipboard } from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark, atomOneLight } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

interface CodeDisplayProps {
  code: string;
  theme: 'light' | 'dark';
}

const CodeDisplay: React.FC<CodeDisplayProps> = ({ code, theme }) => {
  const [copied, setCopied] = useState(false);
  const [language, setLanguage] = useState('javascript');
  const [processedCode, setProcessedCode] = useState('');

  useEffect(() => {
    // Robust code extraction that handles all cases
    let cleanCode = code;
    let detectedLang = 'javascript';

    // Case 1: Check for ```lang\ncode\n``` pattern
    const tripleBacktickMatch = code.match(/^```([a-zA-Z0-9+-]*)\n([\s\S]+?)\n```$/m);
    if (tripleBacktickMatch) {
      detectedLang = tripleBacktickMatch[1] || 'javascript';
      cleanCode = tripleBacktickMatch[2].trim();
    } 
    // Case 2: Check for ```code``` without language
    else if (code.startsWith('```') && code.endsWith('```')) {
      cleanCode = code.slice(3, -3).trim();
    }
    // Case 3: Remove any remaining ``` if they exist
    else {
      cleanCode = code.replace(/```/g, '').trim();
    }

    setProcessedCode(cleanCode);

    // Language detection patterns
    const langDetection = [
      { pattern: /^#!\/bin\/bash|\bif\s*\[\s*|\bthen\b|\bfi\b|\bfor\s.*\bin\b/, language: 'bash' },
      { pattern: /<\w+>|<\/\w+>|<>|react/i, language: 'jsx' },
      { pattern: /fn\s+\w+\(|let\s+\w+:|\bprintln!/i, language: 'rust' },
      { pattern: /package\s+main|func\s+\w+\(|fmt\.Println/i, language: 'go' },
      { pattern: /def\s+\w+\(|import\s+\w+|from\s+\w+/i, language: 'python' },
      { pattern: /function\s+\w+|const\s+\w+|let\s+\w+/i, language: 'javascript' },
    ];

    // If we didn't detect language from markdown, use pattern matching
    if (!tripleBacktickMatch || !tripleBacktickMatch[1]) {
      const detected = langDetection.find(({ pattern }) => pattern.test(cleanCode));
      detectedLang = detected?.language || 'javascript';
    }

    setLanguage(detectedLang);
  }, [code]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = processedCode;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className={`rounded-lg overflow-hidden border ${
      theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
    }`}>
      <div className={`flex justify-between items-center p-2 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
      }`}>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-gray-500 dark:text-gray-400">
            {language.toUpperCase()}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1 px-2 py-1 text-xs rounded ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-200'
          }`}
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-500" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Clipboard size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={theme === 'dark' ? atomOneDark : atomOneLight}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.9rem',
        }}
        showLineNumbers
        lineNumberStyle={{
          color: theme === 'dark' ? '#6e7681' : '#959da5',
          minWidth: '2.25em'
        }}
        wrapLines
        lineProps={{ style: { whiteSpace: 'pre-wrap' } }}
      >
        {processedCode}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeDisplay;