import type {
  StoredExcursionInput,
  StoredExcursionRecord,
  StoredTourInput,
  StoredTourRecord,
} from "@/lib/admin-types";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const storeDir = path.join(process.cwd(), "data", "store");
const toursPath = path.join(storeDir, "tours.json");
const excursionsPath = path.join(storeDir, "excursions.json");

function readJsonFile<T>(filePath: string): T[] {
  try {
    const raw = readFileSync(filePath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeJsonFile<T>(filePath: string, data: T[]): void {
  writeFileSync(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

export function readStoredTours(): StoredTourRecord[] {
  return readJsonFile<StoredTourRecord>(toursPath);
}

export function readStoredExcursions(): StoredExcursionRecord[] {
  return readJsonFile<StoredExcursionRecord>(excursionsPath);
}

export function addStoredTour(input: StoredTourInput): StoredTourRecord {
  const tours = readStoredTours();
  if (tours.some((tour) => tour.id === input.id)) {
    throw new Error("A tour with this ID already exists.");
  }

  const record: StoredTourRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  };
  tours.push(record);
  writeJsonFile(toursPath, tours);
  return record;
}

export function addStoredExcursion(
  input: StoredExcursionInput,
): StoredExcursionRecord {
  const excursions = readStoredExcursions();
  if (excursions.some((excursion) => excursion.id === input.id)) {
    throw new Error("An excursion with this ID already exists.");
  }

  const record: StoredExcursionRecord = {
    ...input,
    createdAt: new Date().toISOString(),
  };
  excursions.push(record);
  writeJsonFile(excursionsPath, excursions);
  return record;
}

export function deleteStoredTour(id: string): boolean {
  const tours = readStoredTours();
  const next = tours.filter((tour) => tour.id !== id);
  if (next.length === tours.length) return false;
  writeJsonFile(toursPath, next);
  return true;
}

export function deleteStoredExcursion(id: string): boolean {
  const excursions = readStoredExcursions();
  const next = excursions.filter((excursion) => excursion.id !== id);
  if (next.length === excursions.length) return false;
  writeJsonFile(excursionsPath, next);
  return true;
}
