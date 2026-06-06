"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import profilePhoto from "@/public/images/nobacks.png";
import { LanguageSwitch } from "./language-switch";
import { ThemeToggle } from "./theme-toggle";

const navigationItems = [
  { key: "work", href: "#work" },
  { key: "stack", href: "#stack" },
  { key: "projects", href: "#projects" },
  { key: "contact", href: "#contact" },
] as const;

const cvDownloadUrl =
  "https://drive.google.com/uc?export=download&id=1RaVwiixzuxsWvBEyoQixmTRfS36g2-xm";

export function Header() {
  const t = useTranslations("navigation");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [shouldShowProfile, setShouldShowProfile] = useState(false);
  const isProjectDetailPage = pathname.startsWith("/projects/");

  useEffect(() => {
    if (isProjectDetailPage) return;

    const presentation = document.getElementById("presentation");

    if (!presentation) {
      return;
    }

    const updateProfileVisibility = (isPresentationVisible: boolean) => {
      setShouldShowProfile(!isPresentationVisible && window.scrollY > 80);
    };

    const observer = new IntersectionObserver(
      ([entry]) => updateProfileVisibility(entry.isIntersecting),
      {
        rootMargin: "-68px 0px 0px 0px",
        threshold: 0,
      }
    );

    const handleScroll = () => {
      const rect = presentation.getBoundingClientRect();
      updateProfileVisibility(rect.bottom > 68);
    };

    observer.observe(presentation);
    window.addEventListener("scroll", handleScroll, { passive: true });
    const initialFrame = window.requestAnimationFrame(handleScroll);

    return () => {
      window.cancelAnimationFrame(initialFrame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isProjectDetailPage]);

  if (isProjectDetailPage) {
    return null;
  }

  const profileAvatarClassName = `relative flex h-9 shrink-0 items-center overflow-hidden transition-[width,opacity,transform,margin] duration-300 ease-out ${
    shouldShowProfile
      ? "mr-6 w-9 scale-100 opacity-100"
      : "mr-0 w-0 scale-75 opacity-0"
  }`;

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-white/95 py-4 backdrop-blur dark:bg-zinc-950/95">
        <div className="container">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 items-center">
              <span aria-hidden="true" className={profileAvatarClassName}>
                <span className="relative block h-9 w-9 overflow-hidden rounded-full border border-black/10 bg-white shadow-sm shadow-zinc-200/80 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/30">
                  <Image
                    src={profilePhoto}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="2.25rem"
                  />
                </span>
              </span>

              <nav
                aria-label={t("primaryLabel")}
                className="hidden min-w-0 flex-1 md:block"
              >
                <div className="flex flex-wrap items-center justify-start gap-x-6 gap-y-2 lg:gap-x-8">
                  {navigationItems.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      className="text-[21px] font-normal tracking-[-0.02em] text-black no-underline dark:text-zinc-300"
                    >
                      {t(item.key)}
                    </a>
                  ))}
                </div>
              </nav>
            </div>

            <div className="flex shrink-0 items-center justify-end gap-2">
              <a
                href={cvDownloadUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={t("downloadCv")}
                className="mr-4 inline-flex h-9 items-center justify-center rounded-full bg-[#10B981] px-3 text-sm font-semibold text-[#111816] no-underline transition hover:bg-[#0ea574] hover:no-underline sm:px-4"
              >
                <span className="sm:hidden">CV</span>
                <span className="hidden sm:inline">{t("downloadCv")}</span>
              </a>
              <ThemeToggle />
              <LanguageSwitch />
              <button
                type="button"
                aria-controls="mobile-navigation"
                aria-expanded={isMenuOpen}
                aria-label={
                  isMenuOpen ? t("closeMenu") : t("openMenu")
                }
                onClick={() => setIsMenuOpen((open) => !open)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-black no-underline dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300 md:hidden"
              >
                <span aria-hidden="true" className="relative h-3.5 w-4">
                  <span
                    className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform ${
                      isMenuOpen ? "translate-y-[7px] rotate-45" : ""
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-[7px] h-px w-4 bg-current transition-opacity ${
                      isMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute bottom-0 left-0 h-px w-4 bg-current transition-transform ${
                      isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>

          <nav
            id="mobile-navigation"
            aria-label={t("mobileLabel")}
            className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 md:hidden ${
              isMenuOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="min-h-0">
              <div className="mt-5 flex flex-col gap-3 rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
                {navigationItems.map((item) => (
                  <a
                    key={item.key}
                    href={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-2xl font-medium tracking-[-0.03em] text-black no-underline dark:text-zinc-100"
                  >
                    {t(item.key)}
                  </a>
                ))}
                <a
                  href={cvDownloadUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#10B981] px-4 text-base font-semibold text-[#111816] no-underline transition hover:bg-[#0ea574] hover:no-underline"
                >
                  {t("downloadCv")}
                </a>
              </div>
            </div>
          </nav>
        </div>
      </header>
      <div aria-hidden="true" className="h-[68px]" />
    </>
  );
}
