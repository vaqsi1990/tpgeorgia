import StoredTourList, { AdminCreateLink } from "@/components/admin/StoredTourList";
import { listTours } from "@/lib/catalog-db";

export const dynamic = "force-dynamic";

export default async function AdminToursPage() {
  const tours = await listTours();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-afacad text-3xl font-semibold">ტურები</h1>
         
        </div>
        <AdminCreateLink href="/admin/tours/new">ახალი ტური</AdminCreateLink>
      </div>
      <StoredTourList initialTours={tours} />
    </div>
  );
}
