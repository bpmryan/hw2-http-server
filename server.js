import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
    // Log the request
    console.log(`${req.method} ${req.url}`);

    // Send a response
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    res.end('<h1>Hello World!</h1>');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
