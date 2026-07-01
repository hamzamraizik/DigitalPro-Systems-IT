import { cn } from "@/lib/utils";

interface HardwareMockupProps {
  className?: string;
}

const rackRows = [
  { label: "Firewall", status: "Active", ports: 8 },
  { label: "Core Switch", status: "Stable", ports: 10 },
  { label: "Backup Node", status: "Synced", ports: 6 },
];

export const HardwareMockup = ({ className }: HardwareMockupProps) => (
  <div
    className={cn(
      "rounded-[8px] border border-white/[0.12] bg-[#111111] p-3 shadow-2xl shadow-black/30",
      className,
    )}
    aria-label="Infrastructure réseau sécurisée DigitalPro Systems IT"
  >
    <div className="rounded-[6px] border border-white/10 bg-black p-3">
      <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/[0.48]">
            Secure Stack
          </p>
          <p className="mt-1 font-display text-lg font-semibold text-white">Casablanca HQ</p>
        </div>
        <span className="h-2.5 w-2.5 rounded-full bg-[#00AEEF]" />
      </div>

      <div className="space-y-3">
        {rackRows.map((row) => (
          <div key={row.label} className="rounded-[6px] border border-white/10 bg-white/[0.04] p-3">
            <div className="mb-3 flex items-center justify-between gap-4">
              <p className="text-sm font-medium text-white">{row.label}</p>
              <p className="text-xs text-white/[0.48]">{row.status}</p>
            </div>
            <div className="grid grid-cols-10 gap-1.5">
              {Array.from({ length: 10 }).map((_, index) => (
                <span
                  key={`${row.label}-${index}`}
                  className={cn(
                    "h-5 rounded-[3px] border border-white/10 bg-white/10",
                    index < row.ports && "bg-[#00AEEF]/80",
                  )}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-white/[0.54]">
        <div className="rounded-[6px] border border-white/10 py-3">VPN</div>
        <div className="rounded-[6px] border border-white/10 py-3">SOC</div>
        <div className="rounded-[6px] border border-white/10 py-3">PRA</div>
      </div>
    </div>
  </div>
);
