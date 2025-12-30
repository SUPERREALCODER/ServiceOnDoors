
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

export class AIService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: API_KEY || '' });
  }

  async getChatResponse(message: string, context: string = "") {
    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Context: ${context}. User Input: ${message}`,
        config: {
          systemInstruction: `You are the 'ServiceOnDoor Assistant'. 
          Capabilities:
          1. Guide users to book services (Water Purifier, AC, Geyser, Fridge, Washing Machine).
          2. Explain pricing (Services start at ₹399).
          3. Automated dispatch info: Explain that we use real-time GPS tracking to find the closest pro.
          4. Feedback: Mention we take ratings seriously.
          5. ESCALATION: If the user is very angry, uses profanity, or has a complex billing issue, tell them: "I'm escalating this to a human manager. They will call you within 15 minutes." 
          Keep responses concise and helpful. Branding: ServiceOnDoor.`,
          temperature: 0.6,
        },
      });
      return response.text;
    } catch (error) {
      console.error("Gemini Error:", error);
      return "ServiceOnDoor is currently processing high traffic. Please use our direct booking form or call support!";
    }
  }
}

export const aiService = new AIService();
