import { islandVisitorEtiquetteContent } from "./articleContent";
import { curatedCategories, curatedGuides, type CuratedCategoryId, type CuratedGuide } from "./curatedContent";
import { getPostImageAsset } from "./postImageAssets";
import type { ArticleContentData, Category, CategoryColor, Guide, GuideSubLink, GuideType, NavigationItem } from "../types/content";

const categoryTone: Record<CuratedCategoryId, { color: CategoryColor; tags: string[] }> = {
  "start-here": { color: "sage", tags: ["rules", "online", "NSO"] },
  "new-player-path": { color: "mint", tags: ["beginner", "tutorial", "3 ดาว"] },
  "quick-guides": { color: "butter", tags: ["mini guide", "tips"] },
  "npcs-and-visitors": { color: "sky", tags: ["npc", "visitor", "ดาวตก"] },
  "monthly-and-events": { color: "peach", tags: ["monthly", "event", "seasonal"] },
  "items-shops-and-dlc": { color: "rose", tags: ["items", "shops", "dlc"] },
  "gardening-and-island": { color: "mint", tags: ["gardening", "flowers", "island"] },
  "archive-and-news": { color: "butter", tags: ["news", "archive", "Nintendo"] },
};

const categoryNumber: Record<CuratedCategoryId, string> = {
  "start-here": "Start",
  "new-player-path": "Path",
  "quick-guides": "Mini",
  "npcs-and-visitors": "NPC",
  "monthly-and-events": "Month",
  "items-shops-and-dlc": "Items",
  "gardening-and-island": "Garden",
  "archive-and-news": "News",
};

const shortName: Record<CuratedCategoryId, string> = {
  "start-here": "เริ่มต้น",
  "new-player-path": "ผู้เล่นใหม่",
  "quick-guides": "Mini Guide",
  "npcs-and-visitors": "NPCs",
  "monthly-and-events": "รายเดือน",
  "items-shops-and-dlc": "ไอเทม/DLC",
  "gardening-and-island": "สวน/เกาะ",
  "archive-and-news": "News",
};

const guideTypeMap: Record<CuratedGuide["contentType"], GuideType> = {
  guide: "guide",
  rule: "guide",
  tutorial: "tutorial",
  npc: "npc",
  monthly: "guide",
  event: "event",
  item: "guide",
  dlc: "dlc",
  gardening: "gardening",
  news: "news",
};

interface MonthlyGuideSeed {
  id: string;
  label: string;
  thaiMonth: string;
  sourceUrl: string;
  summary: string;
  highlights: string[];
}

