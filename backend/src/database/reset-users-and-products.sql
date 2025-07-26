-- Reset Users and Replace 3 Products Script
-- This will clear all users and replace 3 existing products with new tech products under $50

-- Temporarily disable RLS for cleanup
ALTER TABLE users DISABLE ROW LEVEL SECURITY;
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE carts DISABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items DISABLE ROW LEVEL SECURITY;
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
ALTER TABLE order_items DISABLE ROW LEVEL SECURITY;

-- Clear users and related cart data
DELETE FROM cart_items;
DELETE FROM carts;
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM users; -- Clear all users (including those with double-hashed passwords)

-- Remove 3 specific products (choosing higher-priced ones to replace)
DELETE FROM products WHERE name IN (
    'Retro Gaming Console',        -- $159.99 - expensive console
    'Wireless Earbuds Pro',       -- $249.99 - expensive earbuds
    'Professional DSLR Camera'    -- $1299.99 - very expensive camera
);

-- Insert 3 new tech products under $50
INSERT INTO products (name, description, price, image, category, in_stock, stock_count, rating, review_count) VALUES
(
    'USB-C to Lightning Cable',
    'High-speed 6ft USB-C to Lightning cable with MFi certification. Fast charging and data sync compatible with iPhone 12 and newer models.',
    29.99,
    'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&h=500&fit=crop&auto=format',
    'Electronics',
    true,
    500,
    4.6,
    1240
),
(
    'Bluetooth Wireless Earbuds',
    'True wireless earbuds with 6-hour battery life, IPX4 water resistance, and crystal clear sound quality. Comes with charging case.',
    39.99,
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500&h=500&fit=crop&auto=format',
    'Electronics',
    true,
    300,
    4.4,
    890
),
(
    'Wireless Phone Charger Pad',
    '15W fast wireless charging pad compatible with iPhone and Android. Sleek design with LED indicator and foreign object detection.',
    24.99,
    'https://images.unsplash.com/photo-1609592047672-0aa9ed57ad5b?w=500&h=500&fit=crop&auto=format',
    'Electronics',
    true,
    200,
    4.5,
    650
);

-- Re-enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE carts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Show results
SELECT 'Users cleared - ready for new registrations' as status;
SELECT 'Removed 3 expensive products and added 3 new tech products under $50' as status;
SELECT COUNT(*) as total_products FROM products;
SELECT name, price FROM products ORDER BY price ASC;
