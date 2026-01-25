import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema.js";


const sql = neon(process.env.DATABASE_URL, {
  disableWarningInBrowsers: true,
});

export const db = drizzle(sql, { schema });
