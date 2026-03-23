import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import connectToDatabase from '@/lib/db';
import Product from '@/models/Product';

const apiKey = process.env.GEMINI_API_KEY || "";

export async function POST(req: Request) {
    try {
        const { message, language, pdfDataArray } = await req.json();
        
        await connectToDatabase();
        const products = await Product.find({}).lean();
        const productListString = products.map(p => `${p.name} (${p.weight}) - ₹${p.price}`).join(', ');

        // If no API key is provided, use a smart mock fallback so the chatbot remains functional
        if (!apiKey) {
            const lowerMsg = message.toLowerCase();
            let mockReply = "";

            if (lowerMsg.includes("selling") || lowerMsg.includes("product") || lowerMsg.includes("crop") || lowerMsg.includes("buy")) {
                mockReply = `As Krishi Sathi, I can help you with that! We are currently selling: ${productListString || "Vermi compost, NPK, Neem Cake, and more"}. You can find these in our Shop section.`;
            } else if (lowerMsg.includes("npk")) {
                mockReply = "NPK stands for Nitrogen, Phosphorus, and Potassium. These are the three main nutrients your crops need. Nitrogen promotes leaf growth, Phosphorus is good for roots and flowers, and Potassium helps with overall health and disease resistance.";
            } else if (lowerMsg.includes("soil") || lowerMsg.includes("moisture")) {
                mockReply = "Soil moisture is critical. Ideally, you want your soil to feel like a wrung-out sponge—damp but not dripping. Our SoilGuard sensors can help you monitor this perfectly in real-time!";
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi") || lowerMsg.includes("namaskar") || lowerMsg.includes("nomoskar")) {
                mockReply = "Hello! I am Krishi Sathi. I am currently running in offline-demo mode. Feel free to ask me something about our products, NPK, or soil moisture!";
            } else {
                mockReply = `That is an excellent question about "${message}". As Krishi Sathi, I suggest monitoring your soil sensors regularly. (Note: Please provide a GEMINI_API_KEY in your .env.local file to unlock my full AI capabilities!)`;
            }

            return NextResponse.json({ reply: mockReply });
        }

        // If API key is present, use Google Generative AI
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        
        const systemPrompt = `You are Krishi Sathi, an expert agricultural AI assistant for SoilGuard. 
THOROUGHNESS IS CRITICAL: If the user provides a list of questions, a questionnaire, or multiple inquiries, you MUST answer EACH and EVERY one of them in detail. Do not skip any part of the user's message.
Respond in a helpful, professional, and encouraging tone.
The user is communicating in language or context: ${language || "English"}. Please reply in the appropriate language format.

PRODUCT KNOWLEDGE:
We are an agricultural store. Here are the products we are currently selling:
${productListString}
If the user asks what we sell, what crops are available, or what they can buy, refer to this list.

User Message: ${message}`;

        let promptArgs: any[] = [systemPrompt];

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
        const response = await result.response;
        const textResponse = response.text();

        return NextResponse.json({ reply: textResponse });

    } catch (error: any) {
        console.error("AI Chat Error Details:", error);
        return NextResponse.json(
            { reply: `Sorry, I encountered an error: ${error.message || "I am having trouble connecting to my agricultural database right now."}` },
            { status: 500 }
        );
    }
}
