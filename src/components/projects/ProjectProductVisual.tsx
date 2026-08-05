import { CalendarDays, FileCheck2, HeartPulse, PackageCheck, ReceiptText, ShoppingCart } from "lucide-react";
import type { Project } from "@/data/projectsData";

type ProjectProductVisualProps = Pick<Project, "visual" | "accent" | "accentSoft" | "name"> & {
  compact?: boolean;
};

const Dot = ({ color }: { color: string }) => (
  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
);

const ProjectProductVisual = ({
  visual,
  accent,
  accentSoft,
  name,
  compact = false,
}: ProjectProductVisualProps) => {
  const shellHeight = compact ? "h-[300px]" : "h-[420px] lg:h-[520px]";

  return (
    <div
      className={`relative mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111318] p-3 shadow-[0_45px_120px_rgba(0,0,0,0.38)] sm:p-5 ${shellHeight}`}
      aria-label={`${name} product interface preview`}
      role="img"
    >
      <div className="flex h-full flex-col overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#f5f5f7]">
        <div className="flex h-11 shrink-0 items-center gap-2 border-b border-black/5 bg-white/90 px-4">
          <Dot color="#ff5f57" />
          <Dot color="#febc2e" />
          <Dot color="#28c840" />
          <span className="ml-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            {name} · DPS-IT
          </span>
        </div>

        {visual === "health" && (
          <div className="grid min-h-0 flex-1 grid-cols-[72px_1fr] sm:grid-cols-[170px_1fr]">
            <aside className="border-r border-slate-200 bg-white p-3 sm:p-5">
              <div className="mb-8 flex items-center gap-2 font-semibold text-slate-900">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ backgroundColor: accentSoft, color: accent }}>
                  <HeartPulse className="h-4 w-4" />
                </span>
                <span className="hidden sm:inline">Cabinet</span>
              </div>
              {["Aujourd'hui", "Patients", "Consultations", "Facturation"].map((item, index) => (
                <div
                  key={item}
                  className={`mb-2 rounded-lg px-2 py-2 text-xs ${index === 0 ? "font-semibold text-slate-900" : "text-slate-400"}`}
                  style={index === 0 ? { backgroundColor: accentSoft } : undefined}
                >
                  <span className="hidden sm:inline">{item}</span>
                  <span className="mx-auto block h-2 w-2 rounded-full sm:hidden" style={{ backgroundColor: index === 0 ? accent : "#cbd5e1" }} />
                </div>
              ))}
            </aside>
            <div className="min-w-0 p-4 sm:p-7">
              <div className="mb-5 flex items-end justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Mercredi · Vue du jour</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Bonjour, Dr. Amine</h3>
                </div>
                <div className="hidden rounded-xl bg-white px-3 py-2 text-xs text-slate-500 shadow-sm sm:block">+ Nouveau patient</div>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  ["Prochain rendez-vous", "09:30", CalendarDays],
                  ["Patients aujourd'hui", "12", HeartPulse],
                  ["Dossiers à finaliser", "03", FileCheck2],
                ].map(([label, value, Icon]) => (
                  <div key={String(label)} className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                    <Icon className="mb-5 h-5 w-5" style={{ color: accent }} />
                    <p className="text-xl font-semibold text-slate-900">{value as string}</p>
                    <p className="mt-1 hidden text-[11px] text-slate-400 sm:block">{label as string}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                {["09:30 · Sara B.", "10:15 · Youssef A.", "11:00 · Lina M."].map((appointment, index) => (
                  <div key={appointment} className="flex items-center justify-between border-b border-slate-100 py-2.5 last:border-0">
                    <span className="text-xs font-medium text-slate-700">{appointment}</span>
                    <span className="h-2 w-12 rounded-full" style={{ backgroundColor: index === 0 ? accent : "#e2e8f0" }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {visual === "pos" && (
          <div className="grid min-h-0 flex-1 grid-cols-1 sm:grid-cols-[1fr_240px]">
            <div className="min-w-0 p-4 sm:p-7">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Caisse principale</p>
                  <h3 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Nouvelle vente</h3>
                </div>
                <span className="rounded-full px-3 py-1 text-[10px] font-semibold" style={{ backgroundColor: accentSoft, color: accent }}>Session ouverte</span>
              </div>
              <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
                {["Clavier mécanique", "Souris sans fil", "Écran 24 pouces", "Câble réseau", "Casque USB", "Support laptop"].map((product, index) => (
                  <div key={product} className="rounded-2xl border border-slate-100 bg-white p-3 shadow-sm">
                    <div className="mb-3 flex h-12 items-center justify-center rounded-xl" style={{ backgroundColor: index === 0 ? accentSoft : "#f1f5f9" }}>
                      <PackageCheck className="h-5 w-5" style={{ color: index === 0 ? accent : "#94a3b8" }} />
                    </div>
                    <p className="truncate text-[11px] font-medium text-slate-700">{product}</p>
                  </div>
                ))}
              </div>
            </div>
            <aside className="hidden border-l border-slate-200 bg-white p-5 sm:flex sm:flex-col">
              <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-900">
                <ShoppingCart className="h-4 w-4" style={{ color: accent }} /> Panier
              </div>
              {["Clavier mécanique", "Câble réseau", "Souris sans fil"].map((item, index) => (
                <div key={item} className="mb-3 flex justify-between gap-3 text-[11px]">
                  <span className="text-slate-500">{index + 1} × {item}</span>
                  <span className="font-semibold text-slate-800">{[449, 89, 219][index]} MAD</span>
                </div>
              ))}
              <div className="mt-auto border-t border-slate-100 pt-4">
                <div className="mb-4 flex justify-between font-semibold text-slate-900"><span>Total</span><span>757 MAD</span></div>
                <div className="rounded-xl py-3 text-center text-xs font-semibold text-white" style={{ backgroundColor: accent }}>Encaisser</div>
              </div>
            </aside>
          </div>
        )}

        {visual === "documents" && (
          <div className="min-h-0 flex-1 p-4 sm:p-7">
            <div className="mx-auto max-w-3xl">
              <div className="mb-5 text-center">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Cycle commercial</p>
                <h3 className="mt-1 text-xl font-semibold text-slate-900 sm:text-2xl">Une affaire, une histoire continue</h3>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-4">
                {[
                  ["DV-2026-041", "Devis accepté", "12 480 MAD"],
                  ["BL-2026-026", "Livraison validée", "8 articles"],
                  ["F-2026-033", "Facture émise", "12 480 MAD"],
                ].map(([number, status, total], index) => (
                  <div key={number} className="relative rounded-2xl border border-slate-100 bg-white p-3 shadow-sm sm:p-5">
                    <ReceiptText className="mb-6 h-5 w-5" style={{ color: accent }} />
                    <p className="truncate text-[10px] font-semibold text-slate-900 sm:text-xs">{number}</p>
                    <p className="mt-1 hidden text-[10px] text-slate-400 sm:block">{status}</p>
                    <p className="mt-4 text-[10px] font-semibold text-slate-700 sm:text-sm">{total}</p>
                    {index < 2 && <span className="absolute -right-4 top-1/2 z-10 hidden h-px w-4 bg-slate-300 sm:block" />}
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm sm:p-5">
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">Suivi du règlement</span>
                  <span className="text-xs font-semibold" style={{ color: accent }}>À échéance</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full w-2/3 rounded-full" style={{ backgroundColor: accent }} />
                </div>
                <div className="mt-3 flex justify-between text-[10px] text-slate-400"><span>Facturé</span><span>Partiellement réglé</span><span>Soldé</span></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectProductVisual;
