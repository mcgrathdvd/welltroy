import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = new URL("../dist/", import.meta.url).pathname.replace(/^\/(.:)/, "$1");
const types = { ".html":"text/html; charset=utf-8", ".css":"text/css", ".js":"text/javascript", ".webp":"image/webp", ".svg":"image/svg+xml", ".xml":"application/xml" };
const server = createServer(async (req, res) => {
  let path = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  let file = normalize(join(root, path));
  if (!file.startsWith(normalize(root))) { res.writeHead(403); return res.end("Forbidden"); }
  try {
    const info = await stat(file);
    if (info.isDirectory()) file = join(file, "index.html");
  } catch { if (!extname(file)) file = join(file, "index.html"); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch { res.writeHead(404, {"Content-Type":"text/plain"}); res.end("Not found"); }
});
server.listen(4173, "127.0.0.1", () => console.log("Local: http://127.0.0.1:4173"));
