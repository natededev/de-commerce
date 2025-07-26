
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
INSERT INTO products (name, description, price, image, category, in_stock, stock_count, rating, review_count) VALUES
(
    'Smart LED Light Bulb',
    'WiFi-enabled multicolor smart LED bulb. Works with Alexa and Google Assistant. Adjustable brightness, energy efficient, and app-controlled scheduling.',
    19.99,
    'https://images.unsplash.com/photo-1605419589330-0b6dede4c265?w=500&h=500&fit=crop&auto=format',
    'Electronics',
    true,
    400,
    4.7,
    320
);
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
