// components/atoms/Card.tsx
import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
}

export function Card({ children, className, glow }: CardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-surface-border bg-surface-card p-5 overflow-hidden",
        "transition-all duration-300",
        glow && "hover:border-sky-500/30 hover:shadow-lg hover:shadow-sky-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}
