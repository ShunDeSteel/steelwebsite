import {getTranslations} from "next-intl/server";

import type {Locale} from "@/i18n/routing";

export async function SiteFooter({locale}: {locale: Locale}) {
  const tSite = await getTranslations({locale, namespace: "site"});
  const tFooter = await getTranslations({locale, namespace: "footer"});

  return (
    <footer className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-zinc-600 dark:text-zinc-400 md:flex-row md:items-center md:justify-between 2xl:max-w-[1440px]">
        <div className="font-medium text-zinc-800 dark:text-zinc-200">
          {tSite("name")}
        </div>
        <div>
          © {new Date().getFullYear()} {tFooter("rights")}
        </div>
      </div>
    </footer>
  );
}






