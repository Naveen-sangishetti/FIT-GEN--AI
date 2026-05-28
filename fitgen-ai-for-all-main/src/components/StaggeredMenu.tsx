/**
 * StaggeredMenu — premium GSAP-driven navigation with multi-layer entrance.
 * Adapted from sd-components, themed via semantic tokens & wired to react-router.
 */
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export interface StaggeredMenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  link: string;
}

export interface StaggeredMenuProps {
  position?: "left" | "right";
  colors?: string[];
  items?: StaggeredMenuItem[];
  socialItems?: StaggeredMenuSocialItem[];
  displaySocials?: boolean;
  displayItemNumbering?: boolean;
  className?: string;
  logo?: React.ReactNode;
  menuButtonColor?: string;
  openMenuButtonColor?: string;
  changeMenuColorOnOpen?: boolean;
  accentColor?: string;
  isFixed?: boolean;
  closeOnClickAway?: boolean;
  onItemClick?: (item: StaggeredMenuItem) => void;
  onMenuOpen?: () => void;
  onMenuClose?: () => void;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  position = "right",
  colors = ["#1a1a1b", "#2a2a2b", "#ffffff"],
  items = [],
  socialItems = [],
  displaySocials = true,
  displayItemNumbering = true,
  className,
  logo,
  menuButtonColor = "currentColor",
  openMenuButtonColor = "#000000",
  changeMenuColorOnOpen = true,
  accentColor = "#5227FF",
  isFixed = false,
  closeOnClickAway = true,
  onItemClick,
  onMenuOpen,
  onMenuClose,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const preLayerElsRef = useRef<HTMLElement[]>([]);
  const plusHRef = useRef<HTMLSpanElement | null>(null);
  const plusVRef = useRef<HTMLSpanElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>(["Menu", "Close"]);

