import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Staff Sign In — Shri Akhand Dharma Foundation" },
      { name: "description", content: "Sign in for Shri Akhand Dharma Foundation staff." },
      { property: "og:title", content: "Staff Sign In — Shri Akhand Dharma Foundation" },
      { property: "og:description", content: "Staff access for the Shri Akhand Dharma Foundation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "in") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account, then sign in.");
        setMode("in");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-5">
      <form onSubmit={submit} className="w-full max-w-sm rounded-lg border border-border bg-card p-6 sm:p-8 space-y-4">
        <h1 className="font-display text-2xl font-semibold text-navy">
          {mode === "in" ? "Staff sign in" : "Create staff account"}
        </h1>
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <Button type="submit" className="w-full" disabled={busy}>
          {busy ? "Please wait…" : mode === "in" ? "Sign in" : "Create account"}
        </Button>
        <button type="button" onClick={() => setMode(mode === "in" ? "up" : "in")} className="text-sm text-navy hover:text-gold w-full text-center">
          {mode === "in" ? "First time? Create an account" : "Already have an account? Sign in"}
        </button>
        <Link to="/" className="block text-center text-xs text-charcoal/60 hover:text-gold">← Back to site</Link>
      </form>
    </div>
  );
}
