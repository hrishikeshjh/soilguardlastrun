import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
    try {
        const { message, language, pdfDataArray } = await req.json();

        // If no API key is provided, use a smart mock fallback so the chatbot remains functional
        if (!apiKey) {
            const lowerMsg = message.toLowerCase();
            let mockReply = "";

            if (lowerMsg.includes("npk")) {
                mockReply = "NPK stands for Nitrogen, Phosphorus, and Potassium. These are the three main nutrients your crops need. Nitrogen promotes leaf growth, Phosphorus is good for roots and flowers, and Potassium helps with overall health and disease resistance.";
            } else if (lowerMsg.includes("soil") || lowerMsg.includes("moisture")) {
                mockReply = "Soil moisture is critical. Ideally, you want your soil to feel like a wrung-out sponge—damp but not dripping. Our SoilGuard sensors can help you monitor this perfectly in real-time!";
            } else if (lowerMsg.includes("weather") || lowerMsg.includes("rain")) {
                mockReply = "I don't have real-time weather data connected yet, but keeping an eye on local forecasts is crucial before applying fertilizers to prevent runoff.";
            } else if (lowerMsg.includes("crop") || lowerMsg.includes("plant")) {
                mockReply = "Different crops have different requirements. For instance, leafy greens thrive on high nitrogen, while fruiting plants like tomatoes need more phosphorus and potassium.";
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("namaskar") || lowerMsg.includes("nomoskar")) {
                mockReply = "Hello! I am Krishi Sathi. I am currently running in offline-demo mode. Feel free to ask me something about NPK, soil moisture, or general crop health!";
            } else {
                mockReply = `That is an excellent question about "${message}". As Krishi Sathi, I suggest monitoring your soil sensors regularly. (Note: Please provide a GEMINI_API_KEY in your .env.local file to unlock my full AI capabilities!)`;
            }

            return NextResponse.json({ reply: mockReply });
        }

        // If API key is present, use Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `You are Krishi Sathi, an expert agricultural AI assistant for SoilGuard. 
THOROUGHNESS IS CRITICAL: If the user provides a list of questions, a questionnaire, or multiple inquiries, you MUST answer EACH and EVERY one of them in detail. Do not skip any part of the user's message.
Respond in a helpful, professional, and encouraging tone.
The user is communicating in language or context: ${language || "English"}. Please reply in the appropriate language format.
User Message: ${message}`;

        let promptArgs: any[] = [prompt];

        if (pdfDataArray && Array.isArray(pdfDataArray) && pdfDataArray.length > 0) {
            pdfDataArray.forEach((pdf: { name: string, data: string }) => {
                promptArgs.push({
                    inlineData: {
                        data: pdf.data,
                        mimeType: "application/pdf"
                    }
                });
            });
            promptArgs.push("Please analyze the attached PDF reports, summarize their key points, compare them if there are more than one, and answer any specific questions from the user message.");
        }

        const result = await model.generateContent(promptArgs);
        const textResponse = await result.response.text();

        return NextResponse.json({ reply: textResponse });

    } catch (error) {
        console.error("AI Chat Error:", error);
        return NextResponse.json(
            { reply: "Sorry, I am having trouble connecting to my agricultural database right now." },
            { status: 500 }
        );
    }
}
