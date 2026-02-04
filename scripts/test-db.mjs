import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;

if (!url) {
  console.error("DATABASE_URL is not set. Set it before running this script.");
  process.exit(1);
}

const sql = neon(url, {
  connectTimeoutMillis: parseInt(
    process.env.DB_CONNECT_TIMEOUT_MS || "30000",
    10,
  ),
});

async function main() {
  try {
    const res = await sql`select 1 as ok`;
    console.log("DB reachable:", res);
    process.exit(0);
  } catch (err) {
    console.error("DB connection failed:", err && (err.message || err));
    console.error("Full error:", err);
    process.exit(1);
  }
}

main();
