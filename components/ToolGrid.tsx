'use client';

import { Tool } from '@/types';
import ToolCard from './ToolCard';

interface ToolGridProps {
  tools: Tool[];
  isLoading?: boolean;
}

export default function ToolGrid({ tools, isLoading = false }: ToolGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 animate-pulse">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              <div className="flex-1">
                <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-24 mb-2" />
                <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              </div>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-full mb-2" />
            <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
              <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded w-16" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (tools.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          No tools found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
          Try adjusting your filters or search query to find what you're looking for.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
