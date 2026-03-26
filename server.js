// Step 2: adding basic http server
import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  // step 3: adding routes
  const url = req.url;
  const method = req.method;

  // Route handling
//   if (url === "/" && method === "GET") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>About Page<h1>");
//   } else if (url === "/api/data" && method === "GET") {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "Hello", timestamp: Date.now() }));
//   } else {
//     // 404 not found
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.end("<h1>404 - Page Not Found</h1>");
//   }

  //step 5: route to static files
  if (url === "/" || url === "index.html") {
    await serveFile(
      path.join(dirname, "public", "index.html"),
      "text/html",
      res,
    );
  } else if (url === "/about") {
    await serveFile(
      path.join(dirname, "public", "about.html"),
      "text/html",
      res,
    );
  } else if (url === "/style.css") {
    await serveFile(
      path.join(__dirname, "public", "style.css"),
      "text/css",
      res,
    );
  } else if (url.startsWith("/images/")) {
    const ext = path.extname(url);
    const contentType = ext === ".png" ? "image/png" : "image/jpeg";
    await serveFile(path.join(__dirname, "public", url), contentType, res);
  } else if (url === "/api/data") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({ message: "Hello!", time: new Date().toISOString() }),
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

// step 4: serving static files
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

// helper function
async function serveFile(filePath, contentType, res) {
  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { "Content-Type": contentType });
    res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - File Not Found </h1>");
  }
}
