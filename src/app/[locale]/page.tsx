import Image from "next/image";
import Link from "next/link";
import {getTranslations, setRequestLocale} from "next-intl/server";

import {isLocale} from "@/i18n/routing";
import {asset} from "@/lib/asset";

export default async function HomePage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!isLocale(locale)) return null;

  setRequestLocale(locale);

  const tHome = await getTranslations({locale, namespace: "home"});
  const tSite = await getTranslations({locale, namespace: "site"});

  return (
    <div className="space-y-12">
      <section className="relative overflow-hidden rounded-3xl border border-black/5 bg-zinc-950 dark:border-white/10">
        <div className="absolute inset-0">
          <Image
            src={asset("/images/home/hero-aerial.png")}
            alt={tSite("name")}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 1200px"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/10" />
        </div>

        <div className="relative p-10 md:p-14">
          <div className="max-w-2xl space-y-5">
            <div className="inline-flex items-center rounded-full border border-white/15 bg-black/30 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur">
              {tSite("tagline")}
            </div>
            <h1 className="text-balance text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl">
              {tHome("heroTitle")}
            </h1>
            <p className="max-w-xl text-pretty text-base leading-7 text-white/80 md:text-lg">
              {tHome("heroSubtitle")}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-black hover:bg-zinc-100"
              >
                {tHome("cta.primary")}
              </Link>
              <Link
                href={`/${locale}/products`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/25 bg-white/5 px-6 text-sm font-semibold text-white hover:bg-white/10"
              >
                {tHome("cta.secondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-semibold tracking-tight">
          {tHome("highlights.title")}
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <div className="relative aspect-[4/3]">
              <Image
                src={asset("/images/home/strength-factory-outdoor.png")}
                alt={tHome("highlights.q1")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold">{tHome("highlights.q1")}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {tHome("highlights.a1")}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <div className="relative aspect-[4/3]">
              <Image
                src={asset("/images/home/strength-warehouse.png")}
                alt={tHome("highlights.q2")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold">{tHome("highlights.q2")}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {tHome("highlights.a2")}
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-black/5 dark:border-white/10">
            <div className="relative aspect-[4/3]">
              <Image
                src={asset("/images/home/strength-2.png")}
                alt={tHome("highlights.q3")}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold">{tHome("highlights.q3")}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {tHome("highlights.a3")}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


