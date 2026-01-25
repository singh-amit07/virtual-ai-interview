import { NextResponse } from "next/server";
import { db } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";


export async function GET() {

  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; returning empty data");
    return NextResponse.json({ data: [] });
  }

  try {
    const rows = await db.select().from(mockInterview).limit(10);
    return NextResponse.json({ data: rows });
  } catch (error) {
    console.error("Error fetching mock interviews", error);
    
    
    return NextResponse.json({ data: [], error: "DB_UNAVAILABLE" });
  }
}

export async function POST(request) {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL is not set; cannot write to DB");
    return NextResponse.json(
      { error: "DB_URL_MISSING" },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const {
      jobPosition,
      jobDesc,
      jobExperience,
      jsonMockResp,
      createdBy,
    } = body;

    const mockId = uuidv4();

    const resp = await db
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
      .returning({ mockId: mockInterview.mockId });

    return NextResponse.json({ mockId: resp[0]?.mockId ?? mockId });
  } catch (error) {
    console.error("Error creating mock interview", error);
    return NextResponse.json(
      { error: "DB_UNAVAILABLE" },
      { status: 500 }
    );
  }
}
