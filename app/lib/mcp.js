import { experimental_createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let cachedClient = null;
let cachedTools = null;
let lastConnected = 0;
const CACHE_TTL = 5 * 60 * 1000;

export async function getKaprukaMCP() {
  const now = Date.now();

  if (cachedClient && cachedTools && now - lastConnected < CACHE_TTL) {
    return { client: cachedClient, tools: cachedTools };
  }

  try {
    const transport = new StreamableHTTPClientTransport(
      new URL("https://mcp.kapruka.com/mcp")
    );

    const client = await experimental_createMCPClient({ transport });
    const tools = await client.tools();

    cachedClient = client;
    cachedTools = tools;
    lastConnected = now;

    console.log("✅ Kapruka MCP connected. Tools:", Object.keys(tools));
    return { client, tools };
  } catch (error) {
    console.error("❌ Failed to connect to Kapruka MCP:", error);
    throw error;
  }
}