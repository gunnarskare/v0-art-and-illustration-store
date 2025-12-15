-- Fjern alle eksisterende slugs og generer nye uten UUID
UPDATE products 
SET slug = LOWER(REGEXP_REPLACE(
  REGEXP_REPLACE(name, '[^a-zA-Z0-9æøåÆØÅ\s-]', '', 'g'),
  '\s+', '-', 'g'
));

-- Håndter duplikater ved å legge til nummer
WITH numbered_products AS (
  SELECT 
    id,
    slug,
    ROW_NUMBER() OVER (PARTITION BY slug ORDER BY created_at) as rn
  FROM products
)
UPDATE products
SET slug = CASE 
  WHEN np.rn > 1 THEN products.slug || '-' || np.rn
  ELSE products.slug
END
FROM numbered_products np
WHERE products.id = np.id;
