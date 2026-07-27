# Projects

Lists all projects in your account and demonstrates how to delete one.

## Run

```bash
cp .env.example .env
npm install
npm start
```

## What it does

- Calls `POST /developer/v1/projects/:accountId` to fetch all projects
- Prints each project's name, ID, state, and creation date
- Includes a commented-out `deleteProject()` call you can enable

## Required scopes

- `projects.read` — to list projects
- `projects.delete` — to delete a project (optional, only if you uncomment the delete call)
