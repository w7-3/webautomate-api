# Authentication

Verifies your API token is valid by calling the account endpoint.

## Run

```bash
cp .env.example .env   # fill in your token and account ID
npm install
npm start
```

## What it does

- Sends a `GET /developer/v1/account/:accountId` request with your Bearer token
- Prints your account data on success, or exits with an error message if the token is invalid/expired

## Get a token

Go to **Settings → API Tokens** in your Webautomate dashboard and create a token with at least the `account.read` scope.
