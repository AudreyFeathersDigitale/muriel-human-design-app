function Landing({ onStart }: { onStart: () => void }) {
  return (
    <PhoneFrame>
      <div className="flex min-h-[860px] flex-col p-7">
        <div className="text-2xl tracking-tight text-[#0E5A66]" style={{ fontFamily: "\"Amsterdam One\", cursive" }}>
          art & happy <span className="text-[#C8A96A]">⌣</span>
        </div>

        <div className="mt-12 grid grid-cols-[1fr_auto] items-center gap-4">
          <div>
            <h1 className="font-semibold text-[44px] leading-[1.05] tracking-tight">
              Découvre ton profil intérieur{" "}
              <span className="text-[#C8A96A]">et ta Zone de Génie</span>
            </h1>
            <div className="mt-5 h-1.5 w-28 rounded-full bg-[#2CBCC3]" />
          </div>
          <Orb size="h-32 w-32" />
        </div>