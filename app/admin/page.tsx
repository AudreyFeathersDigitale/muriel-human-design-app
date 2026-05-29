"use client";

import React, { useMemo, useState } from "react";
import {
  BarChart3,
  Download,
  Droplet,
  Eye,
  Flame,
  Mail,
  Search,
  Sparkles,
  Sprout,
  Users,
  Wind,
} from "lucide-react";

const leads = [
  {
    id: 1,
    firstName: "Claire",
    email: "claire@email.com",
    result: "earth",
    label: "Terre alignée",
    createdAt: "2026-01-20",
    answers: ["earth", "earth", "water", "earth", "air", "earth", "earth", "earth"],
  },
  {
    id: 2,
    firstName: "Sophie",
    email: "sophie@email.com",
    result: "water",
    label: "Eau émotionnelle",
    createdAt: "2026-01-20",
    answers: ["water", "water", "water", "air", "water", "water", "fire", "water"],
  },
  {
    id: 3,
    firstName: "Julie",
    email: "julie@email.com",
    result: "fire",
    label: "Feu émotionnel",
    createdAt: "2026-01-19",
    answers: ["fire", "fire", "air", "fire", "fire", "fire", "water", "fire"],
  },
  {
    id: 4,
    firstName: "Emma",
    email: "emma@email.com",
    result: "air",
    label: "Air mental",
    createdAt: "2026-01-18",
    answers: ["air", "air", "air", "water", "air", "air", "air", "earth"],
  },
];

const resultMeta = {
  fire: {
    label: "Feu",
    fullLabel: "Feu émotionnel",
    icon: Flame,
    bg: "bg-[#FFF4DD]",
    text: "text-[#B87C00]",
    line: "bg-[#D5A021]",
  },
  water: {
    label: "Eau",
    fullLabel: "Eau émotionnelle",
    icon: Droplet,
    bg: "bg-[#E8F9FA]",
    text: "text-[#13858B]",
    line: "bg-[#9EDFE3]",
  },
  air: {
    label: "Air",
    fullLabel: "Air mental",
    icon: Wind,
    bg: "bg-[#F4F1EA]",
    text: "text-[#142033]",
    line: "bg-[#C8C2B8]",
  },
  earth: {
    label: "Terre",
    fullLabel: "Terre alignée",
    icon: Sprout,
    bg: "bg-[#E8F9FA]",
    text: "text-[#13858B]",
    line: "bg-[#4CAF7A]",
  },
};

