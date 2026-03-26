// Step 2: adding basic http server
import http from 'http';
import fs from 'fs/promises';
import path from 'path';
import { fileURLtoPath} from 'url';

const PORT = 3000;

const server = http.createServer((req, res) => {
    // step 2
    // Log the request
    // console.log(`${req.method} ${req.url}`);

    // Send a response
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // res.end('<h1>Hello World!</h1>');

    // step 3
    const url = req.url;
    const method = req.method;

    // Route handling
    if (url === '/' && method === 'GET') {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('<h1>About Page<h1>');
    }
    else if (url === '/api/data' && method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Hello', timestamp: Date.now() }) );
    }
    else {
        // 404 not found
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - Page Not Found</h1>');
    }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// Step 3: adding routes
// const server = http.createServer((req, res) => {
//     const url = req.url;
//     const method = req.method;

//     // Route handling
//     if (url === '/' && method === 'GET') {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         res.end('<h1>About Page<h1>');
//     }
//     else if (url === '/api/data' && method === 'GET') {
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Hello', timestamp: Date.now() }) );
//     }
//     else {
//         // 404 not found
//         res.writeHead(404, { 'Content-Type': 'text/html' });
//         res.end('<h1>404 - Page Not Found</h1>');
//     }
// });

// step 4: serving static files
const filename = fileURLtoPath(import.meta.url);
const dirname = path.dirname(filename);

// helper function
async function serveFile(filePath, contentType, res) {
    try {
        const data = await fs.readFile(filePath);
        res.writeHead(200, {' Content-Type': contentType });
        res.end(data);
    } catch (error) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 - File Not Found </h1>');
    }
}