  const openTlRef = useRef<gsap.core.Timeline | null>(null);
  const closeTweenRef = useRef<gsap.core.Tween | null>(null);
  const spinTweenRef = useRef<gsap.core.Timeline | null>(null);
  const textCycleAnimRef = useRef<gsap.core.Tween | null>(null);
  const colorTweenRef = useRef<gsap.core.Tween | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const busyRef = useRef(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const preContainer = preLayersRef.current;
      const plusH = plusHRef.current;
      const plusV = plusVRef.current;
      const icon = iconRef.current;
      const textInner = textInnerRef.current;
      if (!panel || !plusH || !plusV || !icon || !textInner) return;

      let preLayers: HTMLElement[] = [];
      if (preContainer) {
        preLayers = Array.from(
          preContainer.querySelectorAll(".sm-prelayer"),
        ) as HTMLElement[];
      }
      preLayerElsRef.current = preLayers;

      const offscreen = position === "left" ? -100 : 100;
      gsap.set([panel, ...preLayers], { xPercent: offscreen });
      gsap.set(plusH, { transformOrigin: "50% 50%", rotate: 0 });
      gsap.set(plusV, { transformOrigin: "50% 50%", rotate: 90 });
      gsap.set(icon, { rotate: 0, transformOrigin: "50% 50%" });
      gsap.set(textInner, { yPercent: 0 });
      if (toggleBtnRef.current)
        gsap.set(toggleBtnRef.current, { color: menuButtonColor });
    });
    return () => ctx.revert();
  }, [menuButtonColor, position]);

  const buildOpenTimeline = useCallback(() => {
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return null;

    openTlRef.current?.kill();
    if (closeTweenRef.current) {
      closeTweenRef.current.kill();
      closeTweenRef.current = null;
    }

    const itemEls = Array.from(
      panel.querySelectorAll(".sm-panel-itemLabel"),
    ) as HTMLElement[];
    const socialTitle = panel.querySelector(
      ".sm-socials-title",
    ) as HTMLElement | null;
    const socialLinks = Array.from(
      panel.querySelectorAll(".sm-socials-link"),
    ) as HTMLElement[];

    const layerStates = layers.map((el) => ({
      el,
      start: Number(gsap.getProperty(el, "xPercent")),
    }));
    const panelStart = Number(gsap.getProperty(panel, "xPercent"));

    if (itemEls.length) gsap.set(itemEls, { yPercent: 140, rotate: 10 });
    if (socialTitle) gsap.set(socialTitle, { opacity: 0 });
    if (socialLinks.length) gsap.set(socialLinks, { y: 25, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    layerStates.forEach((ls, i) => {
      tl.fromTo(
        ls.el,
        { xPercent: ls.start },
        { xPercent: 0, duration: 0.5, ease: "power4.out" },
        i * 0.07,
      );
    });

    const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
    const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
    const panelDuration = 0.65;

    tl.fromTo(
      panel,
      { xPercent: panelStart },
      { xPercent: 0, duration: panelDuration, ease: "power4.out" },
      panelInsertTime,
    );

    if (itemEls.length) {
      const itemsStart = panelInsertTime + panelDuration * 0.15;
      tl.to(
        itemEls,
        {
          yPercent: 0,
          rotate: 0,
          duration: 1,
          ease: "power4.out",
          stagger: { each: 0.1, from: "start" },
        },
        itemsStart,
      );
    }

    if (socialTitle || socialLinks.length) {
      const socialsStart = panelInsertTime + panelDuration * 0.4;
      if (socialTitle)
        tl.to(
          socialTitle,
          { opacity: 1, duration: 0.5, ease: "power2.out" },
          socialsStart,
        );
      if (socialLinks.length) {
        tl.to(
          socialLinks,
          {
            y: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            stagger: { each: 0.08, from: "start" },
          },
          socialsStart + 0.04,
        );
      }
    }

    openTlRef.current = tl;
    return tl;
  }, []);

  const playOpen = useCallback(() => {
    if (busyRef.current) return;
    busyRef.current = true;
    const tl = buildOpenTimeline();
    if (tl) {
      tl.eventCallback("onComplete", () => {
        busyRef.current = false;
      });
      tl.play(0);
    } else {
      busyRef.current = false;
    }
  }, [buildOpenTimeline]);

  const playClose = useCallback(() => {
    openTlRef.current?.kill();
    openTlRef.current = null;
    const panel = panelRef.current;
    const layers = preLayerElsRef.current;
    if (!panel) return;

    const all: HTMLElement[] = [...layers, panel];
    closeTweenRef.current?.kill();
    const offscreen = position === "left" ? -100 : 100;

    closeTweenRef.current = gsap.to(all, {
      xPercent: offscreen,
      duration: 0.35,
      ease: "power3.in",
      stagger: { each: 0.05, from: "end" },
      overwrite: "auto",
      onComplete: () => {
        busyRef.current = false;
      },
    });
  }, [position]);

  const animateIcon = useCallback((opening: boolean) => {
    const icon = iconRef.current;
    const h = plusHRef.current;
    const v = plusVRef.current;
    if (!icon || !h || !v) return;

    spinTweenRef.current?.kill();
    if (opening) {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power4.out" } })
        .to(h, { rotate: 45, duration: 0.5 }, 0)
        .to(v, { rotate: -45, duration: 0.5 }, 0);
    } else {
      spinTweenRef.current = gsap
        .timeline({ defaults: { ease: "power3.inOut" } })
        .to(h, { rotate: 0, duration: 0.35 }, 0)
        .to(v, { rotate: 90, duration: 0.35 }, 0);
    }
  }, []);

  const animateColor = useCallback(
    (opening: boolean) => {
      const btn = toggleBtnRef.current;
      if (!btn) return;
      colorTweenRef.current?.kill();

      if (changeMenuColorOnOpen) {
        const targetColor = opening ? openMenuButtonColor : menuButtonColor;
        colorTweenRef.current = gsap.to(btn, {
          color: targetColor,
          delay: 0.18,
          duration: 0.3,
          ease: "power2.out",
        });
      }
    },
    [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen],
  );

  const animateText = useCallback((opening: boolean) => {
    const inner = textInnerRef.current;
    if (!inner) return;
    textCycleAnimRef.current?.kill();

    const seq = opening ? ["Menu", "...", "Close"] : ["Close", "...", "Menu"];
    setTextLines(seq);
    gsap.set(inner, { yPercent: 0 });

    const lineCount = seq.length;
    const finalShift = ((lineCount - 1) / lineCount) * 100;

    textCycleAnimRef.current = gsap.to(inner, {
      yPercent: -finalShift,
      duration: 0.5,
      ease: "power4.out",
    });
  }, []);

  const toggleMenu = useCallback(() => {
    const target = !openRef.current;
    openRef.current = target;
    setOpen(target);

    if (target) {
      onMenuOpen?.();
      playOpen();
    } else {
      onMenuClose?.();
      playClose();
    }

    animateIcon(target);
    animateColor(target);
    animateText(target);
  }, [
    playOpen,
    playClose,
    animateIcon,
    animateColor,
    animateText,
    onMenuOpen,
    onMenuClose,
  ]);

  useEffect(() => {
    if (!closeOnClickAway || !open) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        toggleMenu();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeOnClickAway, open, toggleMenu]);

  const handleItemClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    item: StaggeredMenuItem,
  ) => {
    if (onItemClick) {
      e.preventDefault();
      onItemClick(item);
      // close after a tiny delay so the user sees the action
      if (openRef.current) toggleMenu();
    }
  };

  const panelBg = colors[colors.length - 1] ?? "#ffffff";
  const layerColors = colors.slice(0, -1);

  return (
    <div
      className={cn(
        isFixed ? "fixed" : "absolute",
        "top-0 left-0 w-full h-screen z-[100] pointer-events-none",
        className,
      )}
    >
      <div className="relative w-full h-full">
        {/* Layer Backgrounds */}
        <div
          ref={preLayersRef}
          className={cn(
            "absolute top-0 h-full pointer-events-none",
            position === "right" ? "right-0" : "left-0",
          )}
          style={{ width: "min(100%, 420px)" }}
          aria-hidden
        >
          {layerColors.map((c, i) => (
            <div
              key={i}
              className="sm-prelayer absolute inset-0"
              style={{ background: c }}
            />
          ))}
        </div>

        {/* Header with Logo & Toggle */}
        <header className="absolute top-0 left-0 w-full flex items-center justify-between px-6 py-4 pointer-events-auto z-20">
          <div className="flex items-center gap-3">{logo}</div>

          <button
            ref={toggleBtnRef}
            type="button"
            onClick={toggleMenu}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex items-center gap-3 font-semibold text-sm uppercase tracking-wider focus:outline-none"
            style={{ color: menuButtonColor }}
          >
            <span className="relative h-5 overflow-hidden inline-block">
              <span
                ref={textInnerRef}
                className="flex flex-col leading-5 text-right"
              >
                {textLines.map((line, i) => (
                  <span key={i} className="block h-5">
                    {line}
                  </span>
                ))}
              </span>
            </span>

            <span
              ref={iconRef}
              className="relative inline-block w-5 h-5"
              aria-hidden
            >
              <span
                ref={plusHRef}
                className="absolute top-1/2 left-0 w-full h-[2px] bg-current -translate-y-1/2"
              />
              <span
                ref={plusVRef}
                className="absolute top-0 left-1/2 h-full w-[2px] bg-current -translate-x-1/2"
              />
            </span>
          </button>
        </header>

        {/* Menu Panel */}
        <aside
          ref={panelRef}
          className={cn(
            "absolute top-0 h-full pointer-events-auto flex flex-col px-8 sm:px-14 py-24 overflow-y-auto",
            position === "right" ? "right-0" : "left-0",
          )}
          style={{
            background: panelBg,
            color: "#0a0a0a",
            width: "min(100%, 420px)",
          }}
          aria-hidden={!open}
        >
          <nav aria-label="Primary" className="flex-1">
            <ul className="space-y-2 sm:space-y-3">
              {items.map((item, idx) => (
                <li key={item.label} className="overflow-hidden">
                  <a
                    href={item.link}
                    aria-label={item.ariaLabel}
                    onClick={(e) => handleItemClick(e, item)}
                    className="sm-panel-item flex items-baseline gap-4 group"
                  >
                    {displayItemNumbering && (
                      <span
                        className="sm-panel-itemLabel text-sm font-mono opacity-60"
                        style={{ color: accentColor }}
                      >
                        {(idx + 1).toString().padStart(2, "0")}
                      </span>
                    )}
                    <span
                      className="sm-panel-itemLabel inline-block text-4xl sm:text-5xl font-bold leading-tight tracking-tight transition-colors duration-200"
                      style={
                        {
                          "--accent": accentColor,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = accentColor)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "")
                      }
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {displaySocials && socialItems.length > 0 && (
            <div className="mt-12 pt-8 border-t border-black/10">
              <p className="sm-socials-title text-xs uppercase tracking-[0.3em] opacity-60 mb-4">
                Socials
              </p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2">
                {socialItems.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="sm-socials-link text-sm font-medium hover:opacity-60 transition-opacity"
                      style={{ color: accentColor }}
                    >
                      {social.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default StaggeredMenu;
