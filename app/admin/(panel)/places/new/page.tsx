import PlaceForm from "@/components/admin/PlaceForm";

export const dynamic = "force-dynamic";

export default function AdminNewPlacePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ახალი ადგილი</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          შეავსეთ ტექსტი ქართულ, ინგლისურ, რუსულ და ჩინურ ენაზე.
        </p>
      </div>
      <PlaceForm />
    </div>
  );
}
