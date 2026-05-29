import http from "node:http";

const CDP_HOST = "127.0.0.1";
const CDP_PORT = 9223;

function getJson(path) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: CDP_HOST, port: CDP_PORT, path }, (res) => {
        let body = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

class TinyWs {
  constructor(url) {
    this.url = new URL(url);
    this.buffer = Buffer.alloc(0);
    this.pending = new Map();
    this.nextId = 1;
  }

  connect() {
    return new Promise((resolve, reject) => {
      const key = Buffer.from(Math.random().toString()).toString("base64").slice(0, 16);
      const req = http.request({
        host: this.url.hostname,
        port: this.url.port,
        path: this.url.pathname + this.url.search,
        headers: {
          Connection: "Upgrade",
          Upgrade: "websocket",
          "Sec-WebSocket-Key": key,
          "Sec-WebSocket-Version": "13",
        },
      });

      req.on("upgrade", (_res, socket) => {
        this.socket = socket;
        socket.on("data", (chunk) => this.onData(chunk));
        socket.on("error", reject);
        resolve();
      });
      req.on("error", reject);
      req.end();
    });
  }

  onData(chunk) {
    this.buffer = Buffer.concat([this.buffer, chunk]);
    while (this.buffer.length >= 2) {
      const b1 = this.buffer[0];
      const b2 = this.buffer[1];
      let len = b2 & 0x7f;
      let offset = 2;
      if (len === 126) {
        if (this.buffer.length < 4) return;
        len = this.buffer.readUInt16BE(2);
        offset = 4;
      } else if (len === 127) {
        if (this.buffer.length < 10) return;
        len = Number(this.buffer.readBigUInt64BE(2));
        offset = 10;
      }
      if (this.buffer.length < offset + len) return;
      const payload = this.buffer.subarray(offset, offset + len);
      this.buffer = this.buffer.subarray(offset + len);
      const opcode = b1 & 0x0f;
      if (opcode === 1) {
        const msg = JSON.parse(payload.toString("utf8"));
        if (msg.id && this.pending.has(msg.id)) {
          this.pending.get(msg.id)(msg);
          this.pending.delete(msg.id);
        }
      }
    }
  }

  send(method, params = {}) {
    const id = this.nextId++;
    const json = JSON.stringify({ id, method, params });
    const payload = Buffer.from(json);
    let header;
    if (payload.length < 126) {
      header = Buffer.alloc(6);
      header[0] = 0x81;
      header[1] = 0x80 | payload.length;
      header.writeUInt32BE(Math.floor(Math.random() * 0xffffffff), 2);
    } else {
      header = Buffer.alloc(8);
      header[0] = 0x81;
      header[1] = 0x80 | 126;
      header.writeUInt16BE(payload.length, 2);
      header.writeUInt32BE(Math.floor(Math.random() * 0xffffffff), 4);
    }
    const mask = header.subarray(header.length - 4);
    const masked = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i += 1) masked[i] = payload[i] ^ mask[i % 4];
    this.socket.write(Buffer.concat([header, masked]));
    return new Promise((resolve) => this.pending.set(id, resolve));
  }
}

const pages = await getJson("/json/list");
const page = pages.find((item) => item.type === "page" && item.url.includes("facebook.com")) ?? pages.find((item) => item.type === "page");

if (!page) {
  throw new Error("No CDP page target found.");
}

const ws = new TinyWs(page.webSocketDebuggerUrl);
await ws.connect();
await ws.send("Runtime.enable");
const expression = process.argv[2] ?? `({
    href: location.href,
    title: document.title,
    text: document.body?.innerText?.slice(0, 1600) ?? ""
  })`;

const result = await ws.send("Runtime.evaluate", {
  expression,
  returnByValue: true,
  awaitPromise: true,
});

console.log(JSON.stringify(result.result.result.value, null, 2));
process.exit(0);
