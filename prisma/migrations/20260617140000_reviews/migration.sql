-- AlterTable
ALTER TABLE "bookings" ADD COLUMN "reviewRequestedAt" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "reviews" (
    "id" TEXT NOT NULL,
    "bookingId" TEXT NOT NULL,
    "itemType" "BookingType" NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemTitle" TEXT NOT NULL,
    "authorName" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "locale" "Locale",
    "published" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "bookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- CreateIndex
CREATE UNIQUE INDEX "reviews_bookingId_key" ON "reviews"("bookingId");

-- CreateIndex
CREATE INDEX "reviews_itemType_itemId_idx" ON "reviews"("itemType", "itemId");

-- CreateIndex
CREATE INDEX "reviews_createdAt_idx" ON "reviews"("createdAt" DESC);
