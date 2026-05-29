import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();

const MONTH_LABELS = {
  "monthly-guide-february": ["February", "กุมภาพันธ์"],
  "monthly-guide-march": ["March", "มีนาคม"],
  "monthly-guide-april": ["April", "เมษายน"],
  "monthly-guide-may": ["May", "พฤษภาคม"],
  "monthly-guide-june": ["June", "มิถุนายน"],
  "monthly-guide-july": ["July", "กรกฎาคม"],
  "monthly-guide-august": ["August", "สิงหาคม"],
  "monthly-guide-september": ["September", "กันยายน"],
  "monthly-guide-october": ["October", "ตุลาคม"],
  "monthly-guide-november": ["November", "พฤศจิกายน"],
  "monthly-guide-december": ["December", "ธันวาคม"],
};

const MONTH_ORDER = Object.keys(MONTH_LABELS);

const SKIP_LINES = new Set([
  "รูปภาพนี้มาจากโพสต์",
  "วิดีโอนี้มาจากโพสต์",
  "ดูโพสต์",
  "Marie Furry",
  "ผู้ควบคุม",
  "ผู้มีส่วนร่วมดาวเด่น",
  "ถูกใจ",
  "แสดงความคิดเห็น",
  "ส่ง",
  "ความคิดเห็น",
  "ยังไม่มีความคิดเห็น",
  "เริ่มแสดงความคิดเห็นเป็นคนแรก",
  "ตอบในชื่อ Puttipong Phanut",
  "แสดงความคิดเห็นในชื่อ Puttipong Phanut",
]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(path.join(ROOT, filePath), "utf8"));
}

function cleanLines(text) {
  return text
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((line) => !SKIP_LINES.has(line))
    .filter((line) => !/^\d+$/.test(line))
    .filter((line) => !/^\d+:\d+/.test(line))
    .filter((line) => !/^·$/.test(line))
    .filter((line) => !/^[\d,]+ ความคิดเห็น$/.test(line))
    .filter((line) => !/^\d+ ปี$/.test(line))
    .filter((line) => !/^\d+ เดือน$/.test(line));
}

function trimText(text, max = 260) {
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trim()}…`;
}

function shortCaption(text) {
  return trimText(text.split(" — ").slice(0, 2).join(" — "), 180);
}

function extractDate(text) {
  return cleanLines(text).find((line) => /\d{1,2} [ก-๙]+ \d{4}/.test(line)) ?? "ดูวันที่จากโพสต์ต้นทาง";
}

function extractTitle(rawTitle, guideId) {
  const [englishMonth] = MONTH_LABELS[guideId];
  const titleMatch = rawTitle.match(/𝗔𝗖𝗡𝗛[^|]+/)?.[0]?.trim();
  return titleMatch || `ACNH All in ${englishMonth}`;
}

function extractSummary(articleText, guideId) {
  const [, thaiMonth] = MONTH_LABELS[guideId];
  const lines = cleanLines(articleText).filter((line) => !line.includes("Credit") && !line.includes("𝗖𝗿𝗲𝗱𝗶𝘁"));
  const firstBody = lines.find((line) => line.length > 80 && !line.includes("ACNH All in")) ?? "";
  if (!firstBody) return `รวมข้อมูลสำคัญของเดือน${thaiMonth} ทั้งอีเวนต์ ไอเทม seasonal, DIY, สภาพอากาศ และรายการที่ควรเช็กในเกม`;
  return trimText(firstBody, 300);
}

function extractCaption(text, fallback) {
  const lines = cleanLines(text)
    .filter((line) => !line.includes("แชทที่ยังไม่ได้อ่าน"))
    .filter((line) => !line.includes("จํานวนการแจ้งเตือน"))
    .filter((line) => !line.includes("Meta AI"))
    .filter((line) => !line.includes("Puttipong Phanut"));

  const startIndex = lines.findIndex(
    (line) =>
      line.includes("𝗔𝗖𝗡𝗛") ||
      line.includes("Northern Hemisphere") ||
      line.includes("Southern Hemisphere") ||
      line.includes("New Critter") ||
      line.includes("Birthday") ||
      line.includes("Calendar"),
  );
  const useful = (startIndex >= 0 ? lines.slice(startIndex) : lines)
    .filter((line) => !/^\d{1,2} [ก-๙]+ \d{4}$/.test(line))
    .filter((line) => !line.includes("ตอบกลับ"))
    .filter((line) => !line.includes("Credit"))
    .filter((line) => !line.includes("𝗖𝗿𝗲𝗱𝗶𝘁"))
    .slice(0, 3);

  return trimText(useful.join(" — ") || fallback, 280);
}

function buildGuide(guideId) {
  const raw = readJson(`data-imports/${guideId}-facebook-photo-raw.json`);
  const downloaded = readJson(`data-imports/${guideId}-downloaded-images.json`);
  const [englishMonth, thaiMonth] = MONTH_LABELS[guideId];
  const photosByOrder = new Map(raw.photos.map((photo) => [photo.order, photo]));
  const captions = downloaded.downloaded.map((image) => {
    const photo = photosByOrder.get(image.sourceOrder);
    return extractCaption(photo?.text ?? "", `${englishMonth} image ${image.order}`);
  });

  return {
    guideId,
    sourcePostId: raw.month.postId,
    sourceUrl: raw.month.url,
    postAuthor: "Marie Furry",
    postedDate: extractDate(raw.postData.articleText || raw.postData.bodyText || ""),
    title: extractTitle(raw.postData.title, guideId),
    summary: extractSummary(raw.postData.articleText || raw.postData.bodyText || "", guideId),
    sourceExcerpt: extractSummary(raw.postData.articleText || raw.postData.bodyText || "", guideId),
    englishMonth,
    thaiMonth,
    imageCount: downloaded.downloaded.length,
    captions,
  };
}

const guides = MONTH_ORDER.map(buildGuide);

function js(value) {
  return JSON.stringify(value, null, 2);
}

const assetsTs = `import type { CuratedPostImageAsset, PostImageAsset } from "./postImageAssets";

