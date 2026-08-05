import "dotenv/config";
import { PrismaNeon } from "@prisma/adapter-neon";
import { buildAdjaraMustSee5nTourInput } from "../data/tours/adjara-5n-must-see";
import {
  buildBatumiGeorgiaDiscovery6nTourInput,
  buildBatumiWesternGeorgia6nTourInput,
} from "../data/tours/batumi-6n-tours";
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
  } catch (error) {
    console.warn("Migration step skipped or already applied:", error);
  }
}

async function upsertTour(
  input:
    | ReturnType<typeof buildBatumiWesternGeorgia6nTourInput>
    | ReturnType<typeof buildAdjaraMustSee5nTourInput>,
) {
  const existing = await getTourById(input.id);

  if (existing) {
    await updateTour(input.id, input);
    console.log(`Updated tour "${input.id}".`);
    return;
  }

  await createTour(input);
  console.log(`Created tour "${input.id}".`);
}

async function main() {
  await ensureDestinationsColumn();

  await upsertTour(buildBatumiWesternGeorgia6nTourInput());
  await upsertTour(buildBatumiGeorgiaDiscovery6nTourInput());
  await upsertTour(buildAdjaraMustSee5nTourInput());
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
