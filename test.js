// NextGen Smart Variants - Simple Test Server
console.log('🚀 NextGen Smart Variants - Test Starting...');

const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    app: 'NextGen Smart Variants',
    appId: '285217980417',
    status: 'working',
    url: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  }));
});

server.listen(PORT, () => {
  console.log(`✅ NextGen Smart Variants Test Server running on http://localhost:${PORT}`);
  console.log(`📱 App ID: 285217980417`);
  console.log(`🔗 Dashboard: https://dev.shopify.com/dashboard/185211679/apps/285217980417`);
});

server.on('error', (err) => {
  console.error('❌ NextGen Smart Variants Server Error:', err);
});

// Keep alive
setInterval(() => {
  console.log(`⏰ NextGen Smart Variants still running... ${new Date().toLocaleTimeString()}`);
}, 30000);