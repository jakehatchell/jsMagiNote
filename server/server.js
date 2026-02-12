const express = require("express");
require("dotenv").config();

// Import route files. This is the code that will route each url/http request to serve the correct files.
const apiRoutes = require("./routes/api");

// Create Express app
const app = express();

// All routes inside api.js will start with /api
app.use("/api", apiRoutes);

// =======================
// 404 Handler
// =======================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =======================
// Global Error Handler
// =======================
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

// =======================
// Start Server
// =======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
