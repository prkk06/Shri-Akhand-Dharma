CREATE TABLE public.funders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  website_url TEXT,
  category TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT SELECT ON public.funders TO anon, authenticated;
GRANT ALL ON public.funders TO service_role;

ALTER TABLE public.funders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active funders"
  ON public.funders
  FOR SELECT
  TO anon, authenticated
  USING (is_active = true);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_funders_updated_at
  BEFORE UPDATE ON public.funders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();