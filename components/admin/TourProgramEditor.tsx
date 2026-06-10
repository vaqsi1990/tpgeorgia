"use client";

import { AdminInput, AdminTextarea } from "@/components/admin/AdminField";

export type TourDayForm = {
  label: string;
  description: string;
};

export type TourSectionForm = {
  title: string;
  days: TourDayForm[];
};

type TourProgramEditorProps = {
  sections: TourSectionForm[];
  onChange: (sections: TourSectionForm[]) => void;
};

const emptyDay = (): TourDayForm => ({ label: "", description: "" });

const emptySection = (): TourSectionForm => ({
  title: "ტურის პროგრამა",
  days: [emptyDay()],
});

export function createDefaultSections(): TourSectionForm[] {
  return [emptySection()];
}

export function sectionsFromContent(
  sections: { title: string; days: TourDayForm[] }[],
): TourSectionForm[] {
  if (sections.length === 0) return createDefaultSections();
  return sections.map((section) => ({
    title: section.title,
    days:
      section.days.length > 0
        ? section.days.map((day) => ({
            label: day.label,
            description: day.description,
          }))
        : [emptyDay()],
  }));
}

export default function TourProgramEditor({
  sections,
  onChange,
}: TourProgramEditorProps) {
  function updateSection(sectionIndex: number, patch: Partial<TourSectionForm>) {
    onChange(
      sections.map((section, index) =>
        index === sectionIndex ? { ...section, ...patch } : section,
      ),
    );
  }

  function updateDay(
    sectionIndex: number,
    dayIndex: number,
    patch: Partial<TourDayForm>,
  ) {
    onChange(
      sections.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        return {
          ...section,
          days: section.days.map((day, dIndex) =>
            dIndex === dayIndex ? { ...day, ...patch } : day,
          ),
        };
      }),
    );
  }

  function addSection() {
    onChange([...sections, emptySection()]);
  }

  function removeSection(sectionIndex: number) {
    if (sections.length === 1) {
      onChange([emptySection()]);
      return;
    }
    onChange(sections.filter((_, index) => index !== sectionIndex));
  }

  function addDay(sectionIndex: number) {
    onChange(
      sections.map((section, index) =>
        index === sectionIndex
          ? { ...section, days: [...section.days, emptyDay()] }
          : section,
      ),
    );
  }

  function removeDay(sectionIndex: number, dayIndex: number) {
    onChange(
      sections.map((section, sIndex) => {
        if (sIndex !== sectionIndex) return section;
        const nextDays =
          section.days.length === 1
            ? [emptyDay()]
            : section.days.filter((_, dIndex) => dIndex !== dayIndex);
        return { ...section, days: nextDays };
      }),
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section, sectionIndex) => (
        <div
          key={sectionIndex}
          className="space-y-4 rounded-xl border border-black/8 bg-[#f9fcfb] p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[13px] font-semibold text-black/70">
              სექცია {sectionIndex + 1}
            </p>
            <button
              type="button"
              onClick={() => removeSection(sectionIndex)}
              className="text-[12px] font-medium text-red-700 hover:underline"
            >
              სექციის წაშლა
            </button>
          </div>

          <AdminInput
            label="სექციის სათაური"
            value={section.title}
            onChange={(e) => updateSection(sectionIndex, { title: e.target.value })}
            placeholder="მაგ: დღეები 1–2: თბილისი და მცხეთა"
          />

          <div className="space-y-4">
            {section.days.map((day, dayIndex) => (
              <div
                key={dayIndex}
                className="space-y-3 rounded-lg border border-black/8 bg-white p-3"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-[12px] font-medium text-black/60">
                    დღე {dayIndex + 1}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeDay(sectionIndex, dayIndex)}
                    className="text-[12px] font-medium text-red-700 hover:underline"
                  >
                    დღის წაშლა
                  </button>
                </div>
                <AdminInput
                  label="დღის სათაური"
                  value={day.label}
                  onChange={(e) =>
                    updateDay(sectionIndex, dayIndex, { label: e.target.value })
                  }
                  placeholder="მაგ: დღე 1: ჩასვლა თბილისში"
                />
                <AdminTextarea
                  label="დღის აღწერა"
                  value={day.description}
                  onChange={(e) =>
                    updateDay(sectionIndex, dayIndex, {
                      description: e.target.value,
                    })
                  }
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addDay(sectionIndex)}
            className="rounded-lg border border-dashed border-[#38ab8a]/50 px-3 py-2 text-[13px] font-medium text-[#2d8a6f] hover:bg-[#38ab8a]/5"
          >
            + დღის დამატება
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addSection}
        className="w-full rounded-xl border border-dashed border-[#38ab8a]/50 px-4 py-3 text-[14px] font-medium text-[#2d8a6f] hover:bg-[#38ab8a]/5"
      >
        + სექციის დამატება
      </button>
    </div>
  );
}
