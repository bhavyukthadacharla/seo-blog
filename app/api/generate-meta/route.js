import { GoogleGenerativeAI } from "@google/generative-ai";
console.log("KEY:", process.env.GEMINI_API_KEY);

export async function POST(req) {
    try {
        const { title, content } = await req.json();

        const genAI = new GoogleGenerativeAI(
            process.env.GEMINI_API_KEY
        );

        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
        });

        const prompt = `
Summarize this blog article in 1-2 short sentences.
Keep it under 150 characters.

Title:
${title}

Content:
${content}
`;

        const result = await model.generateContent(prompt);

        const summary = result.response
            .text()
            .trim();
            console.log("AI Summary:", summary);

        return Response.json({
            metaDescription: summary,
        });

    } catch (error) {
        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }
}