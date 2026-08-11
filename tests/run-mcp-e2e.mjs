#!/usr/bin/env node

const endpoint = process.env.SELTZ_MCP_URL || 'https://mcp.seltz.ai/mcp';
const apiKey = process.env.SELTZ_API_KEY;

if (!apiKey) {
  console.error('SELTZ_API_KEY is required for the authorized MCP E2E test.');
  process.exit(2);
}

const requestHeaders = {
  accept: 'application/json, text/event-stream',
  authorization: `Bearer ${apiKey}`,
  'content-type': 'application/json',
};

async function postRpc(payload, sessionId) {
  const headers = { ...requestHeaders };
  if (sessionId) headers['mcp-session-id'] = sessionId;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(30_000),
  });
  const text = await response.text();
  const contentType = response.headers.get('content-type') || '';
  let body;
  try {
    if (contentType.includes('text/event-stream')) {
      const data = text
        .split('\n')
        .filter((line) => line.startsWith('data:'))
        .map((line) => line.slice(5).trim())
        .filter(Boolean)
        .at(-1);
      body = data ? JSON.parse(data) : { raw: text };
    } else {
      body = text ? JSON.parse(text) : {};
    }
  } catch {
    body = { raw: text.slice(0, 1000) };
  }
  if (!response.ok) {
    throw new Error(`MCP HTTP ${response.status}: ${JSON.stringify(body)}`);
  }
  if (body.error) {
    throw new Error(`MCP JSON-RPC error: ${JSON.stringify(body.error)}`);
  }
  return { body, sessionId: response.headers.get('mcp-session-id') || sessionId };
}

const initialize = await postRpc({
  jsonrpc: '2.0',
  id: 1,
  method: 'initialize',
  params: {
    protocolVersion: '2025-06-18',
    capabilities: {},
    clientInfo: { name: 'seltz-codex-plugin-e2e', version: '0.1.0' },
  },
});

const sessionId = initialize.sessionId;
await postRpc({ jsonrpc: '2.0', method: 'notifications/initialized', params: {} }, sessionId);

const listed = await postRpc({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }, sessionId);
const tools = listed.body.result?.tools || [];
const searchTool = tools.find((tool) => tool.name === 'search');
if (!searchTool) {
  throw new Error(`Expected search tool; received ${tools.map((tool) => tool.name).join(', ') || 'none'}`);
}

const called = await postRpc({
  jsonrpc: '2.0',
  id: 3,
  method: 'tools/call',
  params: { name: 'search', arguments: { query: 'Seltz MCP server', max_results: 1 } },
}, sessionId);

console.log(JSON.stringify({
  endpoint,
  protocolVersion: initialize.body.result?.protocolVersion || null,
  tools: tools.map((tool) => tool.name),
  searchResultReceived: Boolean(called.body.result),
}));
