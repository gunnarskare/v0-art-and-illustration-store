-- Opprett orders-tabell for å lagre bestillinger
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  
  -- Stripe info
  stripe_session_id text UNIQUE NOT NULL,
  stripe_payment_intent_id text,
  
  -- Kunde info
  customer_email text NOT NULL,
  customer_name text,
  
  -- Leveringsadresse
  shipping_name text NOT NULL,
  shipping_address_line1 text NOT NULL,
  shipping_address_line2 text,
  shipping_postal_code text NOT NULL,
  shipping_city text NOT NULL,
  shipping_country text NOT NULL,
  
  -- Ordre info
  total_amount integer NOT NULL, -- i øre
  shipping_cost integer NOT NULL, -- i øre
  currency text DEFAULT 'nok',
  status text DEFAULT 'paid', -- paid, processing, shipped, delivered
  
  -- Produkter (JSON array)
  items jsonb NOT NULL,
  
  -- Notater
  notes text,
  tracking_number text,
  shipped_at timestamptz,
  delivered_at timestamptz
);

-- Index for rask søk
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS orders_stripe_session_idx ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS orders_customer_email_idx ON orders(customer_email);
CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);

-- Deaktiver RLS (admin-only access)
ALTER TABLE orders DISABLE ROW LEVEL SECURITY;
