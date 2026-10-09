import type { ReactNode } from "react";

interface TechHudOverlayProps {
  icon: ReactNode;
  labels?: string[];
}

export function TechHudOverlay({
  icon,
  labels = ["ANALYSE", "DONNÉES", "ID CONFIRMÉ"],
}: TechHudOverlayProps) {
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden="true">
      <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan/50 to-transparent" />

      <span className="absolute left-4 top-4 h-10 w-10 rounded-tl-xl border-l-2 border-t-2 border-cyan/40" />
      <span className="absolute right-4 top-4 h-10 w-10 rounded-tr-xl border-r-2 border-t-2 border-cyan/40" />
      <span className="absolute right-4 bottom-4 h-8 w-8 rounded-br-xl border-r-2 border-b-2 border-cyan/30" />

      <span className="absolute right-[5.25rem] top-16 bottom-28 w-px bg-gradient-to-b from-cyan/40 via-cyan/15 to-transparent" />

      <span className="absolute right-[5.25rem] top-[1.4rem] font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan/60">
        {labels[0]}
      </span>
      <span className="absolute left-[1.5rem] top-1/2 -translate-y-1/2 font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan/60">
        {labels[1]}
      </span>
      <span className="absolute left-[4.5rem] top-1/2 h-px w-14 bg-gradient-to-r from-cyan/40 to-transparent" />
      <span className="absolute right-[5.25rem] bottom-[1.45rem] font-mono text-[9px] font-semibold uppercase tracking-[0.28em] text-cyan/60">
        {labels[2]}
      </span>

      <span className="absolute bottom-[5.25rem] right-6 grid h-12 w-12 place-items-center rounded-full border border-cyan/40">
        <span className="h-7 w-7 rounded-full border border-cyan/20" />
        <span className="absolute h-1.5 w-1.5 rounded-full bg-cyan/70 shadow-[0_0_6px_rgba(34,211,238,0.9)]" />
      </span>
      <span className="absolute bottom-[4.6rem] right-[1.15rem] h-1.5 w-1.5 rounded-full bg-cyan/50" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="absolute h-24 w-24 rounded-full bg-cyan/15 blur-2xl" />
        <span className="relative grid h-20 w-20 place-items-center rounded-2xl border border-cyan/30 bg-[#07111F]/45 backdrop-blur-sm">
          <span className="absolute inset-1 rounded-xl border border-cyan/10" />
          <span className="relative [&>svg]:drop-shadow-[0_0_14px_rgba(34,211,238,0.65)]">{icon}</span>
        </span>
        <span className="absolute top-[calc(50%+3.6rem)] left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.6em] text-cyan/25">
          010110 101101
        </span>
        <span className="absolute top-[calc(50%-4.8rem)] left-1/2 -translate-x-1/2 font-mono text-[8px] tracking-[0.6em] text-cyan/15">
          101001 011010
        </span>
      </span>
    </div>
  );
}