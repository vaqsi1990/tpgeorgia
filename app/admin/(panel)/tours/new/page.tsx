import TourForm from "@/components/admin/TourForm";

export default function AdminNewTourPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ტურის შექმნა</h1>
        <p className="mt-1 text-[15px] text-black/65">
          ჯერ შეავსეთ ზოგადი პარამეტრები, შემდეგ გადადით ენის ტაბებზე (ქართული, ინგლისური,
          რუსული, ჩინური).
        </p>
      </div>
      <TourForm />
    </div>
  );
}
