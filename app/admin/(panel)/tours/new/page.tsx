import TourForm from "@/components/admin/TourForm";
import Link from "next/link";

export default function AdminNewTourPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/tours"
          className="mb-3 inline-flex text-[14px] font-medium text-black/55 hover:text-black"
        >
          ← ტურების სია
        </Link>
        <h1 className="font-afacad text-3xl font-semibold">ტურის შექმნა</h1>
        <p className="mt-1 text-[15px] text-black/65">
          შეავსეთ პარამეტრები, მოკლე მონახაზი და დეტალური პროგრამა ყველა ენაზე (ქართული,
          ინგლისური, რუსული, ჩინური).
        </p>
      </div>
      <TourForm />
    </div>
  );
}
