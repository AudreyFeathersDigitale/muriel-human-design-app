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
  Waves,
  Zap,
} from "lucide-react";

const questions = [
  {
    id: 1,
    theme: "Relations",
    icon: Waves,
    question: "Quand une tension apparaît avec quelqu’un…",
    answers: [
      { key: "fire", icon: "🔥", text: "Je réagis vite, trop fort, et je regrette après." },
      { key: "water", icon: "💧", text: "Je prends sur moi, je ravale, mais ça me submerge." },
      { key: "air", icon: "〰️", text: "Je n’arrive pas à dire clairement ce que je ressens." },
      { key: "earth", icon: "🌱", text: "Je prends un temps de recul et j’exprime calmement ce que je ressens." },
    ],
  },
  {
    id: 2,
    theme: "Limites",
    icon: Heart,
    question: "Dire non pour moi…",
    answers: [
      { key: "fire", icon: "🔥", text: "Je le dis brusquement quand c’est trop tard." },
      { key: "water", icon: "💧", text: "Je ne le dis presque jamais, je culpabilise." },
      { key: "air", icon: "〰️", text: "Je tourne autour du pot sans être clair(e)." },
      { key: "earth", icon: "🌱", text: "Je dis non avec respect quand je sens que c’est correct pour moi." },
    ],
  },
  {
    id: 3,
    theme: "Relations",
    icon: Heart,
    question: "Quand je dois prendre une décision importante dans une relation…",
    answers: [
      { key: "fire", icon: "🔥", text: "Je décide sous l’émotion." },
      { key: "water", icon: "💧", text: "Je demande l’avis de tout le monde avant." },
      { key: "air", icon: "〰️", text: "Je doute tellement que je n’arrive pas à trancher." },
      { key: "earth", icon: "🌱", text: "Je prends le temps de sentir ce qui est mieux pour moi." },
    ],
  },
  {
    id: 4,
    theme: "Relations",
    icon: Waves,
    question: "Ce qui me fait le plus souffrir dans mes relations…",
    answers: [
      { key: "fire", icon: "🔥", text: "Les conflits qui explosent." },
      { key: "water", icon: "💧", text: "Me sentir submergé(e) et incompris(e)." },
      { key: "air", icon: "〰️", text: "Ne pas réussir à communiquer sereinement." },
      { key: "earth", icon: "🌱", text: "Quand je m’oublie, je sais que je dois revenir à moi." },
    ],
  },
  {
    id: 5,
    theme: "Business",
    icon: Briefcase,
    question: "Dans mon business, je me sens…",
    answers: [
      { key: "fire", icon: "🔥", text: "Toujours dans l’urgence, je fais tout trop vite." },
      { key: "water", icon: "💧", text: "Submergé(e) par trop de tâches." },
      { key: "air", icon: "〰️", text: "Perdu(e), je doute de la direction." },
      { key: "earth", icon: "🌱", text: "Globalement aligné(e), je sais prioriser ce qui est important." },
    ],
  },
  {
    id: 6,
    theme: "Décision",
    icon: Target,
    question: "Quand je dois prendre une décision stratégique…",
    answers: [
      { key: "fire", icon: "🔥", text: "Je fonce puis je corrige après." },
      { key: "water", icon: "💧", text: "J’attends trop longtemps par peur." },
      { key: "air", icon: "〰️", text: "Je réfléchis tellement que je n’agis pas." },
      { key: "earth", icon: "🌱", text: "Je prends un temps de recul pour décider avec clarté." },
    ],
  },
  {
    id: 7,
    theme: "Communication",
    icon: Mic,
    question: "Ma communication pour attirer des clients ressemble à…",
    answers: [
      { key: "fire", icon: "🔥", text: "Je poste partout, je parle fort de mes offres… je sens que je force." },
      { key: "water", icon: "💧", text: "Je communique surtout quand je panique de manquer de clients." },
      { key: "air", icon: "〰️", text: "Je me retiens, je n’ose pas prendre ma place." },
      { key: "earth", icon: "🌱", text: "Je communique avec simplicité, depuis qui je suis." },
    ],
  },
  {
    id: 8,
    theme: "Énergie",
    icon: Zap,
    question: "Mon niveau d’énergie aujourd’hui…",
    answers: [
      { key: "fire", icon: "🔥", text: "Sous tension permanente." },
      { key: "water", icon: "💧", text: "Épuisé(e) émotionnellement." },
      { key: "air", icon: "〰️", text: "Vidé(e) par le doute et la confusion." },
      { key: "earth", icon: "🌱", text: "Stable, je respecte mon énergie et mon rythme." },
    ],
  },
];

