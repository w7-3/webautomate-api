import 'dotenv/config';
import http from 'http';

const PORT = process.env.PORT || 3000;
const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

// Minimal HTTP server — no framework dependency.
const server = http.createServer((req, res) => {
    if (req.method !== 'POST' || req.url !== '/webhook') {
        res.writeHead(404).end();
        return;
    }

    let body = '';
    req.on('data', (chunk) => { body += chunk; });
    req.on('end', () => {
        let event;
        try {
            event = JSON.parse(body);
        } catch {
            res.writeHead(400).end('Invalid JSON');
            return;
        }

        // Optional: verify a shared secret header
        if (WEBHOOK_SECRET) {
            const incoming = req.headers['x-webautomate-secret'];
            if (incoming !== WEBHOOK_SECRET) {
                console.warn('Rejected webhook: invalid secret');
                res.writeHead(401).end();
                return;
            }
        }

        handleEvent(event);
        res.writeHead(200).end('ok');
    });
});

function handleEvent(event) {
    const {type, buildId, projectId, state, results} = event;

    console.log(`\n[${new Date().toISOString()}] Event received: ${type}`);

    switch (type) {
        case 'build.completed':
            console.log(`  Build ${buildId} (project: ${projectId}) completed`);
            console.log(`  State: ${state}`);
            console.log(`  Results: ${results?.length ?? 0} item(s)`);
            break;

        case 'build.failed':
            console.log(`  Build ${buildId} failed`);
            console.log(`  Error: ${event.error?.message}`);
            break;

        default:
            console.log(`  Unhandled event type: ${type}`);
            console.log('  Payload:', JSON.stringify(event, null, 2));
    }
}

server.listen(PORT, () => {
    console.log(`Webhook listener running on http://localhost:${PORT}/webhook`);
    console.log('Expose it publicly with: npx ngrok http ' + PORT);
});
