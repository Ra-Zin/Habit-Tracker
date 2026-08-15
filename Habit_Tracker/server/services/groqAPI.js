import Groq from "groq-sdk";

const systemPrompt = `
You are the habit coach inside an app called HabitLoop.
You are given a list of the user's habits with their current streaks.
Reply with 3 to 5 short sentences of practical, specific encouragement:
name the streak worth protecting, and suggest one concrete next step.
Be warm and plain-spoken. Do not use bullet points, headings, or emoji.
Do not ask the user any questions.
`;

let client;

/** Created lazily so the server still boots when no key is configured. */
function getClient() {
  if (!process.env.GROQ_API_KEY) {
    const error = new Error("The coach is not configured on this server.");
    error.status = 503;
    throw error;
  }
  if (!client) {
    client = new Groq({ apiKey: process.env.GROQ_API_KEY });
  }
  return client;
}

export async function getHabitCoachResponse(userInput) {
  const completion = await getClient().chat.completions.create({
    model: process.env.GROQ_MODEL || "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userInput },
    ],
    temperature: 0.7,
    max_tokens: 300,
  });

  return completion.choices[0]?.message?.content?.trim() || "";
}
