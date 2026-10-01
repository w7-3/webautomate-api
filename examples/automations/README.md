# Automations

Queues a build for a project, or reads the results of a finished build.

## Run

```bash
cp .env.example .env   # fill in token, account ID, and project ID
npm install
npm start
```

## What it does

**Without `WEBAUTOMATE_BUILD_ID`**, it queues a build:

- Calls `POST /developer/v1/project-build/:accountId/:projectId`
- Checks `success` in the response. If the project cannot be queued (not active, already queued or running, invalid configuration, or not enough Usage Credits), the API still returns HTTP 200, with `"success": false` and the reason in `error.message`
- The response does not include a build ID. The outcome arrives as a `build.completed`, `build.failed`, `build.mixed`, or `build.cancelled` webhook. Run the [webhooks](../webhooks) example to receive it.

**With `WEBAUTOMATE_BUILD_ID`** (taken from the webhook's `payload.requestData.buildId`), it reads results:

- Calls `GET /developer/v1/project-build-result/:accountId/:projectId/:buildId?limit=25` and follows `data.pagination.nextCursor`
- Prints the build's state and duration, how many results it has, and the first result

Builds queued through the API are charged like manual runs and appear with the vendor `manager`.

## Build states

`queue`, `running`, `success`, `failure`, `mixed`, `cancel`, `timeout`, `terminated`

## Required scopes

- `projects.run`: queue a build
- `results.read`: read build results
