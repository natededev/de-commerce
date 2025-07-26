# Deployment Guide
# Deployment Guide

This guide explains how to deploy DE-Commerce to production, reflecting the latest modular structure and onboarding improvements.

---

## Prerequisites

- Supabase project (database & auth)
- Vercel (frontend hosting)
- Railway (backend hosting)

---

## 1. Prepare environment variables

- `backend/.env` — Supabase and server config (Stripe keys are present for future use, but Stripe is not currently integrated)
- `frontend/.env` — (auto-created by setup, but review for production)

---

## 2. Build frontend and backend

```bash
cd frontend && npm run build
cd ../backend && npm run build
```

---

## 3. Deploy backend

- Deploy `backend` to Railway or your preferred Node.js host
- Set environment variables in Railway dashboard
- Ensure database connection works

---

## 4. Deploy frontend

- Deploy `frontend` to Vercel or your preferred static host
- Set environment variables in Vercel dashboard

---

## 5. Post-deployment checks

- Test API endpoints: `/api/products`, `/api/cart`, `/api/auth`
- Test frontend: login, cart, checkout
- Check logs for errors

---

## 6. Production best practices

- Use strong secrets in `.env`
- Enable email confirmation in Supabase
- Remove demo users and data
- Enable monitoring and error tracking
- Set up database backups

---

## 7. Resources

- [README.md](README.md)
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [SEEDING_GUIDE.md](SEEDING_GUIDE.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
