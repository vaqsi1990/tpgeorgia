"use client";

import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  linesToList,
} from "@/components/admin/AdminField";
import LocaleTabs from "@/components/admin/LocaleTabs";
import TourProgramEditor, {
  createDefaultSections,
  sectionsFromContent,
  type TourSectionForm,
} from "@/components/admin/TourProgramEditor";
import type { TourContent } from "@/data/tour-content";
import { routing, type AppLocale } from "@/i18n/routing";
import { tourDurationLabels } from "@/lib/admin-form-options";
import { tourDurationKeys, type StoredTourRecord } from "@/lib/admin-types";
import { slugFromTitles } from "@/lib/slug";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type LocaleTourForm = {
  title: string;
  routeLabel: string;
  subtitle: string;
  outline: string;
  sections: TourSectionForm[];
  includes: string;
  highlights: string;
  clothingNote: string;
};

const emptyLocaleForm = (): LocaleTourForm => ({
  title: "",
  routeLabel: "",
  subtitle: "",
  outline: "",
  sections: createDefaultSections(),
  includes: "",
  highlights: "",
  clothingNote: "",
});

function listToLines(items: string[] | undefined): string {
  return (items ?? []).join("\n");
}

function localeFormFromContent(content: TourContent): LocaleTourForm {
  return {
    title: content.title,
    routeLabel: content.routeLabel,
    subtitle: content.subtitle ?? "",
    outline: listToLines(content.outline),
    sections: sectionsFromContent(content.sections),
    includes: listToLines(content.includes),
    highlights: listToLines(content.highlights),
    clothingNote: content.clothingNote ?? "",
  };
}

function buildLocaleContent(form: LocaleTourForm): TourContent {
  const sections = form.sections
    .map((section) => ({
      title: section.title.trim() || "პროგრამა",
      days: section.days
        .map((day) => ({
          label: day.label.trim(),
          description: day.description.trim(),
        }))
        .filter((day) => day.label || day.description),
    }))
    .filter((section) => section.title || section.days.length > 0);

  return {
    title: form.title.trim(),
    routeLabel: form.routeLabel.trim(),
    subtitle: form.subtitle.trim() || undefined,
    outline: linesToList(form.outline),
    sections,
    includes: linesToList(form.includes),
    highlights: linesToList(form.highlights),
    clothingNote: form.clothingNote.trim() || undefined,
  };
}

