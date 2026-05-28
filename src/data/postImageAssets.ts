export interface PostImageAsset {
  imageId: string;
  order: number;
  src: string;
  alt: string;
  caption: string;
}

export interface CuratedPostImageAsset {
  guideId: string;
  sourcePostId: string;
  sourceUrl: string;
  postAuthor: string;
  postedDate: string;
  title: string;
  summary: string;
  sourceExcerpt: string;
  imageCount: number;
  images: PostImageAsset[];
  reviewNote?: string;
}

function makeImages(
  guideId: string,
  title: string,
  imageCount: number,
  extensionByOrder: Record<number, string> = {},
): PostImageAsset[] {
  return Array.from({ length: imageCount }, (_, index) => {
    const order = index + 1;
    const paddedOrder = String(order).padStart(2, "0");
    const extension = extensionByOrder[order] || "jpg";
    const imageId = `${guideId}-${paddedOrder}`;

    return {
      imageId,
      order,
      src: `/content-images/curated-post-images/${guideId}/${imageId}.${extension}`,
      alt: `ภาพประกอบโพสต์ ${title} รูปที่ ${order}`,
      caption: `ภาพประกอบจากโพสต์ต้นทาง รูปที่ ${order}`,
    };
  });
}

export const curatedPostImageAssets: CuratedPostImageAsset[] = [
  {
    guideId: "island-visitor-etiquette",
    sourcePostId: "1724406801313551",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1724406801313551/",
    postAuthor: "Marie Furry",
    postedDate: "6 พฤษภาคม 2023",
    title: "มารยาทสำคัญบนเกาะผู้อื่น",
    summary:
      "โพสต์อธิบายมารยาทเมื่อไปเกาะคนอื่น โดยเฉพาะกรณีรับของหรือเข้าคิวหลายคน เช่น อ่านกติกาเจ้าของเกาะ เคลียร์กระเป๋า เช็กเน็ต ไม่ขวางการบิน และเตรียม NSO ให้พร้อม",
    sourceExcerpt:
      "เรื่องควรรู้สำหรับการไปเกาะผู้อื่นและทำความเข้าใจเจ้าของเกาะ อ่านกฎให้ละเอียด ปฏิบัติตามสิ่งที่เจ้าของเกาะร้องขอ เคลียร์กระเป๋าก่อนบิน และนึกถึงคนอื่นที่กำลังรอคิว",
    imageCount: 1,
    images: makeImages("island-visitor-etiquette", "มารยาทสำคัญบนเกาะผู้อื่น", 1),
  },
  {
    guideId: "nso-benefits",
    sourcePostId: "2147040952383465",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/2147040952383465/",
    postAuthor: "Marie Furry",
    postedDate: "16 กุมภาพันธ์ 2025",
    title: "NSO คืออะไรและทำอะไรได้บ้างใน ACNH",
    summary:
      "โพสต์รวมประโยชน์ของ Nintendo Switch Online สำหรับผู้เล่น ACNH ทั้งการเล่นออนไลน์ สิทธิพิเศษ และช่องทางสมัคร เหมาะสำหรับผู้เล่นใหม่ที่ยังไม่แน่ใจว่าต้องใช้ NSO เมื่อใด",
    sourceExcerpt:
      "NSO หรือ Nintendo Switch Online คือบริการที่เกี่ยวข้องกับการเล่นออนไลน์ใน ACNH โพสต์แยกหัวข้อเรื่องประโยชน์จาก Online Mode สิทธิพิเศษอื่น ๆ และช่องทางสมัครสมาชิก",
    imageCount: 3,
    images: makeImages("nso-benefits", "NSO คืออะไรและทำอะไรได้บ้างใน ACNH", 3),
  },
  {
    guideId: "beginner-walkthrough-main",
    sourcePostId: "1872293773191519",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1872293773191519/",
    postAuthor: "Marie Furry",
    postedDate: "17 มกราคม 2024",
    title: "ACNH Beginner’s Guide: บทช่วยสอนตั้งแต่วันแรก",
    summary:
      "ไกด์ผู้เล่นใหม่แบบละเอียด เริ่มตั้งแต่วันแรกไปจนถึงช่วงจบเนื้อเรื่องแรก เหมาะใช้เป็นแกนหลักของหน้า New Player Path",
    sourceExcerpt:
      "บทช่วยสอนนี้ขยายจากไกด์เควสหลักสำหรับผู้เริ่มเล่น เพื่ออธิบายการเล่นตั้งแต่วันแรกจนถึงวันที่จบเนื้อเรื่องแรกตามเนื้อหาของเกมแบบละเอียด",
    imageCount: 5,
    images: makeImages("beginner-walkthrough-main", "ACNH Beginner’s Guide: บทช่วยสอนตั้งแต่วันแรก", 5),
  },
  {
    guideId: "after-three-stars-what-next",
    sourcePostId: "1892587597828803",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1892587597828803/",
    postAuthor: "Marie Furry",
    postedDate: "18 กุมภาพันธ์ 2024",
    title: "หลังจบ 3 ดาวแล้วควรทำอะไรต่อ",
    summary:
      "แนวทางสำหรับผู้เล่นที่ผ่านบทช่วยสอนและเกาะ 3 ดาวแล้ว แต่ยังไม่รู้ว่าจะตั้งเป้าหมายต่ออย่างไร",
    sourceExcerpt:
      "ส่วนต่อจากบทช่วยสอน แนะนำให้อ่านบทช่วยสอนหลักก่อน แล้วจึงใช้โพสต์นี้เป็นแนวทางเมื่อเริ่มรู้สึกหลงทาง สับสน หรืออยากมีเป้าหมายต่อหลังเกมเปิดอิสระ",
    imageCount: 5,
    images: makeImages("after-three-stars-what-next", "หลังจบ 3 ดาวแล้วควรทำอะไรต่อ", 5),
  },
  {
    guideId: "monthly-checklist-index",
    sourcePostId: "1865635590524004",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1865635590524004/",
    postAuthor: "Marie Furry",
    postedDate: "6 มกราคม 2024",
    title: "สารบัญไกด์รายเดือน",
    summary:
      "โพสต์สารบัญรวมไกด์รายเดือนทั้ง 12 เดือน ใช้เป็นทางเข้าไปอ่านสิ่งที่เปลี่ยนในแต่ละเดือน เช่น ปลา แมลง สัตว์ทะเล และเป้าหมายตามฤดูกาล",
    sourceExcerpt:
      "Monthly Guide รวมลิงก์ไกด์รายเดือนตั้งแต่มกราคมถึงธันวาคม เพื่อช่วยตั้งเป้าหมายและเช็กสิ่งที่เกิดขึ้นในแต่ละเดือน",
    imageCount: 1,
    images: makeImages("monthly-checklist-index", "สารบัญไกด์รายเดือน", 1),
  },
  {
    guideId: "events-index",
    sourcePostId: "1865637647190465",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1865637647190465/",
    postAuthor: "Marie Furry",
    postedDate: "6 มกราคม 2024",
    title: "สารบัญอีเวนต์และกิจกรรม",
    summary:
      "โพสต์สารบัญรวมอีเวนต์รายเดือน เช่น Fishing Tourney, Bug-Off, วันขึ้นปีใหม่, Lunar New Year, Valentine’s Day และกิจกรรมตามฤดูกาล",
    sourceExcerpt:
      "Monthly Events รวมกิจกรรมรายเดือนและอีเวนต์สำคัญ โดยระบุช่วงเวลาของ Fishing Tourney, Bug-Off และอีเวนต์ประจำเดือนต่าง ๆ",
    imageCount: 1,
    images: makeImages("events-index", "สารบัญอีเวนต์และกิจกรรม", 1),
  },
  {
    guideId: "seasonal-items-index",
    sourcePostId: "1865641420523421",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1865641420523421/",
    postAuthor: "Marie Furry",
    postedDate: "6 มกราคม 2024",
    title: "Seasonal Items จาก Nook Shopping และร้านค้า",
    summary:
      "โพสต์สารบัญไอเทมเทศกาลรายเดือนจาก Nook Shopping, Nook’s Cranny, Able Sisters และร้านค้าที่เกี่ยวข้อง เหมาะสำหรับสายสะสม",
    sourceExcerpt:
      "List of Contents 6 รวบรวม seasonal items รายเดือน เช่น Festival of Seven Herbs, Big Game Celebration, Lunar New Year, Valentine’s Day และ Festivale",
    imageCount: 1,
    images: makeImages("seasonal-items-index", "Seasonal Items จาก Nook Shopping และร้านค้า", 1),
  },
  {
    guideId: "gardening-index",
    sourcePostId: "1926602871093942",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1926602871093942/",
    postAuthor: "Marie Furry",
    postedDate: "15 เมษายน 2024",
    title: "สารบัญการปลูกและทำสวน",
    summary:
      "โพสต์สารบัญเรื่องการปลูกพืช ดอกไม้ พุ่มไม้ การขยายพันธุ์ และความรู้ด้านสวนในเกม ใช้เป็นหมวดหลักสำหรับ Gardening",
    sourceExcerpt:
      "Guide to Planting, Propagating Plants & Gardening รวมลิงก์เรื่องพืชทั่วไป พืชพิเศษ ดอกไม้ เค้าโครงสวน กุหลาบทอง กุหลาบน้ำเงิน และสวนหิน",
    imageCount: 1,
    images: makeImages("gardening-index", "สารบัญการปลูกและทำสวน", 1),
  },
  {
    guideId: "blue-rose-guide",
    sourcePostId: "2042550989499129",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/2042550989499129/",
    postAuthor: "Marie Furry",
    postedDate: "29 กันยายน 2024",
    title: "Blue Rose กุหลาบน้ำเงิน",
    summary:
      "ไกด์ปลูกกุหลาบน้ำเงิน หนึ่งในดอกไม้ที่ยากที่สุดในเกม โดยรวบรวมวิธีที่ทดสอบและจำลองมาแล้วสำหรับคนที่อยากเลือกเส้นทางเพาะพันธุ์ที่เหมาะกับตัวเอง",
    sourceExcerpt:
      "Blue Rose เป็นดอกไม้ที่หายากที่สุดในเกม โพสต์นี้รวมวิธีปลูกที่ผ่านการทดสอบและจำลองอย่างละเอียด เพื่อให้ผู้เล่นเลือกวิธีที่เหมาะกับความต้องการของตัวเอง",
    imageCount: 5,
    images: makeImages("blue-rose-guide", "Blue Rose กุหลาบน้ำเงิน", 5),
  },
  {
    guideId: "happy-home-paradise-index",
    sourcePostId: "1865645297189700",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1865645297189700/",
    postAuthor: "Marie Furry",
    postedDate: "6 มกราคม 2024",
    title: "Happy Home Paradise",
    summary:
      "โพสต์สารบัญสำหรับ DLC Happy Home Paradise รวมลิงก์เรื่อง DLC, Soundscapes, grade/rank และการแลกเงิน Poki/Bell",
    sourceExcerpt:
      "List of Contents 9 รวมเนื้อหา Happy Home Paradise เช่น ไกด์ DLC, เสียงแต่งห้อง, การคำนวณเกรดและอันดับ, และอัตราแลก Poki/Bell",
    imageCount: 1,
    images: makeImages("happy-home-paradise-index", "Happy Home Paradise", 1),
  },
  {
    guideId: "island-transfer-overview",
    sourcePostId: "1745008262586738",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1745008262586738/",
    postAuthor: "Marie Furry",
    postedDate: "10 มิถุนายน 2023",
    title: "การย้ายเกาะและย้ายข้อมูล Animal Crossing",
    summary:
      "ไกด์ย้าย save data และย้ายเกาะไปอีกเครื่อง แยกประเภทการถ่ายโอนข้อมูลและขั้นตอนที่ควรรู้ก่อนเปลี่ยนเครื่อง",
    sourceExcerpt:
      "ไกด์นี้แบ่งเป็นหลาย part สำหรับการย้าย ACNH save data ไปอีกเครื่อง โดยอธิบาย Entire Island Transfer, เครื่องต้นทาง, เครื่องเป้าหมาย และ Island Transfer Tool",
    imageCount: 4,
    images: makeImages("island-transfer-overview", "การย้ายเกาะและย้ายข้อมูล Animal Crossing", 4),
  },
  {
    guideId: "amiibo-mini-guide",
    sourcePostId: "1762861500801414",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1762861500801414/",
    postAuthor: "Marie Furry",
    postedDate: "8 กรกฎาคม 2023",
    title: "Amiibo Figures / Amiibo Card",
    summary:
      "Mini guide สำหรับการใช้ Amiibo เรียกชาวเกาะที่ชอบมาแคมป์ และเงื่อนไขเมื่อต้องการชวนมาอยู่ถาวรทั้งกรณีบ้านยังไม่เต็มและบ้านเต็มแล้ว",
    sourceExcerpt:
      "อธิบายเงื่อนไขการสแกน Amiibo จาก Nook Stop เมื่อน้องบนเกาะครบ 6 คน การทำเควส 3 วัน และกรณีบ้านว่างหรือบ้านเต็มครบ 10 หลัง",
    imageCount: 5,
    images: makeImages("amiibo-mini-guide", "Amiibo Figures / Amiibo Card", 5),
  },
  {
    guideId: "meteonook-weather",
    sourcePostId: "1752263685194529",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1752263685194529/",
    postAuthor: "Marie Furry",
    postedDate: "21 มิถุนายน 2023",
    title: "MeteoNook และการหาสภาพอากาศเกาะ",
    summary:
      "ไกด์ใช้ MeteoNook Alpha เพื่อบันทึกและทำนายสภาพอากาศของเกาะ เช่น ฝนดาวตก สายรุ้ง แสงเหนือ ฝน หิมะ และรูปแบบเมฆ",
    sourceExcerpt:
      "แต่ละเกาะมีรูปแบบสภาพอากาศเฉพาะ โพสต์นี้แนะนำ MeteoNook Alpha และวิธีรวบรวมข้อมูลสภาพอากาศให้มากพอเพื่อคำนวณ weather seed ได้แม่นยำ",
    imageCount: 6,
    images: makeImages("meteonook-weather", "MeteoNook และการหาสภาพอากาศเกาะ", 6, { 6: "png" }),
  },
  {
    guideId: "celeste-guide",
    sourcePostId: "1835070330247197",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1835070330247197/",
    postAuthor: "Marie Furry",
    postedDate: "14 พฤศจิกายน 2023",
    title: "Celeste และดาวตก",
    summary:
      "ข้อมูล Celeste น้องฮูกแดง ผู้เกี่ยวข้องกับดาวตก การขอพร ดาราศาสตร์ และ DIY สูตรดาวต่าง ๆ",
    sourceExcerpt:
      "Celeste เป็น NPC สำคัญของซีรีส์ Animal Crossing และใน New Horizons ทำหน้าที่เกี่ยวกับการดูดาว แบ่งปันข้อมูลดาราศาสตร์ และมอบ DIY ดวงดาวต่าง ๆ",
    imageCount: 5,
    images: makeImages("celeste-guide", "Celeste และดาวตก", 5),
  },
  {
    guideId: "brewster-guide",
    sourcePostId: "1715143895573175",
    sourceUrl: "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1715143895573175/",
    postAuthor: "Marie Furry",
    postedDate: "21 เมษายน 2023",
    title: "Brewster และ The Roost",
    summary:
      "ข้อมูล Brewster เจ้าของร้าน The Roost พร้อมบทบาท วิธีปลดล็อกร้านกาแฟ และรายละเอียดที่เกี่ยวกับพิพิธภัณฑ์",
    sourceExcerpt:
      "Brewster เป็นเจ้าของร้าน The Roost ถูกเพิ่มเข้ามาในอัปเดต 2.0 ผู้เล่นปลดล็อกร้านกาแฟได้หลังบริจาคของเข้าพิพิธภัณฑ์ครบหมวดหลัก ได้เกาะ 3 ดาว และคุยกับ Blathers",
    imageCount: 6,
    images: makeImages("brewster-guide", "Brewster และ The Roost", 6),
    reviewNote: "ตรวจ sourceUrl อีกครั้งก่อนเผยแพร่ เพราะข้อมูลนำเข้าบางแหล่งใช้ slug ของกลุ่มต่างรูปแบบ",
  },
];

export function getPostImageAsset(guideId: string): CuratedPostImageAsset | undefined {
  return curatedPostImageAssets.find((asset) => asset.guideId === guideId);
}
