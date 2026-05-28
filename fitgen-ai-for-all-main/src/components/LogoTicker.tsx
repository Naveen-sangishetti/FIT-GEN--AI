import { cn } from "@/lib/utils";
import {
  Apple,
  Dumbbell,
  Flame,
  HeartPulse,
  Leaf,
  Salad,
  Trophy,
  Zap,
  Activity,
  Award,
} from "lucide-react";

interface Logo {
  name: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const LOGOS: Logo[] = [
  { name: "PulseFit", Icon: HeartPulse },
  { name: "IronCore", Icon: Dumbbell },
  { name: "BlazeNutri", Icon: Flame },
  { name: "GreenFuel", Icon: Leaf },
  { name: "FreshBowl", Icon: Salad },
  { name: "PeakPro", Icon: Trophy },
  { name: "VoltGym", Icon: Zap },
  { name: "VitaTrack", Icon: Activity },
  { name: "GoldMedal", Icon: Award },
  { name: "PureCrunch", Icon: Apple },
];

interface LogoTickerProps {
  title?: string;
  className?: string;
}

/**
 * LogoTicker — horizontally scrolling marquee of partner / client logos.
 * Features:
 *  - Seamless infinite loop (content duplicated)
 *  - Gradient edge fade via mask-image
 *  - Pause on hover
 *  - Fully responsive, theme-aware (uses semantic tokens)
 */
export const LogoTicker = ({
  title = "Trusted by athletes & nutrition partners worldwide",
  className,
}: LogoTickerProps) => {
  return (
    <section
      className={cn(
        "relative w-full py-12 sm:py-16 bg-background/40 backdrop-blur-sm border-y border-border/50",
        className,
      )}
      aria-label="Partner logos"
    >
      <div className="container mx-auto px-6 mb-8 text-center">
        <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-muted-foreground">
          {title}
        </p>
      </div>

      <div
        className="group relative w-full overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <div className="flex w-max animate-marquee gap-12 sm:gap-16 group-hover:[animation-play-state:paused]">
          {[...LOGOS, ...LOGOS].map(({ name, Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-3 text-muted-foreground transition-colors duration-300 hover:text-foreground"
            >
              <Icon className="h-7 w-7 sm:h-8 sm:w-8" />
              <span className="text-lg sm:text-xl font-semibold tracking-wide whitespace-nowrap">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoTicker;
