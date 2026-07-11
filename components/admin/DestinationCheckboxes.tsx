"use client";

import {
  tourDestinationIds,
  type TourDestination,
} from "@/data/tour-destinations";
import { tourDestinationLabels } from "@/lib/admin-form-options";

type DestinationCheckboxesProps = {
  value: TourDestination[];
  onChange: (destinations: TourDestination[]) => void;
  label?: string;
  hint?: string;
};

export default function DestinationCheckboxes({
  value,
  onChange,
  label = "მიმართულება",
  hint = "შეგიძლიათ აირჩიოთ რამდენიმე ქალაქი ერთდროულად",
}: DestinationCheckboxesProps) {
  function toggleDestination(destination: TourDestination) {
    onChange(
      value.includes(destination)
        ? value.filter((item) => item !== destination)
        : [...value, destination],
    );
  }

  return (
    <div>
      <p className="mb-1.5 block text-[18px] font-medium text-black/80">{label}</p>
      <div className="flex flex-wrap gap-3">
        {tourDestinationIds.map((destination) => (
          <label
            key={destination}
            className="flex cursor-pointer items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-2.5 text-[15px] font-medium transition-colors hover:bg-brand/5 md:text-[16px]"
          >
            <input
              type="checkbox"
              checked={value.includes(destination)}
              onChange={() => toggleDestination(destination)}
              className="size-4 rounded border-black/20"
            />
            {tourDestinationLabels[destination]}
          </label>
        ))}
      </div>
      {hint ? (
        <p className="mt-2 text-[15px] leading-relaxed text-black/60 md:text-[16px]">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
