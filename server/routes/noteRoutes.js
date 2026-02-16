const router = require("express").Router();

const { createNote, getNote, getAllNotes, formatNote, updateNote, deleteNote } = require("../controllers/noteController");

// Make this /api/formatNotes accessible.
// Get note by ID
router.get("/notes/:id", getNote);
// Get all notes
router.get("/notes", getAllNotes);
// Create a new note
router.post("/notes", createNote)
// Update an existing note by ID
router.patch("/notes/:id", updateNote);
// Deletes a note
router.delete("/notes/:id", deleteNote);
// Calls into the formatNote controller.
router.post("/notes/:id/format", formatNote);
// Maybe add exports?

module.exports = router;