const monthlyGuideSeeds: MonthlyGuideSeed[] = [
  {
    id: "monthly-guide-january",
    label: "January - มกราคม",
    thaiMonth: "มกราคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1861342020953361/",
    summary:
      "เดือนแรกของปีและเดือนที่สองของฤดูหนาวในซีกโลกเหนือ เกาะยังมีหิมะปกคลุม เหมาะกับการปั้น Perfect Snowboy ต่อ ส่วนซีกโลกใต้เป็นช่วงฤดูร้อนที่แมลงเขตร้อนและด้วงหลายชนิดเริ่มเด่นขึ้น",
    highlights: ["New Year's Day", "Perfect Snowboy", "ฤดูหนาวซีกเหนือ", "ฤดูร้อนซีกใต้"],
  },
  {
    id: "monthly-guide-february",
    label: "February - กุมภาพันธ์",
    thaiMonth: "กุมภาพันธ์",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1666500993770799/",
    summary:
      "เดือนที่มีกิจกรรมและฤดูกาลขยับเปลี่ยนหลายอย่างเมื่อเทียบกับช่วงต้นปี เป็นเดือนที่ควรเช็กอีเวนต์ ไอเทมเทศกาล และสัญญาณการเปลี่ยนผ่านฤดูกาลล่วงหน้า",
    highlights: ["อีเวนต์ประจำเดือน", "Seasonal items", "การเปลี่ยนผ่านฤดูกาล"],
  },
  {
    id: "monthly-guide-march",
    label: "March - มีนาคม",
    thaiMonth: "มีนาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1686910071729891/",
    summary:
      "เดือนที่เข้าสู่ฤดูกาลใหม่ มีการเปลี่ยนแปลงของวัตถุดิบ สิ่งแวดล้อม และไอเทมเทศกาล บางปีอาจมี Festivale ขยับมาอยู่ในเดือนนี้",
    highlights: ["ฤดูกาลใหม่", "วัตถุดิบตามฤดู", "Festivale บางปี", "Seasonal items"],
  },
  {
    id: "monthly-guide-april",
    label: "April - เมษายน",
    thaiMonth: "เมษายน",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1703314596756105/",
    summary:
      "เดือนที่สองของฤดูใบไม้ผลิในซีกเหนือและฤดูใบไม้ร่วงในซีกใต้ มี Bunny Day เป็นกิจกรรมหลัก และเป็นช่วงใกล้ May Day Maze Tour ที่ได้เจอ Rover",
    highlights: ["Bunny Day", "May Day Maze Tour", "ฤดูใบไม้ผลิซีกเหนือ", "ฤดูใบไม้ร่วงซีกใต้"],
  },
  {
    id: "monthly-guide-may",
    label: "May - พฤษภาคม",
    thaiMonth: "พฤษภาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1721350574952507/",
    summary:
      "ช่วงท้ายฤดูใบไม้ผลิในซีกเหนือและท้ายฤดูใบไม้ร่วงในซีกใต้ มีการเปลี่ยนแปลงของวัตถุดิบฤดูกาล สัตว์ที่ย้ายเข้าออก และสิ่งที่ควรเก็บก่อนหมดฤดู",
    highlights: ["ส่งท้ายฤดูกาล", "สัตว์เข้าออก", "วัตถุดิบฤดูกาล", "สิ่งที่ควรเก็บก่อนหมดเดือน"],
  },
  {
    id: "monthly-guide-june",
    label: "June - มิถุนายน",
    thaiMonth: "มิถุนายน",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1738533369900894/",
    summary:
      "เดือนเริ่มฤดูกาลใหม่ของทั้งสองซีกโลก มี Solstice Phenomenon ไอเทมเทศกาล ภารกิจฤดูกาล สภาพอากาศ และวัตถุดิบใหม่ ๆ ให้เช็กพร้อมกัน",
    highlights: ["Solstice", "ฤดูร้อนซีกเหนือ", "ฤดูหนาวซีกใต้", "วัตถุดิบและสภาพอากาศใหม่"],
  },
  {
    id: "monthly-guide-july",
    label: "July - กรกฎาคม",
    thaiMonth: "กรกฎาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1757413258012905/",
    summary:
      "เดือนที่สองของฤดูร้อนในซีกเหนือและฤดูหนาวในซีกใต้ เหมาะกับการเช็กอีเวนต์ ไอเทมฤดูกาล และสิ่งที่เปลี่ยนกลางฤดู",
    highlights: ["กลางฤดูร้อนซีกเหนือ", "กลางฤดูหนาวซีกใต้", "อีเวนต์", "Seasonal items"],
  },
  {
    id: "monthly-guide-august",
    label: "August - สิงหาคม",
    thaiMonth: "สิงหาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1774368226317408/",
    summary:
      "ช่วงท้ายฤดูร้อนของซีกเหนือและท้ายฤดูหนาวของซีกใต้ เป็นเดือนที่ควรไล่เช็กสิ่งที่กำลังจะหมดฤดูและกิจกรรมปลายฤดู",
    highlights: ["ท้ายฤดู", "สิ่งที่ควรเก็บก่อนหมดฤดู", "อีเวนต์ปลายฤดู"],
  },
  {
    id: "monthly-guide-september",
    label: "September - กันยายน",
    thaiMonth: "กันยายน",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1791913917896172/",
    summary:
      "เดือนเริ่มการเปลี่ยนแปลงครั้งใหม่ของฤดูกาลทั้งสองซีกโลก หลายอย่างเริ่มเปลี่ยนพร้อมกัน จึงเหมาะกับการตั้ง checklist ใหม่ของเกาะ",
    highlights: ["เริ่มฤดูกาลใหม่", "Checklist ใหม่", "สัตว์และไอเทมเปลี่ยนรอบ"],
  },
  {
    id: "monthly-guide-october",
    label: "October - ตุลาคม",
    thaiMonth: "ตุลาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1808969399523957/",
    summary:
      "เดือนแห่งบรรยากาศ Halloween อยู่ช่วงที่สองของฤดูใบไม้ร่วงซีกเหนือและฤดูใบไม้ผลิซีกใต้ มี Halloween Night เป็นกิจกรรมสำคัญของเดือน",
    highlights: ["Halloween Night", "Shock-to-ber", "ฤดูใบไม้ร่วงซีกเหนือ", "ฤดูใบไม้ผลิซีกใต้"],
  },
  {
    id: "monthly-guide-november",
    label: "November - พฤศจิกายน",
    thaiMonth: "พฤศจิกายน",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1830049874082576/",
    summary:
      "ช่วงสุดท้ายของฤดูใบไม้ร่วงซีกเหนือและฤดูใบไม้ผลิซีกใต้ ซีกเหนือเริ่มเห็นสัญญาณหิมะแรกช่วงปลายเดือน และมี Turkey Day เป็นอีเวนต์อบอุ่นของเดือน",
    highlights: ["Turkey Day", "ปลายฤดูใบไม้ร่วงซีกเหนือ", "หิมะแรกช่วงปลายเดือน", "การทำอาหาร"],
  },
  {
    id: "monthly-guide-december",
    label: "December - ธันวาคม",
    thaiMonth: "ธันวาคม",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/2091897291231165/",
    summary:
      "เดือนสุดท้ายของปีและเดือนแรกของฤดูหนาวในซีกเหนือ เกาะเริ่มขาวด้วยหิมะและ Snowboy ส่วนซีกใต้เป็นฤดูร้อนที่สัตว์ทะเล ปลา และแมลงฤดูร้อนโดดเด่น",
    highlights: ["Snowboy", "Toy Day", "ฤดูหนาวซีกเหนือ", "ฤดูร้อนซีกใต้", "Solstice"],
  },
];

