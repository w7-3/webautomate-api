import 'dotenv/config';

const BASE_URL = 'https://api.webautomate.app/developer/v1';
const {WEBAUTOMATE_API_TOKEN, WEBAUTOMATE_ACCOUNT_ID} = process.env;

if (!WEBAUTOMATE_API_TOKEN || !WEBAUTOMATE_ACCOUNT_ID) {
    console.error('Missing WEBAUTOMATE_API_TOKEN or WEBAUTOMATE_ACCOUNT_ID in .env');
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${WEBAUTOMATE_API_TOKEN}`,
    'Content-Type': 'application/json',
};

async function listProjects() {
    const res = await fetch(`${BASE_URL}/projects/${WEBAUTOMATE_ACCOUNT_ID}`, {
        method: 'POST',
        headers,
    });

    if (!res.ok) throw new Error(`Failed to list projects: ${res.status}`);

    const {data} = await res.json();
    return data.projects;
}

async function deleteProject(projectId) {
    const res = await fetch(`${BASE_URL}/project-delete/${WEBAUTOMATE_ACCOUNT_ID}/${projectId}`, {
        method: 'DELETE',
        headers,
    });

    if (!res.ok) throw new Error(`Failed to delete project ${projectId}: ${res.status}`);

    return res.json();
}

// List all projects
const projects = await listProjects();
console.log(`Found ${projects.length} project(s):\n`);

for (const project of projects) {
    console.log(`  - ${project.name} (${project.id})`);
    console.log(`    State: ${project.state}`);
    console.log(`    Created: ${new Date(project.created).toLocaleString()}`);
    console.log();
}

// Uncomment to delete a specific project:
// const result = await deleteProject('your-project-id');
// console.log('Deleted:', result);
