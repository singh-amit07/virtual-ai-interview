import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { schema } from "./schema.js";

const connectTimeoutMillis = parseInt(
  process.env.DB_CONNECT_TIMEOUT_MS || "30000",
  10,
);

let sql;
let dbInstance;

if (process.env.DATABASE_URL) {
  sql = neon(process.env.DATABASE_URL, {
    disableWarningInBrowsers: true,
    connectTimeoutMillis,
  });

  dbInstance = drizzle(sql, { schema });
} else {
  // dbInstance stays undefined when DATABASE_URL is not set. Routes should guard against this.
  dbInstance = undefined;
}

export const db = dbInstance;

// Helper to execute DB operations with retries and clearer errors
export async function executeQuery(fn, { retries = 2, backoffMs = 500 } = {}) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL not configured");
  }

  let attempt = 0;
  while (true) {
    try {
      return await fn(db);
    } catch (err) {
      attempt++;
      const isConnectTimeout =
        err?.cause?.code === "UND_ERR_CONNECT_TIMEOUT" ||
        /Connect Timeout|fetch failed/i.test(err.message);

      if (!isConnectTimeout || attempt > retries) {
        // Attach a friendly message and rethrow
        const error = new Error(`DB_ERROR: ${err.message}`);
        error.original = err;
        throw error;
      }

      // wait with exponential backoff
      await new Promise((r) =>
        setTimeout(r, backoffMs * Math.pow(2, attempt - 1)),
      );
    }
  }
}
