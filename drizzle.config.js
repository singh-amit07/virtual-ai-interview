import { defineConfig } from "drizzle-kit";
import "dotenv/config";

export default defineConfig({
  schema: "./utils/schema.js",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    // Use server-only env var for database URL
    url: process.env.DATABASE_URL,
  },
});
