-- CreateTable
CREATE TABLE "places" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "places_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_translations" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "imageAlt" TEXT NOT NULL DEFAULT '',
    "lead" TEXT NOT NULL DEFAULT '',
    "p1" TEXT NOT NULL DEFAULT '',
    "p2" TEXT NOT NULL DEFAULT '',
    "p3" TEXT NOT NULL DEFAULT '',
    "attractionsTitle" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "place_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_attractions" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "parentId" TEXT,
    "mapUrl" TEXT,
    "mapLat" DOUBLE PRECISION,
    "mapLng" DOUBLE PRECISION,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "place_attractions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "place_attraction_translations" (
    "id" TEXT NOT NULL,
    "attractionId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "groupTitle" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "place_attraction_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "places_sortOrder_idx" ON "places"("sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "place_translations_placeId_locale_key" ON "place_translations"("placeId", "locale");

-- CreateIndex
CREATE INDEX "place_attractions_placeId_sortOrder_idx" ON "place_attractions"("placeId", "sortOrder");

-- CreateIndex
CREATE UNIQUE INDEX "place_attractions_placeId_slug_key" ON "place_attractions"("placeId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "place_attraction_translations_attractionId_locale_key" ON "place_attraction_translations"("attractionId", "locale");

-- AddForeignKey
ALTER TABLE "place_translations" ADD CONSTRAINT "place_translations_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_attractions" ADD CONSTRAINT "place_attractions_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "places"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_attractions" ADD CONSTRAINT "place_attractions_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "place_attractions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "place_attraction_translations" ADD CONSTRAINT "place_attraction_translations_attractionId_fkey" FOREIGN KEY ("attractionId") REFERENCES "place_attractions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
