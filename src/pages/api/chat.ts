  import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    const userMessage = messages[messages.length - 1].content;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: userMessage }],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    // Gemini’s response format
    const aiText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || "⚠️ No response from Gemini";

    return res.status(200).json({ reply: aiText });
  } catch (error) {
    console.error("Gemini API error:", error);
    return res.status(500).json({ reply: "⚠️ Error fetching response from Gemini API" });
  }
}
