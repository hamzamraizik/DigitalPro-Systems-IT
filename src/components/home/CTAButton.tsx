import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CTAButtonProps {
  to: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
}

export const CTAButton = ({ to, children, variant = "primary", className }: CTAButtonProps) => (
  <Button
    asChild
    size="lg"
    variant={variant === "primary" ? "hero" : "heroOutline"}
    className={cn(
      "group h-12 rounded-[8px] px-5 text-sm sm:px-6 sm:text-base",
      "transition-transform duration-300 hover:-translate-y-0.5",
      className,
    )}
  >
    <Link to={to}>
      {children}
      {variant === "primary" && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      )}
    </Link>
  </Button>
);
