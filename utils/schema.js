import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

// Drizzle table definition for the "mockInterview" table
export const mockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer=pgTable("userAnswer",{
  id:serial("id").primaryKey(),
  mockIdRef:varchar("mockId").notNull(),
  question:varchar("question").notNull(),
  correctAns:varchar("correctAns"),
  userAns:text("userAns"),
  feedback:text("feedback"),
  rating:varchar("rating"),
  userEmail:varchar("userEmail"),
  createdAt:varchar("createdAt"),

});




// Export a schema object that can be used by drizzle(sql, { schema })
export const schema = {
  mockInterview,
};
