-- Opprett blog_posts tabell
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  author text NOT NULL,
  category text NOT NULL,
  image_url text,
  featured boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Indekser for raskere søk
CREATE INDEX IF NOT EXISTS blog_posts_featured_idx ON blog_posts(featured);
CREATE INDEX IF NOT EXISTS blog_posts_category_idx ON blog_posts(category);
