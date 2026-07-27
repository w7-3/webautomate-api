import 'dotenv/config';

const BASE_URL = 'https://api.webautomate.app/developer/v1';
const {WEBAUTOMATE_API_TOKEN, WEBAUTOMATE_ACCOUNT_ID} = process.env;

if (!WEBAUTOMATE_API_TOKEN || !WEBAUTOMATE_ACCOUNT_ID) {
    console.error('Missing WEBAUTOMATE_API_TOKEN or WEBAUTOMATE_ACCOUNT_ID in .env');
    process.exit(1);
}

async function verifyToken() {
    const res = await fetch(`${BASE_URL}/account/${WEBAUTOMATE_ACCOUNT_ID}`, {
        headers: {
            Authorization: `Bearer ${WEBAUTOMATE_API_TOKEN}`,
        },
    });

    if (res.status === 401) {
        throw new Error('Invalid or expired token');
    }

    if (!res.ok) {
        throw new Error(`Unexpected response: ${res.status}`);
    }

    const {data} = await res.json();
    return data.account;
}

const account = await verifyToken();
console.log('Token is valid.');
console.log('Account:', JSON.stringify(account, null, 2));
