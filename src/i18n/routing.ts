export const routing = {
  locales: ["en", "zh"],
  defaultLocale: "en",
} as const;

export type Locale = (typeof routing)["locales"][number];

export function isLocale(locale: string): locale is Locale {
  return (routing.locales as readonly string[]).includes(locale);
}


