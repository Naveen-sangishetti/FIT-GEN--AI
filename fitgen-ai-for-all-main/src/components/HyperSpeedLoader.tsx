import { cn } from "@/lib/utils";

interface HyperSpeedLoaderProps {
  /** Optional message displayed under the loader */
  message?: string;
  /** Optional sub-message */
  subMessage?: string;
  /** Render as full-screen overlay */
  fullscreen?: boolean;
  className?: string;
}

/**
 * HyperSpeedLoader — animated "speeder" character with motion lines.
 * Uses `currentColor` so it inherits the surrounding text color and adapts
 * to the design system tokens (foreground / primary / etc.).
 */
export const HyperSpeedLoader = ({
  message = "Processing Request",
  subMessage = "Synchronizing with neural networks",
  fullscreen = false,
  className,
}: HyperSpeedLoaderProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center text-foreground",
        fullscreen
          ? "fixed inset-0 z-[100] bg-background/95 backdrop-blur-md"
          : "w-full min-h-[400px]",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      {/* Background motion lines */}
      <div className="hsl-longfazers absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <span />
        <span />
        <span />
        <span />
      </div>

      {/* Loader stage */}
      <div className="relative w-full max-w-md h-40">
        <div className="hsl-loader">
          <span>
            <span />
            <span />
            <span />
            <span />
          </span>
          <div className="hsl-base">
            <span />
            <div className="hsl-face" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="relative z-10 mt-8 text-center space-y-2 px-6">
        <p className="text-xl sm:text-2xl font-semibold tracking-wide">
          {message}
        </p>
        <p className="text-sm text-muted-foreground uppercase tracking-[0.2em]">
          {subMessage}
        </p>
        {/* Progress bar */}
        <div className="mt-6 mx-auto h-0.5 w-48 overflow-hidden bg-border/40 rounded-full">
          <div className="h-full w-1/3 bg-foreground hsl-progress" />
        </div>
      </div>
    </div>
  );
};

export default HyperSpeedLoader;
