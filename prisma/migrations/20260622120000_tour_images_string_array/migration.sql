-- Convert tours.images from JSONB to native TEXT[] for multiple image URLs
ALTER TABLE "tours" ALTER COLUMN "images" DROP DEFAULT;

ALTER TABLE "tours" ADD COLUMN "images_array" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];

UPDATE "tours"
SET "images_array" = COALESCE(
  (
    SELECT array_agg(value ORDER BY ordinality)
    FROM jsonb_array_elements_text("images") WITH ORDINALITY AS elements(value, ordinality)
  ),
  ARRAY[]::TEXT[]
);

ALTER TABLE "tours" DROP COLUMN "images";
ALTER TABLE "tours" RENAME COLUMN "images_array" TO "images";
ALTER TABLE "tours" ALTER COLUMN "images" SET DEFAULT ARRAY[]::TEXT[];
