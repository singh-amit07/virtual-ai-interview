import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { eq } from "drizzle-orm";

export async function GET(_request, { params }) {
  const { mockId } = await params;

  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; returning empty data");
    return NextResponse.json({ data: null });
  }

  try {
    const rows = await db
      .select()
      .from(mockInterview)
      .where(eq(mockInterview.mockId, mockId))
      .limit(1);

    return NextResponse.json({ data: rows[0] || null });
  } catch (error) {
    console.error("Error fetching mock interview by id", error);
    return NextResponse.json({ data: null, error: "DB_UNAVAILABLE" });
  }
}