const results = {
  fire: {
    label: "Feu émotionnel",
    emoji: "🔥",
    text: "Tu vis dans la réaction et l’intensité. Tu as beaucoup d’énergie, mais aujourd’hui cette énergie part dans tous les sens.",
    relation: "Tu réagis vite, parfois trop fort. Tu dis des choses que tu regrettes ensuite. Les conflits prennent beaucoup de place.",
    business: "Tu fonces, tu fais, tu forces. Tu es souvent dans l’urgence et tu t’épuises à vouloir que tout avance vite.",
    energy: "Ton problème n’est pas le manque d’énergie. Ton problème, c’est ne pas savoir comment la canaliser.",
    next: "Ralentis avant d’agir. Reviens à ton corps, respire, puis choisis une action claire plutôt qu’une réaction immédiate.",
  },
  water: {
    label: "Eau émotionnelle",
    emoji: "💧",
    text: "Tu es submergé(e) par tes émotions. Tu ressens tout profondément, fortement, et souvent trop pour toi.",
    relation: "Tu prends sur toi pour éviter les conflits. Tu culpabilises facilement, tu t’oublies pour préserver l’autre et tu as du mal à poser tes limites.",
    business: "Tu agis depuis le doute ou la peur. Tu communiques depuis le manque, tu te compares beaucoup et tu te sens vite dépassé(e).",
    energy: "Ton problème n’est pas ta sensibilité. Ton problème, c’est ne pas savoir comment te protéger émotionnellement.",
    next: "Commence par reconnaître ce qui t’appartient vraiment. Tu n’as pas besoin d’absorber toutes les émotions autour de toi.",
  },
  air: {
    label: "Air mental",
    emoji: "〰️",
    text: "Tu es bloqué(e) dans le mental. Tu réfléchis beaucoup, tout le temps, et ça t’empêche d’avancer sereinement.",
    relation: "Tu n’arrives pas à dire clairement ce que tu ressens. Tu tournes tes phrases dans ta tête avant de parler, tu doutes de ta légitimité à t’exprimer et tu te sens souvent incompris(e).",
    business: "Tu hésites longtemps avant d’agir. Tu changes souvent de direction, tu manques de clarté et tu perds confiance dans tes décisions.",
    energy: "Ton problème n’est pas ton intelligence. Ton problème, c’est être déconnecté(e) de ton ressenti.",
    next: "Reviens à ton ressenti avant de chercher la réponse parfaite. Demande-toi simplement : qu’est-ce que je sens vraiment maintenant ?",
  },
  earth: {
    label: "Terre alignée",
    emoji: "🌱",
    text: "Tu es déjà en partie aligné(e). Tu as de bons réflexes et tu arrives parfois à communiquer calmement et à prendre des décisions alignées.",
    relation: "Tu sais que le problème revient quand tu t’oublies. Tu sens que tu pourrais aller encore plus loin dans la sérénité.",
    business: "Tu sais que tu as du potentiel, mais tu manques peut-être de clarté sur ton mode de fonctionnement naturel.",
    energy: "Ton problème n’est pas le désalignement. Ton problème, c’est ne pas connaître ton mode d’emploi précis.",
    next: "Ton Human Design peut t’aider à comprendre ton fonctionnement naturel et à appliquer concrètement tes bons réflexes.",
  },
};

