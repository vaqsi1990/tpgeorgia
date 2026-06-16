import TourForm from "@/components/admin/TourForm";
import Link from "next/link";

export default function AdminNewTourPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/tours"
          className="mb-3 inline-flex text-[14px] font-medium text-black hover:text-black"
        >
          ← ტურების სია
        </Link>
        <h1 className="font-afacad text-3xl font-semibold">ტურის შექმნა</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          შეავსეთ პარამეტრები, მოკლე მონახაზი და დეტალური პროგრამა ყველა ენაზე (ქართული,
          ინგლისური, რუსული, ჩინური).
        </p>
      </div>
      <TourForm />
    </div>
  );
}
