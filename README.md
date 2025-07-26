# DE-Commerce - Modern E-commerce Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A production-ready, full-stack e-commerce platform built with modern web technologies. Features a React frontend with TypeScript, Node.js/Express backend, and PostgreSQL database through Supabase.

## ✨ Features

> ⚡️ **Centralized Site Settings:**
> All branding, navigation, SEO, and feature flags are managed in one place—[`site.ts`](frontend/src/config/site.ts). Edit this file to instantly update your site's identity, navigation, and more!

### Frontend

- 🎨 **Modern UI**: Built with React 19, TypeScript, and Tailwind CSS
- 📱 **Responsive Design**: Mobile-first approach with beautiful UX
- 🛒 **Shopping Cart**: Real-time cart management with persistent state
- 🔐 **Authentication**: Secure JWT-based user authentication
- 🎯 **State Management**: Context API with optimized performance
- 🧪 **Testing**: Comprehensive test suite with Vitest and Testing Library
- ⚡ **Performance**: Optimized with Vite, code splitting, and lazy loading

### Backend

- 🚀 **Express.js API**: RESTful API with TypeScript
- 🗄️ **Database**: PostgreSQL with Supabase integration
- 🔒 **Security**: JWT authentication, CORS, and input validation
- 📊 **Real Data**: Seeded with 12 realistic products and Unsplash images
- 🧪 **Testing**: Unit and integration tests with Vitest
- 📝 **Type Safety**: Strict TypeScript with comprehensive type definitions

## 🚀 Quick Start

### Prerequisites


# DE-Commerce

An open-source, full-stack e-commerce platform built with **React 19**, **Node.js/Express**, **TypeScript**, and **Supabase**. Modular, testable, and production-ready.

---

## 🚀 Features

- Modern React 19 frontend (Vite, Tailwind CSS, shadcn/ui)
- Node.js + Express backend (TypeScript)
- Supabase/PostgreSQL with Row Level Security (RLS)
- JWT authentication (Supabase Auth)
- Modular, testable codebase (see [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md))
- Stripe payment integration (API stubs present, not active; see docs)
- Cart, order, and product management
- Full TypeScript coverage
- ESLint, Prettier, Husky, Vitest
- One-click demo data seeding
- Production-ready deployment (Vercel, Railway, Supabase)

---

