require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const pool = require("./db/index");

// Import Routes
const coursesRouter = require("./routes/courses");
const authRouter = require("./routes/auth");
const chatRouter = require("./routes/chat");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// Health check routes
app.get("/", (req, res) => {
  res.send("StudentHUB Backend is running...");
});

app.get("/api/test", (req, res) => {
  res.json({ message: "Hello from StudentHUB Backend!" });
});

// Mount API routes
app.use("/api/courses", coursesRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});