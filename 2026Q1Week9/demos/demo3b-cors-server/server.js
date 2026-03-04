const express = require('express');
const path = require('path');

// ─── API Server (port 3001) ─── Different origin = triggers CORS
const api = express();

// Log every request so instructor can show "the server received ALL requests"
api.use((req, res, next) => {
  console.log(`[API :3001] ${req.method} ${req.url}  ←  Origin: ${req.headers.origin || '(none)'}`);
  next();
});

// Endpoint WITHOUT CORS headers — browser will block the response
api.get('/api/data', (req, res) => {
  res.json({
    message: 'Hello from the API server!',
    timestamp: new Date().toISOString(),
    note: 'This response has NO CORS headers'
  });
});

// Endpoint WITH CORS headers — browser will allow the response
api.get('/api/data-cors', (req, res) => {
  // This is the one-line fix: tell the browser which origin is allowed
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');

  res.json({
    message: 'Hello from the API server!',
    timestamp: new Date().toISOString(),
    note: 'This response HAS the CORS header'
  });
});

// ─── Client Server (port 3000) ─── Serves the frontend + proxy
const app = express();

app.use((req, res, next) => {
  console.log(`[CLIENT :3000] ${req.method} ${req.url}`);
  next();
});

// Serve client.html at the root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client.html'));
});

// Proxy endpoint — server-to-server request, no CORS restrictions
app.get('/api/proxy', async (req, res) => {
  try {
    const response = await fetch('http://localhost:3001/api/data');
    const data = await response.json();
    res.json({ ...data, proxied: true, note: 'This was proxied through the same-origin server' });
  } catch (error) {
    res.status(502).json({ error: 'Proxy failed — is the API server running?' });
  }
});

// ─── Start both servers ───
api.listen(3001, () => {
  console.log('API server running on http://localhost:3001');
});

app.listen(3000, () => {
  console.log('Client server running on http://localhost:3000');
  console.log('\nOpen http://localhost:3000 in your browser to start the demo.\n');
});
