# webautomate-api

Runnable API integration examples for [Webautomate](https://webautomate.app).

Each example is self-contained with its own `README.md` and entry point.

## Examples

| Example | Description |
|---------|-------------|
| [authentication](./examples/authentication) | Authenticate and manage API tokens |
| [projects](./examples/projects) | Create and manage projects |
| [automations](./examples/automations) | Trigger and monitor automation runs |
| [webhooks](./examples/webhooks) | Receive and process webhook events |

## Prerequisites

- Node.js 18+
- A Webautomate API key — get one from your [account settings](https://webautomate.app/settings/api)

## Getting started

```bash
cd examples/<example-name>
cp .env.example .env   # add your API key
npm install
npm start
```

## Related

- [`webautomate-mcp`](https://github.com/w7-3/webautomate-mcp) — MCP server for Webautomate _(coming soon)_
