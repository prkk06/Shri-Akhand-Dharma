-- Ensure no read/update/delete access for public roles on contact_submissions
REVOKE SELECT, UPDATE, DELETE ON public.contact_submissions FROM anon;
REVOKE SELECT, UPDATE, DELETE ON public.contact_submissions FROM authenticated;
REVOKE SELECT, UPDATE, DELETE ON public.contact_submissions FROM PUBLIC;

-- Keep INSERT for submission form
GRANT INSERT ON public.contact_submissions TO anon, authenticated;

-- Service role retains full access for backend
GRANT ALL ON public.contact_submissions TO service_role;