function scoreAnswers(answers: string[]) {
  const score: Record<string, number> = { fire: 0, water: 0, air: 0, earth: 0 };

  answers.forEach((answer) => {
    score[answer] += 1;
  });

  return Object.entries(score).sort((a, b) => b[1] - a[1])[0][0];
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
              Découvre ton fonctionnement{" "}
              <span className="text-[#B87C00]">émotionnel et énergétique</span>
            </h1>
            <div className="mt-5 h-1.5 w-28 rounded-full bg-[#9EDFE3]" />
          </div>
          <Orb size="h-32 w-32" />
        </div>

        <p className="mt-8 text-lg leading-7 text-[#28364C]">
          Une expérience guidée par l’IA pour mieux comprendre tes réactions, ton énergie et tes décisions.
        </p>

        <div className="mt-10 space-y-7">
          {[
            [Heart, "Mieux te comprendre", "Identifie tes schémas émotionnels et relationnels."],
            [Sparkles, "Des clés concrètes", "Reçois des conseils personnalisés pour tes relations et ton business."],
            [Leaf, "Alignement et clarté", "Avance avec plus de confiance et d’énergie au quotidien."],
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
                Cette expérience m’a permis de comprendre beaucoup de choses sur moi. Un vrai déclic !
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
  answers: string[];
  setAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  onComplete: () => void;
}) {
  const [hasStarted, setHasStarted] = useState(false);
  const current = questions[answers.length];
  const progress = Math.round((answers.length / questions.length) * 100);

  function choose(key: string) {
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
              <div className="text-sm font-medium text-[#B87C00]">Coach émotionnel & énergétique</div>
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
              Je suis là pour t’aider à mieux comprendre ton fonctionnement et t’apporter plus de clarté dans
              tes relations et ton business.
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
              Réponds spontanément. Il n’y a pas de bonne ou de mauvaise réponse.
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
            Reçois ton mini-guide Human Design
          </h1>

          <p className="mt-5 text-base leading-7 text-[#3F4B5E]">
            Découvre ton fonctionnement naturel, ta façon de décider et les clés pour retrouver plus de clarté dans tes relations et ton business.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-[#E5D9C5] bg-white/60 p-5 shadow-sm">
          <div className="space-y-3 text-sm leading-6 text-[#3F4B5E]">
            <p>✓ Ton type énergétique dominant</p>
            <p>✓ Ta façon naturelle de décider</p>
            <p>✓ Pourquoi tu t’épuises émotionnellement</p>
            <p>✓ Comment retrouver plus d’alignement</p>
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

function Result({ resultKey, onRestart }: { resultKey: string; onRestart: () => void }) {
  const result = results[resultKey as keyof typeof results];

  const pdfLinks: Record<string, string> = {
    fire: "/pdfs/feu.pdf",
    water: "/pdfs/eau.pdf",
    air: "/pdfs/air.pdf",
    earth: "/pdfs/terre.pdf",
  };

  const cards = [
    [
      Heart,
      "Relations",
      result.relation,
      "bg-[#E8F9FA]",
      "text-[#13858B]",
      "bg-[#D5A021]/10",
      "text-[#D5A021]",
    ],
    [
      Briefcase,
      "Business",
      result.business,
      "bg-[#FFF4DD]",
      "text-[#B87C00]",
      "bg-[#9EDFE3]/20",
      "text-[#13858B]",
    ],
    [
      Zap,
      "Énergie",
      result.energy,
      "bg-[#E8F9FA]",
      "text-[#13858B]",
      "bg-[#D5A021]/10",
      "text-[#D5A021]",
    ],
    [
      Target,
      "Prochain pas",
      result.next,
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
              <p className="text-sm text-[#3F4B5E]">Ton état dominant actuel</p>
              <h1 className="mt-2 font-serif text-3xl text-[#B87C00]">{result.label}</h1>
              <p className="mt-3 leading-6 text-[#3F4B5E]">{result.text}</p>
            </div>
          </div>
        </div>

        <h2 className="mt-8 text-xl font-semibold">Ton aperçu personnalisé</h2>

        <div className="mt-4 grid grid-cols-2 gap-4">
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
            Le quiz révèle ton état actuel. Ton Human Design révèle ton mode d’emploi naturel.
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
  const [answers, setAnswers] = useState<string[]>([]);
  const [lead, setLead] = useState<{ firstName: string; email: string } | null>(null);

  const resultKey = useMemo(() => {
    return answers.length ? scoreAnswers(answers) : "fire";
  }, [answers]);

  function handleLeadSubmit(leadData: { firstName: string; email: string }) {
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