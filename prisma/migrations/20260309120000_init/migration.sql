-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Locale" AS ENUM ('ka', 'en', 'ru', 'zh');

-- CreateEnum
CREATE TYPE "TourDestination" AS ENUM ('batumi', 'tbilisi', 'kutaisi');

-- CreateTable
CREATE TABLE "tours" (
    "id" TEXT NOT NULL,
    "destination" "TourDestination",
    "durationKey" TEXT NOT NULL,
    "priceFrom" INTEGER NOT NULL DEFAULT 0,
    "minPeople" INTEGER NOT NULL DEFAULT 0,
    "startTime" TEXT,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tours_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tour_translations" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "routeLabel" TEXT NOT NULL,
    "subtitle" TEXT,
    "outline" JSONB NOT NULL,
    "sections" JSONB NOT NULL,
    "includes" JSONB NOT NULL,
    "highlights" JSONB,
    "clothingNote" TEXT,

    CONSTRAINT "tour_translations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "excursions" (
    "id" TEXT NOT NULL,
    "durationKey" TEXT NOT NULL,
    "priceFrom" INTEGER NOT NULL DEFAULT 0,
    "grades" TEXT NOT NULL,
    "popular" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "excursions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "excursion_translations" (
    "id" TEXT NOT NULL,
    "excursionId" TEXT NOT NULL,
    "locale" "Locale" NOT NULL,
    "title" TEXT NOT NULL,
    "highlights" JSONB NOT NULL,
    "includes" JSONB NOT NULL,
    "optionalNote" TEXT,

    CONSTRAINT "excursion_translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tour_translations_tourId_locale_key" ON "tour_translations"("tourId", "locale");

-- CreateIndex
CREATE UNIQUE INDEX "excursion_translations_excursionId_locale_key" ON "excursion_translations"("excursionId", "locale");

-- AddForeignKey
ALTER TABLE "tour_translations" ADD CONSTRAINT "tour_translations_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "tours"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "excursion_translations" ADD CONSTRAINT "excursion_translations_excursionId_fkey" FOREIGN KEY ("excursionId") REFERENCES "excursions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
