// Require a connection to our DB
const pool = require("../config/db");

// Require our service function to make API request.
const { formatText } = require("../services/openaiService");

exports.createNote = async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || typeof text !== "string") {
            return res.status(400).json({ error: "Text is required." });
        }

        const [result] = await pool.query(
            "insert into notes (raw_text) values (?)",
            [text]
        );
        
        return res.status(201).json({ id: result.noteID });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
};

exports.updateNote = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const [rows] = await pool.query(
            "select formatted_md from notes where noteID = ?",
            [id]
        );

        if (!rows)

        rows = await pool.query(
            "update notes set raw_text = ? where noteID = ?",
            [text, id]
        );


    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
};

exports.getNote = async (req, res) => {
    try {
        const { id } = req.params;

        const [rows] = await pool.query(
            "select * from notes where noteID = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "Note not found." });
        }

        res.json(rows[0]);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
};

exports.getAllNotes = async (req, res) => {
    try {
        const [rows] = await pool.query(
            "select * from notes"
        );

        res.json(rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Database error." });
    }
};

exports.formatNote = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT raw_text FROM notes WHERE noteID = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Note not found" });
    }

    const markdown = await formatText(rows[0].raw_text);

    await pool.query(
      "UPDATE notes SET formatted_md = ? WHERE noteID = ?",
      [markdown, id]
    );

    res.json({ id: Number(id), markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Formatting failed" });
  }
};

exports.deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query(
            "DELETE FROM notes WHERE noteID = ?",
            [id]
        );
        res.json({ id: Number(id) });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Delete failed" });
    }
};