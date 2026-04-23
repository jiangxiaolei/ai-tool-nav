'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import toolsData from '@/data/tools.json';
import { Tool } from '@/types';

export default function ToolDetailPage() {
  const params = useParams();
  const toolId = params.id as string;
  const [tool, setTool] = useState<Tool | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundTool = toolsData.tools.find(t => t.id === toolId);
    setTool(foundTool || null);
    setLoading(false);
  }, [toolId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600" />
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <div className="max-w-7xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Tool not found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            The tool you're looking for doesn't exist or has been removed.
          </p>
          <Link href="/" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      writing: '📝',
      image: '🎨',
      video: '🎬',
      audio: '🎵',
      code: '💻',
      chat: '💬',
      productivity: '⚡',
      education: '📚',
    };
    return icons[category] || '🤖';
  };

  const getPricingColor = (pricing: string) => {
    switch (pricing) {
      case 'Free':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
      case 'Paid':
        return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
      case 'Freemium':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
      default:
        return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to all tools
        </Link>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
          {/* Hero Section */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 sm:p-12">
            <div className="flex items-start space-x-6">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">{getCategoryIcon(tool.category)}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-bold text-white">{tool.name}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full bg-white/20 text-white`}>
                    {tool.pricing}
                  </span>
                </div>
                <p className="text-white/90 text-lg mb-4">{tool.descriptionEn}</p>
                <div className="flex items-center space-x-4">
                  <span className="flex items-center text-white">
                    <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {tool.rating || 'N/A'} Rating
                  </span>
                  <span className="text-white/70">·</span>
                  <span className="text-white/90">{tool.users || 'Unknown'} users</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 sm:flex-none px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-semibold text-center"
              >
                Visit Website
                <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
              <button className="px-6 py-4 border border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium">
                Save to Favorites
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {(tool.tags || []).map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg text-sm font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">About</h2>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {tool.description}
              </p>
            </div>

            {/* Use Cases */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Use Cases</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {(tool.useCases || []).map((useCase, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700 dark:text-gray-300 text-sm">{useCase}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-gray-200 dark:border-gray-800">
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Category</div>
                <div className="font-semibold text-gray-900 dark:text-white capitalize">
                  {(tool.category || 'unknown').replace(/_/g, ' ')}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Pricing</div>
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getPricingColor(tool.pricing || '')}`}>
                  {tool.pricing || 'Unknown'}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Rating</div>
                <div className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {tool.rating || 'N/A'}
                </div>
              </div>
              <div>
                <div className="text-gray-500 dark:text-gray-400 text-sm mb-1">Users</div>
                <div className="font-semibold text-gray-900 dark:text-white">{tool.users || 'Unknown'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
