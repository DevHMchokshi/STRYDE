import https from 'https';

const ids = [
    'biQIK_Xrbxo', 'GWTnBqB7HdU', 'bNSdIkCBJOs', '_VfvnjbKFu4', 'VYgZOTb-Zls', 'TGTZU5sSDvs', 's-naETgXc7k', 'b_Se9DbaS-8',
    '3Cyqs_oZXeg', 'RNi-LVpkDE8', '7t5-ZGeEG0w', 'Li1vX2m1ARA', 'OYkcIySoGeM', 'dlIXN9HToCU', 'jkGFCdfa55g',
    'jhArLh1A7lw', 'nQzQcJBmKbk', 'So23xcz0M1k', 'pnUCLxXpGVc', '9Am6S6T8OAI', 'VrEnsEPQH7Q', 'dWSTB1_WoyA'
];

async function fetchImage(id) {
    return new Promise((resolve) => {
        https.get(`https://unsplash.com/photos/${id}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                const match = data.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
                if (match) {
                    console.log(`{ id: '${id}', url: '${match[1]}' },`);
                } else {
                    console.log(`{ id: '${id}', url: 'NOT_FOUND' },`);
                }
                resolve();
            });
        }).on('error', () => resolve());
    });
}

async function run() {
    for (const id of ids) {
        await fetchImage(id);
    }
}

run();
