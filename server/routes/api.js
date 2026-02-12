const router = require("express").Router();

router.get("/hello", (req, res) => {
  res.json({ message: "Hello from API route!" });
});

router.get("/status", (req, res) => {
  res.json({ status: "Server is running" });
});

module.exports = router;