const guideSubLinks: Record<string, GuideSubLink[]> = {
  "monthly-checklist-index": monthlyGuideSeeds.map((month) => ({
    label: month.label,
    description: `เปิดหน้าไกด์${month.thaiMonth}ในเว็บ`,
    url: `/article/${month.id}`,
    sourceUrl: month.sourceUrl,
    kind: "month",
  })),
};

export const categories: Category[] = curatedCategories
  .slice()
  .sort((a, b) => a.homePriority - b.homePriority)
  .map((category) => ({
    id: category.id,
    number: categoryNumber[category.id],
    icon: category.emoji,
    shortName: shortName[category.id],
    title: category.title,
    description: category.description,
    color: categoryTone[category.id].color,
    tags: categoryTone[category.id].tags,
    sourceUrl: "",
  }));

const visibleCuratedGuides = curatedGuides
  .map((guide, index) => ({ guide, index }))
  .filter(({ guide }) => guide.status !== "exclude")
  .sort((a, b) => a.guide.priority - b.guide.priority || a.index - b.index)
  .map(({ guide }) => guide);

function relatedIdsFor(guideId: string, categoryId: string): string[] {
  return visibleCuratedGuides
    .filter((guide) => guide.id !== guideId && guide.categoryId === categoryId)
    .slice(0, 3)
    .map((guide) => guide.id);
}

