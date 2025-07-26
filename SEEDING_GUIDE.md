# Database Setup Guide

This guide explains how to set up the database and create demo data for testing and development.

## Prerequisites

- Supabase project with PostgreSQL database
- Environment variables configured in `backend/.env` and `frontend/.env`
- Node.js and npm installed

## Step 1: Database Schema Setup

The application requires specific database tables and functions. You need to apply the schema to your Supabase database.

### Option A: Via Supabase Dashboard (Recommended)

1. Open your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to your project
# Seeding Guide

This guide explains how to seed demo data (users, products, cart, orders) for DE-Commerce, reflecting the latest modular structure and onboarding improvements.

---

## Prerequisites

- Supabase project (database & auth)
- Backend `.env` configured (created by setup or manually)

---

## 1. Run the SQL seed script

1. Go to your Supabase Dashboard
2. Open the SQL Editor
3. Copy contents of `backend/src/database/supabase-seed.sql`
4. Paste and run in SQL Editor

---

## 2. Verify data insertion

- 2 demo users (admin, user)
- 10 products
- 1 active cart with 2 items
- 1 demo order (delivered)

---

## 3. Demo credentials

- Admin: `admin@example.com` / `demo123`
- User: `user@example.com` / `demo123`

---

## 4. Notes

- Images use Unsplash photos
- Some products are out of stock
- Demo user has a pre-populated cart
- Demo user has one completed order

---

## 5. After seeding

1. Start backend: `npm run dev` (in backend)
2. Start frontend: `npm run dev` (in frontend)
3. Test login and cart

---

## 6. Troubleshooting

- RLS blocking inserts: script disables RLS during seeding
- Permission errors: run SQL in Supabase Dashboard
- Verification: script shows record counts at end

---

## 7. Production notes

- Remove demo users/data for production
- Enable email confirmation
- Set strong secrets in `.env`

---

## 8. Resources

- [README.md](README.md)
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)
- [DEVELOPMENT.md](DEVELOPMENT.md)
- [DEPLOYMENT.md](DEPLOYMENT.md)
- [CONTRIBUTING.md](CONTRIBUTING.md)
- `products` - Product catalog
- `carts` - User shopping carts
- `cart_items` - Items in each cart
- `orders` - Completed orders
- `order_items` - Items in each order

Key features:
- Row Level Security (RLS) enabled
- PostgreSQL functions for cart management
- Automatic cart creation per user
- Order history tracking

## Troubleshooting

### Cart Errors (500 Internal Server Error)
- Ensure database schema is applied
- Check that `get_or_create_active_cart` function exists
- Verify user authentication tokens are valid

### Authentication Issues
- Check Supabase URL and API keys in environment files
- Ensure JWT verification is working
- Verify user accounts exist in Supabase Auth

### Database Connection Issues
- Verify Supabase project is active
- Check service role key permissions
- Ensure RLS policies are correctly configured

## Demo Data Summary

After setup, you'll have:
- **2 Demo Users** (admin and regular user)
- **Pre-configured Authentication** (no email confirmation needed for demos)
- **Clean Database Structure** ready for testing
- **Working Cart and Order System**

## Production Considerations

When deploying to production:
1. Remove or secure demo credentials
2. Configure proper email confirmation flow
3. Set up proper environment variables
4. Enable monitoring and error tracking
5. Configure database backups

**Go to your Supabase Dashboard:**
1. Visit: https://supabase.com/dashboard/projects
2. Select your project: `gprxedmaiuwppyyhokrk`
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Copy the entire contents of: `backend/src/database/supabase-seed.sql`
6. Paste it into the SQL editor
7. Click **"Run"** button

### 2. Verify Data Insertion

After running the script, you should see:
- ✅ **2 Users** (Admin + Demo User)
- ✅ **10 Products** (Electronics, Gaming, etc.)
- ✅ **1 Active Cart** with 2 items
- ✅ **1 Demo Order** (delivered status)

### 3. Updated Demo Credentials

The frontend login page now shows:
- **Admin:** `admin@example.com` / `demo123`
- **User:** `user@example.com` / `demo123`

**Important:** These are display credentials only. For actual authentication, you'll need to:
- Set up Supabase Auth users
- Or implement proper password authentication
- Or use magic links/social auth

## 📊 Database Contents After Seeding:

### Users:
- `admin@example.com` (ADMIN role)
- `user@example.com` (USER role)

### Products (10 items):
- Wireless Bluetooth Headphones ($199.99)
- Smart Fitness Watch ($149.99)
- Ultra HD 4K Monitor ($399.99)
- Professional DSLR Camera ($1299.99) *Out of Stock*
- Gaming Mechanical Keyboard ($129.99)
- Wireless Gaming Mouse ($89.99)
- Premium Office Chair ($299.99)
- Smart Home Security Camera ($79.99) *Out of Stock*
- Portable SSD 1TB ($159.99)
- Premium Noise-Canceling Earbuds ($149.99)

### Demo Cart:
- 1x Wireless Bluetooth Headphones
- 2x Smart Fitness Watch

## 🔧 If You Encounter Issues:

### RLS Blocking Inserts:
The script handles this by temporarily disabling RLS during seeding.

### Permission Errors:
Make sure you're running the SQL in the Supabase Dashboard SQL Editor, not via API.

### Verification:
The script includes a verification query at the end that shows count of records in each table.

## 🚀 Ready to Test:

After seeding:
1. **Start your backend:** `npm run dev` (in backend folder)
2. **Start your frontend:** `npm run dev` (in frontend folder) 
3. **Visit:** http://localhost:5173 (or your frontend URL)
4. **Test login** with the demo credentials
5. **Browse products** and test cart functionality

## 📝 Notes:

- **Images:** All product images use high-quality Unsplash photos
- **Stock:** Some products are marked as "Out of Stock" for testing
- **Cart:** Demo user has a pre-populated cart
- **Order:** Demo user has one completed order
- **Authentication:** You'll need to implement proper Supabase Auth for production

Let me know once you've run the SQL script and I'll help you test everything!
