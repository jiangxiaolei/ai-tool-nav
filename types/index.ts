export interface Category {
  id: string;
  name: string;
  icon: string;
}

export interface Tool {
  id: string;
  name: string;
  description: string;
  descriptionEn?: string;
  url: string;
  category: string;
  tags: string[];
  pricing: string;
  featured: boolean;
  useCases?: string[];
  alternatives?: string[];
  rating?: string;
  users?: string;
  logo?: string;
  screenshots?: string[];
  features?: string[];
  [key: string]: any;
}

export interface ToolsData {
  categories: Category[];
  tools: Tool[];
}

export interface FilterOption {
  id: string;
  name: string;
  count?: number;
}

export interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

export interface FilterState {
  color: string[];
  layout: string[];
  vibe: string[];
  industry: string[];
  style: string[];
  type: string[];
  sections: string[];
  theme: string[];
}
