# AI Chat Web Application Frontend

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.18-38bdf8.svg)](https://tailwindcss.com/)
[![Node](https://img.shields.io/badge/Node-%3E%3D14.0.0-brightgreen.svg)](https://nodejs.org/)

A modern, responsive React-based chat interface prototype with AI assistant capabilities. This project was created by the author to demonstrate the integration and operation of various LLM (Large Language Model) interfaces.

Please note: This is a front-end prototype and does not include a full backend, production-ready algorithms, or complete functional logic. It is intended for demonstration and development purposes.

## 🏗️ Architecture

The application consists of a modular frontend structure designed for scalability:

- **Frontend** (`/frontend`) - React-based UI with Tailwind CSS
  - Modern component architecture
  - PWA-ready configuration
  - Responsive design with mobile optimization

- **Future Components**
  - Backend API integration
  - Database layer
  - Authentication system

## 🔗 Quick Links

- 📖 [Frontend Documentation](./frontend/README.md)
- 🔧 [Frontend Configuration](./frontend)
- 📄 [License](./LICENSE)
- 📋 [Third-party Licenses](./NOTICE)

## 🚀 Features

- **Modern Chat Interface**: Clean, intuitive design with message bubbles and timestamps
- **Dual Theme Support**: Seamless switching between dark and light themes
- **Mobile Responsive**: Optimized layout for both desktop and mobile devices
- **Quick Actions**: Scrollable action buttons with hover animations
- **Model Selection**: Dropdown menu for choosing different AI models
- **Side Navigation**: Collapsible menu with user profile and settings
- **Smooth Animations**: CSS transitions and hover effects throughout the interface

## 🛠️ Tech Stack

- **React 19.2.0** - Modern React with latest features
- **Tailwind CSS 3.4.18** - Utility-first CSS framework
- **Lucide React** - Beautiful, customizable icons
- **PostCSS** - CSS processing and optimization
- **UUID** - For generating unique IDs
- **Create React App** - Development and build tooling

## 📦 Installation

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Visa-365/ai_webui_app.git
   cd ai_webui_app/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Project Structure

```
ai_webui_app/
├── frontend/                  # React frontend application
│   ├── src/                   # Source code
│   │   ├── App.jsx           # Main application component
│   │   ├── index.js          # Application entry point
│   │   ├── index.css         # Global styles and Tailwind imports
│   │   ├── logo.svg          # Application logo
│   │   ├── reportWebVitals.js # Web performance metrics
│   │   └── setupTests.js      # Jest test configuration
│   ├── public/                # Public assets
│   │   ├── index.html        # Main HTML template
│   │   ├── manifest.json     # PWA manifest
│   │   ├── robots.txt        # Search engine configuration
│   │   ├── favicon.ico       # Site icon
│   │   ├── logo192.png       # PWA icon 192x192
│   │   └── logo512.png       # PWA icon 512x512
│   ├── package.json           # Dependencies and scripts
│   ├── package-lock.json      # Locked dependency versions
│   ├── tailwind.config.js     # Tailwind CSS configuration
│   ├── postcss.config.js      # PostCSS configuration
│   ├── README.md              # Frontend documentation
│   └── node_modules/          # Dependencies (auto-generated)
├── LICENSE                     # MIT License
├── NOTICE                      # Third-party licenses
├── .gitignore                  # Git ignore rules
└── README.md                   # This documentation
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
**⚠️ Warning: This is a one-way operation!**

Removes the single build dependency and copies configuration files directly into your project.

## 🎨 Theme System

The application supports two themes with automatic styling:

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

## 🎭 Components Overview

### Main Components

1. **Header**
   - Menu toggle button
   - Model selection dropdown
   - Theme toggle button

2. **Side Menu**
   - Navigation items
   - User profile section
   - Collapsible overlay design

3. **Chat Area**
   - Message bubbles with timestamps
   - Auto-scroll to latest messages
   - Responsive message layout

4. **Quick Actions**
   - Horizontal scrolling animation on hover
   - Action buttons for common tasks
   - Seamless loop animation

5. **Input Area**
   - Text input with send button
   - Additional control buttons (Plus, Globe, Mic)
   - Responsive layout for mobile/desktop

## 🎨 Styling and Animations

### CSS Features
- **Tailwind CSS**: Utility-first styling approach
- **Custom Animations**: Smooth transitions and hover effects
- **Responsive Design**: Mobile-first approach with breakpoints
- **Theme Variables**: Dynamic color switching

### Key Animations
- **Quick Actions Scroll**: Horizontal scrolling on hover
- **Button Hover**: Smooth color transitions
- **Menu Slide**: Side menu slide-in animation
- **Message Fade**: Smooth message appearance

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

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

For information about third-party dependencies and their licenses, please see the [NOTICE](NOTICE) file.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Create React App](https://create-react-app.dev/) - Development tooling

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the troubleshooting section

---

**Built with ❤️ using React and Tailwind CSS**
