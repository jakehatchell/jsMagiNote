const router = require("express").Router();

const { formatNotes } = require("../controllers/formatController");

// Make this /api/formatNotes accessible.
router.get("/formatNotes", formatNotes);

module.exports = router;