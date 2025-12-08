-- Opprett storage bucket for produktbilder
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Tillat alle å se bilder (offentlig tilgang)
CREATE POLICY "Alle kan se produktbilder"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Tillat autentiserte brukere å laste opp bilder
CREATE POLICY "Autentiserte brukere kan laste opp"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Tillat autentiserte brukere å oppdatere egne bilder
CREATE POLICY "Autentiserte brukere kan oppdatere"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images');

-- Tillat autentiserte brukere å slette bilder
CREATE POLICY "Autentiserte brukere kan slette"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');
