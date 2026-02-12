// Require a connection to our DB
const pool = require("../config/db");

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