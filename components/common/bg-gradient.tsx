import { cn } from "@/lib/utils";

export default function BgGradient({ className }: { className?: string }) {
  const clipPath = "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)";

  return (
    <div className="relative isolate">
      {/* Top-left shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-20 -left-20 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{ clipPath }}
          className={cn(
            "relative w-[36rem] aspect-[1155/678] rotate-[30deg] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 opacity-20",
            className
          )}
        />
      </div>

      {/* Bottom-right shape */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-30 -right-30 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{ clipPath }}
          className={cn(
            "relative w-[36rem] aspect-[1155/678] rotate-[60deg] bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20",
            className
          )}
        />
      </div>
    </div>
  );
}
