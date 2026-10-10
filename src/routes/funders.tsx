import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { ArrowLeft, HandHeart } from "lucide-react";

import SiteHeader from "@/components/SiteHeader";
import { getFunders } from "@/lib/funders.functions";

export const Route = createFileRoute("/funders")({
  head: () => ({
    meta: [
      { title: "Our Funders — Shri Akhand Dharma Foundation" },
      {
        name: "description",
        content:
          "The individuals and organisations whose generous support makes the work of the Shri Akhand Dharma Foundation possible.",
      },
      { property: "og:title", content: "Our Funders — Shri Akhand Dharma Foundation" },
      {
        property: "og:description",
        content:
          "The individuals and organisations whose generous support makes our work possible.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FundersPage,
});

function FundersPage() {
  const fetchFunders = useServerFn(getFunders);
  const fundersQuery = useQuery({ queryKey: ["funders"], queryFn: () => fetchFunders() });

  const funders = fundersQuery.data ?? [];

  return (
    <div className="min-h-screen bg-ivory text-charcoal antialiased">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
        <div className="max-w-3xl rounded-lg border border-gold/50 bg-gold/5 px-5 py-5 sm:px-7 sm:py-6">
          <p className="font-display text-lg sm:text-xl font-semibold text-navy">
            With heartfelt gratitude to our donors
          </p>
          <p className="mt-2 text-[15px] sm:text-[16px] leading-relaxed text-charcoal/80 text-justify">
            Every act of service carried out in the name of the Foundation begins with a donor's
            generosity. We thank each of you sincerely — your trust and support allow us to serve
            with dignity, and to keep our commitments to those who need us most.
          </p>
        </div>
        <div className="mt-10 flex items-center gap-3 text-gold uppercase tracking-[0.3em] text-[11px] sm:text-xs font-medium">
          <span className="h-px w-6 sm:w-8 bg-gold" />
          <span>Funders</span>
        </div>
        <h1 className="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-navy">
          Our Funders
        </h1>
        <p className="mt-4 max-w-3xl text-[17px] sm:text-base leading-relaxed text-charcoal/80 text-justify">
          Every programme we run is made possible by the generosity of our supporters. We gratefully
          acknowledge the individuals and organisations who stand with us in service.
        </p>

        {fundersQuery.isLoading && <p className="mt-10 text-charcoal/60">Loading funders…</p>}

        {fundersQuery.isError && (
          <p className="mt-10 text-copper">Could not load the funder list. Please try again later.</p>
        )}

        {fundersQuery.isSuccess && funders.length === 0 && (
          <div className="mt-10 rounded-lg border border-gold/40 bg-card p-6 sm:p-8 max-w-2xl">
            <HandHeart size={28} className="text-gold" />
            <h2 className="mt-3 font-display text-lg font-semibold text-navy">
              Our funder list is being prepared
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-charcoal/80">
              We are compiling the list of our valued supporters. If you would like to support our
              work, please reach out through the contact form on our home page.
            </p>
          </div>
        )}

        {funders.length > 0 && (
          <div className="mt-10 max-w-lg overflow-hidden rounded-lg border border-border bg-card">
            <table className="w-full table-fixed text-left">
              <colgroup>
                <col className="w-1/3" />
                <col className="w-1/3" />
                <col className="w-1/3" />
              </colgroup>
              <thead className="bg-navy text-navy-foreground">
                <tr>
                  <th className="px-2 sm:px-4 py-3 font-display text-[11px] sm:text-sm tracking-[0.08em] sm:tracking-[0.12em] uppercase">
                    Name
                  </th>
                  <th className="px-2 sm:px-4 py-3 font-display text-[11px] sm:text-sm tracking-[0.08em] sm:tracking-[0.12em] uppercase">
                    Location
                  </th>
                  <th className="px-2 sm:px-4 py-3 font-display text-[11px] sm:text-sm tracking-[0.08em] sm:tracking-[0.12em] uppercase text-right">
                    Amount (INR)
                  </th>
                </tr>
              </thead>
              <tbody>
                {funders.map((f) => (
                  <tr key={f.id} className="border-t border-border">
                    <td className="px-2 sm:px-4 py-3 text-[13px] sm:text-[16px] text-navy">{f.name}</td>
                    <td className="px-2 sm:px-4 py-3 text-[13px] sm:text-[16px] text-charcoal/80">{f.location}</td>
                    <td className="px-2 sm:px-4 py-3 text-[13px] sm:text-[16px] text-charcoal/80 text-right whitespace-nowrap">
                      {f.amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>

      <footer className="bg-navy text-navy-foreground">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10 py-10 text-center text-[10px] sm:text-xs text-ivory/60">
          © {new Date().getFullYear()} Shri Akhand Dharma Foundation. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
