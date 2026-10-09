import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface ThemeToggleProps {
  className?: string;
  label?: boolean;
}

const ThemeToggle = ({ className, label = false }: ThemeToggleProps) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      title={isDark ? "Mode clair" : "Mode sombre"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-colors",
        label
          ? "h-10 w-full bg-white/5 px-4 py-2 text-sm text-white hover:bg-white/10"
          : "h-9 px-3 text-white/70 hover:bg-white/10 hover:text-white",
        className,
      )}
    >
      {isDark ? <Sun className="h-[14px] w-[14px]" /> : <Moon className="h-[14px] w-[14px]" />}
      {label && (isDark ? "Clair" : "Sombre")}
    </button>
  );
};

export default ThemeToggle;