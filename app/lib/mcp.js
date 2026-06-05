import { experimental_createMCPClient } from "ai";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

let cachedClient = null;
let cachedTools = null;
let lastConnected = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

async function tryConnect(attempt = 1) {
  try {
    const transport = new StreamableHTTPClientTransport(
      new URL("https://mcp.kapruka.com/mcp")
    );

    const client = await experimental_createMCPClient({ transport });
    const tools = await client.tools();

    console.log(`✅ Kapruka MCP connected (attempt ${attempt}). Tools:`, Object.keys(tools));
    return { client, tools };
  } catch (error) {
    console.error(`❌ MCP connection attempt ${attempt} failed:`, error.message);
    
    if (attempt < 3) {
      // Wait 1 second then retry
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return tryConnect(attempt + 1);
    }
    
    throw error;
  }
}

export async function getKaprukaMCP() {
  const now = Date.now();

  // Reuse cached connection if fresh
  if (cachedClient && cachedTools && now - lastConnected < CACHE_TTL) {
    return { client: cachedClient, tools: cachedTools };
  }

  // Clear stale cache
  cachedClient = null;
  cachedTools = null;

  const { client, tools } = await tryConnect();

  cachedClient = client;
  cachedTools = tools;
  lastConnected = now;

  return { client, tools };
}