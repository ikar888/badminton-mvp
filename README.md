# 🏸 Badminton MVP

A modern web application built with **React**, **Vite**, and **TailwindCSS** to serve as a Minimum Viable Product (MVP) for badminton-related features (such as booking, scheduling, or payments). This project leverages Stripe for payment integration, date-fns for date handling, and a clean developer experience with ESLint and TypeScript support.

---

## 🚀 Features
- ⚡ Fast development with **Vite**
- 🎨 Styling powered by **TailwindCSS**
- 💳 Secure payments via **Stripe**
- 📅 Date handling with **date-fns** and **react-datepicker**
- 🔗 Routing with **React Router v7**
- 🍪 Cookie management with **js-cookie**
- 🛠️ Developer-friendly setup with ESLint, React Hooks linting, and TypeScript types

---

## 📦 Tech Stack
| Category        | Tools/Packages                                                                 |
|-----------------|--------------------------------------------------------------------------------|
| Framework       | React 19, React DOM                                                            |
| Build Tool      | Vite (Rolldown Vite)                                                           |
| Styling         | TailwindCSS, clsx                                                              |
| Routing         | React Router, React Router DOM                                                 |
| UI Utilities    | @floating-ui/react, react-icons                                                |
| Date Handling   | date-fns, react-datepicker                                                     |
| State/Helpers   | axios, js-cookie                                                               |
| Payments        | @stripe/react-stripe-js, @stripe/stripe-js                                     |
| Dev Tools       | ESLint, @vitejs/plugin-react, TypeScript types for React and React DOM         |

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (>= 18 recommended)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/badminton-mvp.git

# Navigate into the project
cd badminton-mvp

# Install dependencies
npm install

# Start the dev server
npm run dev

# Create a production build
npm run build

# Preview the production build locally
npm run preview

# Run ESLint checks
npm run lint

badminton-mvp/
├── public/              # Static assets
├── src/                 # Application source code
│   ├── components/      # Reusable UI components
│   ├── pages/           # Page-level components
│   ├── hooks/           # Custom React hooks
│   ├── styles/          # Tailwind and global styles
│   └── main.jsx         # Application entry point
├── package.json         # Project metadata & dependencies
└── vite.config.js       # Vite configuration

VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here