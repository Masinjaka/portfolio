"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

type FormStatus = "idle" | "sending" | "sent" | "error";
type Toast = {
  status: Extract<FormStatus, "sent" | "error">;
  message: string;
};

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [toast, setToast] = useState<Toast | null>(null);
  const [isToastVisible, setIsToastVisible] = useState(false);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const animationFrameId = window.requestAnimationFrame(() => {
      setIsToastVisible(true);
    });
    const timeoutId = window.setTimeout(() => {
      setIsToastVisible(false);
    }, 5000);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.clearTimeout(timeoutId);
    };
  }, [toast]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setIsToastVisible(false);
    setToast(null);

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(Object.fromEntries(formData)),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || t("errorDefault"));
      }

      form.reset();
      setStatus("sent");
      setIsToastVisible(false);
      setToast({ status: "sent", message: t("sent") });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : t("errorFallback");

      setStatus("error");
      setIsToastVisible(false);
      setToast({ status: "error", message: errorMessage });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-8 max-w-2xl">
        <div className="grid gap-4">
          <label className="grid gap-2">
            <span className="text-base font-medium text-zinc-600 dark:text-zinc-400">
              {t("name")}
            </span>
            <input
              name="name"
              type="text"
              required
              autoComplete="name"
              className="rounded-3xl border border-zinc-200 bg-white px-5 py-3 text-base text-black outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-base font-medium text-zinc-600 dark:text-zinc-400">
              {t("email")}
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="rounded-3xl border border-zinc-200 bg-white px-5 py-3 text-base text-black outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </label>

          <label className="grid gap-2">
            <span className="text-base font-medium text-zinc-600 dark:text-zinc-400">
              {t("inquiry")}
            </span>
            <textarea
              name="inquiry"
              required
              rows={5}
              className="resize-none rounded-3xl border border-zinc-200 bg-white px-5 py-3 text-base leading-7 text-black outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:focus:border-zinc-600"
            />
          </label>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-11 w-44 shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-black bg-black px-4 text-base font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-100 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
          >
            {status === "sending" ? t("sending") : t("send")}
          </button>
        </div>
      </form>

      {toast ? (
        <div
          className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4 sm:bottom-8"
        >
          <div
            role={toast.status === "error" ? "alert" : "status"}
            aria-live={toast.status === "error" ? "assertive" : "polite"}
            data-state={isToastVisible ? "open" : "closing"}
            onTransitionEnd={(event) => {
              if (
                event.propertyName === "transform" &&
                !isToastVisible
              ) {
                setToast(null);
              }
            }}
            className={`contact-toast w-full max-w-md rounded-xl border border-black/20 px-5 py-4 text-center text-base font-bold leading-6 text-black shadow-lg ${
              toast.status === "error" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
    </>
  );
}
