"use client";

import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  linesToList,
} from "@/components/admin/AdminField";
import LocaleTabs from "@/components/admin/LocaleTabs";
import type { ExcursionContent } from "@/data/excursion-content";
import { routing, type AppLocale } from "@/i18n/routing";
import { excursionDurationKeys } from "@/lib/admin-types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LocaleExcursionForm = {
  title: string;
  highlights: string;
  includes: string;
  optionalNote: string;
};

const emptyLocaleForm = (): LocaleExcursionForm => ({
  title: "",
  highlights: "",
  includes: "",
  optionalNote: "",
});

function buildLocaleContent(form: LocaleExcursionForm): ExcursionContent {
  return {
    title: form.title.trim(),
    highlights: linesToList(form.highlights),
    includes: linesToList(form.includes),
    optionalNote: form.optionalNote.trim() || undefined,
  };
}

export default function ExcursionForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<AppLocale>("ka");
  const [id, setId] = useState("");
  const [durationKey, setDurationKey] = useState(excursionDurationKeys[0]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [grades, setGrades] = useState("V–VIII");
  const [popular, setPopular] = useState(false);
  const [localeForms, setLocaleForms] = useState<
    Record<AppLocale, LocaleExcursionForm>
  >(
    () =>
      Object.fromEntries(
        routing.locales.map((loc) => [loc, emptyLocaleForm()]),
      ) as Record<AppLocale, LocaleExcursionForm>,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const form = localeForms[locale];

  function updateLocaleField<K extends keyof LocaleExcursionForm>(
    key: K,
    value: LocaleExcursionForm[K],
  ) {
    setLocaleForms((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [key]: value },
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const content = Object.fromEntries(
      routing.locales.map((loc) => [loc, buildLocaleContent(localeForms[loc])]),
    ) as Record<AppLocale, ExcursionContent>;

    try {
      const response = await fetch("/api/admin/excursions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id.trim(),
          meta: {
            durationKey,
            priceFrom: Number(priceFrom) || 0,
            grades: grades.trim(),
            popular,
          },
          content,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "ექსკურსიის შენახვა ვერ მოხერხდა.");
      }

      router.push("/admin/excursions");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "ექსკურსიის შენახვა ვერ მოხერხდა.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <h2 className="font-afacad text-xl font-semibold">ექსკურსიის პარამეტრები</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="ექსკურსიის ID (slug)"
            hint="პატარა ლათინური ასოები, ციფრები, ტირე."
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          />
          <AdminSelect
            label="ხანგრძლივობა"
            value={durationKey}
            onChange={(e) =>
              setDurationKey(
                e.target.value as (typeof excursionDurationKeys)[number],
              )
            }
            options={excursionDurationKeys.map((key) => ({
              value: key,
              label: key,
            }))}
          />
          <AdminInput
            label="ფასი (₾-დან)"
            type="number"
            min={0}
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <AdminInput
            label="კლასი"
            placeholder="V–VIII"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
            required
          />
        </div>
        <label className="flex items-center gap-2 text-[14px] font-medium">
          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            className="size-4 rounded border-black/20"
          />
          პოპულარული (ტოპ ბეიჯი)
        </label>
      </section>

      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-afacad text-xl font-semibold">კონტენტი ენების მიხედვით</h2>
          <LocaleTabs active={locale} onChange={setLocale} />
        </div>

        <AdminInput
          label="სათაური"
          value={form.title}
          onChange={(e) => updateLocaleField("title", e.target.value)}
          required
        />
        <AdminTextarea
          label="ექსკურსიის განმავლობაში ნახავთ (თითო ხაზზე ერთი)"
          value={form.highlights}
          onChange={(e) => updateLocaleField("highlights", e.target.value)}
        />
        <AdminTextarea
          label="ღირებულებაში შედის (თითო ხაზზე ერთი)"
          value={form.includes}
          onChange={(e) => updateLocaleField("includes", e.target.value)}
        />
        <AdminInput
          label="დამატებითი შენიშვნა"
          value={form.optionalNote}
          onChange={(e) => updateLocaleField("optionalNote", e.target.value)}
        />
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={saving}
        className="rounded-xl bg-[#38ab8a] px-6 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {saving ? "ინახება…" : "ექსკურსიის შექმნა"}
      </button>
    </form>
  );
}
