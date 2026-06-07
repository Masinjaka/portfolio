"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { localeLabels, locales, type Locale } from "@/lib/locales";
import { preferenceKeys, writePreference } from "@/lib/preferences";

function CircularProgress() {
  return (
    <span
      aria-hidden="true"
      className="block h-3 w-3 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  );
}

export function LanguageSwitch() {
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("languageSwitch");
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  useEffect(() => {
    if (pendingLocale === activeLocale) {
      const timeout = window.setTimeout(() => setPendingLocale(null), 0);

      return () => window.clearTimeout(timeout);
    }
  }, [activeLocale, pendingLocale]);

  const setLocale = async (locale: Locale) => {
    if (locale === activeLocale || pendingLocale) return;

    setPendingLocale(locale);

    writePreference(preferenceKeys.locale, locale);

    try {
      const response = await fetch("/api/locale", {
        method: "POST",
        body: JSON.stringify({ locale }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Could not change language.");
      }

      router.refresh();
    } catch {
      setPendingLocale(null);
    }
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex h-8 items-center rounded-full border border-zinc-300 bg-white p-0.5 text-[0.6875rem] font-semibold text-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
    >
      {locales.map((locale) => {
        const isActive = locale === activeLocale;
        const isPending = locale === pendingLocale;

        return (
          <button
            key={locale}
            type="button"
            aria-label={localeLabels[locale].label}
            aria-pressed={isActive}
            aria-busy={isPending}
            disabled={Boolean(pendingLocale)}
            onClick={() => void setLocale(locale)}
            className={`flex h-6 min-w-7 items-center justify-center rounded-full px-2 transition disabled:cursor-wait ${
              isActive
                ? "bg-black text-white dark:bg-zinc-100 dark:text-black"
                : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {isPending ? (
              <>
                <CircularProgress />
                <span className="sr-only">{localeLabels[locale].short}</span>
              </>
            ) : (
              localeLabels[locale].short
            )}
          </button>
        );
      })}
    </div>
  );
}
