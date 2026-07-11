-- AlterTable: tours — single destination -> destinations array
ALTER TABLE "tours" ADD COLUMN "destinations" "TourDestination"[] NOT NULL DEFAULT ARRAY[]::"TourDestination"[];

UPDATE "tours"
SET "destinations" = ARRAY["destination"]::"TourDestination"[]
WHERE "destination" IS NOT NULL;

ALTER TABLE "tours" DROP COLUMN "destination";

-- AlterTable: excursions — add destinations array
ALTER TABLE "excursions" ADD COLUMN "destinations" "TourDestination"[] NOT NULL DEFAULT ARRAY[]::"TourDestination"[];
