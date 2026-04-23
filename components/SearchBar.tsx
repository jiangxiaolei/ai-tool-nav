'use client';

import { useState, useEffect } from 'react';
import { Tool } from '@/types';

interface SearchBarProps {
  tools: Tool[];
  onSearchResults: (results: Tool[]) => void;
  initialQuery?: string;
}

export default function SearchBar({ tools, onSearchResults, initialQuery = '' }: SearchBarProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<Tool[]>([]);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      onSearchResults([]);
      return;
    }

    const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
    
    const filtered = tools.filter(tool => {
      const searchableText = `
        ${tool.name} 
        ${tool.description} 
        ${tool.descriptionEn} 
        ${tool.tags.join(' ')} 
        ${tool.category} 
        ${(tool.useCases || []).join(' ')}
      `.toLowerCase();

      return searchTerms.every(term => searchableText.includes(term));
    }).slice(0, 8);

    setResults(filtered);
    onSearchResults(filtered);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    performSearch(value);
    setIsOpen(true);
  };

  const handleSelectTool = (tool: Tool) => {
    setQuery(tool.name);
    setIsOpen(false);
    window.location.href = `/tool/${tool.id}`;
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const terms = query.toLowerCase().split(' ').filter(t => t.length > 0);
    let highlighted = text;
    
    terms.forEach(term => {
      const regex = new RegExp(`(${term})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark class="bg-yellow-200 dark:bg-yellow-800 px-0.5 rounded">$1</mark>');
    });
    
    return highlighted;
  };

  return (
    <div className="relative w-full max-w-2xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder="Search AI tools by name, category, or use case..."
          className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
        />
      </div>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
          <div className="p-2">
            {results.map((tool) => (
              <button
                key={tool.id}
                onClick={() => handleSelectTool(tool)}
                className="w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors flex items-start space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">{tool.category === 'image' ? '🎨' : tool.category === 'code' ? '💻' : tool.category === 'writing' ? '📝' : '🤖'}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-white" dangerouslySetInnerHTML={{ __html: highlightMatch(tool.name, query) }} />
                  <div className="text-sm text-gray-500 dark:text-gray-400 truncate" dangerouslySetInnerHTML={{ __html: highlightMatch(tool.description, query) }} />
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    tool.pricing === 'Free' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                    tool.pricing === 'Paid' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                    'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  }`}>
                    {tool.pricing}
                  </span>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl p-6 text-center z-50">
          <svg className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-500 dark:text-gray-400">No tools found for "{query}"</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Try different keywords or browse all tools</p>
        </div>
      )}
    </div>
  );
}
