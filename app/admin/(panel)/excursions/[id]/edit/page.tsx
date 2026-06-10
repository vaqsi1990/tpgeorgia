import ExcursionForm from "@/components/admin/ExcursionForm";
import { getExcursionById } from "@/lib/catalog-db";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = { params: Promise<{ id: string }> };

export default async function AdminEditExcursionPage({ params }: PageProps) {
  const { id } = await params;
  const excursion = await getExcursionById(id);
  if (!excursion) notFound();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">ექსკურსიის რედაქტირება</h1>
        <p className="mt-1 text-[15px] text-black/65">
          განაახლეთ პარამეტრები და კონტენტი ყველა ენაზე.
        </p>
      </div>
      <ExcursionForm initialExcursion={excursion} />
    </div>
  );
}
