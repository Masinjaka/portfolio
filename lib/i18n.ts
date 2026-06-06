import { cookies } from "next/headers";
import enMessages from "@/messages/en.json";
import frMessages from "@/messages/fr.json";
import { defaultLocale, isLocale, localeCookieName, type Locale } from "./locales";

const messagesByLocale = {
  en: enMessages,
  fr: frMessages,
};

export async function getCurrentLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const locale = cookieStore.get(localeCookieName)?.value;

  return isLocale(locale) ? locale : defaultLocale;
}

export function getMessages(locale: Locale) {
  return messagesByLocale[locale];
}
