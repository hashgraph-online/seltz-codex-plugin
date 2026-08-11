# Seltz plugin test results

Run date: 2026-08-11

## Read-only discovery completed

| Check | Result | Evidence |
| --- | --- | --- |
| Supplied root URL | Pass | `https://mcp.seltz.ai` serves Seltz documentation HTML, not MCP JSON-RPC. |
| MCP endpoint | Pass | `https://mcp.seltz.ai/mcp` responds over HTTPS. |
| Unauthenticated request | Expected failure | `GET` and `POST initialize` return `401` with `Missing API key`. |
| Auth challenge | Pass | `WWW-Authenticate` points to Seltz OAuth protected-resource metadata. |
| Protected-resource metadata | Pass | Bearer header is supported for `https://mcp.seltz.ai/mcp`. |
| OAuth metadata | Observed | Authorization code and client-credentials endpoints are advertised, but Seltz's Codex docs use an interactive API-key prompt. |
| Registry metadata | Mismatch to confirm | Official Registry metadata uses `Bearer {smithery_api_key}` while Seltz's endpoint and docs require a Seltz API key. |
| Codex setup documentation | Pass | Seltz documents `codex mcp add seltz --url https://mcp.seltz.ai/mcp`, then `/mcp` authentication. |
| Documented v1 tools | Pass | One tool: `search(query, max_results?)`, with `max_results` default `10`. |
| HOL plugin scanner | Pass with publication blocker | Latest public-marketplace scan scored `94/100` (A), with no critical/high/medium findings; the low-severity blocker is the missing license, which cannot be guessed. |

## Authorized end-to-end contract test

| Check | Result | Evidence |
| --- | --- | --- |
| Authenticated `initialize` | Pass | The supplied test credential completed MCP initialization over HTTPS; no credential was logged or stored. |
| Authenticated `tools/list` | Pass | The server returned the documented `search` tool. |
| Bounded `search` call | Pass | `search` accepted a sanitized query with `max_results: 1` and returned a result payload. |

The script prints only the endpoint, negotiated protocol version, tool names, and a boolean result marker.

## Pending negative and limit tests

The following cases still require Seltz-approved test fixtures or explicit permission because they can
consume credits or depend on account policy:

- empty/malformed query handling
- invalid or expired key
- permission failure
- rate/usage limit response and retry timing
- timeout/unavailable service
- malformed tool result handling

Run these cases with a Seltz-provided test account and record only status codes, tool names, sanitized
inputs, latency, and redacted result-shape evidence. The unauthenticated `401` case is already recorded
above and does not require credentials.
