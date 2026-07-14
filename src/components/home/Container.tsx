import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Container = ({ children, className, ...props }: ContainerProps) => (
  <div className={cn("container mx-auto px-4 sm:px-6 lg:px-8", className)} {...props}>
    {children}
  </div>
);
