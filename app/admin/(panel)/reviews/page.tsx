import StoredReviewList from "@/components/admin/StoredReviewList";
import { listReviews } from "@/lib/review-db";

export const dynamic = "force-dynamic";

export default async function AdminReviewsPage() {
  const reviews = await listReviews();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-afacad text-3xl font-semibold">რევიუები</h1>
        <p className="mt-1 text-[16px] text-black md:text-[18px]">
          კლიენტების მიმოხილვები ტურებისა და ექსკურსიების შემდეგ.
        </p>
      </div>

      <StoredReviewList initialReviews={reviews} />
    </div>
  );
}
