# Frontend

React + Vite + Framer Motion Developer Portfolio

## Setup

```bash
npm install
npm run dev
```

Access at `http://localhost:5173`

## Build

```bash
npm run build
```

## Features

- ✨ Cinematic animations with Framer Motion
- 🎨 Modern dark theme with glassmorphism
- 🎮 Interactive command palette (Ctrl+K)
- 💬 AI Chatbot integration
- 📱 Fully responsive
- ⚡ Fast loading with Vite

## Directory Structure

```
src/
├── components/
│   ├── ui/
│   └── layouts/
├── pages/
├── hooks/
├── utils/
├── assets/
├── App.jsx
└── main.jsx
```

## Environment

Create `.env.local`:

```
VITE_API_URL=http://localhost:5000/api
```

## Pages

- Home - Hero with animations
- About - Profile and skills
- Projects - Dynamic project list
- Certificates - Certificate gallery
- Contact - Contact form
- Admin - Dashboard

## Components

- Button - Customizable animated button
- Card - Reusable card component
- Modal - Modal dialogs
- Toast - Toast notifications
- CommandPalette - Search and navigate
- ChatBot - Floating chat assistant
- Navbar - Navigation bar
- Footer - Footer with links

## Hooks

- useTheme - Dark/light mode
- useScrollReveal - Intersection observer
- useLocalStorage - Local storage management
- useToast - Toast notifications
