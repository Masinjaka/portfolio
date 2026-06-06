"use client";

import Image from "next/image";
import { useId } from "react";
import { usePersistentPreference } from "@/hooks/use-persistent-preference";
import { preferenceKeys } from "@/lib/preferences";

type StackItem = {
  name: string;
  icon: string;
};

type StackGroupProps = {
  storageKey: string;
  title: string;
  items: StackItem[];
};

const defaultStackGroups = {};

export function StackGroup({ storageKey, title, items }: StackGroupProps) {
  const [stackGroups, setStackGroups] = usePersistentPreference(
    preferenceKeys.stackGroups,
    defaultStackGroups
  );
  const isOpen = stackGroups[storageKey] ?? true;
  const contentId = useId();

  const toggleGroup = () => {
    setStackGroups((current) => ({
      ...current,
      [storageKey]: !(current[storageKey] ?? true),
    }));
  };

  return (
    <div className="py-5 first:pt-0">
      <h2>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={contentId}
          onClick={toggleGroup}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <span className="text-2xl font-medium tracking-[-0.03em] text-black dark:text-zinc-50">
            {title}{" "}
            <span className="text-zinc-500 dark:text-zinc-400">
              ({items.length})
            </span>
          </span>
          <span
            aria-hidden="true"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition duration-300 dark:border-zinc-800 dark:text-zinc-400 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4">
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
              />
            </svg>
          </span>
        </button>
      </h2>
      <div
        id={contentId}
        className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <ul className="mt-4 flex list-none flex-wrap gap-4">
            {items.map((item) => (
              <li key={item.name} className="flex flex-col items-center gap-2">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-zinc-200 bg-white p-3 shadow-sm shadow-zinc-200/60 dark:border-zinc-800 dark:bg-zinc-950 dark:shadow-black/20">
                  <Image
                    src={item.icon}
                    alt=""
                    width={32}
                    height={32}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </span>
                <span className="max-w-20 text-center text-sm leading-5 text-zinc-700 dark:text-zinc-300">
                  {item.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-5 border-t border-zinc-200 dark:border-zinc-800" />
    </div>
  );
}
