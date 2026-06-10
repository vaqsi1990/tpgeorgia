"use client";

import {
  AdminInput,
  AdminSelect,
  AdminTextarea,
  linesToList,
} from "@/components/admin/AdminField";
import LocaleTabs from "@/components/admin/LocaleTabs";
import type { TourContent, TourDay, TourSection } from "@/data/tour-content";
import { routing, type AppLocale } from "@/i18n/routing";
import { tourDurationKeys } from "@/lib/admin-types";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LocaleTourForm = {
  title: string;
  routeLabel: string;
  subtitle: string;
  outline: string;
  sectionTitle: string;
  dayLabel: string;
  dayDescription: string;
  includes: string;
  highlights: string;
  clothingNote: string;
};

const emptyLocaleForm = (): LocaleTourForm => ({
  title: "",
  routeLabel: "",
  subtitle: "",
  outline: "",
  sectionTitle: "ტურის პროგრამა",
  dayLabel: "",
  dayDescription: "",
  includes: "",
  highlights: "",
  clothingNote: "",
});

function buildLocaleContent(form: LocaleTourForm): TourContent {
  const days: TourDay[] = [];
  if (form.dayLabel.trim() || form.dayDescription.trim()) {
    days.push({
      label: form.dayLabel.trim(),
      description: form.dayDescription.trim(),
    });
  }

  const sections: TourSection[] = [];
  if (form.sectionTitle.trim() || days.length > 0) {
    sections.push({
      title: form.sectionTitle.trim() || "პროგრამა",
      days,
    });
  }

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

export default function TourForm() {
  const router = useRouter();
  const [locale, setLocale] = useState<AppLocale>("ka");
  const [id, setId] = useState("");
  const [destination, setDestination] = useState<string>("batumi");
  const [durationKey, setDurationKey] = useState(tourDurationKeys[0]);
  const [priceFrom, setPriceFrom] = useState("0");
  const [minPeople, setMinPeople] = useState("4");
  const [startTime, setStartTime] = useState("");
  const [popular, setPopular] = useState(false);
  const [localeForms, setLocaleForms] = useState<Record<AppLocale, LocaleTourForm>>(
    () =>
      Object.fromEntries(
        routing.locales.map((loc) => [loc, emptyLocaleForm()]),
      ) as Record<AppLocale, LocaleTourForm>,
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const form = localeForms[locale];

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

    try {
      const response = await fetch("/api/admin/tours", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id.trim(),
          destination: destination === "none" ? null : destination,
          meta: {
            durationKey,
            priceFrom: Number(priceFrom) || 0,
            minPeople: Number(minPeople) || 0,
            startTime: startTime.trim() || undefined,
            popular,
          },
          content,
        }),
      });

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
        <div className="grid gap-4 sm:grid-cols-2">
          <AdminInput
            label="ტურის ID (slug)"
            hint="პატარა ლათინური ასოები, ციფრები, ტირე. მაგ: wine-tour-kakheti"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            pattern="[a-z0-9]+(?:-[a-z0-9]+)*"
          />
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
        />
        <AdminTextarea
          label="მოკლე მონახაზი (თითო ხაზზე ერთი)"
          value={form.outline}
          onChange={(e) => updateLocaleField("outline", e.target.value)}
        />
        <AdminInput
          label="პროგრამის სექციის სათაური"
          value={form.sectionTitle}
          onChange={(e) => updateLocaleField("sectionTitle", e.target.value)}
        />
        <AdminInput
          label="დღის სათაური"
          value={form.dayLabel}
          onChange={(e) => updateLocaleField("dayLabel", e.target.value)}
        />
        <AdminTextarea
          label="დღის აღწერა"
          value={form.dayDescription}
          onChange={(e) => updateLocaleField("dayDescription", e.target.value)}
        />
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
          {saving ? "ინახება…" : "ტურის შექმნა"}
        </button>
      </div>
    </form>
  );
}
