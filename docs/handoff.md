# Seltz plugin handoff

## Current repository

The implementation is available in the public GitHub repository configured in `.codex-plugin/plugin.json`.
It is a temporary HOL-owned location pending Seltz confirmation of the final owner, repository name, and
transfer plan. No marketplace publication has been performed.

## History and transfer

This repository's history intentionally starts at the plugin snapshot. Transfer it to the configured
`hashgraph-online/seltz-codex-plugin` destination after review.

## What is ready

- Codex plugin manifest at `.codex-plugin/plugin.json`.
- Secure hosted MCP configuration at `.mcp.json` using `https://mcp.seltz.ai/mcp`.
- Seltz skill with search guidance and failure handling.
- README, security policy, environment template, listing draft, logo, and synthetic screenshot.
- HOL scanner workflow with SARIF and full Markdown report artifact.
- Discovery evidence and authenticated contract-test evidence in `docs/test-results.md`.

## Seltz decisions required

1. Confirm the final plugin name, description, category, icon, screenshot, and asset redistribution rights.
2. Confirm repository owner/name and whether this staging bundle should transfer later.
3. Provide the license and copyright holder for the plugin repository.
4. Confirm the authorized test account, active credits, and permitted negative/rate-limit search test
   cases. A one-call authenticated contract check has already passed; the credential was not stored.
5. Confirm the v1 contract remains one `search` tool with the documented parameters, or provide the
   authoritative allowlist and success criteria.
6. Name the Seltz approver, HOL marketplace submitter, and ongoing maintainer.
7. Confirm the target completion date.

The live endpoint advertises API-key authentication and Seltz's docs instruct Codex users to enter a Seltz
API key. The official MCP Registry metadata currently labels its bearer placeholder `smithery_api_key`.
Seltz should confirm whether that registry field is stale or whether Smithery-issued credentials are also
supported before publication.

## Submission and maintenance

After those decisions, initialize the remote, add the approved license and assets, run the full test matrix,
run the HOL marketplace scanner, create the repository marketplace entry or curated-marketplace PR, and
hand the repository to the named maintainer. Keep the scanner action pinned and review Seltz MCP schema
changes before updating the skill or manifest.
