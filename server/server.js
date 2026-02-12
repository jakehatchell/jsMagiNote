const express = require("express");
const cors = require("cors");
require("dotenv").config();

// Import route files. This is the code that will route each url/http request to serve the correct files.
const formatRoutes = require("./routes/formatRoutes");

// Create Express app.
const app = express();

app.use(express.json());

// All routes inside formatRoutes.js will start with /api.
app.use("/api", formatRoutes);



app.get("/", (req, res) => res.send("OK"));
// Starting the server.
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
