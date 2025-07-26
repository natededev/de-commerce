# 🚀 Quick Development Guide

## 📋 Essential Commands

### First Time Setup
# Development Guide

This guide explains how to set up a local development environment for DE-Commerce, reflecting the latest modular structure and onboarding improvements.

---

## Prerequisites

- Node.js 18+
- npm 9+
- Supabase account (for database & auth)

---

## 1. Clone the repo

```bash
git clone https://github.com/natede/de-commerce.git
cd de-commerce
```

---

## 2. Install dependencies & setup environment

**Windows:**
```bash
./setup.bat
```
This will install all dependencies and create `.env` files if missing.

**Mac/Linux:**
```bash
npm install
# Copy .env.example to .env in backend and frontend, then fill in values
```

---

## 3. Environment variables

- `backend/.env` — Supabase and server config (Stripe keys are present for future use, but Stripe is not currently integrated)
- `frontend/.env` — (auto-created by setup)

---

## 4. Start dev servers

```bash
cd backend && npm run dev
# In a new terminal:
cd frontend && npm run dev
```

---

## 5. Seeding demo data (optional)

See [SEEDING_GUIDE.md](SEEDING_GUIDE.md) for instructions on seeding demo users, products, and orders.

---

## 6. Running tests

```bash
npm run test                 # All tests
npm run test:frontend        # Frontend only
npm run test:backend         # Backend only
npm run test:coverage        # With coverage
```

---

## 7. Linting, formatting, and type-checking

```bash
npm run lint
npm run format
npm run type-check
```

---

## 8. Troubleshooting

### Port Already in Use
```bash
# Kill processes on ports 3000 or 5173
npx kill-port 3000
npx kill-port 5173
```

### Environment Issues
```bash
# Make sure backend/.env exists with correct values
# Frontend .env is auto-created during setup
```

### Database Connection Issues
```bash
# Verify Supabase credentials in backend/.env
# Check if Supabase project is active
# Test connection: npm run health
```

### TypeScript Errors
```bash
# Clear cache and rebuild
npm run clean
npm run build
```

---

## 9. Useful scripts

- `setup.bat` — Windows onboarding (installs deps, creates .env, prints next steps)
- `scripts/seed-demo-users.js` — Seed demo users/products
- `scripts/setup-database.js` — Initialize/reset database

---

## 10. Resources

- [README.md](README.md)
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [SEEDING_GUIDE.md](SEEDING_GUIDE.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)

### Database Connection Issues
```bash
# Verify Supabase credentials in backend/.env
# Check if Supabase project is active
# Test connection: npm run health
```

### TypeScript Errors
```bash
# Clear cache and rebuild
npm run clean
npm run build
```

## 🎯 Development Workflow

1. **Feature Development**:
   - Create feature branch
   - Run `npm run dev` 
   - Develop with hot reload
   - Test with `npm run test`

2. **Code Quality**:
   - Format: `npm run format`
   - Lint: `npm run lint:fix`
   - Type check: `npm run type-check`

3. **Testing**:
   - Unit tests: `npm run test`
   - Watch mode: `npm run test:watch`
   - Build test: `npm run build`

4. **Deployment**:
   - Ensure all tests pass
   - Build production: `npm run build`
   - Deploy frontend and backend separately

## 📞 Getting Help

- Check the main [README.md](README.md) for detailed setup
- Review [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) for architecture
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guidance
