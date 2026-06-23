"use client";

import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  Clock3,
  Download,
  Heart,
  Leaf,
  Lock,
  Mic,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

type ArchetypeKey = "guardian" | "seeker" | "survivor" | "alchemist";

type Answer = {
  key: ArchetypeKey;
  icon: string;
  text: string;
};

type Question = {
  id: number;
  theme: string;
  icon: React.ElementType;
  question: string;
  answers: Answer[];
};

const questions: Question[] = [
  {
    id: 1,
    theme: "Décision",
    icon: Target,
    question: "Lorsque tu dois prendre une décision importante :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "J'analyse longtemps avant de me lancer." },
      { key: "seeker", icon: "🧭", text: "Je demande souvent l'avis des autres." },
      { key: "survivor", icon: "🌊", text: "Je reporte la décision en espérant y voir plus clair." },
      { key: "alchemist", icon: "✨", text: "J'écoute mon ressenti avant d'agir." },
    ],
  },
  {
    id: 2,
    theme: "Énergie",
    icon: Zap,
    question: "Aujourd'hui, ce qui te fatigue le plus est :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Vouloir tout contrôler." },
      { key: "seeker", icon: "🧭", text: "Ne pas savoir quelle direction prendre." },
      { key: "survivor", icon: "🌊", text: "Gérer les problèmes au fur et à mesure." },
      { key: "alchemist", icon: "✨", text: "Sentir que je pourrais aller plus loin." },
    ],
  },
  {
    id: 3,
    theme: "Projet",
    icon: Briefcase,
    question: "Quand un projet te tient à cœur :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Je prépare tout dans les moindres détails." },
      { key: "seeker", icon: "🧭", text: "Je commence puis je doute rapidement." },
      { key: "survivor", icon: "🌊", text: "J'ai du mal à passer à l'action." },
      { key: "alchemist", icon: "✨", text: "J'avance même sans tout maîtriser." },
    ],
  },
  {
    id: 4,
    theme: "État d'esprit",
    icon: Heart,
    question: "La phrase qui te ressemble le plus :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Je dois être certain(e) avant d'agir." },
      { key: "seeker", icon: "🧭", text: "Je cherche encore ma voie." },
      { key: "survivor", icon: "🌊", text: "J'ai l'impression de subir ma situation." },
      { key: "alchemist", icon: "✨", text: "Je sens que quelque chose de plus grand m'appelle." },
    ],
  },
  {
    id: 5,
    theme: "Finance",
    icon: Briefcase,
    question: "Aujourd'hui, par rapport à ta situation financière :",
    answers: [
      {
        key: "guardian",
        icon: "🛡️",
        text: "Même lorsque les choses vont bien, j'ai du mal à me sentir totalement en sécurité.",
      },
      {
        key: "seeker",
        icon: "🧭",
        text: "Je sais que je suis capable de gagner davantage mais je ne sais pas toujours quelle direction prendre.",
      },
      {
        key: "survivor",
        icon: "🌊",
        text: "J'ai l'impression de faire beaucoup d'efforts sans obtenir les résultats que j'espère.",
      },
      {
        key: "alchemist",
        icon: "✨",
        text: "J'ai déjà créé des résultats encourageants et je sens que je peux encore développer mon potentiel.",
      },
    ],
  },
  {
    id: 6,
    theme: "Organisation",
    icon: Target,
    question: "Quand tu ouvres ton agenda ou ton ordinateur le matin :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Je commence immédiatement à gérer ma liste de tâches." },
      { key: "seeker", icon: "🧭", text: "Je ne sais pas toujours quelle est la priorité." },
      { key: "survivor", icon: "🌊", text: "J'ai l'impression de courir après le temps toute la journée." },
      { key: "alchemist", icon: "✨", text: "Je sais ce qui est vraiment important aujourd'hui." },
    ],
  },
  {
    id: 7,
    theme: "Productivité",
    icon: Briefcase,
    question: "Quand tu travailles sur un projet important :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Je passe beaucoup de temps à perfectionner les détails." },
      { key: "seeker", icon: "🧭", text: "Je commence une tâche puis une autre, puis encore une autre sans toujours terminer." },
      { key: "survivor", icon: "🌊", text: "Je me sens vite dépassé(e) par tout ce qu'il y a à faire." },
      { key: "alchemist", icon: "✨", text: "Je reste concentré(e) sur une priorité à la fois." },
    ],
  },
  {
    id: 8,
    theme: "Évolution",
    icon: Heart,
    question: "Si tu pouvais changer une seule chose dès maintenant :",
    answers: [
      { key: "guardian", icon: "🛡️", text: "Arrêter de tout contrôler." },
      { key: "seeker", icon: "🧭", text: "Avoir enfin une vision claire." },
      { key: "survivor", icon: "🌊", text: "Retrouver de l'énergie et de l'élan." },
      { key: "alchemist", icon: "✨", text: "Oser prendre pleinement ma place." },
    ],
  },
];

