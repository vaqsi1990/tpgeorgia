"use client";

import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";
import ImageUploadForProduct from "@/components/productimage";
import { localeLabels } from "@/i18n/routing";
import {
  emptyAttractionContentMap,
  emptyPlaceContentMap,
  placeLocales,
  type AttractionLocaleContentMap,
  type PlaceLocale,
  type PlaceLocaleContentMap,
  type StoredPlaceRecord,
} from "@/lib/place-types";
import { slugFromTitles } from "@/lib/slug";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";

type AttractionForm = {
  id: string;
  slug: string;
  image: string;
  parentId: string;
  mapUrl: string;
  mapLat: string;
  mapLng: string;
  content: AttractionLocaleContentMap;
};

function newAttraction(): AttractionForm {
  return {
    id: crypto.randomUUID(),
    slug: "",
    image: "",
    parentId: "",
    mapUrl: "",
    mapLat: "",
    mapLng: "",
    content: emptyAttractionContentMap(),
  };
}

function attractionFromRecord(
  attraction: StoredPlaceRecord["attractions"][number],
): AttractionForm {
  return {
    id: attraction.id,
    slug: attraction.slug,
    image: attraction.image,
    parentId: attraction.parentId ?? "",
    mapUrl: attraction.mapUrl ?? "",
    mapLat: attraction.mapLat === null ? "" : String(attraction.mapLat),
    mapLng: attraction.mapLng === null ? "" : String(attraction.mapLng),
    content: attraction.content,
  };
}

function parseCoord(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const number = Number(trimmed);
  return Number.isFinite(number) ? number : null;
}

