# AI ToolNav - Discover the Best AI Tools

A modern, beautiful AI tools discovery platform built with Next.js 15 and Tailwind CSS 4.

![ToolNav](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)

## ✨ Features

- **🔍 Smart Search**: Natural language search understands what you're looking for
- **🎯 8-Dimension Filters**: Filter by type, pricing, ratings, language, and more
- **🎨 Beautiful Design**: Clean, modern UI inspired by landingly.co
- **🌙 Dark Mode**: Full dark mode support
- **📱 Responsive**: Perfect on mobile, tablet, and desktop
- **⚡ Fast**: Static generation with lazy loading
- **🆓 Free to Browse**: No account required

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ai-tool-nav.git
cd ai-tool-nav

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
ai-tool-nav/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   └── tool/
│       └── [id]/
│           └── page.tsx    # Tool detail page
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with search
│   ├── FilterSidebar.tsx   # 8-dimension filters
│   ├── ToolCard.tsx        # Individual tool card
│   ├── ToolGrid.tsx        # Tools grid layout
│   ├── SearchBar.tsx       # Smart search component
│   └── Footer.tsx          # Site footer
├── data/
│   └── tools.json          # 93 AI tools data
├── types/
│   └── index.ts            # TypeScript types
├── public/                 # Static assets
└── tailwind.config.ts      # Tailwind configuration
```

## 🎨 Design Principles

Following landingly.co's design philosophy:

1. **Minimalist**: Clean black/white/gray base with purple/blue gradient accents
2. **Single-page**: Reduced navigation friction
3. **AI-powered search**: Natural language understanding
4. **8-dimension filters**: Comprehensive filtering system
5. **Card-based layout**: Beautiful tool cards with hover effects
6. **Low barrier**: Browse without login
7. **Smooth animations**: Delightful interactions
8. **Clear pricing**: Transparent pricing tiers

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: Heroicons (via inline SVG)
- **Data**: Static JSON (93 tools)

## 📊 Data Structure

Tools are stored in `data/tools.json` with the following structure:

```json
{
  "id": "chatgpt",
  "name": "ChatGPT",
  "description": "AI chat assistant...",
  "category": "chat",
  "tags": ["Chat", "Writing", "Coding"],
  "pricing": "Freemium",
  "rating": "4.5",
  "users": "5M+",
  "url": "https://chat.openai.com"
}
```

## 🎯 Filter Categories

1. **Type**: Text, Image, Video, Audio, Code, Chat, Productivity
2. **Use Case**: Office, Learning, Creative, Development, Marketing
3. **Pricing**: Free, Paid, Freemium
4. **Color Theme**: Purple, Blue, Green, Orange, Neutral
5. **Access Type**: Web, Mobile App, API, Plugin
6. **Language**: Chinese, English, Multilingual
7. **Rating**: 4.5+, 4.0+, 3.5+
8. **Popularity**: Featured, Trending, Popular

## 📄 License

MIT License - feel free to use this project for your own purposes.

## 🙏 Acknowledgments

- Design inspiration from [landingly.co](https://landingly.co)
- AI tools data curated from various sources
- Built with ❤️ for AI enthusiasts
