# AI Chat Application - Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8.svg)](https://tailwindcss.com/)
[![Node](https://img.shields.io/badge/Node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

Modern React-based chat interface prototype with AI assistant capabilities.

> **Note**: This is a front-end prototype and does not include a full backend, production-ready algorithms, or complete functional logic. It is intended for demonstration and development purposes.

## ✨ Features

- 🎨 **Modern Chat Interface** - Clean, intuitive design with message bubbles and timestamps
- 🌓 **Dual Theme Support** - Seamless switching between dark and light themes
- 📱 **Mobile Responsive** - Optimized layout for both desktop and mobile devices
- ⚡ **Quick Actions** - Scrollable action buttons with hover animations
- 🤖 **Model Selection** - Dropdown menu for choosing different AI models
- 📋 **Side Navigation** - Collapsible menu with user profile and settings
- ✨ **Smooth Animations** - CSS transitions and hover effects throughout

## 🛠️ Tech Stack

- **React 19.2.0** - Modern React with latest features
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **UUID** - For generating unique IDs
- **PostCSS** - CSS processing and optimization
- **Create React App** - Development and build tooling

## 📦 Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn** package manager

### Quick Start

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm start
   ```

3. **Open browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure

```
frontend/
├── public/
│   ├── index.html          # Main HTML template
│   ├── manifest.json       # PWA manifest
│   ├── robots.txt          # Search engine configuration
│   ├── favicon.ico         # Site icon
│   ├── logo192.png         # PWA icon 192x192
│   └── logo512.png         # PWA icon 512x512
├── src/
│   ├── App.jsx             # Main application component
│   ├── index.js            # Application entry point
│   ├── index.css           # Global styles and Tailwind imports
│   ├── logo.svg            # Application logo
│   ├── reportWebVitals.js  # Web performance metrics
│   └── setupTests.js       # Jest test configuration
├── package.json            # Dependencies and scripts
├── package-lock.json       # Locked dependency versions
├── tailwind.config.js      # Tailwind CSS configuration
└── postcss.config.js       # PostCSS configuration
```

## 🎯 Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot reloading at `http://localhost:3000`

### Testing
```bash
npm test
```
Launches the test runner in interactive watch mode

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build` folder

### Eject (Advanced)
```bash
npm run eject
```
⚠️ **Warning: This is a one-way operation!**  
Removes the single build dependency and copies configuration files directly into your project.

## 🎨 Theme System

### Dark Theme (Default)
- Background: Black (`#000000`)
- Text: White (`#ffffff`)
- Accents: Gray tones (`#1f2937`, `#374151`)
- Borders: Dark gray (`#374151`)

### Light Theme
- Background: White (`#ffffff`)
- Text: Dark gray (`#111827`)
- Accents: Light gray tones (`#f3f4f6`, `#e5e7eb`)
- Borders: Light gray (`#e5e7eb`)

### Theme Toggle
Click the sun/moon icon in the top-right corner to switch between themes.

## 📱 Responsive Design

### Desktop Layout
- Horizontal input area with all controls in one row
- Side navigation menu
- Full-width message display

### Mobile Layout
- Vertical input area with controls stacked
- Touch-optimized button sizes
- Collapsible side menu with overlay

## 🎭 Components

### Header
- Menu toggle button
- Model selection dropdown
- Theme toggle button

### Side Menu
- Navigation items
- User profile section
- Collapsible overlay design

### Chat Area
- Message bubbles with timestamps
- Auto-scroll to latest messages
- Responsive message layout

### Quick Actions
- Horizontal scrolling animation on hover
- Action buttons for common tasks
- Seamless loop animation

### Input Area
- Text input with send button
- Additional control buttons (Plus, Globe, Mic)
- Responsive layout for mobile/desktop

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configuration:
- Content paths: `./src/**/*.{js,jsx,ts,tsx}`
- Default theme with extensions
- PostCSS integration

### PostCSS
Configured with:
- Tailwind CSS plugin
- Autoprefixer for browser compatibility

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **CDN**: CloudFlare, AWS CloudFront
- **Traditional Hosting**: Apache, Nginx

### Environment Variables
Create a `.env` file for environment-specific configurations:
```env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_VERSION=1.0.0
```

## 🐛 Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   npm start
   ```

2. **Dependencies Issues**
   ```bash
   # Clear cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Build Failures**
   ```bash
   # Check for build errors
   npm run build
   ```

4. **Hot Reload Not Working**
   ```bash
   # Clear cache and restart
   npm cache clean --force
   npm start
   ```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](../LICENSE) file for details.

For information about third-party dependencies and their licenses, please see the [NOTICE](../NOTICE) file.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Create React App](https://create-react-app.dev/) - Development tooling

---

**Built with ❤️ using React and Tailwind CSS**

