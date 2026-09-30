REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role) FROM anon, public;
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;
ALTER TABLE public.funders ADD COLUMN logo_path text;
CREATE POLICY "Anyone can view funder logos" ON storage.objects FOR SELECT TO anon, authenticated USING (bucket_id = 'funder-logos');
CREATE POLICY "Admins upload funder logos" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'funder-logos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins update funder logos" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'funder-logos' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins delete funder logos" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'funder-logos' AND public.has_role(auth.uid(), 'admin'));