export default function PlaceForm({
  initialPlace,
}: {
  initialPlace?: StoredPlaceRecord;
}) {
  const router = useRouter();
  const isEditing = Boolean(initialPlace);
  const [locale, setLocale] = useState<PlaceLocale>("ka");
  const [image, setImage] = useState(initialPlace?.image ?? "");
  const [published, setPublished] = useState(initialPlace?.published ?? true);
  const [sortOrder, setSortOrder] = useState(String(initialPlace?.sortOrder ?? 0));
  const [content, setContent] = useState<PlaceLocaleContentMap>(
    initialPlace?.content ?? emptyPlaceContentMap(),
  );
  const [attractions, setAttractions] = useState<AttractionForm[]>(
    initialPlace?.attractions.map(attractionFromRecord) ?? [],
  );
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const placeText = content[locale];
  const generatedSlug = useMemo(
    () =>
      slugFromTitles(
        placeLocales.map((item) => content[item].name.trim()).filter(Boolean),
      ),
    [content],
  );

  function updatePlaceField<K extends keyof PlaceLocaleContentMap["ka"]>(
    key: K,
    value: string,
  ) {
    setContent((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], [key]: value },
    }));
  }

  function updateAttraction(id: string, patch: Partial<AttractionForm>) {
    setAttractions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    );
  }

  function updateAttractionText(
    id: string,
    key: keyof AttractionLocaleContentMap["ka"],
    value: string,
  ) {
    setAttractions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              content: {
                ...item.content,
                [locale]: { ...item.content[locale], [key]: value },
              },
            }
          : item,
      ),
    );
  }

  function moveAttraction(index: number, direction: -1 | 1) {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= attractions.length) return;
    setAttractions((prev) => {
      const copy = [...prev];
      const [item] = copy.splice(index, 1);
      copy.splice(nextIndex, 0, item);
      return copy;
    });
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSaving(true);

    if (!placeLocales.some((item) => content[item].name.trim())) {
      setError("ადგილის სახელი ერთ ენაზე მაინც შეავსეთ.");
      setSaving(false);
      return;
    }

    const missingAttraction = attractions.find(
      (attraction) =>
        !attraction.image.trim() ||
        !placeLocales.some((item) => attraction.content[item].name.trim()),
    );
    if (missingAttraction) {
      setError("ყველა ღირსშესანიშნაობას სჭირდება სურათი და სახელი ერთ ენაზე მაინც.");
      setSaving(false);
      return;
    }

    const payload = {
      ...(isEditing && initialPlace ? { id: initialPlace.id } : {}),
      image: image.trim(),
      published,
      sortOrder: Number(sortOrder) || 0,
      content,
      attractions: attractions.map((attraction) => ({
        id: attraction.id,
        slug: attraction.slug.trim(),
        image: attraction.image.trim(),
        parentId: attraction.parentId || null,
        mapUrl: attraction.mapUrl.trim() || null,
        mapLat: parseCoord(attraction.mapLat),
        mapLng: parseCoord(attraction.mapLng),
        content: attraction.content,
      })),
    };

    try {
      const response = await fetch(
        isEditing && initialPlace
          ? `/api/admin/places/${encodeURIComponent(initialPlace.id)}`
          : "/api/admin/places",
        {
          method: isEditing ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "ადგილის შენახვა ვერ მოხერხდა.");
      }
      router.push("/admin/places");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "ადგილის შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <h2 className="font-afacad text-xl font-semibold">პარამეტრები</h2>
        {isEditing && initialPlace ? (
          <p className="text-[15px] text-black/60">
            მისამართი:{" "}
            <span className="font-medium text-black/80">/places/{initialPlace.id}</span>
          </p>
        ) : null}
        <label className="flex items-center gap-2 text-[16px] font-medium">
          <input
            type="checkbox"
            checked={published}
            onChange={(event) => setPublished(event.target.checked)}
            className="size-4 rounded border-black/20"
          />
          გამოქვეყნებული (საიტზე ჩანს)
        </label>
        <AdminInput
          label="რიგითობა"
          type="number"
          value={sortOrder}
          onChange={(event) => setSortOrder(event.target.value)}
          hint="მცირე რიცხვი სიაში უფრო წინ ჩანს"
        />
        <div>
          <p className="mb-1.5 block text-[18px] font-medium text-black/80">სურათი</p>
          <ImageUploadForProduct
            value={image ? [image] : []}
            onChange={(urls) => setImage(urls.slice(0, 1)[0]?.trim() ?? "")}
          />
        </div>
      </section>

      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-afacad text-xl font-semibold">ტექსტი ენების მიხედვით</h2>
          <div className="flex flex-wrap gap-2">
            {placeLocales.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setLocale(item)}
                className={`rounded-lg px-3 py-1.5 text-[16px] font-medium transition-colors md:text-[18px] ${
                  locale === item
                    ? "bg-[#DC2626] text-white"
                    : "border border-black/10 bg-white text-black hover:bg-brand/5"
                }`}
              >
                {localeLabels[item]}
              </button>
            ))}
          </div>
        </div>
        <AdminInput
          label="სახელი"
          value={placeText.name}
          onChange={(event) => updatePlaceField("name", event.target.value)}
          required={locale === "ka"}
        />
        {!isEditing && generatedSlug ? (
          <p className="text-[15px] text-black">
            ავტომატური მისამართი:{" "}
            <span className="font-medium text-black/75">/places/{generatedSlug}</span>
          </p>
        ) : null}
        <AdminInput
          label="სურათის აღწერა"
          value={placeText.imageAlt}
          onChange={(event) => updatePlaceField("imageAlt", event.target.value)}
        />
        <AdminTextarea
          label="შესავალი"
          value={placeText.lead}
          onChange={(event) => updatePlaceField("lead", event.target.value)}
          className="min-h-24"
        />
        <AdminTextarea
          label="პირველი აბზაცი"
          value={placeText.p1}
          onChange={(event) => updatePlaceField("p1", event.target.value)}
          className="min-h-28"
        />
        <AdminTextarea
          label="მეორე აბზაცი"
          value={placeText.p2}
          onChange={(event) => updatePlaceField("p2", event.target.value)}
          className="min-h-28"
        />
        <AdminTextarea
          label="დანარჩენი ტექსტი"
          value={placeText.p3}
          onChange={(event) => updatePlaceField("p3", event.target.value)}
          className="min-h-40"
          hint="ახალი აბზაცისთვის დატოვეთ ცარიელი ხაზი"
        />
        <AdminInput
          label="ღირსშესანიშნაობების სათაური"
          value={placeText.attractionsTitle}
          onChange={(event) => updatePlaceField("attractionsTitle", event.target.value)}
        />
      </section>

      <section className="space-y-4 rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-afacad text-xl font-semibold">ღირსშესანიშნაობები</h2>
          <button
            type="button"
            onClick={() => setAttractions((prev) => [...prev, newAttraction()])}
            className="rounded-xl border border-black/15 px-4 py-2 text-[16px] font-medium hover:bg-black/5"
          >
            დამატება
          </button>
        </div>
        {attractions.length === 0 ? (
          <p className="text-[15px] text-black/60">ღირსშესანიშნაობა ჯერ არ არის დამატებული.</p>
        ) : (
          <div className="space-y-4">
            {attractions.map((attraction, index) => {
              const text = attraction.content[locale];
              const title = text.name || attraction.content.ka.name || `ღირსშესანიშნაობა ${index + 1}`;
              return (
                <details key={attraction.id} className="rounded-xl border border-black/10 p-4">
                  <summary className="cursor-pointer text-[16px] font-medium md:text-[18px]">
                    {title}
                  </summary>
                  <div className="mt-4 space-y-4">
                    <AdminInput
                      label="სახელი"
                      value={text.name}
                      onChange={(event) =>
                        updateAttractionText(attraction.id, "name", event.target.value)
                      }
                    />
                    <AdminInput
                      label="ბმულის ნაწილი"
                      value={attraction.slug}
                      onChange={(event) =>
                        updateAttraction(attraction.id, { slug: event.target.value })
                      }
                      placeholder="მაგ: batumi"
                      hint="ცარიელი რომ დატოვოთ, სახელიდან შეივსება"
                    />
                    <div>
                      <p className="mb-1.5 block text-[18px] font-medium text-black/80">სურათი</p>
                      <ImageUploadForProduct
                        value={attraction.image ? [attraction.image] : []}
                        onChange={(urls) =>
                          updateAttraction(attraction.id, {
                            image: urls.slice(0, 1)[0]?.trim() ?? "",
                          })
                        }
                      />
                    </div>
                    <AdminTextarea
                      label="აღწერა"
                      value={text.description}
                      onChange={(event) =>
                        updateAttractionText(attraction.id, "description", event.target.value)
                      }
                      className="min-h-36"
                    />
                    <label className="block">
                      <span className="mb-1.5 block text-[18px] font-medium text-black/80">
                        მშობელი ღირსშესანიშნაობა
                      </span>
                      <select
                        value={attraction.parentId}
                        onChange={(event) =>
                          updateAttraction(attraction.id, { parentId: event.target.value })
                        }
                        className="w-full rounded-xl border border-black/10 bg-white px-3 py-2.5 text-[14px] text-black outline-none"
                      >
                        <option value="">არ აქვს — მთავარ სიაში ჩანს</option>
                        {attractions
                          .filter((item) => item.id !== attraction.id)
                          .map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.content[locale].name ||
                                item.content.ka.name ||
                                item.slug ||
                                item.id}
                            </option>
                          ))}
                      </select>
                    </label>
                    <AdminInput
                      label="ქვესიის სათაური"
                      value={text.groupTitle}
                      onChange={(event) =>
                        updateAttractionText(attraction.id, "groupTitle", event.target.value)
                      }
                      hint="ჩანს, თუ ამ ღირსშესანიშნაობას ქვეპუნქტები აქვს. მაგალითად: მარანები"
                    />
                    <AdminInput
                      label="რუკის ბმული"
                      value={attraction.mapUrl}
                      onChange={(event) =>
                        updateAttraction(attraction.id, { mapUrl: event.target.value })
                      }
                    />
                    <div className="grid gap-4 sm:grid-cols-2">
                      <AdminInput
                        label="განედი"
                        value={attraction.mapLat}
                        onChange={(event) =>
                          updateAttraction(attraction.id, { mapLat: event.target.value })
                        }
                        placeholder="41.6168"
                      />
                      <AdminInput
                        label="გრძედი"
                        value={attraction.mapLng}
                        onChange={(event) =>
                          updateAttraction(attraction.id, { mapLng: event.target.value })
                        }
                        placeholder="41.6367"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => moveAttraction(index, -1)}
                        className="rounded-lg border border-black/15 px-3 py-2 text-[15px] font-medium"
                      >
                        ზემოთ
                      </button>
                      <button
                        type="button"
                        onClick={() => moveAttraction(index, 1)}
                        className="rounded-lg border border-black/15 px-3 py-2 text-[15px] font-medium"
                      >
                        ქვემოთ
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setAttractions((prev) => prev.filter((item) => item.id !== attraction.id))
                        }
                        className="rounded-lg border border-red-200 px-3 py-2 text-[15px] font-medium text-red-700"
                      >
                        წაშლა
                      </button>
                    </div>
                  </div>
                </details>
              );
            })}
          </div>
        )}
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
          className="rounded-xl bg-[#DC2626] px-5 py-2.5 text-[16px] font-medium text-white hover:opacity-90 disabled:opacity-60"
        >
          {saving ? "ინახება…" : "შენახვა"}
        </button>
        <Link
          href="/admin/places"
          className="rounded-xl border border-black/15 px-5 py-2.5 text-[16px] font-medium"
        >
          გაუქმება
        </Link>
      </div>
    </form>
  );
}
