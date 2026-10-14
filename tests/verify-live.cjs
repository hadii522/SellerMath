const http = require('http');

function fetch(path) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + path, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data,
      }));
    }).on('error', reject);
  });
}

async function run() {
  console.log('--- Checking Root Headers ---');
  const root = await fetch('/');
  console.log('Status:', root.statusCode);
  console.log('Content-Security-Policy:', root.headers['content-security-policy'] ? 'PRESENT' : 'MISSING');
  console.log('Strict-Transport-Security:', root.headers['strict-transport-security']);
  console.log('X-Frame-Options:', root.headers['x-frame-options']);
  console.log('X-Content-Type-Options:', root.headers['x-content-type-options']);
  console.log('Referrer-Policy:', root.headers['referrer-policy']);
  console.log('Permissions-Policy:', root.headers['permissions-policy']);

  console.log('\n--- Checking RFC 9116 security.txt ---');
  const sec = await fetch('/.well-known/security.txt');
  console.log('Status:', sec.statusCode);
  console.log('Content:\n' + sec.body.trim());

  console.log('\n--- Checking Target Email on All Legal & Security Routes ---');
  const routes = [
    '/',
    '/contact',
    '/privacy-policy',
    '/terms',
    '/disclaimer',
    '/security',
    '/about',
  ];

  for (const r of routes) {
    const res = await fetch(r);
    const hasEmail = res.body.includes('hgoraya522@gmail.com');
    console.log(`${r} -> Status ${res.statusCode} | Has hgoraya522@gmail.com: ${hasEmail}`);
  }
}

run().catch(console.error);
