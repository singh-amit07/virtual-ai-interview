import { db, executeQuery } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  const { interviewId } = await params;

  if (!interviewId) {
    return NextResponse.json(
      { data: [], error: "MISSING_INTERVIEW_ID" },
      { status: 400 },
    );
  }

  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; returning empty feedback");
    return NextResponse.json({ data: [] });
  }

  try {
    const rows = await executeQuery(async (db) =>
      db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, interviewId))
        .orderBy(UserAnswer.id),
    );

    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching interview feedback:", error.message);
    return NextResponse.json(
      { data: [], error: "DB_UNAVAILABLE" },
      { status: 500 },
    );
  }
}
