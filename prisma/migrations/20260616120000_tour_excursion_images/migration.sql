-- AlterTable
ALTER TABLE "tours" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]';

-- AlterTable
ALTER TABLE "excursions" ADD COLUMN "images" JSONB NOT NULL DEFAULT '[]';
