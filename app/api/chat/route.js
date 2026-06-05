import { groq } from "@ai-sdk/groq";
import { streamText } from "ai";
import { getKaprukaMCP } from "@/app/lib/mcp";

console.log("🔑 Groq key loaded:", process.env.GROQ_API_KEY ? `YES (${process.env.GROQ_API_KEY.substring(0, 10)}...)` : "❌ NO");

export const maxDuration = 60;
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SYSTEM_PROMPT = `You are Kapru 🌴, a warm bilingual gifting concierge for Kapruka.com (Sri Lanka).

Style:
- Friendly, warm, conversational — like a helpful friend
- Match user's language: English, Sinhala (සිංහල), or Tanglish
- Use Sri Lankan words like "Aney", "Lassana", "Aiyo" naturally and occasionally
- NEVER use "Machan"
- Start replies with simple greetings: "Hey!", "Sure!", "Of course!", "Here you go!"
- 1 emoji max per message
- VERY SHORT replies (1-2 sentences). Product cards will show the details — you DON'T need to list products in text.

TOOL USAGE - CRITICAL:
When calling kapruka_search_products, you MUST wrap arguments inside a "params" object:
{ "params": { "q": "chocolate", "limit": 5 } }

After calling the search tool:
- DO NOT list the products in your reply (they'll show as visual cards automatically)
- Just say something brief like: "Here are some lovely options! 🍫" or "Found these for you, take a look!"
- If asking what they want next: "Which one catches your eye?"

Never invent products. Always use the tool. Currency: LKR.`;

export async function POST(req) {
  try {
    const { messages } = await req.json();
    const { tools: allTools } = await getKaprukaMCP();

    // Only send the most essential tool
    const essentialTools = {
      kapruka_search_products: allTools.kapruka_search_products,
    };

    const result = streamText({
      model: groq("openai/gpt-oss-20b"),
      system: SYSTEM_PROMPT,
      messages,
      tools: essentialTools,
      maxSteps: 3,
      temperature: 0.5,
    });

    return result.toDataStreamResponse({
      sendReasoning: false,
      getErrorMessage: (error) => {
        console.error("Stream error:", error);
        return error?.message || "Something went wrong";
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}