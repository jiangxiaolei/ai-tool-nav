'use client';

import { useState } from 'react';
import { Tool, FilterState } from '@/types';

interface FilterSidebarProps {
  tools: Tool[];
  onFilterChange: (filters: FilterState) => void;
}

const filterGroups = [
  {
    id: 'type',
    name: 'Type',
    icon: '📊',
    options: [
      { id: 'text', name: 'Text Generation', count: 0 },
      { id: 'image', name: 'Image Generation', count: 0 },
      { id: 'video', name: 'Video Creation', count: 0 },
      { id: 'audio', name: 'Audio Processing', count: 0 },
      { id: 'code', name: 'Code Assistant', count: 0 },
      { id: 'chat', name: 'Chat & Assistant', count: 0 },
      { id: 'productivity', name: 'Productivity', count: 0 },
    ],
  },
  {
    id: 'sections',
    name: 'Use Case',
    icon: '🎯',
    options: [
      { id: 'office', name: 'Office & Work', count: 0 },
      { id: 'learning', name: 'Learning & Education', count: 0 },
      { id: 'creation', name: 'Creative Work', count: 0 },
      { id: 'development', name: 'Development', count: 0 },
      { id: 'marketing', name: 'Marketing', count: 0 },
    ],
  },
  {
    id: 'theme',
    name: 'Pricing',
    icon: '💰',
    options: [
      { id: 'free', name: 'Free', count: 0 },
      { id: 'paid', name: 'Paid', count: 0 },
      { id: 'freemium', name: 'Freemium', count: 0 },
    ],
  },
  {
    id: 'color',
    name: 'Color Theme',
    icon: '🎨',
    options: [
      { id: 'purple', name: 'Purple', count: 0 },
      { id: 'blue', name: 'Blue', count: 0 },
      { id: 'green', name: 'Green', count: 0 },
      { id: 'orange', name: 'Orange', count: 0 },
      { id: 'neutral', name: 'Neutral', count: 0 },
    ],
  },
  {
    id: 'layout',
    name: 'Access Type',
    icon: '🔌',
    options: [
      { id: 'web', name: 'Web App', count: 0 },
      { id: 'app', name: 'Mobile App', count: 0 },
      { id: 'api', name: 'API', count: 0 },
      { id: 'plugin', name: 'Plugin/Extension', count: 0 },
    ],
  },
  {
    id: 'vibe',
    name: 'Language',
    icon: '🌐',
    options: [
      { id: 'chinese', name: 'Chinese', count: 0 },
      { id: 'english', name: 'English', count: 0 },
      { id: 'multilingual', name: 'Multilingual', count: 0 },
    ],
  },
  {
    id: 'industry',
    name: 'Rating',
    icon: '⭐',
    options: [
      { id: '4.5+', name: '4.5+ Stars', count: 0 },
      { id: '4.0+', name: '4.0+ Stars', count: 0 },
      { id: '3.5+', name: '3.5+ Stars', count: 0 },
    ],
  },
  {
    id: 'style',
    name: 'Popularity',
    icon: '🔥',
    options: [
      { id: 'featured', name: 'Featured', count: 0 },
      { id: 'trending', name: 'Trending', count: 0 },
      { id: 'popular', name: 'Popular (10K+)', count: 0 },
    ],
  },
];

export default function FilterSidebar({ tools, onFilterChange }: FilterSidebarProps) {
  const [expandedFilters, setExpandedFilters] = useState<Set<string>>(new Set(['type']));
  const [filters, setFilters] = useState<FilterState>({
    color: [],
    layout: [],
    vibe: [],
    industry: [],
    style: [],
    type: [],
    sections: [],
    theme: [],
  });

  const toggleFilter = (groupId: string, optionId: string) => {
    const newFilters = {
      ...filters,
      [groupId]: filters[groupId as keyof FilterState].includes(optionId)
        ? filters[groupId as keyof FilterState].filter(id => id !== optionId)
        : [...filters[groupId as keyof FilterState], optionId],
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleExpanded = (groupId: string) => {
    const newExpanded = new Set(expandedFilters);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedFilters(newExpanded);
  };

  const clearAll = () => {
    const emptyFilters = {
      color: [],
      layout: [],
      vibe: [],
      industry: [],
      style: [],
      type: [],
      sections: [],
      theme: [],
    };
    setFilters(emptyFilters);
    onFilterChange(emptyFilters);
  };

  const activeFilterCount = Object.values(filters).reduce((acc, arr) => acc + arr.length, 0);

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-20 space-y-2">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h2>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
            >
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Filter Groups */}
        {filterGroups.map((group) => (
          <div
            key={group.id}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden"
          >
            <button
              onClick={() => toggleExpanded(group.id)}
              className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span className="text-xl">{group.icon}</span>
                <span className="font-medium text-gray-900 dark:text-white">{group.name}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  expandedFilters.has(group.id) ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {expandedFilters.has(group.id) && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
                <div className="space-y-2">
                  {group.options.map((option) => {
                    const isActive = filters[group.id as keyof FilterState].includes(option.id);
                    return (
                      <label
                        key={option.id}
                        className="flex items-center justify-between cursor-pointer group"
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="checkbox"
                            checked={isActive}
                            onChange={() => toggleFilter(group.id, option.id)}
                            className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                            {option.name}
                          </span>
                        </div>
                        {option.count !== undefined && (
                          <span className="text-xs text-gray-400">
                            {option.count > 0 ? option.count : '—'}
                          </span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
