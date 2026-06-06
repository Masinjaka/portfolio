import { getRequestConfig } from "next-intl/server";
import { getCurrentLocale, getMessages } from "@/lib/i18n";

export default getRequestConfig(async () => {
  const locale = await getCurrentLocale();

  return {
    locale,
    messages: getMessages(locale),
  };
});
