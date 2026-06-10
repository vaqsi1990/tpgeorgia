import StoredExcursionList from "@/components/admin/StoredExcursionList";
import { AdminCreateLink } from "@/components/admin/StoredTourList";
import { listExcursions } from "@/lib/catalog-db";

export const dynamic = "force-dynamic";

export default async function AdminExcursionsPage() {
  const excursions = await listExcursions();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-afacad text-3xl font-semibold">ექსკურსიები</h1>
         
        </div>
        <AdminCreateLink href="/admin/excursions/new">
         ახალი ექსკურსი
        </AdminCreateLink>
      </div>
      <StoredExcursionList initialExcursions={excursions} />
    </div>
  );
}
