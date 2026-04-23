'use client';

import { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import FilterSidebar from '@/components/FilterSidebar';
import ToolGrid from '@/components/ToolGrid';
import Footer from '@/components/Footer';
import toolsData from '@/data/tools.json';
import { Tool, FilterState } from '@/types';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterState>({
    color: [],
    layout: [],
    vibe: [],
    industry: [],
    style: [],
    type: [],
    sections: [],
    theme: [],
  });
  const [searchResults, setSearchResults] = useState<Tool[]>([]);

  // Filter tools based on search and filters
  const filteredTools = useMemo(() => {
    let result = toolsData.tools;

    // Apply search filter
    if (searchQuery.trim()) {
      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 0);
      result = result.filter(tool => {
        const searchableText = `
          ${tool.name} 
          ${tool.description} 
          ${tool.descriptionEn} 
          ${tool.tags.join(' ')} 
          ${tool.category} 
          ${(tool.useCases || []).join(' ')}
        `.toLowerCase();
        return searchTerms.every(term => searchableText.includes(term));
      });
    }

    // Apply category filters (type)
    if (activeFilters.type.length > 0) {
      result = result.filter(tool => activeFilters.type.includes(tool.category));
    }

    // Apply pricing filters (theme)
    if (activeFilters.theme.length > 0) {
      const pricingMap: Record<string, string> = {
        free: 'Free',
        paid: 'Paid',
        freemium: 'Freemium',
      };
      const selectedPricing = activeFilters.theme.map(t => pricingMap[t]);
      result = result.filter(tool => selectedPricing.includes(tool.pricing));
    }

    // Apply featured/popular filters (style)
    if (activeFilters.style.includes('featured')) {
      result = result.filter(tool => tool.featured);
    }

    // Apply rating filters (industry)
    if (activeFilters.industry.length > 0) {
      result = result.filter(tool => {
        const rating = parseFloat(tool.rating || '0');
        if (activeFilters.industry.includes('4.5+')) return rating >= 4.5;
        if (activeFilters.industry.includes('4.0+')) return rating >= 4.0;
        if (activeFilters.industry.includes('3.5+')) return rating >= 3.5;
        return true;
      });
    }

    return result;
  }, [searchQuery, activeFilters]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (filters: FilterState) => {
    setActiveFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black">
      <Header />
      
      <main>
        {/* Hero Section */}
        <Hero onSearch={handleSearch} />

        {/* Main Content */}
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar - Filters */}
              <FilterSidebar tools={toolsData.tools} onFilterChange={handleFilterChange} />

              {/* Main Content - Tool Grid */}
              <div className="flex-1">
                {/* Results Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {searchQuery ? `Search Results` : 'All Tools'}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {filteredTools.length} {filteredTools.length === 1 ? 'tool' : 'tools'} found
                      {searchQuery && ` for "${searchQuery}"`}
                    </p>
                  </div>
                </div>

                {/* Tool Grid */}
                <ToolGrid tools={filteredTools} />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why choose ToolNav?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                We make it easy to discover and compare the best AI tools for your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Smart Search
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Natural language search understands what you're looking for, not just keywords.
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Advanced Filters
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Filter by category, pricing, ratings, and more to find exactly what you need.
                </p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Always Free
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Browse and search all tools without creating an account or paying a dime.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Start for free, upgrade when you need more.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {/* Free Tier */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Free</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">Perfect for exploring</p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">$0</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Browse all 93+ tools
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Advanced filters
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Smart search
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                  Get Started
                </button>
              </div>

              {/* Pro Tier */}
              <div className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-4 px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                  Popular
                </div>
                <h3 className="text-xl font-semibold mb-2">Pro</h3>
                <p className="text-white/80 mb-6">For power users</p>
                <div className="text-4xl font-bold mb-6">$9<span className="text-xl font-normal text-white/70">/month</span></div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Everything in Free
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Save favorites
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Priority support
                  </li>
                  <li className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Early access to new tools
                  </li>
                </ul>
                <button className="w-full py-3 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-colors font-semibold">
                  Start Free Trial
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-gray-800">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Enterprise</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">For teams</p>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-6">Custom</div>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Everything in Pro
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Team management
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    API access
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Custom integrations
                  </li>
                </ul>
                <button className="w-full py-3 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                  Contact Sales
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About ToolNav
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              ToolNav was created to help people discover the best AI tools without the overwhelm. 
              With hundreds of new AI tools launching every month, we curate and categorize them 
              so you can find exactly what you need to boost your productivity and creativity.
            </p>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">93+</div>
                <div className="text-gray-600 dark:text-gray-400">AI Tools</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">8</div>
                <div className="text-gray-600 dark:text-gray-400">Categories</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-gray-600 dark:text-gray-400">Free to Browse</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
