export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localeCookieName = "NEXT_LOCALE";

export const localeLabels: Record<Locale, { short: string; label: string }> = {
  en: {
    short: "EN",
    label: "English",
  },
  fr: {
    short: "FR",
    label: "Français",
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.some((locale) => locale === value);
}
