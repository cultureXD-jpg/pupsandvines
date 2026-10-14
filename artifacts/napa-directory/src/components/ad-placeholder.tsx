import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type AdType = "leaderboard" | "medium-rectangle" | "mobile-banner";

interface AdPlaceholderProps {
  type: AdType;
  className?: string;
}

export function AdPlaceholder({ type, className }: AdPlaceholderProps) {
  return (
    <div 
      className={cn(
        "relative flex flex-col items-center justify-center bg-muted/50 border border-border overflow-hidden group",
        "before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNlN2U1ZTQiIGZpbGwtb3BhY2l0eT0iMC40Ii8+PC9zdmc+')] before:opacity-50",
        type === "leaderboard" && "w-full max-w-[728px] h-[90px] mx-auto",
        type === "medium-rectangle" && "w-full max-w-[300px] h-[250px] mx-auto",
        type === "mobile-banner" && "w-full h-[50px] mx-auto",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <span className="relative z-10 text-[10px] uppercase tracking-widest text-muted-foreground/60 mb-1">
        Advertisement
      </span>
      <span className="relative z-10 text-muted-foreground/40 font-medium font-display italic">
        {type === "leaderboard" && "728 x 90"}
        {type === "medium-rectangle" && "300 x 250"}
        {type === "mobile-banner" && "320 x 50"}
      </span>
    </div>
  );
}