export default function AdminPage() {
  const [query, setQuery] = useState("");
  const [selectedLead, setSelectedLead] = useState<(typeof leads)[number] | null>(null);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const value = `${lead.firstName} ${lead.email} ${lead.label}`.toLowerCase();
      return value.includes(query.toLowerCase());
    });
  }, [query]);

  const stats = useMemo(() => {
    return {
      total: leads.length,
      fire: leads.filter((lead) => lead.result === "fire").length,
      water: leads.filter((lead) => lead.result === "water").length,
      air: leads.filter((lead) => lead.result === "air").length,
      earth: leads.filter((lead) => lead.result === "earth").length,
    };
  }, []);

  function getPercentage(value: number) {
    if (!stats.total) return 0;
    return Math.round((value / stats.total) * 100);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#F8F4ED] px-6 py-8 text-[#142033]">
      <BackgroundDecorations />

      <div className="relative z-10 mx-auto max-w-7xl">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.35em] text-[#B87C00]">
              ART & HAPPY
            </p>

            <h1 className="mt-4 font-serif text-5xl leading-tight tracking-tight">
              Tableau de bord Muriel <span className="text-[#D5A021]">✦</span>
            </h1>

            <p className="mt-4 text-lg text-[#3F4B5E]">
              Suivi des leads, profils émotionnels et résultats du quiz.
            </p>
          </div>

          <button className="flex h-14 items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D5A021] to-[#E8B940] px-7 font-semibold text-white shadow-xl shadow-[#D5A021]/25 transition hover:scale-[1.02]">
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-5">
          <StatCard
            title="Leads"
            value={stats.total}
            subtitle="Total"
            icon={Users}
            tone="teal"
            percentage={100}
          />
          <StatCard
            title="Feu"
            value={stats.fire}
            subtitle={`${getPercentage(stats.fire)}%`}
            icon={Flame}
            tone="gold"
            percentage={getPercentage(stats.fire)}
          />
          <StatCard
            title="Eau"
            value={stats.water}
            subtitle={`${getPercentage(stats.water)}%`}
            icon={Droplet}
            tone="teal"
            percentage={getPercentage(stats.water)}
          />
          <StatCard
            title="Air"
            value={stats.air}
            subtitle={`${getPercentage(stats.air)}%`}
            icon={Wind}
            tone="neutral"
            percentage={getPercentage(stats.air)}
          />
          <StatCard
            title="Terre"
            value={stats.earth}
            subtitle={`${getPercentage(stats.earth)}%`}
            icon={Sprout}
            tone="green"
            percentage={getPercentage(stats.earth)}
          />
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-[1fr_390px]">
          <div className="rounded-[2.2rem] border border-[#E5D9C5] bg-white/65 p-6 shadow-[0_18px_60px_rgba(43,30,10,.08)] backdrop-blur-xl">
            <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-full bg-[#E8F9FA] text-[#13858B]">
                  <BarChart3 className="h-7 w-7" />
                </div>

                <div>
                  <h2 className="font-serif text-3xl">Leads récents</h2>
                  <p className="mt-1 text-sm text-[#607086]">
                    Liste des personnes ayant terminé le quiz.
                  </p>
                </div>
              </div>

              <div className="flex h-14 items-center gap-3 rounded-full border border-[#E5D9C5] bg-white/80 px-5 shadow-sm backdrop-blur-md">
                <Search className="h-4 w-4 text-[#9AA2AD]" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Rechercher..."
                  className="w-full bg-transparent text-sm outline-none placeholder:text-[#9AA2AD]"
                />
              </div>
            </div>

            <div className="mt-7 overflow-hidden rounded-3xl border border-[#E5D9C5] bg-white/80 backdrop-blur-md">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-[#F8F4ED]/90 text-[#3F4B5E]">
                  <tr>
                    <th className="px-6 py-5 font-semibold">Nom</th>
                    <th className="px-6 py-5 font-semibold">Email</th>
                    <th className="px-6 py-5 font-semibold">Résultat</th>
                    <th className="px-6 py-5 font-semibold">Date</th>
                    <th className="px-6 py-5 font-semibold"></th>
                  </tr>
                </thead>

                <tbody>
                  {filteredLeads.map((lead) => {
                    const meta = resultMeta[lead.result as keyof typeof resultMeta];
                    const Icon = meta.icon;

                    return (
                      <tr
                        key={lead.id}
                        className="border-t border-[#E5D9C5] transition hover:bg-[#FFFDF8]"
                      >
                        <td className="px-6 py-5">
                          <div className="flex items-center gap-3">
                            <div className={`grid h-9 w-9 place-items-center rounded-full ${meta.bg} ${meta.text} font-bold`}>
                              {lead.firstName[0]}
                            </div>
                            <span className="font-semibold">{lead.firstName}</span>
                          </div>
                        </td>

                        <td className="px-6 py-5 text-[#3F4B5E]">
                          <span className="inline-flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#9AA2AD]" />
                            {lead.email}
                          </span>
                        </td>

                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-2 rounded-full ${meta.bg} px-4 py-2 font-semibold ${meta.text}`}>
                            <Icon className="h-4 w-4" />
                            {lead.label}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-[#3F4B5E]">{lead.createdAt}</td>

                        <td className="px-6 py-5">
                          <button
                            onClick={() => setSelectedLead(lead)}
                            className="grid h-10 w-10 place-items-center rounded-full bg-[#FFF4DD] text-[#142033] transition hover:scale-105 hover:bg-[#F5E3BA]"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <aside className="rounded-[2.2rem] border border-[#E5D9C5] bg-white/65 p-7 shadow-[0_18px_60px_rgba(43,30,10,.08)] backdrop-blur-xl">
            {!selectedLead ? (
              <div className="flex min-h-[480px] flex-col items-center justify-center text-center">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full bg-[#9EDFE3]/30 blur-2xl" />
                  <div className="relative grid h-20 w-20 place-items-center rounded-full bg-[#E8F9FA] text-[#13858B]">
                    <BarChart3 className="h-9 w-9" />
                  </div>
                </div>

                <h3 className="mt-7 font-serif text-3xl">Détail du lead</h3>

                <p className="mt-4 max-w-xs text-sm leading-7 text-[#607086]">
                  Clique sur l’œil dans le tableau pour voir les réponses et le profil.
                </p>

                <div className="mt-8 text-[#D5A021]">
                  <Sparkles className="h-7 w-7" />
                </div>
              </div>
            ) : (
              <LeadDetail lead={selectedLead} />
            )}
          </aside>
        </section>
      </div>
    </main>
  );
}

function BackgroundDecorations() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 -top-32 h-[420px] w-[420px] rounded-full bg-[#9EDFE3]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-[22%] h-[420px] w-[420px] rounded-full bg-[#D5A021]/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[420px] rounded-full bg-[#9EDFE3]/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[460px] w-[460px] rounded-full bg-[#9EDFE3]/25 blur-3xl" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.025]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: "radial-gradient(#000 0.55px, transparent 0.55px)",
            backgroundSize: "22px 22px",
          }}
        />
      </div>

      <div className="pointer-events-none absolute left-[4%] top-[13%] text-2xl text-[#D5A021]/35">✦</div>
      <div className="pointer-events-none absolute left-[9%] bottom-[17%] text-xl text-[#9EDFE3]/60">✦</div>
      <div className="pointer-events-none absolute right-[7%] top-[19%] text-2xl text-[#9EDFE3]/50">✦</div>
      <div className="pointer-events-none absolute right-[4%] bottom-[13%] text-4xl text-[#D5A021]/30">✦</div>
      <div className="pointer-events-none absolute right-[18%] top-[7%] text-3xl text-[#D5A021]/40">✧</div>

      <div className="pointer-events-none absolute -left-16 top-[18%] h-[280px] w-[220px] rounded-[50%] border border-[#D5A021]/20" />
      <div className="pointer-events-none absolute -right-16 bottom-[15%] h-[320px] w-[240px] rounded-[50%] border border-[#9EDFE3]/30" />
    </>
  );
}

function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  tone = "teal",
  percentage,
}: {
  title: string;
  value: number;
  subtitle: string;
  icon: any;
  tone?: "teal" | "gold" | "neutral" | "green";
  percentage: number;
}) {
  const styles = {
    teal: {
      icon: "bg-[#E8F9FA] text-[#13858B]",
      line: "bg-[#9EDFE3]",
    },
    gold: {
      icon: "bg-[#FFF4DD] text-[#B87C00]",
      line: "bg-[#D5A021]",
    },
    neutral: {
      icon: "bg-[#F4F1EA] text-[#142033]",
      line: "bg-[#C8C2B8]",
    },
    green: {
      icon: "bg-[#E6F6EC] text-[#4CAF7A]",
      line: "bg-[#4CAF7A]",
    },
  };

  return (
    <div className="group rounded-[1.8rem] border border-[#E5D9C5] bg-white/65 p-6 shadow-[0_14px_45px_rgba(43,30,10,.07)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_18px_60px_rgba(43,30,10,.1)]">
      <div className={`grid h-14 w-14 place-items-center rounded-full ${styles[tone].icon}`}>
        <Icon className="h-6 w-6" />
      </div>

      <p className="mt-6 text-sm font-medium text-[#607086]">{title}</p>
      <p className="mt-1 text-4xl font-bold">{value}</p>
      <p className="mt-2 text-sm text-[#607086]">{subtitle}</p>

      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#EFE7D9]">
        <div
          className={`h-full rounded-full ${styles[tone].line}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function LeadDetail({ lead }: { lead: (typeof leads)[number] }) {
  const meta = resultMeta[lead.result as keyof typeof resultMeta];
  const Icon = meta.icon;

  return (
    <div>
      <div className="flex items-start gap-4">
        <div className={`grid h-16 w-16 place-items-center rounded-full ${meta.bg} ${meta.text}`}>
          <Icon className="h-8 w-8" />
        </div>

        <div>
          <h3 className="font-serif text-3xl">{lead.firstName}</h3>
          <p className="mt-1 text-sm text-[#607086]">{lead.email}</p>
        </div>
      </div>

      <div className="mt-7 rounded-3xl bg-[#F8F4ED]/80 p-5">
        <p className="text-sm text-[#607086]">Résultat dominant</p>
        <p className={`mt-2 text-2xl font-bold ${meta.text}`}>{lead.label}</p>
      </div>

      <div className="mt-7">
        <h4 className="font-semibold">Réponses</h4>

        <div className="mt-4 space-y-3">
          {lead.answers.map((answer, index) => {
            const answerMeta = resultMeta[answer as keyof typeof resultMeta];
            const AnswerIcon = answerMeta.icon;

            return (
              <div
                key={`${answer}-${index}`}
                className="flex items-center justify-between rounded-2xl border border-[#E5D9C5] bg-white/80 px-4 py-3 backdrop-blur-md"
              >
                <span className="text-sm font-medium">Question {index + 1}</span>

                <span className={`flex items-center gap-2 text-sm font-semibold ${answerMeta.text}`}>
                  <AnswerIcon className="h-4 w-4" />
                  {answerMeta.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}