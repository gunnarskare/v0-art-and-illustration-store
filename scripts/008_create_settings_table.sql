-- Opprett settings-tabell for butikkinnstillinger
CREATE TABLE IF NOT EXISTS settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  description text,
  updated_at timestamp with time zone DEFAULT now()
);

-- Legg til default fraktinnstillinger
INSERT INTO settings (key, value, description)
VALUES 
  ('shipping', '{"cost": 79, "free_shipping_threshold": 1000, "delivery_time": "3-5 virkedager"}'::jsonb, 'Fraktinnstillinger')
ON CONFLICT (key) DO NOTHING;

-- Deaktiver RLS for enkel tilgang
ALTER TABLE settings DISABLE ROW LEVEL SECURITY;
