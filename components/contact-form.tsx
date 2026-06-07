"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

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
      setMessage(t("sent"));
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : t("errorFallback")
      );
    }
  };

  return (
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
          className="w-fit rounded-full border border-black bg-black px-5 py-3 text-base font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-100 dark:bg-zinc-100 dark:text-black dark:hover:bg-zinc-300"
        >
          {status === "sending" ? t("sending") : t("send")}
        </button>

        {message ? (
          <p
            className={`text-base leading-6 ${
              status === "error"
                ? "text-red-600 dark:text-red-400"
                : "text-zinc-600 dark:text-zinc-400"
            }`}
          >
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