function createMonthlyArticleContent(month: MonthlyGuideSeed): ArticleContentData {
  return {
    label: "Monthly Guide",
    lead: [
      month.summary,
      "หน้านี้คือข้อมูลรายเดือนที่อยู่บนเว็บเราเอง ส่วนลิงก์ Facebook ด้านล่างใช้เป็นแหล่งที่มาและสำหรับตรวจทานต้นฉบับเท่านั้น",
    ],
    sections: [
      {
        title: "ไฮไลท์ของเดือน",
        paragraphs: [
          month.highlights.join(" / "),
          "รอบข้อมูลนี้เรียบเรียงจากโพสต์รายเดือนของกลุ่ม เพื่อให้สมาชิกเปิดอ่านและค้นหาได้จากเว็บโดยตรง",
        ],
      },
      {
        title: "ข้อมูลที่ควรเติมต่อ",
        paragraphs: [
          "รอบถัดไปควรแยกข้อมูลในเดือนนี้เป็นหัวข้อย่อย เช่น อีเวนต์, seasonal items, DIY, ปลา, แมลง, สัตว์ทะเล, วัตถุดิบฤดูกาล และสิ่งที่กำลังจะหมดเดือน",
        ],
      },
    ],
    checklist: {
      title: "เช็กลิสต์รายเดือน",
      items: [
        "เช็กอีเวนต์และวันสำคัญของเดือน",
        "เช็กไอเทมเทศกาลจาก Nook Shopping, Nook's Cranny และ Able Sisters",
        "เช็กปลา แมลง และสัตว์ทะเลที่เข้าใหม่หรือกำลังจะออก",
        "เช็กวัตถุดิบหรือกิจกรรมตามฤดูกาลของซีกโลกที่เล่น",
      ],
    },
    closing: "หมายเหตุ: ข้อมูลนี้เป็นเวอร์ชันจัดหน้าเว็บระดับแรก ยังสามารถเติมรายละเอียดจากโพสต์ต้นทางและรูปประกอบรายเดือนได้ต่อ",
  };
}

const mappedCuratedGuides: Guide[] = visibleCuratedGuides.map((guide) => {
  const asset = getPostImageAsset(guide.id);

  return {
    id: guide.id,
    categoryId: guide.categoryId,
    title: guide.title,
    description: asset?.summary || guide.description,
    type: guideTypeMap[guide.contentType],
    tags: guide.tags,
    updatedAt: asset?.postedDate ? `โพสต์ต้นทาง: ${asset.postedDate}` : "",
    sourceUrl: asset?.sourceUrl || guide.sourceUrl || "",
    month: guide.tags.find((tag) => /มกราคม|กุมภาพันธ์|มีนาคม|เมษายน|พฤษภาคม|มิถุนายน|กรกฎาคม|สิงหาคม|กันยายน|ตุลาคม|พฤศจิกายน|ธันวาคม/.test(tag)),
    featuredForNewPlayer: guide.includeOnHome || guide.audience.includes("new-player"),
    isThisMonth:
      guide.categoryId === "monthly-and-events" ||
      guide.id.includes("seasonal") ||
      guide.id.includes("news-2026"),
    articleContent: guide.id === "island-visitor-etiquette" ? islandVisitorEtiquetteContent : undefined,
    note:
      guide.sourceNote === "verify_official_source_before_featured"
        ? "ข่าวนี้ควรตรวจสอบกับแหล่ง official ก่อนนำขึ้นเป็นข้อมูลเด่น"
        : guide.needsImageReview
          ? "ข้อมูลชุดนี้เรียบเรียงเป็นสารบัญและยังเก็บรูปตามโพสต์ต้นทางไว้ให้ตรวจทานต่อ"
          : undefined,
    relatedIds: relatedIdsFor(guide.id, guide.categoryId),
    status: guide.status,
    priority: guide.priority,
    audience: guide.audience,
    imageCount: asset?.imageCount ?? guide.imageCount,
    postAuthor: asset?.postAuthor,
    postedDate: asset?.postedDate,
    sourceExcerpt: asset?.sourceExcerpt,
    assetSummary: asset?.summary,
    subLinks: guideSubLinks[guide.id],
  };
});

