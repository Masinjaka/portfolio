import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Providers } from "@/components/providers";
import { getCurrentLocale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masinjaka Andrianomentsoa",
  description:
    "Mobile & Web Developer specializing in Flutter, Dart, cross-platform apps, and IoT product interfaces.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getCurrentLocale();
  return (
    <html lang={locale} suppressHydrationWarning className="h-full antialiased">
      <body className="min-h-full">
        <NextIntlClientProvider>
          <Providers>
            <Header />
            {children}
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
