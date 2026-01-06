import {getTranslations, setRequestLocale} from "next-intl/server";
import Image from "next/image";

import {isLocale} from "@/i18n/routing";

type ProductItem = {
  slug: string;
  title: string;
  desc: string;
  images?: string[];
};

export default async function ProductsPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!isLocale(locale)) return null;

  setRequestLocale(locale);

  const t = await getTranslations({locale, namespace: "products"});
  const items = t.raw("items") as ProductItem[];

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {t("subtitle")}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="group overflow-hidden rounded-2xl border border-black/5 dark:border-white/10"
          >
            <div className="relative aspect-[4/3] bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-black">
              {item.images?.length ? (
                <>
                <Image
                  src={item.images[0]}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                {item.images[1] ? (
                  <Image
                    src={item.images[1]}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                ) : null}
                </>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:border-white/15 dark:bg-black/40 dark:text-zinc-200">
                    {locale === "zh" ? "图片待补充" : "Photo coming soon"}
                  </div>
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="text-sm font-semibold">{item.title}</div>
              <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}


