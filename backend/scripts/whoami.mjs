import mysql from "mysql2/promise";

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;
console.log({ DB_HOST, DB_USER, DB_NAME, passwordLength: DB_PASSWORD?.length });

const conn = await mysql.createConnection({
  host: DB_HOST,
  port: Number(DB_PORT || 3306),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

const [who] = await conn.query("SELECT CURRENT_USER() AS me");
console.log("Logged in as:", who[0].me);

if (DB_USER === "admin") {
  const [u] = await conn.query(
    "SELECT user, host FROM mysql.user WHERE user = 'innosci_app'"
  );
  console.log("innosci_app rows:", u);
}
await conn.end();