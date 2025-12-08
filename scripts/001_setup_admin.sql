-- Opprett admin_users tabell for å spore hvem som er admin
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Aktiver RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Kun admins kan se admin-tabellen
CREATE POLICY "Admins can view admin_users" ON admin_users
  FOR SELECT USING (auth.uid() IN (SELECT id FROM admin_users));

-- Legg til din bruker som admin (bytt ut e-posten)
INSERT INTO admin_users (id, email)
SELECT id, email FROM auth.users WHERE email = 'gunkaa@live.no'
ON CONFLICT (id) DO NOTHING;

-- Aktiver RLS på products og product_sizes
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes ENABLE ROW LEVEL SECURITY;

-- Policies for products
DROP POLICY IF EXISTS "Anyone can view products" ON products;
CREATE POLICY "Anyone can view products" ON products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert products" ON products;
CREATE POLICY "Admins can insert products" ON products FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can update products" ON products;
CREATE POLICY "Admins can update products" ON products FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can delete products" ON products;
CREATE POLICY "Admins can delete products" ON products FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Policies for product_sizes
DROP POLICY IF EXISTS "Anyone can view product sizes" ON product_sizes;
CREATE POLICY "Anyone can view product sizes" ON product_sizes FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert product sizes" ON product_sizes;
CREATE POLICY "Admins can insert product sizes" ON product_sizes FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can update product sizes" ON product_sizes;
CREATE POLICY "Admins can update product sizes" ON product_sizes FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

DROP POLICY IF EXISTS "Admins can delete product sizes" ON product_sizes;
CREATE POLICY "Admins can delete product sizes" ON product_sizes FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM admin_users));