const results: Record<ArchetypeKey, {
  label: string;
  emoji: string;
  text: string;
  challenge: string;
}> = {
  guardian: {
    label: "Le Gardien du Contrôle",
    emoji: "🛡️",
    text: "Tu cherches à te protéger en anticipant, maîtrisant et sécurisant un maximum de choses.",
    challenge: "Faire davantage confiance à toi-même et à la vie.",
  },
  seeker: {
    label: "Le Chercheur de Réponses",
    emoji: "🧭",
    text: "Tu es en quête de sens, de direction et de compréhension, mais tu cherches parfois les réponses à l'extérieur plutôt qu'à l'intérieur.",
    challenge: "Retrouver ta propre boussole intérieure.",
  },
  survivor: {
    label: "Le Survivant Émotionnel",
    emoji: "🌊",
    text: "Tu avances souvent en gérant les urgences et les imprévus plutôt qu'en construisant ce qui compte vraiment pour toi.",
    challenge: "Sortir du mode survie et reprendre ton pouvoir d'action.",
  },
  alchemist: {
    label: "L'Alchimiste Aligné",
    emoji: "✨",
    text: "Tu as déjà commencé à te reconnecter à toi-même et à ton potentiel. Tu sens qu'il est temps d'incarner davantage qui tu es réellement.",
    challenge: "Passer au niveau supérieur et révéler pleinement ta Zone de Génie.",
  },
};

function scoreAnswers(answers: ArchetypeKey[]): ArchetypeKey {
  const score: Record<ArchetypeKey, number> = {
    guardian: 0,
    seeker: 0,
    survivor: 0,
    alchemist: 0,
  };

  answers.forEach((answer) => {
    score[answer] += 1;
  });

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0] as ArchetypeKey;
}

