import {getTranslations, setRequestLocale} from "next-intl/server";

import {ContactForm} from "@/components/ContactForm";
import {isLocale} from "@/i18n/routing";

const CONTACT = {
  emails: ["shundesteel@gmail.com", "1309035031@qq.com"],
  phone: "+86 19831568888",
  address: "河北省唐山市丰润区欢喜庄乡八户村南",
};

export default async function ContactPage({
  params,
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  if (!isLocale(locale)) return null;

  setRequestLocale(locale);
  const t = await getTranslations({locale, namespace: "contact"});

  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{t("title")}</h1>
        <p className="max-w-2xl text-sm leading-6 text-zinc-600 dark:text-zinc-300">
          {t("subtitle")}
        </p>
      </header>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
          <div className="text-sm font-semibold">{t("cards.email")}</div>
          <div className="mt-2 space-y-1">
            {CONTACT.emails.map((e) => (
              <a
                key={e}
                className="block text-sm text-zinc-700 hover:underline dark:text-zinc-200"
                href={`mailto:${e}`}
              >
                {e}
              </a>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
          <div className="text-sm font-semibold">{t("cards.phone")}</div>
          <a
            className="mt-2 inline-block text-sm text-zinc-700 hover:underline dark:text-zinc-200"
            href={`tel:${CONTACT.phone.replaceAll(" ", "")}`}
          >
            {CONTACT.phone}
          </a>
        </div>
        <div className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
          <div className="text-sm font-semibold">{t("cards.address")}</div>
          <div className="mt-2 text-sm text-zinc-700 dark:text-zinc-200">
            {CONTACT.address}
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2 md:items-start">
        <div className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
          <div className="text-sm font-semibold">{t("form.title")}</div>
          <div className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            {t("notes.privacy")}
          </div>
          <div className="mt-6">
            <ContactForm locale={locale} />
          </div>
        </div>

        <div className="rounded-2xl border border-black/5 p-6 dark:border-white/10">
          <div className="text-sm font-semibold">FAQ</div>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-600 dark:text-zinc-300">
            <li>Tell us product, specification, quantity, destination port.</li>
            <li>Share target incoterms (FOB/CIF/DDP) and lead time expectations.</li>
            <li>We can provide photos, certificates, and inspection reports.</li>
          </ul>
        </div>
      </section>
    </div>
  );
}


