# Webhooks

A minimal webhook receiver that listens for build events from Webautomate.

## Run

```bash
cp .env.example .env
npm install
npm start
```

Then expose it publicly so Webautomate can reach it:

```bash
npx ngrok http 3000
```

Register the resulting URL (`https://<id>.ngrok.io/webhook`) in your Webautomate notification settings.

## What it does

- Starts an HTTP server on `POST /webhook`
- Optionally validates a shared secret via the `x-webautomate-secret` header
- Handles `build.completed` and `build.failed` events; logs unknown event types

## Event payload shape

```json
{
  "type": "build.completed",
  "buildId": "build_abc123",
  "projectId": "project_xyz",
  "state": "completed",
  "results": [...]
}
```
