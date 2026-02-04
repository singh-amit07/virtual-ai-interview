import { executeQuery } from "@/utils/db";
import { mockInterview } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import InterviewItemCard from "./InterviewItemCard";

export default async function InterviewList() {
  const user = await currentUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  if (!email) {
    return null;
  }

  let interviewList = [];

  if (process.env.DATABASE_URL) {
    try {
      interviewList = await executeQuery(async (db) =>
        db
          .select()
          .from(mockInterview)
          .where(eq(mockInterview.createdBy, email))
          .orderBy(desc(mockInterview.id)),
      );
    } catch (error) {
      console.error("Error fetching interview list:", error.message);
      interviewList = [];
    }
  } else {
    console.warn("DATABASE_URL is not set; returning empty interview list");
  }

  return (
    <div>
      <h2 className="font-medium text-xl">Previous Mock Interview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-3">
        {interviewList?.map((interview) => (
          <InterviewItemCard key={interview.id} interview={interview} />
        ))}
      </div>
    </div>
  );
}
