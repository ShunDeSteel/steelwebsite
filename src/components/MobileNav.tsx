"use client";

import Link from "next/link";
import {useEffect, useMemo, useState} from "react";

type NavItem = {href: string; label: string};

export function MobileNav({
  items,
  languageSwitch,
}: {
  items: NavItem[];
  languageSwitch: {href: string; label: string};
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const buttonLabel = useMemo(
    () => (open ? "Close menu" : "Open menu"),
    [open]
  );

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={buttonLabel}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/80 text-zinc-900 backdrop-blur hover:bg-black/5 dark:border-white/15 dark:bg-black/30 dark:text-white dark:hover:bg-white/10"
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="M6 6 18 18" />
            </>
          ) : (
            <>
              <path d="M4 6h16" />
              <path d="M4 12h16" />
              <path d="M4 18h16" />
            </>
          )}
        </svg>
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/35"
            onClick={() => setOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm border-l border-black/10 bg-white p-5 shadow-xl dark:border-white/15 dark:bg-black">
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold">Menu</div>
              <Link
                href={languageSwitch.href}
                className="rounded-full border border-black/10 px-3 py-1.5 text-sm font-medium text-zinc-900 hover:bg-black/5 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                onClick={() => setOpen(false)}
              >
                {languageSwitch.label}
              </Link>
            </div>

            <nav className="mt-6 flex flex-col gap-1">
              {items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-xl px-3 py-3 text-base font-medium text-zinc-900 hover:bg-black/5 dark:text-white dark:hover:bg-white/10"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </div>
  );
}


