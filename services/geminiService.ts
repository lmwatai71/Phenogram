import { GoogleGenAI, Chat, Content, Part } from "@google/genai";
import { SYSTEM_INSTRUCTION, TOOLS } from "../constants";
import { MOCK_STRAINS, MOCK_POST_IDEAS } from "./mockData";

// Initialize Gemini Client
// In a production app, never expose API keys on the client.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

// Mock Function Execution Logic
const executeFunction = async (name: string, args: any): Promise<any> => {
  console.log(`[MockTool] Executing ${name} with args:`, args);
  
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network latency

  switch (name) {
    case "get_recommended_content":
      return {
        recommendations: [
          { type: "post", title: "Top 5 Terps for Focus", user: "@terp_whisperer" },
          { type: "grow_journal", title: "Week 4: Flower Stretch", user: "@green_thumb_guy" },
          { type: "video", title: "Glass Blowing Live", user: "@molten_arts" }
        ],
        context: `Based on mood: ${args.mood || 'neutral'}`
      };

    case "search_strains":
      const query = args.query.toLowerCase();
      const results = MOCK_STRAINS.filter(s => 
        s.name.toLowerCase().includes(query) || 
        s.terpenes.some(t => t.toLowerCase().includes(query)) ||
        s.description.toLowerCase().includes(query)
      );
      return { results: results.length > 0 ? results : "No specific strains found matching that query." };

    case "suggest_post_ideas":
      const ideas = MOCK_POST_IDEAS[args.content_type as string] || [];
      return { ideas, level: args.experience_level };

    case "describe_app_feature":
      const descriptions: Record<string, string> = {
        "Stream": "The main feed where you see updates from growers and creators you follow. Algorithm-free by default.",
        "Stories": "24-hour ephemeral content for quick session checks and garden updates.",
        "Crews": "Micro-communities based on specific interests like 'Living Soil', 'Solventless', or 'Macro Photography'.",
        "Explore": "Discovery engine for new genetics, trending terp profiles, and rising creators.",
        "Grow Journals": "Dedicated structured logs to track plant lifecycles from seed to harvest.",
        "Culture Map": "Geographic discovery of local events, drops, and legal consumption lounges."
      };
      return { description: descriptions[args.feature_name] || "Feature not found." };

    default:
      return { error: "Function not implemented" };
  }
};

export const createChatSession = (): Chat => {
  return ai.chats.create({
    model: 'gemini-2.5-flash-latest', // High performance model
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ functionDeclarations: TOOLS }],
    },
  });
};

export const sendMessageToGemini = async (chat: Chat, message: string): Promise<string> => {
  try {
    // 1. Send the user message
    let result = await chat.sendMessage({ message });
    
    // 2. Loop to handle potential function calls (multi-turn if needed, but usually one round for this)
    // We check if the model wants to call a tool
    while (result.candidates && result.candidates[0].content.parts.some(p => p.functionCall)) {
      const parts = result.candidates[0].content.parts;
      const functionCallPart = parts.find(p => p.functionCall);
      
      if (functionCallPart && functionCallPart.functionCall) {
        const { name, args, id } = functionCallPart.functionCall;
        
        // Execute the tool locally
        const toolResult = await executeFunction(name, args);
        
        // Send the tool response back to the model
        result = await chat.sendMessage({
          content: {
            role: 'user', // In the new SDK, tool responses are sent as part of the turn, often conceptually 'user' or 'tool' depending on abstraction, but `sendMessage` handles the continuation.
            parts: [
              {
                functionResponse: {
                  name: name,
                  id: id,
                  response: { result: toolResult }
                }
              }
            ]
          }
        });
      }
    }

    // 3. Return the final text
    return result.text || "I'm having trouble connecting to the network right now. Try again?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I encountered a glitch in the matrix. Could you rephrase that?";
  }
};
