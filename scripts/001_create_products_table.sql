-- Create products table for Fra Skare art store
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  artist TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create product_sizes table for different size options
CREATE TABLE IF NOT EXISTS product_sizes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  size TEXT NOT NULL,
  label TEXT NOT NULL,
  price_in_ore INTEGER NOT NULL,
  UNIQUE(product_id, size)
);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

-- Public can read all products
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);
CREATE POLICY "Anyone can view product sizes" ON product_sizes FOR SELECT USING (true);

-- Only authenticated admins can modify products (we'll check is_admin in metadata)
CREATE POLICY "Admins can insert products" ON products FOR INSERT 
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update products" ON products FOR UPDATE 
  USING (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can delete products" ON products FOR DELETE 
  USING (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can insert product sizes" ON product_sizes FOR INSERT 
  WITH CHECK (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can update product sizes" ON product_sizes FOR UPDATE 
  USING (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

CREATE POLICY "Admins can delete product sizes" ON product_sizes FOR DELETE 
  USING (
    auth.uid() IS NOT NULL AND 
    (SELECT (raw_user_meta_data->>'is_admin')::boolean FROM auth.users WHERE id = auth.uid())
  );

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_products_artist ON products(artist);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_product_sizes_product_id ON product_sizes(product_id);
