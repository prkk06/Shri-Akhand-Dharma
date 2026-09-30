import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

type Ctx = { supabase: any; userId: string };

async function assertAdmin({ supabase, userId }: Ctx) {
  const { data } = await supabase.rpc("has_role", { _user_id: userId, _role: "admin" });
  if (!data) throw new Error("You are not authorised to manage funders.");
}

export const claimAdmin = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("claim_admin_role");
    if (error) throw new Error(error.message);
    return { isAdmin: !!data };
  });

export type AdminFunder = {
  id: string;
  name: string;
  description: string | null;
  website_url: string | null;
  category: string | null;
  sort_order: number;
  is_active: boolean;
  logo_path: string | null;
  logo_url: string | null;
};

export const listAllFunders = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminFunder[]> => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("funders")
      .select("id, name, description, website_url, category, sort_order, is_active, logo_path")
      .order("sort_order")
      .order("name");
    if (error) throw new Error(error.message);
    const rows = data ?? [];
    const paths = rows.map((r) => r.logo_path).filter((p): p is string => !!p);
    const urls = new Map<string, string>();
    if (paths.length) {
      const { data: signed } = await context.supabase.storage.from("funder-logos").createSignedUrls(paths, 3600);
      signed?.forEach((s) => s.path && s.signedUrl && urls.set(s.path, s.signedUrl));
    }
    return rows.map((r) => ({ ...r, logo_url: r.logo_path ? (urls.get(r.logo_path) ?? null) : null }));
  });

const funderSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(1).max(200),
  description: z.string().trim().max(2000).nullable(),
  website_url: z.string().trim().url().max(500).nullable(),
  category: z.string().trim().max(100).nullable(),
  sort_order: z.number().int().min(0).max(10000),
  is_active: z.boolean(),
  logo_path: z.string().max(300).nullable(),
});

export const saveFunder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => funderSchema.parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { id, ...fields } = data;
    const q = id
      ? context.supabase.from("funders").update(fields).eq("id", id)
      : context.supabase.from("funders").insert(fields);
    const { error } = await q;
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteFunder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ id: z.string().uuid() }).parse(d))
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const { data: row } = await context.supabase.from("funders").select("logo_path").eq("id", data.id).maybeSingle();
    const { error } = await context.supabase.from("funders").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    if (row?.logo_path) await context.supabase.storage.from("funder-logos").remove([row.logo_path]);
    return { ok: true };
  });

export const draftFunderProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({ name: z.string().trim().min(1).max(200), notes: z.string().trim().max(4000) }).parse(d),
  )
  .handler(async ({ data, context }) => {
    await assertAdmin(context);
    const apiKey = process.env["LOVABLE_API_KEY"];
    if (!apiKey) throw new Error("AI drafting is not configured.");

    const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Lovable-API-Key": apiKey,
        Authorization: `Bearer ${apiKey}`,
        "X-Lovable-AIG-SDK": "fetch",
      },
      body: JSON.stringify({
        model: "openai/gpt-6-astra",
        stream: true,
        store: false,
        reasoning: { effort: "low" },
        instructions:
          "You write funder profiles for the Shri Akhand Dharma Foundation, an Indian charitable foundation. Write one concise, warm, polished paragraph (60-90 words) in British English acknowledging the funder, based only on the facts provided. Do not invent facts, figures or dates. Return only the paragraph text.",
        input: `Funder name: ${data.name}\nNotes: ${data.notes || "(none)"}`,
      }),
    });

    if (!res.ok || !res.body) {
      if (res.status === 402) throw new Error("AI credits have run out. Please top up to keep drafting.");
      if (res.status === 429) throw new Error("The AI is busy right now. Please try again in a minute.");
      if (res.status === 403) throw new Error("AI drafting is not available for this workspace.");
      console.error("AI gateway error", res.status, await res.text().catch(() => ""));
      throw new Error("Could not draft a profile. Please try again.");
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buf = "";
    let text = "";
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      buf += decoder.decode(value, { stream: true });
      const frames = buf.split("\n\n");
      buf = frames.pop() ?? "";
      for (const f of frames) {
        const line = f.split("\n").find((l) => l.startsWith("data:"));
        if (!line) continue;
        const payload = line.slice(5).trim();
        if (payload === "[DONE]") continue;
        try {
          const ev = JSON.parse(payload);
          if (ev.type === "response.output_text.delta") text += ev.delta;
          if (ev.type === "error" || ev.type === "response.failed") throw new Error("Could not draft a profile.");
        } catch (e) {
          if (e instanceof Error && e.message.startsWith("Could not")) throw e;
        }
      }
    }
    if (!text.trim()) throw new Error("The AI returned no text. Please add more notes and try again.");
    return { draft: text.trim() };
  });
