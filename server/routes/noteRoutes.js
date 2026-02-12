const router = require("express").Router();

const { createNote, getNote } = require("../controllers/noteController");

// Make this /api/formatNotes accessible.
router.get("/notes/:id", getNote);
router.post("/notes", createNote)

module.exports = router;