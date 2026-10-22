import { readFileSync } from "node:fs";
import mysql from "mysql2/promise";

const file = process.argv[2];
if (!file) {
  console.error("Usage: node scripts/run-sql.mjs <file.sql>");
  process.exit(1);
}

let conn;
try {
  conn = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true,
    connectTimeout: 10000,
  });
  await conn.query(readFileSync(file, "utf8"));
  console.log(`Done: ${file}`);
} catch (err) {
  console.error(`Failed: ${err.code ?? ""} ${err.message}`);
  process.exitCode = 1;
} finally {
  if (conn) await conn.end();
}