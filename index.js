const express = require('express');
const httpProxy = require('http-proxy');

const app = express();
const proxy = httpProxy.createProxyServer({secure: false});
const PORT = 3000; // Port for the proxy server to listen on

app.all('*', async (req, res) => {
  const targetUrl = req.url.slice(1); // Remove the leading slash
    console.log('TARGET: ', targetUrl);
    
  proxy.web(req, res, { target: targetUrl }, (error) => {
    console.error('Proxy request error:', error);
    res.statusCode = 500;
    res.end('Proxy request error');
  });
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on port ${PORT}`);
});