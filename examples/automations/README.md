# Automations

Triggers an automation run and polls until it completes.

## Run

```bash
cp .env.example .env   # fill in token, account ID, and project ID
npm install
npm start
```

## What it does

1. Triggers a build via `POST /developer/v1/project-build/:accountId/:projectId`
2. Polls `GET /developer/v1/project-build-result/:accountId/:projectId/:buildId` every 5 seconds
3. Exits when the build state is `completed`, `failed`, or `cancelled`
4. Prints the duration and a preview of the first result

## Required scopes

- `projects.run` — to trigger a build
- `results.read` — to fetch the build result
