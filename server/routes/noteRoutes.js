const router = require("express").Router();

const { createNote, getNote, formatNote } = require("../controllers/noteController");

// Make this /api/formatNotes accessible.
router.get("/notes/:id", getNote);
router.post("/notes", createNote)

// Calls into the formatNote controller.
router.post("/notes/:id/format", formatNote);

module.exports = router;