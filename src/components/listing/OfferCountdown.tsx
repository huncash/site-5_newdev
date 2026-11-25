"use client";

import { useEffect, useState } from "react";

import { useI18n } from "@/lib/i18n";
import { OFFER_DEADLINE } from "@/lib/listing";

const DEADLINE_MS = new Date(OFFER_DEADLINE).getTime();

type Remaining = {
  expired: boolean;
  days: number;
  hours: number;
  minutes: number;
};

function remaining(now: number): Remaining {
  const diff = Math.max(0, DEADLINE_MS - now);
  const total = Math.floor(diff / 1000);
  return {
    expired: diff <= 0,
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
  };
}

export function OfferCountdown({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const { t } = useI18n();
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const units = [
    [t.countdown.days, "days"],
    [t.countdown.hours, "hours"],
    [t.countdown.minutes, "minutes"],
  ] as const;

  const dark = tone === "dark";
  const frame = dark ? "border-[#e8b84a]/40 bg-[#142e22]" : "border-[#d4c9b5] bg-[#fffdf8]";
  const number = dark ? "text-[#e8b84a]" : "text-[#0f2e1f]";
  const caption = dark ? "text-[#f7f1e6]/75" : "text-[#6b6154]";
  const note = dark ? "text-[#f7f1e6]/90" : "text-[#5a5146]";

  if (now === null) {
    return <div className={`mt-4 h-[92px] rounded-lg border ${frame}`} aria-hidden />;
  }

  const time = remaining(now);
  if (time.expired) {
    return <p className={`mt-4 text-sm leading-relaxed ${note}`}>{t.countdown.expired}</p>;
  }

  return (
    <div className="mt-4">
      <p className={`text-xs font-semibold uppercase tracking-[0.14em] ${caption}`}>{t.countdown.until}</p>
      <div
        className="mt-2 grid grid-cols-3 gap-2"
        style={{ gridTemplateColumns: "repeat(3, minmax(0, 1fr))" }}
        aria-label={`${t.countdown.remaining}: ${time.days} ${t.countdown.days}, ${time.hours} ${t.countdown.hours}, ${time.minutes} ${t.countdown.minutes}`}
      >
        {units.map(([label, key]) => (
          <div key={key} className={`rounded-md border px-2 py-2 text-center ${frame}`}>
            <span className={`block text-2xl font-semibold tabular-nums sm:text-3xl ${number}`}>
              {String(time[key]).padStart(2, "0")}
            </span>
            <span className="mx-auto mt-1 inline-block rounded-sm bg-[#efe8db] px-1.5 py-0.5 text-[11px] font-medium uppercase tracking-wide text-[#241f18]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
