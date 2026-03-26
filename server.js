// Step 2: adding basic http server
import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Log the request
    // console.log(`${req.method} ${req.url}`);

    // Send a response
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // res.end('<h1>Hello World!</h1>');

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