function Orb({ size = "h-36 w-36" }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.04, 1], rotate: [0, 2, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className={`${size} relative rounded-full bg-[radial-gradient(circle_at_35%_30%,#ffffff_0%,#BFF3F5_22%,#9EDFE3_48%,#ffffff00_72%)] shadow-[0_0_70px_rgba(158,223,227,.65)]`}
    >
      <div className="absolute inset-3 rounded-full border border-white/70" />
      <Sparkles className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 text-[#D5A021]" />
    </motion.div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F4ED] text-[#142033]">
      <div className="pointer-events-none fixed -left-32 -top-32 h-96 w-96 rounded-full bg-[#9EDFE3]/30 blur-3xl" />
      <div className="pointer-events-none fixed -right-20 top-1/3 h-80 w-80 rounded-full bg-[#D5A021]/20 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 left-1/3 h-72 w-72 rounded-full bg-white blur-3xl" />
      <div className="relative mx-auto min-h-screen w-full max-w-7xl px-4 py-4 md:px-8 md:py-8">
        {children}
      </div>
    </main>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto min-h-[860px] w-full max-w-[430px] overflow-hidden rounded-[2rem] border border-[#E5D9C5] bg-[#FFFDF8]/90 shadow-[0_24px_80px_rgba(43,30,10,.12)] backdrop-blur-xl">
      {children}
    </div>
  );
}

function Landing({ onStart }: { onStart: () => void }) {
  return (
    <PhoneFrame>
      <div className="flex min-h-[860px] flex-col p-7">
        <div className="font-serif text-2xl italic tracking-tight">
          art & happy <span className="text-[#D5A021]">⌣</span>
        </div>

        <div className="mt-12 grid grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <h1 className="font-serif text-[44px] leading-[1.05] tracking-tight">
              Découvre ton profil intérieur{" "}
              <span className="text-[#B87C00]">et ta Zone de Génie</span>
            </h1>
            <div className="mt-5 h-1.5 w-28 rounded-full bg-[#9EDFE3]" />
          </div>
          <Orb size="h-32 w-32" />
        </div>

        <p className="mt-8 text-lg leading-7 text-[#28364C]">
          Une expérience guidée pour mieux comprendre ce qui te freine aujourd'hui et ce qui peut t'aider à avancer avec plus de clarté.
        </p>

        <div className="mt-10 space-y-7">
          {[
            [Heart, "Mieux te comprendre", "Identifie ton archétype dominant actuel."],
            [Sparkles, "Des clés concrètes", "Découvre ton défi principal et ce que ton profil révèle."],
            [Leaf, "Alignement et clarté", "Avance avec plus de confiance, d'énergie et de justesse."],
          ].map(([Icon, title, text]: any) => (
            <div key={title} className="flex gap-5">
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-[#9EDFE3]/70 shadow-lg shadow-[#9EDFE3]/30">
                <Icon className="h-7 w-7 text-[#13858B]" />
              </div>
              <div>
                <div className="text-lg font-semibold">{title}</div>
                <p className="mt-1 leading-6 text-[#3F4B5E]">{text}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={onStart}
          className="mt-10 flex h-14 w-full items-center justify-center gap-4 rounded-full bg-gradient-to-r from-[#D5A021] to-[#E8B940] px-6 text-lg font-semibold text-white shadow-xl shadow-[#D5A021]/25 transition hover:scale-[1.01]"
        >
          Commencer mon analyse <ArrowRight className="h-5 w-5" />
        </button>

        <div className="mt-5 flex justify-center gap-2 text-sm text-[#28364C]">
          <Clock3 className="h-4 w-4" /> 3 minutes pour mieux te comprendre
        </div>

        <div className="mt-auto rounded-3xl border border-[#E5D9C5] bg-white/60 p-5 shadow-sm">
          <div className="flex gap-4">
            <div className="font-serif text-5xl text-[#D5A021]">“</div>
            <div>
              <p className="leading-6">
                Cette expérience m'a permis de comprendre beaucoup de choses sur moi. Un vrai déclic !
              </p>
              <p className="mt-3 text-sm font-medium">— Claire, entrepreneure</p>
            </div>
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}

function ChatQuiz({
  answers,
  setAnswers,
  onComplete,
}: {
  answers: ArchetypeKey[];
  setAnswers: React.Dispatch<React.SetStateAction<ArchetypeKey[]>>;
  onComplete: () => void;
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const current = questions[answers.length];
  const progress = Math.round((answers.length / questions.length) * 100);

  function choose(key: ArchetypeKey) {
    const next = [...answers, key];
    setAnswers(next);
    if (next.length === questions.length) setTimeout(onComplete, 450);
  }

  if (!hasStarted) {
    return (
      <PhoneFrame>
        <div className="flex min-h-[860px] flex-col p-6">
          <header className="flex items-center justify-between">
            <button className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm">‹</button>
            <div className="text-center">
              <div className="font-serif text-2xl">Ton guide IA</div>
              <div className="text-sm font-medium text-[#B87C00]">Clarté & alignement</div>
            </div>
            <button className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm">
              <Mic className="h-5 w-5" />
            </button>
          </header>

          <div className="mt-14 flex gap-4">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white shadow-sm">
              <Sparkles className="text-[#D5A021]" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="rounded-[1.7rem] border border-[#E5D9C5] bg-white/75 p-6 text-[17px] leading-8 shadow-sm"
            >
              Je suis là pour t'aider à identifier ton archétype dominant actuel et ce qui peut t'aider à avancer avec plus de clarté.
              <br />
              <br />
              Prête à commencer ton analyse ? ✨
            </motion.div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              onClick={() => setHasStarted(true)}
              className="rounded-[1.4rem] bg-[#CFF2F4] px-7 py-4 text-[16px] font-medium text-[#142033] shadow-sm transition hover:scale-[1.02] hover:bg-[#BFF0F2]"
            >
              Oui, je suis prête
            </button>
          </div>

          <div className="mt-auto rounded-[2rem] border border-[#E5D9C5] bg-white/55 p-5 text-center shadow-sm">
            <p className="font-serif text-2xl text-[#B87C00]">8 questions</p>
            <p className="mt-2 text-sm leading-6 text-[#3F4B5E]">
              Réponds spontanément. Il n'y a pas de bonne ou de mauvaise réponse.
            </p>
          </div>

          <div className="mt-5 flex justify-center gap-2 text-xs text-[#808897]">
            <Lock className="h-3.5 w-3.5" /> Ton espace est sécurisé et confidentiel.
          </div>
        </div>
      </PhoneFrame>
    );
  }

  if (!current) {
    return (
      <PhoneFrame>
        <div className="flex min-h-[860px] items-center justify-center p-6">
          <div className="text-center">
            <Orb size="mx-auto h-28 w-28" />
            <p className="mt-6 font-serif text-2xl">Analyse en cours…</p>
            <p className="mt-2 text-sm text-[#3F4B5E]">
              Ton guide prépare ton résultat personnalisé.
            </p>
          </div>
        </div>
      </PhoneFrame>
    );
  }

  const CurrentIcon = current.icon;

  return (
    <PhoneFrame>
      <div className="flex min-h-[860px] flex-col p-6">
        <header className="flex items-center justify-between">
          <button
            onClick={() => setHasStarted(false)}
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm"
          >
            ‹
          </button>

          <div className="text-center">
            <div className="font-serif text-2xl">Ton analyse</div>
            <div className="text-sm font-medium text-[#B87C00]">
              Question {current.id}/{questions.length}
            </div>
          </div>

          <div className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm">
            <CurrentIcon className="h-5 w-5 text-[#D5A021]" />
          </div>
        </header>

        <div className="mt-8 h-2 rounded-full bg-[#EDE5D7]">
          <motion.div
            className="h-full rounded-full bg-[#D5A021]"
            animate={{ width: `${progress}%` }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.38 }}
            className="mt-8 rounded-[2rem] border border-[#E5D9C5] bg-white/65 p-5 shadow-sm"
          >
            <div className="text-sm font-bold uppercase tracking-wide text-[#B87C00]">
              {current.theme}
            </div>

            <div className="mt-6 flex items-start justify-between gap-4">
              <h2 className="font-serif text-[28px] leading-tight">{current.question}</h2>
              <CurrentIcon className="h-10 w-10 shrink-0 text-[#D5A021]" />
            </div>

            <p className="mt-4 text-[15px] leading-7 text-[#3F4B5E]">
              Choisis la réponse qui te correspond le plus actuellement.
            </p>

            <div className="mt-6 space-y-3.5">
              {current.answers.map((answer) => (
                <button
                  key={answer.text}
                  onClick={() => choose(answer.key)}
                  className="flex w-full items-center gap-5 rounded-2xl border border-[#E5D9C5] bg-white/80 p-5 text-left text-[16px] leading-7 shadow-sm transition hover:-translate-y-0.5 hover:border-[#D5A021] hover:bg-white hover:shadow-md"
                >
                  <span className="text-2xl">{answer.icon}</span>
                  <span>{answer.text}</span>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </PhoneFrame>
  );
}

function ProfileReady({ onNext }: { onNext: () => void }) {
  return (
    <PhoneFrame>
      <div className="flex min-h-[860px] flex-col items-center justify-center p-7 text-center">
        <Orb size="h-28 w-28" />

        <h1 className="mt-10 font-serif text-4xl leading-tight text-[#142033]">
          ✨ Ton profil est prêt
        </h1>

        <p className="mt-5 text-lg leading-8 text-[#3F4B5E]">
          Je prépare maintenant ton mini-guide personnalisé avec ton analyse complète.
        </p>

        <p className="mt-6 text-sm font-medium text-[#B87C00]">
          Cela ne prend que quelques secondes…
        </p>

        <button
          onClick={onNext}
          className="mt-12 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D5A021] to-[#E8B940] px-6 text-lg font-semibold text-white shadow-xl shadow-[#D5A021]/25 transition hover:scale-[1.01]"
        >
          Continuer
          <ArrowRight className="h-5 w-5" />
        </button>
      </div>
    </PhoneFrame>
  );
}

function LeadCapture({
  onSubmit,
}: {
  onSubmit: (lead: { firstName: string; email: string }) => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!firstName.trim() || !email.trim()) return;

    onSubmit({
      firstName: firstName.trim(),
      email: email.trim(),
    });
  }

  return (
    <PhoneFrame>
      <form onSubmit={handleSubmit} className="flex min-h-[860px] flex-col p-7">
        <div className="mt-10 text-center">
          <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#FFF4DD] text-[#D5A021]">
            <Sparkles className="h-9 w-9" />
          </div>

          <h1 className="mt-8 font-serif text-4xl leading-tight text-[#142033]">
            Reçois ton mini-guide personnalisé
          </h1>

          <p className="mt-5 text-base leading-7 text-[#3F4B5E]">
            Découvre ton archétype dominant, ton défi principal et les clés pour retrouver plus de clarté, d'élan et d'alignement.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E5D9C5] bg-white/60 p-5 shadow-sm">
          <div className="space-y-3 text-sm leading-6 text-[#3F4B5E]">
            <p>✓ Ton archétype dominant actuel</p>
            <p>✓ Ce que ton profil révèle</p>
            <p>✓ Ton défi principal</p>
            <p>✓ Une piste concrète pour passer au niveau supérieur</p>
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Ton prénom"
            className="h-14 w-full rounded-2xl border border-[#E5D9C5] bg-white px-5 text-[#142033] outline-none transition placeholder:text-[#9AA2AD] focus:border-[#D5A021]"
          />

          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Ton email"
            className="h-14 w-full rounded-2xl border border-[#E5D9C5] bg-white px-5 text-[#142033] outline-none transition placeholder:text-[#9AA2AD] focus:border-[#D5A021]"
          />
        </div>

        <button
          type="submit"
          className="mt-8 flex h-14 w-full items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#D5A021] to-[#E8B940] px-6 text-base font-semibold text-white shadow-xl shadow-[#D5A021]/25 transition hover:scale-[1.01]"
        >
          ✨ Recevoir mon guide personnalisé
        </button>

        <div className="mt-5 flex justify-center gap-2 text-xs text-[#808897]">
          <Lock className="h-3.5 w-3.5" />
          Tes données sont sécurisées.
        </div>
      </form>
    </PhoneFrame>
  );
}

function Result({ resultKey, onRestart }: { resultKey: ArchetypeKey; onRestart: () => void }) {
  const result = results[resultKey];

  const pdfLinks: Record<ArchetypeKey, string> = {
    guardian: "/pdfs/gardien-controle.pdf",
    seeker: "/pdfs/chercheur-reponses.pdf",
    survivor: "/pdfs/survivant-emotionnel.pdf",
    alchemist: "/pdfs/alchimiste-aligne.pdf",
  };

  const cards = [
    [
      Target,
      "Ton défi principal",
      result.challenge,
      "bg-[#E8F9FA]",
      "text-[#13858B]",
      "bg-[#D5A021]/10",
      "text-[#D5A021]",
    ],
    [
      Sparkles,
      "Ce que ton profil révèle",
      result.text,
      "bg-[#FFF4DD]",
      "text-[#B87C00]",
      "bg-[#9EDFE3]/20",
      "text-[#13858B]",
    ],
  ];

  return (
    <PhoneFrame>
      <div className="min-h-[860px] p-6">
        <header className="flex items-center justify-between">
          <button onClick={onRestart} className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm">
            ‹
          </button>

          <div className="font-serif text-2xl">Ton analyse</div>

          <a
            href={pdfLinks[resultKey]}
            download
            className="grid h-11 w-11 place-items-center rounded-full bg-white shadow-sm transition hover:scale-105"
          >
            <Download className="h-5 w-5" />
          </a>
        </header>

        <div className="mt-8 rounded-[2rem] border border-[#E5D9C5] bg-white/70 p-6 shadow-sm">
          <div className="flex items-center gap-6">
            <div className="grid h-28 w-28 shrink-0 place-items-center rounded-full border-4 border-[#F0C95C] text-5xl shadow-[0_0_50px_rgba(213,160,33,.25)]">
              {result.emoji}
            </div>

            <div>
              <p className="text-sm text-[#3F4B5E]">Ton archétype dominant actuel</p>
              <h1 className="mt-2 font-serif text-3xl text-[#B87C00]">{result.label}</h1>
              <p className="mt-3 leading-6 text-[#3F4B5E]">{result.text}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Ton aperçu personnalisé</h2>

        <div className="mt-4 grid grid-cols-1 gap-4">
          {cards.map(([Icon, title, text, bg, color, iconBg, iconColor]: any) => (
            <div
              key={title}
              className={`${bg} rounded-3xl border border-[#E5D9C5]/60 p-5 text-center shadow-sm`}
            >
              <div className={`mx-auto grid h-12 w-12 place-items-center rounded-full ${iconBg}`}>
                <Icon className={`h-6 w-6 ${iconColor}`} />
              </div>

              <div className={`mt-4 font-serif text-xl ${color}`}>{title}</div>

              <p className="mt-3 text-sm leading-6 text-[#3F4B5E]">{text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[2rem] bg-gradient-to-br from-[#D5A021] to-[#B87C00] p-7 text-center text-white shadow-xl shadow-[#D5A021]/20">
          <h2 className="font-serif text-2xl">Prête à aller plus loin ?</h2>
          <p className="mt-3 leading-6 text-white/90">
            Le quiz révèle ton archétype actuel. Ton Human Design peut t'aider à comprendre ton mode d'emploi naturel.
          </p>
          <a
            href="https://www.artehappy.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white px-6 py-4 font-semibold text-[#142033] transition hover:scale-[1.02] hover:bg-[#F8F4ED]"
          >
            Découvrir mon Human Design
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </PhoneFrame>
  );
}

export default function App() {
  const [screen, setScreen] = useState("landing");
  const [answers, setAnswers] = useState<ArchetypeKey[]>([]);
  const [lead, setLead] = useState<{ firstName: string; email: string } | null>(null);

  const resultKey = useMemo<ArchetypeKey>(() => {
    return answers.length ? scoreAnswers(answers) : "guardian";
  }, [answers]);

  function getScores() {
    const scores = {
      guardian: 0,
      seeker: 0,
      survivor: 0,
      alchemist: 0,
    };

    answers.forEach((answer) => {
      scores[answer]++;
    });

    return scores;
  }

  async function handleLeadSubmit(leadData: { firstName: string; email: string }) {
    const scores = getScores();

    const pdfMap = {
      guardian: "gardien-controle.pdf",
      seeker: "chercheur-reponses.pdf",
      survivor: "survivant-emotionnel.pdf",
      alchemist: "alchimiste-aligne.pdf",
    };

    try {
      await fetch(process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: leadData.firstName,
          email: leadData.email,
          profile: results[resultKey].label,
          guardian: scores.guardian,
          seeker: scores.seeker,
          survivor: scores.survivor,
          alchemist: scores.alchemist,
          answers,
          pdf: pdfMap[resultKey],
        }),
      });
    } catch (error) {
      console.error("Erreur Google Sheets :", error);
    }

    setLead(leadData);
    setScreen("result");
  }

  return (
    <Shell>
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35 }}
        >
          {screen === "landing" && <Landing onStart={() => setScreen("quiz")} />}

          {screen === "quiz" && (
            <ChatQuiz
              answers={answers}
              setAnswers={setAnswers}
              onComplete={() => setScreen("ready")}
            />
          )}

          {screen === "ready" && <ProfileReady onNext={() => setScreen("lead")} />}

          {screen === "lead" && <LeadCapture onSubmit={handleLeadSubmit} />}

          {screen === "result" && (
            <Result
              resultKey={resultKey}
              onRestart={() => {
                setAnswers([]);
                setLead(null);
                setScreen("landing");
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Shell>
  );
}