const importedMonthlyAssetData = ${js(
  guides.map(({ captions, englishMonth, thaiMonth, ...asset }) => ({
    ...asset,
    monthLabel: `${englishMonth} - ${thaiMonth}`,
  })),
)} as const;

function makeMonthlyImages(guideId: string, title: string, imageCount: number): PostImageAsset[] {
  return Array.from({ length: imageCount }, (_, index) => {
    const order = index + 1;
    const paddedOrder = String(order).padStart(2, "0");
    const imageId = \`\${guideId}-\${paddedOrder}\`;

    return {
      imageId,
      order,
      src: \`/content-images/curated-post-images/\${guideId}/\${imageId}.jpg\`,
      alt: \`ภาพประกอบโพสต์ \${title} รูปที่ \${order}\`,
      caption: \`ภาพประกอบจากโพสต์ต้นทาง รูปที่ \${order}\`,
    };
  });
}

export const monthlyImportedPostImageAssets: CuratedPostImageAsset[] = importedMonthlyAssetData.map((asset) => ({
  guideId: asset.guideId,
  sourcePostId: asset.sourcePostId,
  sourceUrl: asset.sourceUrl,
  postAuthor: asset.postAuthor,
  postedDate: asset.postedDate,
  title: asset.title,
  summary: asset.summary,
  sourceExcerpt: asset.sourceExcerpt,
  imageCount: asset.imageCount,
  images: makeMonthlyImages(asset.guideId, asset.title, asset.imageCount),
}));
`;

const contentTs = `import { getPostImage } from "./postImageAssets";
import type { ArticleContentBlock, ArticleContentData, ArticleImage, ArticleSection } from "../types/content";

interface MonthlyImportedContentConfig {
  guideId: string;
  title: string;
  thaiMonth: string;
  summary: string;
  captions: string[];
}

const monthlyImportedContentConfigs = ${js(
  guides.map(({ guideId, title, thaiMonth, summary, captions }) => ({
    guideId,
    title,
    thaiMonth,
    summary,
    captions,
  })),
)} as const satisfies readonly MonthlyImportedContentConfig[];

function imageFor(guideId: string, order: number, caption: string): ArticleImage | undefined {
  const image = getPostImage(guideId, order);
  if (!image) return undefined;

  return {
    src: image.src,
    alt: image.alt,
    caption,
  };
}

function galleryBlock(images: Array<ArticleImage | undefined>): ArticleContentBlock | undefined {
  const filtered = images.filter((image): image is ArticleImage => Boolean(image));
  if (filtered.length === 0) return undefined;
  return {
    type: "gallery",
    images: filtered,
  };
}

function trimText(text: string, max = 180): string {
  if (text.length <= max) return text;
  return \`\${text.slice(0, max - 1).trim()}…\`;
}

function shortCaption(text: string): string {
  return trimText(text.split(" — ").slice(0, 2).join(" — "), 180);
}

function makeSection(config: MonthlyImportedContentConfig, title: string, orders: number[], intro: string): ArticleSection | undefined {
  const block = galleryBlock(orders.map((order) => imageFor(config.guideId, order, config.captions[order - 1] ?? \`รูปที่ \${order}\`)));
  if (!block) return undefined;

  return {
    title,
    blocks: [
      {
        type: "paragraph",
        text: intro,
      },
      block,
    ],
  };
}

function classifySections(config: MonthlyImportedContentConfig): ArticleSection[] {
  const buckets = {
    season: [] as number[],
    items: [] as number[],
    activities: [] as number[],
    critters: [] as number[],
    extra: [] as number[],
  };

  config.captions.forEach((caption, index) => {
    const order = index + 1;
    if (order === 1) return;
    const text = caption.toLowerCase();

    if (/critter|fish|bug|sea creature|birthday|calendar|สัตว์|ปลา|แมลง|วันเกิด|ปฏิทิน/i.test(caption)) {
      buckets.critters.push(order);
    } else if (/diy|material|event|fishing|bug-off|festivale|halloween|turkey|toy day|กิจกรรม|วัตถุดิบ/i.test(caption)) {
      buckets.activities.push(order);
    } else if (/seasonal item|postcard|nook shopping|able|costume|shopping|ไอเทม|โปสการ์ด|เสื้อผ้า/i.test(caption)) {
      buckets.items.push(order);
    } else if (/weather|bush|northern|southern|hemisphere|seasonal change|ฤดูกาล|สภาพอากาศ|พุ่ม|ซีกโลก/i.test(caption)) {
      buckets.season.push(order);
    } else if (text.includes("acnh")) {
      buckets.items.push(order);
    } else {
      buckets.extra.push(order);
    }
  });

  return [
    makeSection(
      config,
      "ฤดูกาล สภาพอากาศ และพุ่มไม้",
      buckets.season,
      "ชุดนี้ใช้เช็กการเปลี่ยนฤดูกาล สภาพอากาศ และพุ่มไม้ที่บานหรือหมดช่วงในเดือนนั้น โดยแยกตามซีกโลกจากคำอธิบายภาพต้นทาง",
    ),
    makeSection(
      config,
      "ไอเทม เทศกาล และโปสการ์ด",
      buckets.items,
      "รวมภาพที่เกี่ยวกับ seasonal items, Nook Shopping, Able Sisters, Dodo Airlines และของตกแต่งประจำช่วงเวลา",
    ),
    makeSection(
      config,
      "DIY วัตถุดิบ และกิจกรรม",
      buckets.activities,
      "รวมข้อมูลกิจกรรมรายเดือน สูตร DIY วัตถุดิบตามฤดูกาล และช่วงเวลาที่ควรเข้าเกมไปเก็บให้ครบ",
    ),
    makeSection(
      config,
      "สัตว์ที่เปลี่ยน วันเกิด และภาพรวมท้ายเดือน",
      buckets.critters,
      "รวมภาพเช็กลิสต์ปลา แมลง สัตว์ทะเล วันเกิดชาวเกาะ และภาพสรุปท้ายโพสต์สำหรับเปิดเทียบระหว่างเล่น",
    ),
    makeSection(
      config,
      "ภาพเพิ่มเติมจากโพสต์",
      buckets.extra,
      "ภาพที่เหลือจากโพสต์ต้นทางถูกเก็บไว้ในส่วนนี้เพื่อให้ข้อมูลไม่หาย และสามารถกลับมาจัดหมวดละเอียดขึ้นได้ภายหลัง",
    ),
  ].filter((section): section is ArticleSection => Boolean(section));
}

function buildMonthlyImportedContent(config: MonthlyImportedContentConfig): ArticleContentData {
  const coverImage = imageFor(config.guideId, 1, shortCaption(config.captions[0] ?? config.title));

  return {
    label: "Monthly Guide",
    lead: [
      config.summary,
      \`หน้านี้นำข้อมูลจากโพสต์ \${config.title} มาจัดเป็น block สำหรับอ่านในเว็บ โดยเก็บภาพและคำอธิบายภาพไว้ตามลำดับเดิมของโพสต์ต้นทาง\`,
    ],
    coverImage,
    body: [
      {
        type: "note",
        title: "รูปแบบข้อมูล",
        text: "แต่ละภาพใช้ caption ที่ถอดจากคำอธิบายภาพในโพสต์ Facebook แล้วปรับให้สั้นลงสำหรับอ่านบนเว็บ ก่อนแยกเป็นหมวดตามคีย์เวิร์ดของหัวข้อ",
      },
    ],
    sections: classifySections(config),
    checklist: {
      title: \`เช็กลิสต์เดือน\${config.thaiMonth}\`,
      items: [
        "เช็กอีเวนต์และกิจกรรมที่เกิดขึ้นในเดือนนี้",
        "เช็ก seasonal items, โปสการ์ด และของจากร้านค้าตามช่วงเวลา",
        "เช็ก DIY และวัตถุดิบตามฤดูกาลของซีกโลกที่เล่น",
        "เช็กปลา แมลง สัตว์ทะเล และวันเกิดชาวเกาะจากภาพสรุปท้ายโพสต์",
      ],
    },
    closing: "ข้อมูลชุดนี้เป็นฐานสำหรับนำเข้าเว็บแล้ว สามารถกลับมาแตกหัวข้อย่อยหรือเพิ่มคำอธิบายเชิงลึกจาก raw import ได้ต่อโดยไม่ต้องย้ายรูปใหม่",
  };
}

export const monthlyImportedContentByGuideId = Object.fromEntries(
  monthlyImportedContentConfigs.map((config) => [config.guideId, buildMonthlyImportedContent(config)]),
) as Record<string, ArticleContentData>;
`;

fs.writeFileSync(path.join(ROOT, "src", "data", "monthlyImportedAssets.ts"), assetsTs, "utf8");
fs.writeFileSync(path.join(ROOT, "src", "data", "monthlyImportedContent.ts"), contentTs, "utf8");

console.log(`Generated ${guides.length} monthly imported guide records.`);
