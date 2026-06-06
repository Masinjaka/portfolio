import type { Locale } from "./locales";

export const preferenceKeys = {
  theme: "theme",
  locale: "portfolio:locale",
  stackGroups: "portfolio:stack-groups",
} as const;

type StackGroupPreferences = Record<string, boolean>;

export type PreferenceValueMap = {
  [preferenceKeys.stackGroups]: StackGroupPreferences;
  [preferenceKeys.locale]: Locale;
};

const preferenceChangeEvent = "portfolio:preference-change";

function canUseStorage() {
  return typeof window !== "undefined" && "localStorage" in window;
}

export function readPreference<Key extends keyof PreferenceValueMap>(
  key: Key,
  fallback: PreferenceValueMap[Key]
): PreferenceValueMap[Key] {
  if (!canUseStorage()) return fallback;

  const value = window.localStorage.getItem(key);
  if (!value) return fallback;

  try {
    return JSON.parse(value) as PreferenceValueMap[Key];
  } catch {
    return fallback;
  }
}

export function writePreference<Key extends keyof PreferenceValueMap>(
  key: Key,
  value: PreferenceValueMap[Key]
) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(key, JSON.stringify(value));
  window.dispatchEvent(new Event(preferenceChangeEvent));
}

export function readPreferenceSnapshot(key: keyof PreferenceValueMap) {
  if (!canUseStorage()) return null;

  return window.localStorage.getItem(key);
}

export function subscribeToPreferences(onChange: () => void) {
  if (!canUseStorage()) return () => {};

  const handleStorage = () => onChange();

  window.addEventListener("storage", handleStorage);
  window.addEventListener(preferenceChangeEvent, handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(preferenceChangeEvent, handleStorage);
  };
}
