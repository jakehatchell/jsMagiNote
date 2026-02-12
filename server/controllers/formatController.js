// Require the OpenAI package 
const OpenAI = require("openai");

// Make an object for the OpenAI API and provide secret key from .env file
const openai = new OpenAI ({
  apikey: process.env.OPENAI_API_KEY
});

exports.formatNotes = async(req, res) => {
    try {
        const { text } = req.body;  // Get the body of the POST request

        if (!text || typeof text !== "string") {    // If the POST is empty or not a string
            return res.status(400).json({ error: "Missing 'text' in res body. "});
        }

        // Send the OpenAI API request and get a response back.
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "Format the notes provided by the user into clean Markdown." },
                { role: "user", content: text },
            ],
        });

        // Handle the response from OpenAI
        const markdown = completion.choices?.[0]?.message?.content ?? "";

        return res.json({ markdown });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Formatting failed (API)." });
    }
};