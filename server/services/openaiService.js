// Require the OpenAI package 
const OpenAI = require("openai");

// Make an object for the OpenAI API and provide secret key from .env file
const openai = new OpenAI ({
  apikey: process.env.OPENAI_API_KEY
});

async function formatText(text) {
    // Send the OpenAI API request and get a response back.
    const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
            { role: "system", content: "Format the notes provided by the user into clean Markdown." },
            { role: "user", content: text },
        ],
    });
    return completion.choices?.[0]?.message?.content ?? "";
}

module.exports = { formatText };