const monthlyGuides: Guide[] = monthlyGuideSeeds.map((month, index) => ({
  id: month.id,
  categoryId: "monthly-and-events",
  title: `ไกด์ประจำเดือน${month.thaiMonth}`,
  description: month.summary,
  type: "guide",
  tags: ["รายเดือน", "monthly", month.thaiMonth, ...month.highlights],
  updatedAt: "เรียบเรียงจากสารบัญรายเดือนของกลุ่ม",
  sourceUrl: month.sourceUrl,
  month: month.thaiMonth,
  featuredForNewPlayer: false,
  isThisMonth: true,
  articleContent: createMonthlyArticleContent(month),
  note: "หน้านี้เป็นข้อมูลรายเดือนในเว็บเราเอง ลิงก์ Facebook ใช้เป็นต้นทางอ้างอิง ไม่ใช่ปลายทางหลักของการอ่าน",
  relatedIds: ["monthly-checklist-index"],
  status: "core",
  priority: ((index % 5) + 1) as 1 | 2 | 3 | 4 | 5,
  audience: ["regular-player", "collector"],
  imageCount: 0,
  sourceExcerpt: month.summary,
}));

export const guides: Guide[] = [...mappedCuratedGuides, ...monthlyGuides];

export const navItems: NavigationItem[] = [
  { label: "หน้าแรก", path: "/" },
  { label: "สารบัญทั้งหมด", path: "/#all-guides" },
  { label: "ผู้เล่นใหม่", path: "/#new-player" },
  { label: "รายเดือน", path: "/category/monthly-and-events" },
  { label: "DLC", path: "/category/items-shops-and-dlc" },
  { label: "News", path: "/category/archive-and-news" },
  { label: "Search", path: "/search" },
];

export function getCategory(categoryId: string): Category | undefined {
  return categories.find((category) => category.id === categoryId);
}

export function getGuide(guideId: string): Guide | undefined {
  return guides.find((guide) => guide.id === guideId);
}

export function getGuidesForCategory(categoryId: string): Guide[] {
  return guides.filter((guide) => guide.categoryId === categoryId);
}

export function getRelatedGuides(guide?: Guide): Guide[] {
  return (guide?.relatedIds || []).map(getGuide).filter((relatedGuide): relatedGuide is Guide => Boolean(relatedGuide));
}

export function searchGuides(query: string): Guide[] {
  const normalizedQuery = query.toLocaleLowerCase("th").trim();
  if (!normalizedQuery) return guides;

  return guides.filter((guide) => {
    const category = getCategory(guide.categoryId);
    const articleText = guide.articleContent
      ? [
          guide.articleContent.label,
          ...(guide.articleContent.lead || []),
          guide.articleContent.alert?.title,
          guide.articleContent.alert?.text,
          ...(guide.articleContent.sections || []).flatMap((section) => [section.title, ...(section.paragraphs || [])]),
          guide.articleContent.checklist?.title,
          ...(guide.articleContent.checklist?.items || []),
          guide.articleContent.closing,
        ]
      : [];
    const searchable = [
      guide.title,
      guide.description,
      guide.type,
      guide.month,
      guide.status,
      guide.postAuthor,
      guide.postedDate,
      guide.sourceExcerpt,
      guide.assetSummary,
      ...(guide.tags || []),
      ...(guide.audience || []),
      ...(guide.subLinks || []).flatMap((subLink) => [subLink.label, subLink.description, subLink.kind]),
      category?.title,
      category?.shortName,
      ...(category?.tags || []),
      ...articleText,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("th");
    return searchable.includes(normalizedQuery);
  });
}
