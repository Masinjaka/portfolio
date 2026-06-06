"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { localeLabels, locales, type Locale } from "@/lib/locales";
import { preferenceKeys, writePreference } from "@/lib/preferences";

export function LanguageSwitch() {
  const activeLocale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations("languageSwitch");

  const setLocale = async (locale: Locale) => {
    if (locale === activeLocale) return;

    writePreference(preferenceKeys.locale, locale);

    await fetch("/api/locale", {
      method: "POST",
      body: JSON.stringify({ locale }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    router.refresh();
  };

  return (
    <div
      role="group"
      aria-label={t("label")}
      className="flex h-9 items-center rounded-full border border-zinc-300 bg-white p-0.5 text-xs font-semibold text-black dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300"
    >
      {locales.map((locale) => {
        const isActive = locale === activeLocale;

        return (
          <button
            key={locale}
            type="button"
            aria-label={localeLabels[locale].label}
            aria-pressed={isActive}
            onClick={() => void setLocale(locale)}
            className={`h-7 min-w-8 rounded-full px-2 transition ${
              isActive
                ? "bg-black text-white dark:bg-zinc-100 dark:text-black"
                : "text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-zinc-100"
            }`}
          >
            {localeLabels[locale].short}
          </button>
        );
      })}
    </div>
  );
}