## 🏁 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/natede/de-commerce.git
cd de-commerce
```

### 2. Run the setup script (Windows)

```bash
./setup.bat
```

This will:
- Install all dependencies (frontend & backend)
- Create `.env` files if missing (with helpful prompts)
- Print next steps for development and seeding

> **Note:** For Mac/Linux, follow the manual steps in [DEVELOPMENT.md](DEVELOPMENT.md).

### 3. Start development servers

```bash
cd backend && npm run dev
# In a new terminal:
cd frontend && npm run dev
```

### 4. Seed demo data (optional)

See [SEEDING_GUIDE.md](SEEDING_GUIDE.md) for instructions on seeding demo users, products, and orders.

### 5. Open the app

- Frontend: http://localhost:5173
- Backend: http://localhost:3000/api

---

## 🏗️ Project Structure

See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for a detailed breakdown of the modular architecture, including services, routes, utilities, and type definitions.

---

## 📚 Documentation

- [Development Guide](DEVELOPMENT.md) — local setup, scripts, and workflow
- [Deployment Guide](DEPLOYMENT.md) — production deployment steps
- [Seeding Guide](SEEDING_GUIDE.md) — demo data and database seeding
- [Project Structure](PROJECT_STRUCTURE.md) — modular codebase overview
- [Contributing](CONTRIBUTING.md) — code style, PRs, and community

---

## 🗂️ Site Configuration (`site.ts`)

The file `frontend/src/config/site.ts` centralizes all site-wide settings for the e-commerce platform. It acts as the single source of truth for branding, navigation, SEO, feature flags, colors, company info, contact details, legal pages, currency, shipping, and more.

### How to Use
- **Import the config:**
  ```ts
  import { siteConfig } from '@/config/site';
  ```
- **Access settings:** Use `siteConfig` properties throughout your frontend (e.g., for navigation menus, branding, SEO, feature toggles, etc.).
- **Customize:**
  - Update branding, company info, and contact details for your project.
  - Adjust navigation, colors, and feature flags as needed.
  - Set up currencies, shipping rates, and legal URLs for your market.
- **Best Practice:**
  - Treat `site.ts` as the master config for all static site data.
  - Avoid hardcoding these values elsewhere in the codebase.

See the top comments in `site.ts` for a full customization guide and property documentation.

---

## 🛠️ Technology Stack

**Frontend:** React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui, React Router, Zustand

**Backend:** Node.js, Express, TypeScript, Supabase, JWT, Vitest

**Database:** PostgreSQL (via Supabase), RLS, real-time subscriptions

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines, code style, and PR process.

---

## 📄 License

MIT
│   ├── .gitignore              # Global ignore patterns
│   ├── .prettierrc             # Code formatting rules
│   ├── setup.bat               # Windows setup script
│   └── tsconfig.base.json      # Base TypeScript config
│
├── 📖 Documentation
│   ├── README.md               # Main documentation
│   ├── PROJECT_STRUCTURE.md    # Detailed structure guide
│   ├── DEPLOYMENT.md           # Deployment instructions
│   └── SEEDING_GUIDE.md        # Database setup guide
│
├── 🎨 frontend/                # React frontend application
│   ├── src/
│   │   ├── components/          # Reusable UI components
│   │   ├── features/            # Feature-based modules
│   │   ├── pages/               # Page components
│   │   ├── contexts/            # React Context providers
│   │   ├── hooks/               # Custom React hooks
│   │   ├── lib/                 # Utility libraries
│   │   ├── types/               # TypeScript type definitions
│   │   └── test/                # Test files and setup
│   ├── public/                  # Static assets
│   └── package.json
├── backend/                     # Express.js backend API
│   ├── src/
│   │   ├── routes/              # API route handlers
│   │   ├── services/            # Business logic layer
│   │   ├── middleware/          # Express middleware
│   │   ├── config/              # Configuration files
│   │   ├── database/            # Database setup and seeding
│   │   ├── types/               # TypeScript type definitions
│   │   └── test/                # Test files and setup
│   └── package.json
└── docs/                        # Documentation
```

## 🧪 Testing

Run the complete test suite:

```bash
# All tests
npm run test

# Frontend tests only
npm run test:frontend

# Backend tests only
npm run test:backend

# Test with coverage
npm run test:coverage
```

## � Code Quality

This project maintains high code quality standards:

```bash
# Linting
npm run lint

# Type checking
npm run type-check

# Code formatting
npm run format

# Format check
npm run format:check
```

## 📦 Building for Production

```bash
# Build both frontend and backend
npm run build

# Frontend only
npm run build:frontend

# Backend only
npm run build:backend
```

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions covering:

- Vercel (Frontend)
- Render/Railway (Backend)
- Supabase (Database)
- Environment configuration

## 🛠️ Technology Stack

### Frontend Technologies

- **React 19** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing
- **React Query** - Server state management
- **Vitest** - Fast unit testing framework

### Backend Technologies

- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **TypeScript** - Type-safe JavaScript development
- **Supabase** - Backend-as-a-Service with PostgreSQL
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing
- **Vitest** - Fast unit testing framework

### Development Tools

- **ESLint** - Code linting and quality
- **Prettier** - Code formatting
- **Husky** - Git hooks
- **Concurrently** - Run multiple commands

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

## � License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design inspiration from modern e-commerce platforms
- Product images provided by [Unsplash](https://unsplash.com)
- Icons by [Lucide React](https://lucide.dev)
- UI components based on [shadcn/ui](https://ui.shadcn.com)

## 📞 Support

For support, visit and contact me at (https://natede.dev) 
or create an issue on GitHub.

---

**Built with ❤️ by [Nate De Developer](https://github.com/natededev)**
