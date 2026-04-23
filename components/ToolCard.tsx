'use client';

import Link from 'next/link';
import { Tool } from '@/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
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
    <Link href={`/tool/${tool.id}`}>
      <div className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:border-purple-300 dark:hover:border-purple-700 hover:shadow-xl transition-all duration-300 cursor-pointer h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
              <span className="text-2xl">{getCategoryIcon(tool.category)}</span>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                {tool.name}
              </h3>
              <div className="flex items-center space-x-2 mt-1">
                <span className="flex items-center text-yellow-500 text-sm">
                  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {tool.rating || 'N/A'}
                </span>
                <span className="text-gray-400 text-sm">·</span>
                <span className="text-gray-500 dark:text-gray-400 text-sm">{tool.users || 'Unknown'}</span>
              </div>
            </div>
          </div>
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full ${getPricingColor(tool.pricing)}`}>
            {tool.pricing}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
          {tool.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.slice(0, 3).map((tag, index) => (
            <span
              key={index}
              className="px-2.5 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-lg"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
            {tool.category.replace(/_/g, ' ')}
          </span>
          <div className="flex items-center text-purple-600 dark:text-purple-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View details
            <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
