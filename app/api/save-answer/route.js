import { NextResponse } from "next/server";
import { db, executeQuery } from "@/utils/db";
import { UserAnswer } from "@/utils/schema";

export async function POST(request) {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; cannot save answer.");
    return NextResponse.json(
      { success: false, error: "DB_URL_MISSING" },
      { status: 500 },
    );
  }

  try {
    const body = await request.json();

    const resp = await executeQuery(async (db) =>
      db.insert(UserAnswer).values({
        mockIdRef: body.mockIdRef,
        question: body.question,
        correctAns: body.correctAns,
        userAns: body.userAns,
        feedback: body.feedback,
        rating: body.rating,
        userEmail: body.userEmail,
        createdAt: body.createdAt,
      }),
    );

    return NextResponse.json({ success: true, data: resp });
  } catch (error) {
    console.error("Error saving user answer:", error.message);
    return NextResponse.json(
      { success: false, error: "Failed to save user answer" },
      { status: 500 },
    );
  }
}
