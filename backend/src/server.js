import express from "express";
import cors from "cors";
import { randomUUID } from "node:crypto";
import { pool } from "./db.js";

const app = express();
app.use(cors({ origin: ["http://localhost:5173"] }));
app.use(express.json());

app.get("/api/health", async (_req, res) => {
  const [rows] = await pool.query("SELECT 1 AS ok");
  res.json({ database: rows[0].ok === 1 ? "connected" : "error" });
});

app.get("/api/spotlight", async (_req, res) => {
  const [rows] = await pool.query("SELECT * FROM spotlight ORDER BY sort_order");
  res.json(rows);
});

app.get("/api/alumni", async (req, res) => {
  const params = [];
  let sql =
    "SELECT user_id, full_name, graduation_year, program, skills FROM users WHERE status = 'APPROVED'";
  if (req.query.year) {
    sql += " AND graduation_year = ?";
    params.push(Number(req.query.year));
  }
  const [rows] = await pool.query(sql, params);
  res.json(rows);
});

app.post("/api/register", async (req, res) => {
  const { email, fullName, graduationYear, program } = req.body ?? {};
  if (!email || !fullName) {
    return res.status(400).json({ error: "email and fullName are required" });
  }
  try {
    await pool.query(
      "INSERT INTO users (user_id, email, full_name, graduation_year, program) VALUES (?, ?, ?, ?, ?)",
      [randomUUID(), email, fullName, graduationYear ?? null, program ?? null]
    );
    res.status(201).json({ status: "PENDING" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(409).json({ error: "Email already registered" });
    }
    throw err;
  }
});

app.get("/api/admin/pending", async (_req, res) => {
  const [rows] = await pool.query(
    "SELECT user_id, email, full_name, graduation_year, program FROM users WHERE status = 'PENDING'"
  );
  res.json(rows);
});

app.post("/api/admin/approve", async (req, res) => {
  const { userIds, decision = "APPROVED" } = req.body ?? {};
  if (!Array.isArray(userIds) || userIds.length === 0) {
    return res.status(400).json({ error: "userIds must be a non-empty array" });
  }
  if (!["APPROVED", "REJECTED"].includes(decision)) {
    return res.status(400).json({ error: "decision must be APPROVED or REJECTED" });
  }
  const [result] = await pool.query(
    "UPDATE users SET status = ? WHERE status = 'PENDING' AND user_id IN (?)",
    [decision, userIds]
  );
  res.json({ updated: result.affectedRows });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API running on http://localhost:${port}`));