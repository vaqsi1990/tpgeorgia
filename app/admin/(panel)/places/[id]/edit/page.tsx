import PlaceForm from "@/components/admin/PlaceForm";
import { getPlaceById } from "@/lib/places-db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditPlacePage({ params }: PageProps) {
  const { id } = await params;
  const place = await getPlaceById(id);
  if (!place) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ადგილის რედაქტირება</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          განაახლეთ ტექსტი, სურათები და ღირსშესანიშნაობები.
        </p>
      </div>
      <PlaceForm initialPlace={place} />
    </div>
  );
}
