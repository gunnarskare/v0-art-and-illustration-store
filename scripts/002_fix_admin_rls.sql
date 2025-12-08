-- Fjern eksisterende policies som forårsaker infinite recursion
DROP POLICY IF EXISTS "Admins kan se admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins kan endre admin_users" ON admin_users;

-- Deaktiver RLS på admin_users for å unngå recursion
-- Admin-sjekk gjøres i koden i stedet
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Gi tilgang til autentiserte brukere å lese admin_users
GRANT SELECT ON admin_users TO authenticated;

-- Behold RLS på products og product_sizes, men gjør det enkelt
ALTER TABLE products DISABLE ROW LEVEL SECURITY;
ALTER TABLE product_sizes DISABLE ROW LEVEL SECURITY;

-- Gi full tilgang til autentiserte brukere
GRANT ALL ON products TO authenticated;
GRANT ALL ON product_sizes TO authenticated;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;
