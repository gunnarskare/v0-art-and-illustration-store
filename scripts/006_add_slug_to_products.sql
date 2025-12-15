-- Legg til slug-kolonne til products-tabellen
ALTER TABLE products ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Fjernet UUID fra slug-genereringen, slugs blir nå kun basert på produktnavn
-- Generer slugs for eksisterende produkter basert på navn
UPDATE products 
SET slug = LOWER(REGEXP_REPLACE(
  REGEXP_REPLACE(name, '[^a-zA-Z0-9æøåÆØÅ\s-]', '', 'g'),
  '\s+', '-', 'g'
))
WHERE slug IS NULL;

-- Lag indeks for raskere oppslag
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
