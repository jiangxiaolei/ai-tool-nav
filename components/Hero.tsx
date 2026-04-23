'use client';

import { useState } from 'react';

interface HeroProps {
  onSearch: (query: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-sm font-medium mb-6">
            <span className="mr-2">✨</span>
            Discover 93+ AI Tools
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-6">
            Find the perfect{' '}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI tools
            </span>{' '}
            for your workflow
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-10 max-w-2xl">
            Explore our curated collection of AI-powered tools. From writing assistants 
            to image generators, find everything you need to boost your productivity.
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="relative max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Try 'image generation tools for designers' or 'free writing assistants'..."
                className="w-full pl-12 pr-32 py-4 text-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all text-gray-900 dark:text-white placeholder-gray-400"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all font-medium"
              >
                Search
              </button>
            </div>
          </form>

          {/* CTA Button */}
          <div className="flex flex-wrap items-center gap-4">
            <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-lg">
              Explore for free
            </button>
            <span className="text-gray-500 dark:text-gray-400 text-sm">
              No account required · 93+ tools available
            </span>
          </div>

          {/* Quick Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-xl">
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">93+</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">AI Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">8</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Categories</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white">100%</div>
              <div className="text-gray-500 dark:text-gray-400 text-sm mt-1">Free to Browse</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
