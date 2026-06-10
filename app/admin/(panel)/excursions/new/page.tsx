import ExcursionForm from "@/components/admin/ExcursionForm";
import Link from "next/link";

export default function AdminNewExcursionPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/admin/excursions"
          className="mb-3 inline-flex text-[14px] font-medium text-black/55 hover:text-black"
        >
          ← ექსკურსიების სია
        </Link>
        <h1 className="font-afacad text-3xl font-semibold">ექსკურსიის შექმნა</h1>
        <p className="mt-1 text-[15px] text-black/65">
          შეავსეთ პარამეტრები და კონტენტი ყველა ენაზე (ქართული, ინგლისური, რუსული, ჩინური).
        </p>
      </div>
      <ExcursionForm />
    </div>
  );
}
