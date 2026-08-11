# Seltz Codex plugin

Seltz gives Codex access to current, source-backed web knowledge through Seltz's official Streamable HTTP
MCP server. The plugin is intentionally thin: it configures the hosted server and adds guidance for
responsible web research. It does not proxy, cache, rewrite, or expand Seltz's tool surface.

## What is included

The documented v1 MCP surface currently contains one read-only tool:

| Tool | Inputs | Outcome |
| --- | --- | --- |
| `search` | `query` required; `max_results` optional, default `10` | Relevant web results from Seltz |

The live server remains authoritative. The plugin does not assume undocumented response fields or expose
tools that are not returned by the server.

## Install and authenticate

The official Seltz MCP endpoint is:

```text
https://mcp.seltz.ai/mcp
```

For a local Codex MCP connection, the official setup is:

```bash
codex mcp add seltz --url https://mcp.seltz.ai/mcp
```

Then run `/mcp`, select Seltz, and enter a Seltz API key. Codex owns the interactive authentication
session; the plugin does not store a key in `.mcp.json`.

For local verification scripts only, copy `.env.example` and set `SELTZ_API_KEY`. Never commit `.env`,
paste a key into chat, or place a real key in a workflow, fixture, screenshot, or manifest.

The authorized MCP contract test uses the same credential without printing it:

```bash
# Export SELTZ_API_KEY from your approved local secret manager first.
node tests/run-mcp-e2e.mjs
```

It performs `initialize`, `tools/list`, and one bounded `search` call. It must be run only with a Seltz
test account and approved credits.

Official setup documentation: <https://docs.seltz.ai/integrations/mcp>

## Usage examples

After authentication, ask Codex naturally:

- “Search for the latest official guidance on EU AI Act transparency obligations and link the primary sources.”
- “Find current sources comparing the leading open-source embedding models, with publication dates.”
- “Fact-check this claim using current web sources, and separate evidence from your conclusion.”

For direct tool-oriented requests, Codex can call `search` with a concise `query` and an optional
`max_results` value. Search results should be reviewed, linked, and treated as time-sensitive evidence—not
as an automatic guarantee of truth or completeness.

## Troubleshooting

- **401 / missing API key:** reconnect through `/mcp` and enter a valid Seltz API key.
- **403 / permission denied:** verify the key belongs to the intended Seltz account and has access to MCP.
- **429 or usage limit:** stop retrying, wait for the server-provided retry interval, and check the Seltz
  Console plan and remaining credits.
- **Timeout or unavailable service:** retry once for a safe search; if it still fails, report that current
  Seltz data could not be retrieved.
- **Unexpected result shape:** preserve the raw source links that are present, report the missing fields,
  and refresh the server schema before making assumptions.

## Privacy and source use

Queries are sent to Seltz. Avoid secrets, credentials, private identifiers, and unnecessary personal data.
Seltz output may include third-party content and usage restrictions; follow Seltz's [Terms of Service](https://seltz.ai/terms)
and [Privacy Policy](https://seltz.ai/privacy-policy), and review linked sources before redistribution.

## Development status

The bundle is available at the repository URL in the manifest. The authorized MCP contract test completed
`initialize`, `tools/list`, and one bounded `search` call successfully. Public repository transfer/ownership,
license, final icon approval, and negative/rate-limit test coverage remain recorded as unresolved in
[`docs/handoff.md`](docs/handoff.md). No credentials or auto-publication are included.
