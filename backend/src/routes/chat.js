const express = require("express");
const router = express.Router();
const pool = require("../db/index");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const SUPABASE_URL = "https://ajnrpplvtzdfddybzaas.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbnJwcGx2dHpkZmRkeWJ6YWFzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MzI3ODY2MywiZXhwIjoyMDU4ODU0NjYzfQ.8yKzJNEA3DW-AAwkh95G-emKTJ-rLKFHerh9f64xzHc"; // Keep this secure in production

// ✅ GET all chat groups (used for listing available groups)
router.get("/groups", async (req, res) => {
  try {
    const response = await fetch(`${SUPABASE_URL}/rest/v1/chat_groups?select=*`, {
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
      },
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching groups:", err);
    res.status(500).json({ error: "Failed to fetch groups" });
  }
});

// ✅ GET all messages for a specific group_id
router.get("/messages", async (req, res) => {
  const { group_id } = req.query;
  if (!group_id) return res.status(400).json({ error: "group_id is required" });

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/supabase_messages?group_id=eq.${group_id}&order=timestamp.asc`,
      {
        headers: {
          apikey: SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        },
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching messages:", err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
});

// ✅ POST a new message to a group
router.post("/messages", async (req, res) => {
  const { username, content, group_id } = req.body;
  if (!username || !content || !group_id) {
    return res.status(400).json({ error: "username, content, and group_id required" });
  }

  try {
    // Fetch user info from PostgreSQL
    const userRes = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = userRes.rows[0];
    if (!user) return res.status(404).json({ error: "User not found" });

    const { id, name, yearofstudy, program } = user;

    // Insert the message into Supabase
    const response = await fetch(`${SUPABASE_URL}/rest/v1/supabase_messages`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
        "Content-Type": "application/json",
        Prefer: "return=representation",
      },
      body: JSON.stringify({
        senderid: id,
        sendername: name,
        senderyear: yearofstudy,
        senderprogram: program,
        content,
        group_id,
        timestamp: new Date().toISOString(),
      }),
    });

    const inserted = await response.json();
    res.status(201).json(inserted[0]);
  } catch (err) {
    console.error("❌ Error posting message:", err);
    res.status(500).json({ error: "Failed to post message" });
  }
});

module.exports = router;