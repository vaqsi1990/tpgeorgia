import StoredPlaceList from "@/components/admin/StoredPlaceList";
import { AdminCreateLink } from "@/components/admin/StoredTourList";
import { listPlaces } from "@/lib/places-db";

export const dynamic = "force-dynamic";

export default async function AdminPlacesPage() {
  const places = await listPlaces();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-afacad text-3xl font-semibold">ადგილები</h1>
          <p className="mt-1 text-[16px] text-black md:text-[18px]">
            დაამატეთ და შეცვალეთ /places გვერდები ოთხივე ენაზე.
          </p>
        </div>
        <AdminCreateLink href="/admin/places/new">ახალი ადგილი</AdminCreateLink>
      </div>
      <StoredPlaceList initialPlaces={places} />
    </div>
  );
}
