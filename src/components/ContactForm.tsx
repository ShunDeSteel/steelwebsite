"use client";

import {useTranslations} from "next-intl";
import {useState} from "react";

export function ContactForm({locale}: {locale: "zh" | "en"}) {
  const t = useTranslations("contact");

  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<
    "idle" | "sending" | "sent" | "error"
  >("idle");
  const [error, setError] = useState<string>("");

  // For static hosting (GitHub Pages), we can't call our own /api.
  // Default: mailto to Gmail. Optional: set a third-party endpoint (e.g. Formspree) via env.
  const inquiryTo =
    process.env.NEXT_PUBLIC_INQUIRY_TO || "shundesteel@gmail.com";
  const inquiryEndpoint = process.env.NEXT_PUBLIC_INQUIRY_ENDPOINT || "";

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus("sending");
        setError("");
        try {
          if (inquiryEndpoint) {
            const res = await fetch(inquiryEndpoint, {
              method: "POST",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({name, company, email, message, locale}),
            });
            if (!res.ok) {
              throw new Error(
                locale === "zh"
                  ? "发送失败，请稍后重试"
                  : "Failed to send. Please try again."
              );
            }
          } else {
            const subject = encodeURIComponent(
              `Inquiry - ${company || "Company"} - ${name || "Name"}`.trim()
            );
            const body = encodeURIComponent(
              [
                `Name: ${name}`,
                `Company: ${company}`,
                `Email: ${email}`,
                "",
                "Message:",
                message,
              ].join("\n")
            );
            window.location.href = `mailto:${inquiryTo}?subject=${subject}&body=${body}`;
            // mailto opens local mail client; consider it "sent" from UI perspective.
          }
          setStatus("sent");
          setName("");
          setCompany("");
          setEmail("");
          setMessage("");
        } catch (err) {
          setStatus("error");
          setError(
            err instanceof Error ? err.message : "Failed to send inquiry"
          );
        }
      }}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1">
          <div className="text-sm font-medium">{t("form.name")}</div>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-white/15 dark:bg-black/30 dark:focus:ring-zinc-600"
            autoComplete="name"
          />
        </label>
        <label className="space-y-1">
          <div className="text-sm font-medium">{t("form.company")}</div>
          <input
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-white/15 dark:bg-black/30 dark:focus:ring-zinc-600"
            autoComplete="organization"
          />
        </label>
      </div>

      <label className="space-y-1">
        <div className="text-sm font-medium">{t("form.email")}</div>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-xl border border-black/10 bg-white px-3 text-sm outline-none focus:ring-2 focus:ring-zinc-400 dark:border-white/15 dark:bg-black/30 dark:focus:ring-zinc-600"
          autoComplete="email"
          inputMode="email"
        />
      </label>

      <label className="space-y-1">
        <div className="text-sm font-medium">{t("form.message")}</div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32 w-full resize-y rounded-xl border border-black/10 bg-white px-3 py-2 text-sm leading-6 outline-none focus:ring-2 focus:ring-zinc-400 dark:border-white/15 dark:bg-black/30 dark:focus:ring-zinc-600"
        />
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-semibold text-white hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
      >
        {status === "sending"
          ? locale === "zh"
            ? "发送中..."
            : "Sending..."
          : t("form.submit")}
      </button>

      {status === "sent" ? (
        <div className="text-sm text-emerald-700 dark:text-emerald-400">
          {locale === "zh"
            ? "已发送，我们会尽快回复。"
            : "Sent. We will reply soon."}
        </div>
      ) : null}

      {status === "error" ? (
        <div className="text-sm text-red-700 dark:text-red-400">{error}</div>
      ) : null}
    </form>
  );
}









