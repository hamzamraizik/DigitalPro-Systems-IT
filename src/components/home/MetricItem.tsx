import { cn } from "@/lib/utils";

interface MetricItemProps {
  value: string;
  label: string;
  inverse?: boolean;
  className?: string;
}

export const MetricItem = ({ value, label, inverse = false, className }: MetricItemProps) => (
  <div className={cn("min-w-0", className)}>
    <p className="font-display text-3xl font-semibold leading-none text-[#00AEEF] sm:text-4xl">
      {value}
    </p>
    <p className={cn("mt-2 text-sm leading-6", inverse ? "text-white/[0.58]" : "text-[#555555] dark:text-zinc-400")}>
      {label}
    </p>
  </div>
);
