"use client";

import { useTranslations } from "next-intl";
import { useState, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { preferenceKeys } from "@/lib/preferences";

type ThemeName = "light" | "dark";

function getCurrentTheme(): ThemeName {
  if (typeof document === "undefined") {
    return "light";
  }

  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function persistTheme(theme: ThemeName) {
  try {
    window.localStorage.setItem(preferenceKeys.theme, theme);
  } catch {
    // Ignore storage failures; the visible theme has still changed.
  }
}

function disableCssTransitions() {
  const style = document.createElement("style");
  style.textContent =
    "*,*::before,*::after{-webkit-transition:none!important;transition:none!important}";
  document.head.appendChild(style);

  return () => {
    window.getComputedStyle(document.body);
    style.remove();
  };
}

function MoonIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07 6.7 17.3M17.3 6.7l1.77-1.77" />
    </svg>
  );
}

export function ThemeToggle() {
  const t = useTranslations("theme");
  const [theme, setTheme] = useState<ThemeName>(() => getCurrentTheme());
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = mounted && theme === "dark";

  const toggleTheme = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!mounted) return;

    const root = document.documentElement;
    if (root.classList.contains("theme-ripple-transition")) return;

    const nextTheme: ThemeName = getCurrentTheme() === "dark" ? "light" : "dark";
    const supportsTransition = "startViewTransition" in document;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const { clientX, clientY, currentTarget } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX || rect.left + rect.width / 2;
    const y = clientY || rect.top + rect.height / 2;

    const applyTheme = () => {
      flushSync(() => {
        setTheme(nextTheme);
      });
      root.classList.toggle("dark", nextTheme === "dark");
      root.style.colorScheme = nextTheme;
      persistTheme(nextTheme);
    };

    const restoreCssTransitions = disableCssTransitions();
    const finishThemeChange = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          root.classList.remove("theme-ripple-transition");
          root.style.removeProperty("--theme-ripple-x");
          root.style.removeProperty("--theme-ripple-y");
          root.style.removeProperty("--theme-ripple-radius");
          restoreCssTransitions();
        });
      });
    };

    if (!supportsTransition || prefersReducedMotion) {
      applyTheme();
      finishThemeChange();
      return;
    }

    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    root.style.setProperty("--theme-ripple-x", `${x}px`);
    root.style.setProperty("--theme-ripple-y", `${y}px`);
    root.style.setProperty("--theme-ripple-radius", `${endRadius}px`);
    root.classList.add("theme-ripple-transition");

    const transition = document.startViewTransition(() => {
      applyTheme();
    });

    const rippleAnimationFinished = transition.ready.then(() => {
      const animation = root.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${endRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 650,
          easing: "cubic-bezier(0.22, 1, 0.36, 1)",
          fill: "both",
          pseudoElement: "::view-transition-new(root)",
        }
      );

      return animation.finished;
    });

    void Promise.allSettled([
      transition.finished,
      rippleAnimationFinished,
    ]).finally(finishThemeChange);
  };

  return (
    <button
      type="button"
      aria-label={
        !mounted
          ? t("toggle")
          : isDark
          ? t("light")
          : t("dark")
      }
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-black no-underline dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
    >
      {isDark ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
