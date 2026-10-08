import { isAdminAuthenticated } from "@/lib/admin-auth";
import { createPlace, listPlaces } from "@/lib/places-db";
import { isValidPlaceInput } from "@/lib/place-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const places = await listPlaces();
    return NextResponse.json({ places });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ადგილების ჩატვირთვა ვერ მოხერხდა.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const body = await request.json();
    if (!isValidPlaceInput(body)) {
      return NextResponse.json({ error: "ადგილის მონაცემები არასწორია." }, { status: 400 });
    }

    const place = await createPlace(body);
    return NextResponse.json({ place }, { status: 201 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ადგილის შენახვა ვერ მოხერხდა.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
