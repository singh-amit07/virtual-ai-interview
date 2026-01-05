import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema.js";

// WARNING: Using Neon directly in the browser can be unsafe. This flag only hides the warning;
// you should still move DB access to server components or API routes for production.
const sql = neon(process.env.NEXT_PUBLIC_DRIZZLE_DB_URL, {
  disableWarningInBrowsers: true,
});

export const db = drizzle(sql, { schema });
