---
name: seltz
description: Use Seltz's official MCP search tool for current, source-backed web research in Codex.
license: Apache-2.0
---

# Seltz web research

Use the configured Seltz MCP server when the user needs current web information, recent developments,
source discovery, or a fact check. The documented v1 surface exposes one tool:

- `search`: required `query` string; optional `max_results` integer, default `10`.

## Operating rules

1. Turn the user's request into a concise, specific query. Include a date, jurisdiction, product, or
   domain when it materially narrows the research question.
2. Keep `max_results` small enough for the task. Ask for more only when the first results leave a clear
   evidence gap.
3. Preserve source URLs and publication dates from the tool result. Distinguish Seltz output from your
   own synthesis, and tell the user when a claim is time-sensitive or only supported by one source.
4. Prefer primary, official, or directly attributable sources for legal, financial, medical, security,
   and product claims. Do not treat ranking as proof.
5. Do not send API keys, passwords, payment credentials, private account data, or unnecessary personal
   information in a query.
6. Do not imply that Seltz fetched a page, verified a fact, or returned an exhaustive result set unless
   the live tool response explicitly supports that statement.

## Failure handling

- Authentication or permission failures: ask the user to reconnect Seltz in Codex and re-enter the API
  key; never ask them to paste the key into the conversation.
- Rate or usage limits: report the limit, honor any retry timing returned by the server, and do not loop.
- Timeouts or unavailable service: retry at most once when the request is safe and idempotent, then offer
  a fallback that does not pretend to have current Seltz data.
- Malformed or incomplete results: say what is missing, preserve any usable source links, and do not
  manufacture fields or citations.

## Safe response pattern

For research answers, state the question and retrieval time, summarize the strongest sources, link them,
and call out uncertainty, conflicting evidence, or missing coverage. For fact checks, separate the verdict
from the evidence and explain what would change the conclusion.
