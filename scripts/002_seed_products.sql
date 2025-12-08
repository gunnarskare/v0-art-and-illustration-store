-- Seed initial products
INSERT INTO products (id, name, description, artist, category, image_url) VALUES
  ('11111111-1111-1111-1111-111111111111', 'Fjellheim', 'Minimalistisk fjelllandskap i duse toner. Et rolig motiv som passer perfekt i stuen eller soverommet.', 'Gunnar Skare', 'Landskap', '/minimalist-mountain-landscape-illustration-nordic-.jpg'),
  ('22222222-2222-2222-2222-222222222222', 'Villblomster', 'Botanisk illustrasjon av norske villblomster i akvarell. Hver blomst er malt med kjærlighet og presisjon.', 'Elisabeth Skare', 'Botanisk', '/wild-herbs-botanical-illustration-watercolor.jpg'),
  ('33333333-3333-3333-3333-333333333333', 'Vinterstille', 'Snødekt landskap med myke linjer og dempede farger. Fanger roen i en norsk vinterdag.', 'Gunnar Skare', 'Landskap', '/winter-landscape-minimalist-illustration-snow.jpg'),
  ('44444444-4444-4444-4444-444444444444', 'Sommereng', 'Fargerik illustrasjon av en blomstrende sommereng. Bringer sommerens varme inn i hjemmet.', 'Elisabeth Skare', 'Botanisk', '/summer-meadow-flowers-watercolor-illustration.jpg'),
  ('55555555-5555-5555-5555-555555555555', 'Kystlinje', 'Norsk kystlandskap med hav og fjell i harmoniske farger.', 'Gunnar Skare', 'Landskap', '/minimalist-mountain-landscape-illustration-nordic-.jpg'),
  ('66666666-6666-6666-6666-666666666666', 'Urtesamling', 'Klassisk botanisk illustrasjon av norske urter og krydder.', 'Elisabeth Skare', 'Botanisk', '/wild-herbs-botanical-illustration-watercolor.jpg');

-- Insert sizes for each product
INSERT INTO product_sizes (product_id, size, label, price_in_ore) VALUES
  -- Fjellheim
  ('11111111-1111-1111-1111-111111111111', 'small', '21x30 cm', 89000),
  ('11111111-1111-1111-1111-111111111111', 'medium', '30x40 cm', 129000),
  ('11111111-1111-1111-1111-111111111111', 'large', '50x70 cm', 189000),
  -- Villblomster
  ('22222222-2222-2222-2222-222222222222', 'small', '21x30 cm', 79000),
  ('22222222-2222-2222-2222-222222222222', 'medium', '30x40 cm', 119000),
  ('22222222-2222-2222-2222-222222222222', 'large', '50x70 cm', 169000),
  -- Vinterstille
  ('33333333-3333-3333-3333-333333333333', 'small', '21x30 cm', 89000),
  ('33333333-3333-3333-3333-333333333333', 'medium', '30x40 cm', 129000),
  ('33333333-3333-3333-3333-333333333333', 'large', '50x70 cm', 189000),
  -- Sommereng
  ('44444444-4444-4444-4444-444444444444', 'small', '21x30 cm', 79000),
  ('44444444-4444-4444-4444-444444444444', 'medium', '30x40 cm', 119000),
  ('44444444-4444-4444-4444-444444444444', 'large', '50x70 cm', 169000),
  -- Kystlinje
  ('55555555-5555-5555-5555-555555555555', 'small', '21x30 cm', 89000),
  ('55555555-5555-5555-5555-555555555555', 'medium', '30x40 cm', 129000),
  ('55555555-5555-5555-5555-555555555555', 'large', '50x70 cm', 189000),
  -- Urtesamling
  ('66666666-6666-6666-6666-666666666666', 'small', '21x30 cm', 79000),
  ('66666666-6666-6666-6666-666666666666', 'medium', '30x40 cm', 119000),
  ('66666666-6666-6666-6666-666666666666', 'large', '50x70 cm', 169000);
