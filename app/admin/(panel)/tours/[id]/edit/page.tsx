import TourForm from "@/components/admin/TourForm";
import { getTourById } from "@/lib/catalog-db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditTourPage({ params }: PageProps) {
  const { id } = await params;
  const tour = await getTourById(id);
  if (!tour) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ტურის რედაქტირება</h1>
        <p className="mt-1 text-[15px] text-black/65">
          განაახლეთ პარამეტრები და კონტენტი ყველა ენაზე.
        </p>
      </div>
      <TourForm initialTour={tour} />
    </div>
  );
}
