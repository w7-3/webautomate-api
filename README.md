# webautomate-api

Runnable API integration examples for [Webautomate](https://webautomate.app), built against the [Developer API documentation](https://webautomate.app/documentation/api).

Each example is self-contained with its own `README.md` and entry point.

## Examples

| Example | Description |
|---------|-------------|
| [authentication](./examples/authentication) | Verify an API token by reading your account |
| [projects](./examples/projects) | List projects (paginated) and delete a project |
| [automations](./examples/automations) | Queue a build and read a build's results |
| [webhooks](./examples/webhooks) | Receive webhook events and verify their signatures |

## Prerequisites

- Node.js 18+
- A Webautomate API token. Generate one under **My Account → Developers** in your [dashboard](https://webautomate.app/dashboard/account?account_tab=developers). It is shown only once.

## Getting started

```bash
cd examples/<example-name>
cp .env.example .env   # add your API token and account ID
npm install
npm start
```

All requests go to `https://api.webautomate.app/developer/v1` with an `Authorization: Bearer <token>` header. Every response has a `success` field. Check it even on HTTP 200.

## Related

- [`webautomate-mcp`](https://github.com/w7-3/webautomate-mcp) — MCP server for Webautomate _(coming soon)_