export default function TourForm({
  initialTour,
}: {
  initialTour?: StoredTourRecord;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialTour);
  const recordId = initialTour?.id;
  const [locale, setLocale] = useState<AppLocale>("ka");
  const [destination, setDestination] = useState<string>(
    initialTour ? (initialTour.destination ?? "none") : "batumi",
  );
  const [durationKey, setDurationKey] = useState(
    initialTour?.meta.durationKey ?? tourDurationKeys[0],
  );
  const [priceFrom, setPriceFrom] = useState(
    String(initialTour?.meta.priceFrom ?? 0),
  );
  const [minPeople, setMinPeople] = useState(
    String(initialTour?.meta.minPeople ?? 4),
  );
  const [startTime, setStartTime] = useState(initialTour?.meta.startTime ?? "");
  const [popular, setPopular] = useState(initialTour?.meta.popular ?? false);
  const [localeForms, setLocaleForms] = useState<Record<AppLocale, LocaleTourForm>>(
    () =>
      Object.fromEntries(
        routing.locales.map((loc) => [
          loc,
          initialTour
            ? localeFormFromContent(initialTour.content[loc])
            : emptyLocaleForm(),
        ]),
      ) as Record<AppLocale, LocaleTourForm>,
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

  function updateLocaleField<K extends keyof LocaleTourForm>(
    key: K,
    value: LocaleTourForm[K],
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
    ) as Record<AppLocale, TourContent>;

    const payload = {
      ...(isEditing && recordId ? { id: recordId } : {}),
      destination: destination === "none" ? null : destination,
      meta: {
        durationKey,
        priceFrom: Number(priceFrom) || 0,
        minPeople: Number(minPeople) || 0,
        startTime: startTime.trim() || undefined,
        popular,
      },
      content,
    };

    try {
      const response = await fetch(
        isEditing && recordId
          ? `/api/admin/tours/${encodeURIComponent(recordId)}`
          : "/api/admin/tours",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "ტურის შენახვა ვერ მოხერხდა.");
      }

      router.push("/admin/tours");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ტურის შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <h2 className="font-afacad text-xl font-semibold">ტურის პარამეტრები</h2>
        {isEditing && recordId ? (
          <p className="text-[13px] text-black/60">
            ID: <span className="font-medium text-black/80">{recordId}</span>
          </p>
        ) : null}
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminSelect
            label="მიმართულება"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            options={[
              { value: "none", label: "ფილტრის გარეშე" },
              { value: "batumi", label: "ბათუმი" },
              { value: "tbilisi", label: "თბილისი" },
              { value: "kutaisi", label: "ქუთაისი" },
            ]}
          />
          <AdminSelect
            label="ხანგრძლივობა"
            value={durationKey}
            onChange={(e) =>
              setDurationKey(e.target.value as (typeof tourDurationKeys)[number])
            }
            options={tourDurationKeys.map((key) => ({
              value: key,
              label: tourDurationLabels[key],
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
            label="მინ. ადამიანი"
            type="number"
            min={0}
            value={minPeople}
            onChange={(e) => setMinPeople(e.target.value)}
          />
          <AdminInput
            label="დაწყების დრო"
            placeholder="10:00"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
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

        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="სათაური"
            value={form.title}
            onChange={(e) => updateLocaleField("title", e.target.value)}
            required
          />
          {!isEditing && generatedSlug ? (
            <p className="sm:col-span-2 text-[12px] text-black/55">
              ავტომატური ID:{" "}
              <span className="font-medium text-black/75">{generatedSlug}</span>
            </p>
          ) : null}
          <AdminInput
            label="მარშრუტი"
            value={form.routeLabel}
            onChange={(e) => updateLocaleField("routeLabel", e.target.value)}
            required
          />
        </div>
        <AdminInput
          label="ქვესათაური"
          value={form.subtitle}
          onChange={(e) => updateLocaleField("subtitle", e.target.value)}
          placeholder="მაგ: კულტურა • ღვინო • მთები"
        />
        <AdminTextarea
          label="მოკლე მონახაზი (თითო ხაზზე ერთი ეტაპი)"
          hint="ბარათზე გარეთ ჩანს — მარშრუტის მთავარი პუნქტები"
          value={form.outline}
          onChange={(e) => updateLocaleField("outline", e.target.value)}
        />

        <div className="space-y-3">
          <div>
            <p className="text-[15px] font-medium text-black/80">დეტალური პროგრამა</p>
            <p className="mt-1 text-[15px] text-black/55">
              სექციები და დღეები — ბარათის გახსნისას ჩანს სრული აღწერა
            </p>
          </div>
          <TourProgramEditor
            sections={form.sections}
            onChange={(sections) => updateLocaleField("sections", sections)}
          />
        </div>

        <AdminTextarea
          label="ღირებულებაში შედის (თითო ხაზზე ერთი)"
          value={form.includes}
          onChange={(e) => updateLocaleField("includes", e.target.value)}
        />
        <AdminTextarea
          label="ღირსშესანიშნაობები (თითო ხაზზე ერთი)"
          value={form.highlights}
          onChange={(e) => updateLocaleField("highlights", e.target.value)}
        />
        <AdminInput
          label="ტანსაცმლის შენიშვნა"
          value={form.clothingNote}
          onChange={(e) => updateLocaleField("clothingNote", e.target.value)}
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
          {saving ? "ინახება…" : isEditing ? "ტურის განახლება" : "ტურის შექმნა"}
        </button>
        <Link
          href="/admin/tours"
          className="rounded-xl border border-black/15 px-6 py-2.5 text-[15px] font-medium hover:bg-black/5"
        >
          გაუქმება
        </Link>
      </div>
    </form>
  );
}
