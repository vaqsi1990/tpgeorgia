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
import {
  excursionDurationLabels,
  excursionGradeOptions,
} from "@/lib/admin-form-options";
import {
  excursionDurationKeys,
  type StoredExcursionRecord,
} from "@/lib/admin-types";
import { slugFromTitles } from "@/lib/slug";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

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

function listToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

function localeFormFromContent(content: ExcursionContent): LocaleExcursionForm {
  return {
    title: content.title,
    highlights: listToLines(content.highlights),
    includes: listToLines(content.includes),
    optionalNote: content.optionalNote ?? "",
  };
}

function buildLocaleContent(form: LocaleExcursionForm): ExcursionContent {
  return {
    title: form.title.trim(),
    highlights: linesToList(form.highlights),
    includes: linesToList(form.includes),
    optionalNote: form.optionalNote.trim() || undefined,
  };
}

export default function ExcursionForm({
  initialExcursion,
}: {
  initialExcursion?: StoredExcursionRecord;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialExcursion);
  const recordId = initialExcursion?.id;
  const [locale, setLocale] = useState<AppLocale>("ka");
  const [durationKey, setDurationKey] = useState(
    initialExcursion?.meta.durationKey ?? excursionDurationKeys[0],
  );
  const [priceFrom, setPriceFrom] = useState(
    String(initialExcursion?.meta.priceFrom ?? 0),
  );
  const [grades, setGrades] = useState(initialExcursion?.meta.grades ?? "V–VIII");
  const [popular, setPopular] = useState(initialExcursion?.meta.popular ?? false);
  const [localeForms, setLocaleForms] = useState<
    Record<AppLocale, LocaleExcursionForm>
  >(
    () =>
      Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          initialExcursion
            ? localeFormFromContent(initialExcursion.content[loc])
            : emptyLocaleForm(),
        ]),
      ) as Record<AppLocale, LocaleExcursionForm>,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const form = localeForms[locale];
  const generatedSlug = useMemo(
    () =>
      slugFromTitles(
        routing.locales.map((loc) => localeForms[loc].title.trim()).filter(Boolean),
      ),
    [localeForms],
  );
  const gradeOptions = excursionGradeOptions.includes(
    grades as (typeof excursionGradeOptions)[number],
  )
    ? excursionGradeOptions
    : [grades as (typeof excursionGradeOptions)[number], ...excursionGradeOptions];

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

    const payload = {
      ...(isEditing && recordId ? { id: recordId } : {}),
      meta: {
        durationKey,
        priceFrom: Number(priceFrom) || 0,
        grades: grades.trim(),
        popular,
      },
      content,
    };

    try {
      const response = await fetch(
        isEditing && recordId
          ? `/api/admin/excursions/${encodeURIComponent(recordId)}`
          : "/api/admin/excursions",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

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
        {isEditing && recordId ? (
          <p className="text-[15px] text-black/60">
            ID: <span className="font-medium text-black/80">{recordId}</span>
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
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
              label: excursionDurationLabels[key],
            }))}
          />
          <AdminInput
            label="ფასი (₾ სტუდენტზე)"
            type="number"
            min={0}
            value={priceFrom}
            onChange={(e) => setPriceFrom(e.target.value)}
          />
          <AdminSelect
            label="კლასი"
            value={grades}
            onChange={(e) => setGrades(e.target.value)}
            options={gradeOptions.map((grade) => ({
              value: grade,
              label: grade,
            }))}
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
          placeholder="მაგ: „მაჭახელას ხეობის მემკვიდრეობა — ისტორია და ტრადიცია“"
        />
        {!isEditing && generatedSlug ? (
          <p className="text-[12px] text-black/55">
            ავტომატური ID:{" "}
            <span className="font-medium text-black/75">{generatedSlug}</span>
          </p>
        ) : null}
        <AdminTextarea
          label="ექსკურსიის განმავლობაში ნახავთ (თითო ხაზზე ერთი)"
          hint="ბარათზე გარეთ და შიგნით ჩანს — მთავარი ღირსშესანიშნაობები"
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
          placeholder="მაგ: ტანსაცმლის რეკომენდაცია ან საჭირო დოკუმენტები"
        />
      </section>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-[14px] text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-xl bg-[#38ab8a] px-6 py-2.5 text-[15px] font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "ინახება…" : isEditing ? "ექსკურსიის განახლება" : "ექსკურსიის შექმნა"}
        </button>
        <Link
          href="/admin/excursions"
          className="rounded-xl border border-black/15 px-6 py-2.5 text-[15px] font-medium hover:bg-black/5"
        >
          გაუქმება
        </Link>
      </div>
    </form>
  );
}
