import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deletePlace, getPlaceById, updatePlace } from "@/lib/places-db";
import { isValidPlaceInput } from "@/lib/place-validators";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const place = await getPlaceById(id);
    if (!place) {
      return NextResponse.json({ error: "ადგილი ვერ მოიძებნა." }, { status: 404 });
    }
    return NextResponse.json({ place });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ადგილის ჩატვირთვა ვერ მოხერხდა.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const body = await request.json();
    if (!isValidPlaceInput(body)) {
      return NextResponse.json({ error: "ადგილის მონაცემები არასწორია." }, { status: 400 });
    }

    const place = await updatePlace(id, { ...body, id });
    return NextResponse.json({ place });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ადგილის შენახვა ვერ მოხერხდა.";
    const status = message === "ადგილი ვერ მოიძებნა." ? 404 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const deleted = await deletePlace(id);
    if (!deleted) {
      return NextResponse.json({ error: "ადგილი ვერ მოიძებნა." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "ადგილის წაშლა ვერ მოხერხდა.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
