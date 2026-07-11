import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { buildRachaHorsebackTourInput } from "../data/tours/racha-horseback";
import { PrismaClient } from "../lib/generated/prisma/client";
import { createTour, getTourById, updateTour } from "../lib/catalog-db";

const connectionString =
  process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL or DIRECT_DATABASE_URL is required.");
}

const prisma = new PrismaClient({
  adapter: new PrismaNeon({ connectionString }),
});

async function ensureDestinationsColumn() {
  try {
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "tours" ADD COLUMN IF NOT EXISTS "destinations" "TourDestination"[] NOT NULL DEFAULT ARRAY[]::"TourDestination"[];
    `);

    await prisma.$executeRawUnsafe(`
      DO $$
      BEGIN
        IF EXISTS (
          SELECT 1
          FROM information_schema.columns
          WHERE table_name = 'tours' AND column_name = 'destination'
        ) THEN
          UPDATE "tours"
          SET "destinations" = ARRAY["destination"]::"TourDestination"[]
          WHERE "destination" IS NOT NULL;
          ALTER TABLE "tours" DROP COLUMN "destination";
        END IF;
      END $$;
    `);

    await prisma.$executeRawUnsafe(`
      ALTER TABLE "excursions" ADD COLUMN IF NOT EXISTS "destinations" "TourDestination"[] NOT NULL DEFAULT ARRAY[]::"TourDestination"[];
    `);
  } catch (error) {
    console.warn("Migration step skipped or already applied:", error);
  }
}

async function main() {
  await ensureDestinationsColumn();

  const input = buildRachaHorsebackTourInput();
  const existing = await getTourById(input.id);

  if (existing) {
    await updateTour(input.id, input);
    console.log(`Updated tour "${input.id}".`);
    return;
  }

  await createTour(input);
  console.log(`Created tour "${input.id}".`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
