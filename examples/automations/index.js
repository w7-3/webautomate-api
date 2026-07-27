import 'dotenv/config';

const BASE_URL = 'https://api.webautomate.app/developer/v1';
const {WEBAUTOMATE_API_TOKEN, WEBAUTOMATE_ACCOUNT_ID, WEBAUTOMATE_PROJECT_ID} = process.env;

if (!WEBAUTOMATE_API_TOKEN || !WEBAUTOMATE_ACCOUNT_ID || !WEBAUTOMATE_PROJECT_ID) {
    console.error('Missing required env vars. Check .env.example');
    process.exit(1);
}

const headers = {
    Authorization: `Bearer ${WEBAUTOMATE_API_TOKEN}`,
    'Content-Type': 'application/json',
};

async function triggerBuild() {
    const res = await fetch(
        `${BASE_URL}/project-build/${WEBAUTOMATE_ACCOUNT_ID}/${WEBAUTOMATE_PROJECT_ID}`,
        {method: 'POST', headers},
    );

    if (!res.ok) throw new Error(`Failed to trigger build: ${res.status}`);

    const body = await res.json();

    if (!body.success) {
        throw new Error(`Build rejected: ${body.error?.message}`);
    }

    return body.data.buildResult.data.buildId;
}

async function getBuildResult(buildId) {
    const res = await fetch(
        `${BASE_URL}/project-build-result/${WEBAUTOMATE_ACCOUNT_ID}/${WEBAUTOMATE_PROJECT_ID}/${buildId}`,
        {headers},
    );

    if (!res.ok) throw new Error(`Failed to fetch build result: ${res.status}`);

    const {data} = await res.json();
    return data;
}

async function pollUntilComplete(buildId, {intervalMs = 5000, timeoutMs = 300000} = {}) {
    const deadline = Date.now() + timeoutMs;

    while (Date.now() < deadline) {
        const {build, results} = await getBuildResult(buildId);
        const state = build?.state;

        console.log(`  [${new Date().toISOString()}] Build state: ${state}`);

        if (state === 'completed' || state === 'failed' || state === 'cancelled') {
            return {build, results};
        }

        await new Promise((resolve) => setTimeout(resolve, intervalMs));
    }

    throw new Error(`Build ${buildId} did not complete within ${timeoutMs / 1000}s`);
}

console.log(`Triggering build for project ${WEBAUTOMATE_PROJECT_ID}...`);
const buildId = await triggerBuild();
console.log(`Build triggered. ID: ${buildId}\n`);

console.log('Polling for completion...');
const {build, results} = await pollUntilComplete(buildId);

console.log(`\nBuild ${build.state.toUpperCase()}`);
console.log(`Duration: ${((build.completedAt - build.startedAt) / 1000).toFixed(1)}s`);
console.log(`Results: ${results.length} item(s)`);

if (results.length > 0) {
    console.log('\nFirst result preview:');
    console.log(JSON.stringify(results[0], null, 2));
}
