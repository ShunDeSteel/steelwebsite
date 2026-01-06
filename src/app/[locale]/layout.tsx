import {NextIntlClientProvider} from "next-intl";
import {getMessages, setRequestLocale} from "next-intl/server";
import {notFound} from "next/navigation";
import type {ReactNode} from "react";

import {SiteFooter} from "@/components/SiteFooter";
import {SiteHeader} from "@/components/SiteHeader";
import {isLocale, routing} from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="min-h-dvh bg-white text-zinc-950 dark:bg-black dark:text-white">
        <SiteHeader locale={locale} />
        <main className="mx-auto w-full max-w-7xl px-6 py-12 2xl:max-w-[1440px]">
          {children}
        </main>
        <SiteFooter locale={locale} />
      </div>
    </NextIntlClientProvider>
  );
}


