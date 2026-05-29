import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";

const CDP_HOST = "127.0.0.1";
const CDP_PORT = 9223;
const ROOT = process.cwd();

const MONTHS = [
  ["monthly-guide-february", "February", "1666500993770799"],
  ["monthly-guide-march", "March", "1686910071729891"],
  ["monthly-guide-april", "April", "1703314596756105"],
  ["monthly-guide-may", "May", "1721350574952507"],
  ["monthly-guide-june", "June", "1738533369900894"],
  ["monthly-guide-july", "July", "1757413258012905"],
  ["monthly-guide-august", "August", "1774368226317408"],
  ["monthly-guide-september", "September", "1791913917896172"],
  ["monthly-guide-october", "October", "1808969399523957"],
  ["monthly-guide-november", "November", "1830049874082576"],
  ["monthly-guide-december", "December", "2091897291231165"],
].map(([guideId, monthName, postId]) => ({
  guideId,
  monthName,
  postId,
  url: `https://www.facebook.com/groups/AnixNewHorizonsTH/posts/${postId}/`,
}));

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getJson(pathname) {
  return new Promise((resolve, reject) => {
    http
      .get({ host: CDP_HOST, port: CDP_PORT, path: pathname }, (res) => {
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
    } else if (payload.length < 65536) {
      header = Buffer.alloc(8);
      header[0] = 0x81;
      header[1] = 0x80 | 126;
      header.writeUInt16BE(payload.length, 2);
      header.writeUInt32BE(Math.floor(Math.random() * 0xffffffff), 4);
    } else {
      header = Buffer.alloc(14);
      header[0] = 0x81;
      header[1] = 0x80 | 127;
      header.writeBigUInt64BE(BigInt(payload.length), 2);
      header.writeUInt32BE(Math.floor(Math.random() * 0xffffffff), 10);
    }
    const mask = header.subarray(header.length - 4);
    const masked = Buffer.alloc(payload.length);
    for (let i = 0; i < payload.length; i += 1) masked[i] = payload[i] ^ mask[i % 4];
    this.socket.write(Buffer.concat([header, masked]));
    return new Promise((resolve) => this.pending.set(id, resolve));
  }
}

async function connectPage() {
  const pages = await getJson("/json/list");
  const page = pages.find((item) => item.type === "page" && item.url.includes("facebook.com")) ?? pages.find((item) => item.type === "page");
  if (!page) throw new Error("No CDP page target found.");
  const ws = new TinyWs(page.webSocketDebuggerUrl);
  await ws.connect();
  await ws.send("Runtime.enable");
  await ws.send("Page.enable");
  return ws;
}

async function evalOnPage(ws, expression) {
  const result = await ws.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.result?.exceptionDetails) {
    throw new Error(result.result.exceptionDetails.text ?? "Runtime.evaluate failed");
  }
  return result.result.result.value;
}

async function navigate(ws, url) {
  await ws.send("Page.navigate", { url });
  await sleep(4000);
}

async function collectPost(ws, month) {
  await navigate(ws, month.url);
  await evalOnPage(ws, `
    (async () => {
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 700));
      const maybeButtons = Array.from(document.querySelectorAll('[role="button"], span, div'));
      for (const el of maybeButtons) {
        const text = (el.innerText || el.textContent || '').trim();
        if (text === 'ดูเพิ่มเติม' || text === 'See more') {
          el.click();
          await new Promise((resolve) => setTimeout(resolve, 400));
        }
      }
      window.scrollTo(0, document.body.scrollHeight * 0.35);
      await new Promise((resolve) => setTimeout(resolve, 900));
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 500));
      return true;
    })()
  `);

  const data = await evalOnPage(ws, `
    (() => {
      const postId = ${JSON.stringify(month.postId)};
      const articles = Array.from(document.querySelectorAll('[role="article"]'))
        .map((article) => article.innerText || '')
        .filter(Boolean)
        .sort((a, b) => b.length - a.length);
      const bodyText = document.body.innerText || '';
      const anchors = Array.from(document.links).map((a) => ({
        text: (a.innerText || '').trim(),
        href: a.href,
      }));
      const photoUrls = Array.from(new Set(anchors
        .map((item) => item.href)
        .filter((href) => href.includes('facebook.com') && href.includes('photo') && href.includes('set=pcb.' + postId))
        .map((href) => {
          try {
            const url = new URL(href);
            const fbid = url.searchParams.get('fbid');
            const set = url.searchParams.get('set') || ('pcb.' + postId);
            if (fbid) return 'https://www.facebook.com/photo/?fbid=' + encodeURIComponent(fbid) + '&set=' + encodeURIComponent(set);
            return href.split('&__cft__')[0].split('?__cft__')[0];
          } catch {
            return href;
          }
        })));
      return {
        href: location.href,
        title: document.title,
        bodyText,
        articleText: articles[0] || '',
        photoUrls,
      };
    })()
  `);

  if (data.photoUrls.length === 0) {
    throw new Error(`No photo URLs found for ${month.guideId}`);
  }

  return data;
}

function extractFbid(url) {
  try {
    const parsed = new URL(url);
    const videoMatch = parsed.pathname.match(/\/videos\/pcb\.\d+\/(\d+)/);
    if (videoMatch) return videoMatch[1];
    return parsed.searchParams.get("fbid") || parsed.pathname.match(/\/(\d{8,})/)?.[1] || url;
  } catch {
    return url;
  }
}

async function collectViewerItem(ws) {
  return evalOnPage(ws, `
    (() => {
      const image = Array.from(document.images)
        .map((img) => ({
          src: img.currentSrc || img.src,
          alt: img.alt || '',
          naturalWidth: img.naturalWidth || 0,
          naturalHeight: img.naturalHeight || 0,
          width: img.getBoundingClientRect().width,
          height: img.getBoundingClientRect().height,
        }))
        .filter((img) => img.src && img.src.startsWith('http') && img.naturalWidth >= 250 && img.naturalHeight >= 250)
        .sort((a, b) => (b.naturalWidth * b.naturalHeight) - (a.naturalWidth * a.naturalHeight))[0] || null;
      return {
        href: location.href,
        title: document.title,
        text: document.body.innerText || '',
        image,
      };
    })()
  `);
}

async function clickNextPhoto(ws) {
  return evalOnPage(ws, `
    (() => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const candidates = Array.from(document.querySelectorAll('[role="button"], div[aria-label], span[aria-label]'))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            el,
            label: el.getAttribute('aria-label') || el.innerText || '',
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            area: rect.width * rect.height,
          };
        })
        .filter((item) => item.width >= 36 && item.height >= 36 && item.x > viewportWidth * 0.52 && item.y < viewportHeight * 0.9);
      const direct = candidates.find((item) => /next|ถัดไป|ต่อไป/i.test(item.label));
      const target = direct || candidates.sort((a, b) => b.area - a.area)[0];
      if (!target) return { clicked: false, candidates: candidates.map(({ el, ...rest }) => rest).slice(0, 8) };
      target.el.click();
      return { clicked: true, label: target.label, x: target.x, y: target.y, width: target.width, height: target.height };
    })()
  `);
}

async function collectPhotos(ws, month, photoUrls) {
  const items = [];
  const seen = new Set();

  for (const startUrl of photoUrls) {
    const startFbid = extractFbid(startUrl);
    if (seen.has(startFbid)) continue;
    if (CLICK_START) {
      const opened = await openPhotoFromPost(ws, month, startFbid);
      if (!opened) await navigate(ws, startUrl);
    } else {
      await navigate(ws, startUrl);
    }

    let firstFromStart = true;
    for (let index = 0; index < 60; index += 1) {
      await sleep(1700);
      const item = await collectViewerItem(ws);
      const fbid = extractFbid(item.href);
      if (seen.has(fbid)) {
        if (CLICK_START && firstFromStart) {
          firstFromStart = false;
          const click = await clickNextPhoto(ws);
          if (!click.clicked) break;
          continue;
        }
        break;
      }
      firstFromStart = false;
      seen.add(fbid);
      items.push({
        order: items.length + 1,
        fbid,
        href: item.href,
        title: item.title,
        text: item.text,
        image: item.image,
      });
      process.stdout.write(`  ${month.guideId}: photo ${items.length}\n`);

      const click = await clickNextPhoto(ws);
      if (!click.clicked) break;
    }
  }

  return items;
}

async function openPhotoFromPost(ws, month, fbid) {
  await navigate(ws, month.url);
  return evalOnPage(ws, `
    (async () => {
      const fbid = ${JSON.stringify(fbid)};
      const link = Array.from(document.links).find((anchor) => anchor.href.includes('fbid=' + fbid));
      if (!link) return false;
      link.scrollIntoView({ block: 'center' });
      await new Promise((resolve) => setTimeout(resolve, 800));
      link.click();
      await new Promise((resolve) => setTimeout(resolve, 3000));
      return location.href.includes(fbid);
    })()
  `);
}

async function downloadImages(month, items) {
  const outDir = path.join(ROOT, "public", "content-images", "curated-post-images", month.guideId);
  await fs.mkdir(outDir, { recursive: true });
  const existing = await fs.readdir(outDir).catch(() => []);
  await Promise.all(
    existing
      .filter((fileName) => fileName.startsWith(`${month.guideId}-`) && /\.(jpe?g|png|webp)$/i.test(fileName))
      .map((fileName) => fs.rm(path.join(outDir, fileName), { force: true })),
  );
  const downloaded = [];

  for (const item of items) {
    if (!item.image?.src) continue;
    const downloadOrder = downloaded.length + 1;
    const padded = String(downloadOrder).padStart(2, "0");
    const fileName = `${month.guideId}-${padded}.jpg`;
    const filePath = path.join(outDir, fileName);
    const response = await fetch(item.image.src, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        Referer: "https://www.facebook.com/",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed downloading ${month.guideId} image ${item.order}: ${response.status}`);
    }
    const bytes = Buffer.from(await response.arrayBuffer());
    await fs.writeFile(filePath, bytes);
    downloaded.push({
      order: downloadOrder,
      sourceOrder: item.order,
      file: path.relative(ROOT, filePath).replaceAll("\\\\", "/"),
      bytes: bytes.length,
      source: item.image.src,
    });
  }

  return downloaded;
}

async function saveImport(month, postData, photos, downloaded) {
  const rawPath = path.join(ROOT, "data-imports", `${month.guideId}-facebook-photo-raw.json`);
  const dlPath = path.join(ROOT, "data-imports", `${month.guideId}-downloaded-images.json`);
  await fs.mkdir(path.dirname(rawPath), { recursive: true });
  await fs.writeFile(rawPath, JSON.stringify({ month, postData, photos }, null, 2), "utf8");
  await fs.writeFile(dlPath, JSON.stringify({ month, downloaded }, null, 2), "utf8");
}

const only = process.argv.find((arg) => arg.startsWith("--only="))?.slice("--only=".length);
const CLICK_START = process.argv.includes("--click-start");
const months = only ? MONTHS.filter((month) => month.guideId.includes(only) || month.monthName.toLowerCase() === only.toLowerCase()) : MONTHS;

if (months.length === 0) {
  throw new Error(`No month matched ${only}`);
}

const ws = await connectPage();

for (const month of months) {
  process.stdout.write(`\nImporting ${month.guideId}\n`);
  const postData = await collectPost(ws, month);
  process.stdout.write(`  found ${postData.photoUrls.length} photo URLs\n`);
  const photos = await collectPhotos(ws, month, postData.photoUrls);
  const downloaded = await downloadImages(month, photos);
  await saveImport(month, postData, photos, downloaded);
  process.stdout.write(`  saved ${downloaded.length} images for ${month.guideId}\n`);
}

process.stdout.write("\nDone.\n");
process.exit(0);
