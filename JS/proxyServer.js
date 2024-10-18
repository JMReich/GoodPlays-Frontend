/* 
This did not work for getting steam game details, but may be useful in the future.
*/ 


const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const app = express();

// Enable CORS for all routes
app.use(cors());

app.use('/api', createProxyMiddleware({
    target: 'https://store.steampowered.com',
    changeOrigin: true,
    pathRewrite: {
        '^/api': '', // remove /api prefix when forwarding to the target
    },
    onProxyReq: function (proxyReq, req, res) {
        // Log the full URL before sending the request
        const fullUrl = `${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`;
        console.log('Proxying request to:', fullUrl);
    },
    onProxyRes: function (proxyRes, req, res) {
        // Add CORS headers to the response
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
        proxyRes.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, PATCH, OPTIONS';
        proxyRes.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept';

        // Log the response for debugging
        let body = [];
        proxyRes.on('data', chunk => {
            body.push(chunk);
        });
        proxyRes.on('end', () => {
            body = Buffer.concat(body).toString();
            console.log('Response from target:', body);
        });
    },
    followRedirects: true, // Follow redirects
}));

app.listen(3000, () => {
    console.log('Proxy server running on port 3000');
});