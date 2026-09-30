import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

export type Funder = {
  id: string;
  name: string;
  description: string | null;
  websiteUrl: string | null;
  category: string | null;
};

export const getFunders = createServerFn({ method: "GET" }).handler(async (): Promise<Funder[]> => {
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!; // read inside the handler
  const supabasePublic = createClient<Database>(process.env["SUPABASE_URL"]!, key, {
    auth: { persistSession: false },
    // Opaque sb_ keys aren't JWTs; send only apikey, not the default Authorization bearer.
    global: {
      fetch: (input, init) => {
        const h = new Headers(init?.headers);
        if (key.startsWith("sb_") && h.get("Authorization") === `Bearer ${key}`) h.delete("Authorization");
        h.set("apikey", key);
        return fetch(input, { ...init, headers: h });
      },
    },
  });

  const { data, error } = await supabasePublic
    .from("funders")
    .select("id, name, description, website_url, category")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw new Error(error.message);

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    websiteUrl: row.website_url,
    category: row.category,
  }));
});
