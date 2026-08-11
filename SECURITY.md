# Security policy

## Scope

This plugin connects Codex to Seltz's hosted MCP endpoint at `https://mcp.seltz.ai/mcp`. It contains no
server implementation and does not retain credentials or user data.

## Credential handling

- Authenticate interactively in Codex through `/mcp`.
- Use `SELTZ_API_KEY` only in a local, ignored environment for authorized verification.
- Never commit API keys, OAuth tokens, cookies, private MCP session identifiers, or test-account exports.
- Do not include secrets or unnecessary private data in search queries.

## Data and output handling

Search queries are transmitted to Seltz. Results can contain third-party material, personal data, or
time-sensitive claims. Review Seltz's terms and privacy policy before using the plugin with sensitive data
or redistributing output. Preserve source links and do not present retrieved content as independently
verified merely because Seltz returned it.

## Reporting

Do not open a public issue containing credentials or private query/result data. Report suspected plugin or
configuration vulnerabilities to the repository maintainers and Seltz at <support@seltz.ai>.
