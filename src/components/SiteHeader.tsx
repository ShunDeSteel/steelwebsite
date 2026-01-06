import Image from "next/image";
import Link from "next/link";
import {getTranslations} from "next-intl/server";
import type {ReactNode} from "react";

import type {Locale} from "@/i18n/routing";
import {asset} from "@/lib/asset";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white"
    >
      {children}
    </Link>
  );
}

export async function SiteHeader({locale}: {locale: Locale}) {
  const t = await getTranslations({locale, namespace: "site"});

  return (
    <header className="border-b border-black/5 bg-white/80 backdrop-blur dark:border-white/10 dark:bg-black/40">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 2xl:max-w-[1440px]">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-black/10 bg-white dark:border-white/15">
            <Image
              src={asset("/images/logo.png")}
              alt={t("name")}
              fill
              sizes="40px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-zinc-950 dark:text-white">
              {t("name")}
            </div>
            <div className="truncate text-xs text-zinc-600 dark:text-zinc-400">
              {t("tagline")}
            </div>
          </div>
        </div>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink href={`/${locale}`}>{t("nav.home")}</NavLink>
          <NavLink href={`/${locale}/products`}>{t("nav.products")}</NavLink>
          <NavLink href={`/${locale}/about`}>{t("nav.about")}</NavLink>
          <NavLink href={`/${locale}/contact`}>{t("nav.contact")}</NavLink>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={locale === "zh" ? "/en" : "/zh"}
            className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
          >
            {locale === "zh" ? "English" : "中文"}
          </Link>
        </div>
      </div>
    </header>
  );
}


