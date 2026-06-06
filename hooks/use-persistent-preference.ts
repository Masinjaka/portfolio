"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import {
  readPreference,
  readPreferenceSnapshot,
  subscribeToPreferences,
  writePreference,
  type PreferenceValueMap,
} from "@/lib/preferences";

export function usePersistentPreference<Key extends keyof PreferenceValueMap>(
  key: Key,
  fallback: PreferenceValueMap[Key]
) {
  const snapshot = useSyncExternalStore(
    subscribeToPreferences,
    () => readPreferenceSnapshot(key),
    () => null
  );
  const value = useMemo(() => {
    if (!snapshot) return fallback;

    try {
      return JSON.parse(snapshot) as PreferenceValueMap[Key];
    } catch {
      return fallback;
    }
  }, [fallback, snapshot]);

  const updateValue = useCallback(
    (nextValue: typeof value | ((current: typeof value) => typeof value)) => {
      const current = readPreference(key, fallback);
      const resolvedValue =
        typeof nextValue === "function"
          ? (nextValue as (current: typeof value) => typeof value)(current)
          : nextValue;

      writePreference(key, resolvedValue);
    },
    [fallback, key]
  );

  return [value, updateValue] as const;
}
