// Step 2: adding basic http server
import http from "http";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const PORT = 3000;

// step 4: serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const server = http.createServer(async (req, res) => {
  // step 3: adding routes
  const url = req.url;
  const method = req.method;

  // Log the request
  console.log(`${req.method} ${req.url}`);

  // step 6: handling post requests
  if (url === "/api/contact" && req.method === "POST") {
    let body = "";
    // collect data chunks
    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    // process when complete
    req.on("end", () => {
      try {
        const data = JSON.parse(body);
        console.log("Received: ", data);
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ success: true, message: "Data received!" }));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON" }));
      }
    });
    return;
  }

  // Send a response (step 1)
  //   res.writeHead(200, {
  //     "Content-Type": "text/html",
  //   });
  //   res.end("<h1>Hello World!</h1>");

  // Route handling (step 3)
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
  if (url === "/" || url === "/index.html") {
    await serveFile(
      path.join(__dirname, "public", "index.html"),
      "text/html",
      res,
    );
  } else if (url === "/about") {
    await serveFile(
      path.join(__dirname, "public", "about.html"),
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
