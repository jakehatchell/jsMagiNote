const { formatText } = require("../services/openaiService");

exports.formatNotes = async (req, res) => {
  try {
    const { text } = req.body;
    const markdown = await formatText(text);
    return res.json({ markdown });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Formatting failed" });
  }
};