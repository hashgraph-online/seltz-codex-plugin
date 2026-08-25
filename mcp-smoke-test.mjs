const endpoint = process.env.SELTZ_MCP_URL || 'https://mcp.seltz.ai/mcp';
const apiKey = process.env.SELTZ_API_KEY;

export function mcpEndpoint() {
  return endpoint;
}

export function mcpHeaders(key = apiKey) {
  if (!key) throw new Error('SELTZ_API_KEY is required for the MCP smoke test.');
  return {
    accept: 'application/json, text/event-stream',
    authorization: `Bearer ${key}`,
    'content-type': 'application/json',
  };
}
