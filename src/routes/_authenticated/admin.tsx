import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Pencil, Plus, Sparkles, Trash2 } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  claimAdmin, deleteFunder, draftFunderProfile, listAllFunders, saveFunder, type AdminFunder,
} from "@/lib/admin-funders.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Shri Akhand Dharma Foundation" },
      { name: "description", content: "Manage funder listings." },
      { property: "og:title", content: "Admin — Shri Akhand Dharma Foundation" },
      { property: "og:description", content: "Staff area for managing funder listings." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminPage,
});

type Form = {
  id?: string; name: string; notes: string; description: string; website_url: string;
  category: string; sort_order: number; is_active: boolean; logo_path: string | null; logo_url: string | null;
};
const empty: Form = { name: "", notes: "", description: "", website_url: "", category: "", sort_order: 0, is_active: true, logo_path: null, logo_url: null };

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const claim = useServerFn(claimAdmin);
  const list = useServerFn(listAllFunders);
  const save = useServerFn(saveFunder);
  const remove = useServerFn(deleteFunder);
  const draft = useServerFn(draftFunderProfile);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => claim() });
  const fundersQ = useQuery({ queryKey: ["admin-funders"], queryFn: () => list(), enabled: adminQ.data?.isAdmin === true });

  const [form, setForm] = useState<Form | null>(null);
  const [busy, setBusy] = useState(false);
  const [drafting, setDrafting] = useState(false);

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  function edit(f: AdminFunder) {
    setForm({ id: f.id, name: f.name, notes: "", description: f.description ?? "", website_url: f.website_url ?? "",
      category: f.category ?? "", sort_order: f.sort_order, is_active: f.is_active, logo_path: f.logo_path, logo_url: f.logo_url });
  }

  async function uploadLogo(file: File) {
    if (!form) return;
    if (!file.type.startsWith("image/")) return toast.error("Please choose an image file.");
    if (file.size > 2 * 1024 * 1024) return toast.error("Logo must be under 2 MB.");
    const ext = file.name.split(".").pop()?.toLowerCase() || "png";
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("funder-logos").upload(path, file, { contentType: file.type });
    if (error) return toast.error(error.message);
    setForm({ ...form, logo_path: path, logo_url: URL.createObjectURL(file) });
  }

  async function runDraft() {
    if (!form?.name.trim()) return toast.error("Enter the funder's name first.");
    setDrafting(true);
    try {
      const r = await draft({ data: { name: form.name, notes: form.notes } });
      setForm((f) => (f ? { ...f, description: r.draft } : f));
      toast.success("Draft ready — review and edit before saving.");
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not draft profile");
    } finally {
      setDrafting(false);
    }
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!form) return;
    setBusy(true);
    try {
      await save({ data: {
        id: form.id, name: form.name, description: form.description.trim() || null,
        website_url: form.website_url.trim() || null, category: form.category.trim() || null,
        sort_order: Number(form.sort_order) || 0, is_active: form.is_active, logo_path: form.logo_path,
      } });
      toast.success("Funder saved");
      setForm(null);
      qc.invalidateQueries({ queryKey: ["admin-funders"] });
      qc.invalidateQueries({ queryKey: ["funders"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not save");
    } finally {
      setBusy(false);
    }
  }

  async function del(f: AdminFunder) {
    if (!confirm(`Remove ${f.name}? This cannot be undone.`)) return;
    try {
      await remove({ data: { id: f.id } });
      toast.success("Funder removed");
      qc.invalidateQueries({ queryKey: ["admin-funders"] });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not remove");
    }
  }

  return (
    <div className="min-h-screen bg-ivory text-charcoal">
      <header className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-5xl px-5 h-16 flex items-center justify-between">
          <Link to="/" className="font-display tracking-[0.2em] text-sm">SHRI AKHAND DHARMA <span className="text-gold">ADMIN</span></Link>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/funders" className="hover:text-gold">View Funders page</Link>
            <button onClick={signOut} className="hover:text-gold">Sign out</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-10">
        {adminQ.isLoading && <p>Checking access…</p>}
        {adminQ.isError && <p className="text-copper">Could not verify your access.</p>}
        {adminQ.data && !adminQ.data.isAdmin && (
          <div className="rounded-lg border border-border bg-card p-6">
            <h1 className="font-display text-xl font-semibold text-navy">Access not granted</h1>
            <p className="mt-2 text-[15px]">Your account is not on the list of authorised staff. Please contact the foundation administrator.</p>
          </div>
        )}

        {adminQ.data?.isAdmin && (
          <>
            <div className="flex items-center justify-between gap-4">
              <h1 className="font-display text-2xl sm:text-3xl font-semibold text-navy">Funders</h1>
              {!form && <Button onClick={() => setForm({ ...empty })}><Plus size={16} /> Add funder</Button>}
            </div>

            {form && (
              <form onSubmit={submit} className="mt-6 rounded-lg border border-gold/40 bg-card p-5 sm:p-6 space-y-4">
                <h2 className="font-display text-lg font-semibold text-navy">{form.id ? "Edit funder" : "New funder"}</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" required maxLength={200} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="category">Category</Label>
                    <Input id="category" maxLength={100} value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="web">Website</Label>
                    <Input id="web" type="url" placeholder="https://" value={form.website_url} onChange={(e) => setForm({ ...form, website_url: e.target.value })} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="order">Display order</Label>
                    <Input id="order" type="number" min={0} value={form.sort_order} onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })} />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Logo (optional)</Label>
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-md border border-border bg-ivory flex items-center justify-center overflow-hidden">
                      {form.logo_url ? <img src={form.logo_url} alt="Logo preview" className="max-w-full max-h-full object-contain p-1.5" /> : <span className="text-xs text-charcoal/50">None</span>}
                    </div>
                    <Input type="file" accept="image/*" className="max-w-xs" onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
                    {form.logo_path && <Button type="button" variant="ghost" size="sm" onClick={() => setForm({ ...form, logo_path: null, logo_url: null })}>Remove</Button>}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="notes">Notes for AI draft</Label>
                  <Textarea id="notes" rows={3} maxLength={4000} placeholder="e.g. Local business, supported the 2026 health camp, donated medical supplies" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
                  <Button type="button" variant="outline" size="sm" onClick={runDraft} disabled={drafting}>
                    <Sparkles size={14} /> {drafting ? "Drafting…" : "Draft profile with AI"}
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="desc">Profile (shown on Funders page)</Label>
                  <Textarea id="desc" rows={5} maxLength={2000} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>

                <div className="flex items-center gap-2">
                  <Switch id="active" checked={form.is_active} onCheckedChange={(v) => setForm({ ...form, is_active: v })} />
                  <Label htmlFor="active">Show on public Funders page</Label>
                </div>

                <div className="flex gap-3">
                  <Button type="submit" disabled={busy}>{busy ? "Saving…" : "Save"}</Button>
                  <Button type="button" variant="ghost" onClick={() => setForm(null)}>Cancel</Button>
                </div>
              </form>
            )}

            <div className="mt-6 space-y-3">
              {fundersQ.isLoading && <p>Loading…</p>}
              {fundersQ.data?.length === 0 && <p className="text-charcoal/70">No funders yet. Click “Add funder” to create the first one.</p>}
              {fundersQ.data?.map((f) => (
                <div key={f.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                  <div className="w-12 h-12 flex-none rounded-md border border-border bg-ivory flex items-center justify-center overflow-hidden">
                    {f.logo_url ? <img src={f.logo_url} alt="" className="max-w-full max-h-full object-contain p-1" /> : <span className="font-display text-gold">{f.name.charAt(0)}</span>}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold text-navy truncate">{f.name}</div>
                    <div className="text-xs text-charcoal/60">{f.category || "No category"} · {f.is_active ? "Visible" : "Hidden"}</div>
                  </div>
                  <Button variant="ghost" size="icon" aria-label={`Edit ${f.name}`} onClick={() => edit(f)}><Pencil size={16} /></Button>
                  <Button variant="ghost" size="icon" aria-label={`Remove ${f.name}`} onClick={() => del(f)}><Trash2 size={16} /></Button>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
