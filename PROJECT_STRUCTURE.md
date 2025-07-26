# 🏗️ De-Commerce Project Structure

A modern full-stack e-commerce application built with React, Node.js, TypeScript, and Supabase.

## 📁 Project Overview

```
de-commerce/
├── 📋 Configuration Files
│   ├── .env.example          # Environment variables template
│   ├── .gitignore           # Git ignore patterns
│   ├── .prettierrc          # Code formatting rules
│   ├── .prettierignore      # Prettier ignore patterns
│   ├── package.json         # Root package.json (workspaces)
│   └── tsconfig.base.json   # Base TypeScript configuration
│
├── 📖 Documentation
│   ├── README.md            # Main project documentation
│   ├── CONTRIBUTING.md      # Contribution guidelines
│   ├── DEPLOYMENT.md        # Deployment instructions
│   ├── SEEDING_GUIDE.md     # Database seeding guide
│   └── PROJECT_STRUCTURE.md # This file
│
├── 🎨 Frontend (React + Vite + TypeScript)
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   ├── types/          # TypeScript type definitions
│   │   └── test/           # Frontend tests
│   ├── public/             # Static assets
# Project Structure

This document explains the folder and file structure of the DE-Commerce project, reflecting the latest modularization and onboarding improvements.

## Root

```
.
├── backend/      # Node.js/Express API (modular, TypeScript)
├── frontend/     # React 18 + Vite app (modular, TypeScript)
├── setup.bat     # Windows onboarding script (installs deps, creates .env, prints next steps)
├── *.md          # Documentation
├── package.json  # Root scripts (optional)
```

## Backend

```
backend/
├── src/
│   ├── config/         # Database & environment config
│   ├── database/       # SQL schema, seed, and reset scripts
│   ├── middleware/     # Express middleware (auth, error, JWT)
│   ├── routes/         # API route handlers (auth, cart, products, [stripe: stub only])
│   ├── services/       # Modular business logic (auth, cart, product, [stripe: stub only])
│   │   └── cart/       # Cart logic split into submodules
│   ├── test/           # Vitest tests and setup
│   ├── types/          # Centralized TypeScript types
│   └── utils/          # Database helpers and shared utilities
├── scripts/            # Setup/seed scripts (JS, not TypeScript)
├── package.json        # Backend scripts/deps
├── tsconfig.json       # TypeScript config (excludes scripts/)
```

### Key Backend Folders

- `config/` — Supabase and environment config
- `database/` — SQL schema and seed scripts
- `middleware/` — Auth, error handling, JWT
- `routes/` — Express route handlers (auth, cart, products, [stripe: stub only])
- `services/` — Modular business logic (auth, cart, product, [stripe: stub only])
  - `cart/` — Cart logic split into operations and validation modules
- `test/` — Vitest tests and setup
- `types/` — Centralized TypeScript types
- `utils/` — Database helpers and shared utilities

### Scripts

- `scripts/seed-demo-users.js` — Seed demo users/products
- `scripts/setup-database.js` — Initialize/reset database

## Frontend

```
frontend/
├── src/
│   ├── components/     # UI components (modular, by domain)
│   ├── config/         # Site config
│   ├── contexts/       # React Context providers (auth, cart)
│   ├── features/       # Feature modules (auth, cart, products)
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities (API, cart, currency, etc.)
│   ├── pages/          # Page components (route-based)
│   ├── test/           # Frontend tests (Vitest)
│   ├── types/          # TypeScript types
│   └── ...
├── public/             # Static assets
├── package.json        # Frontend scripts/deps
├── vite.config.ts      # Vite config
├── tailwind.config.ts  # Tailwind config
├── tsconfig.json       # TypeScript config
```

### Key Frontend Folders

- `components/` — Reusable UI components (modular, by domain)
- `features/` — Feature-specific logic (auth, cart, products)
- `contexts/` — React Context providers (auth, cart)
- `lib/` — API handlers, cart logic, currency utils, etc.
- `pages/` — Route-based page components
- `test/` — Vitest tests and setup
- `types/` — Centralized TypeScript types

## Environment Files

- `backend/.env` — Supabase, Stripe, and server config (created by setup or manually)
- `frontend/.env` — (auto-created by setup)

## Scripts

- `setup.bat` — Windows onboarding (installs deps, creates .env, prints next steps)
- See [SEEDING_GUIDE.md](SEEDING_GUIDE.md) for demo data seeding

## See Also

- [README.md](README.md) — Project overview
- [DEVELOPMENT.md](DEVELOPMENT.md) — Local dev workflow
- [DEPLOYMENT.md](DEPLOYMENT.md) — Production deployment
- [CONTRIBUTING.md](CONTRIBUTING.md) — Code style, PRs, and community

## 🏛️ Technology Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI component library
- **React Router** - Client-side routing
- **Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Supabase** - Database and authentication
- **JWT** - Authentication tokens
- **Vitest** - Testing framework

### Database
- **PostgreSQL** (via Supabase)
- **Row Level Security** - Data protection
- **Real-time subscriptions** - Live updates

## �️ Architecture Principles

1. **Type Safety** - Full TypeScript coverage
2. **Separation of Concerns** - Clear separation between layers
3. **Reusability** - Modular, reusable components
4. **Security** - RLS policies and proper authentication
5. **Performance** - Optimized builds and lazy loading
6. **Testing** - Comprehensive test coverage
7. **Documentation** - Well-documented code and APIs
