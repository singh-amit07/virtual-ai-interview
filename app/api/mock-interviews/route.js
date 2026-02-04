import { executeQuery } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import moment from "moment";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; returning empty data");
    return NextResponse.json({ data: [] });
  }

  try {
    const rows = await executeQuery(async (db) =>
      db.select().from(mockInterview).limit(10),
    );
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching mock interviews:", error.message);
    // Helpful debug hints
    console.error("Database URL exists:", !!process.env.DATABASE_URL);

    return NextResponse.json({ data: [], error: "DB_UNAVAILABLE" });
  }
}

export async function POST(request) {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; cannot write to DB");
    return NextResponse.json({ error: "DB_URL_MISSING" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { jobPosition, jobDesc, jobExperience, jsonMockResp, createdBy } =
      body;

    const mockId = uuidv4();

    const resp = await executeQuery(async (db) =>
      db
        .insert(mockInterview)
        .values({
          mockId,
          jsonMockResp,
          jobPosition,
          jobDesc,
          jobExperience,
          createdBy,
          createdAt: moment().format("YYYY-MM-DD"),
        })
        .returning({ mockId: mockInterview.mockId }),
    );

    return NextResponse.json({ mockId: resp[0]?.mockId ?? mockId });
  } catch (error) {
    console.error("Error creating mock interview", error);
    return NextResponse.json({ error: "DB_UNAVAILABLE" }, { status: 500 });
  }
}
