# ACNH Thai Guide Index

ต้นแบบเว็บไซต์สารบัญกลางสำหรับกลุ่ม `Animal Crossing: New Horizons` ภาษาไทย เน้นการใช้งานบนมือถือ โทนสมุดคู่มือเกาะที่อบอุ่น และโครงข้อมูลที่เติมลิงก์ Facebook จริงได้ในภายหลัง
พัฒนาด้วน Codex ai

## หน้าที่มีในต้นแบบ

- `Home`: hero + ช่องค้นหา, quick categories, สารบัญทั้งหมด, ชุดอ่านสำหรับผู้เล่นใหม่ และรายการตามเดือนนี้
- `Category`: หน้าเปิดรายการย่อยของ Content 1-10 และ News
- `Detail`: หน้ารายละเอียดลิงก์ พร้อมหมวด, tag, หมายเหตุ, ลิงก์ต้นทาง และรายการเกี่ยวข้อง
- `Search`: ค้นจากชื่อเรื่อง คำอธิบาย หมวด `tag`, `month` และ `type`

## เริ่มใช้งาน

```bash
npm install
npm run dev
```

สร้างไฟล์สำหรับ deploy:

```bash
npm run build
```

## Component Structure

```text
src/
  App.jsx                      # navigation และเลือก page จาก URL
  data/content.js              # categories, guides, helpers สำหรับค้นหา
  components/
    Header.jsx                 # desktop/mobile navigation
    BottomNav.jsx              # ปุ่มทางลัดมือถือ
    SearchBar.jsx              # ช่องค้นหาที่ใช้ซ้ำได้
    Cards.jsx                  # QuickCategoryCard, ContentCard, GuideCard
    ArticleContent.jsx         # แสดงเนื้อหาบทความยาวในหน้า Detail
    UI.jsx                     # button/link, tag, heading, badge
  pages/
    HomePage.jsx
    CategoryPage.jsx
    DetailPage.jsx
    SearchPage.jsx
    NotFoundPage.jsx
```

## Data Structure

ข้อมูลทั้งหมดอยู่ที่ `src/data/content.js` เพื่อให้เริ่มจากข้อมูลแบบ static ได้ง่าย แล้วค่อยย้ายไป CMS, Google Sheet export หรือ database ในอนาคต

```js
const category = {
  id: "monthly-guide",
  number: "Content 4",
  icon: "🗓️",
  shortName: "ไกด์รายเดือน",
  title: "ไกด์รายเดือน",
  description: "ปลา แมลง และสิ่งที่น่าสนใจประจำเดือน",
  color: "peach",
  tags: ["monthly", "guide"],
  sourceUrl: "https://facebook.com/...", // โพสต์สารบัญต้นทาง
};

const guide = {
  id: "may-monthly-checklist",
  categoryId: "monthly-guide",
  title: "เช็กลิสต์เกาะประจำเดือนพฤษภาคม",
  description: "คำอธิบายสั้นที่ช่วยให้ตัดสินใจก่อนกดอ่าน",
  type: "guide", // guide | event | npc | tutorial | dlc | gardening | news
  tags: ["พฤษภาคม", "รายเดือน"],
  month: "พฤษภาคม",
  updatedAt: "27 พ.ค. 2026",
  sourceUrl: "https://facebook.com/...", // โพสต์จริง
  relatedIds: ["may-events"],
  featuredForNewPlayer: false,
  isThisMonth: true,
  note: "หมายเหตุจากแอดมิน (ถ้ามี)",
};
```

เมื่อมีลิงก์จริง ให้เติม `sourceUrl` ของหมวดหรือ guide ที่เกี่ยวข้อง ปุ่ม `รอเพิ่มโพสต์` จะเปลี่ยนเป็น `เปิดโพสต์ Facebook` โดยอัตโนมัติ

## วิธีเพิ่มข้อมูล

### โพสต์แบบลิงก์สั้น

เพิ่ม object ใหม่ใน array `guides` ที่ `src/data/content.js` โดยเลือก `categoryId` ให้ตรงกับหมวดที่ต้องการ รายการจะปรากฏในหน้า Category และค้นหาได้อัตโนมัติ

```js
{
  id: "unique-post-slug",
  categoryId: "rules-game",
  title: "ชื่อโพสต์",
  description: "ข้อความสรุปสั้นสำหรับ card",
  type: "guide",
  tags: ["กฎกลุ่ม", "มือใหม่"],
  updatedAt: "27 พ.ค. 2026",
  sourceUrl: "https://facebook.com/...",
  relatedIds: [],
}
```

### บทความยาว

เก็บตัวเนื้อหาใน `src/data/articleContent.js` แล้วนำมาใส่ใน guide ด้วย field `articleContent` ตัวอย่างที่เพิ่มแล้วคือ `มารยาทสำคัญบนเกาะผู้อื่น`

```js
export const myArticleContent = {
  label: "ข้อความเหนือบทความ",
  lead: ["ย่อหน้าเกริ่นนำ"],
  alert: { title: "สำคัญ", text: "ข้อความเน้น" },
  sections: [
    { title: "หัวข้อที่ 1", paragraphs: ["เนื้อหา"] },
  ],
  checklist: { title: "เช็กลิสต์", items: ["สิ่งที่ต้องทำ"] },
  closing: "ข้อความส่งท้าย",
};
```

แล้ว import ไปใช้ใน `src/data/content.js`:

```js
{
  id: "my-article",
  categoryId: "rules-game",
  title: "ชื่อบทความ",
  description: "คำอธิบายสั้น",
  type: "guide",
  tags: ["มารยาท"],
  sourceUrl: "",
  articleContent: myArticleContent,
  relatedIds: [],
}
```

### ภาพประกอบบทความ

นำไฟล์ภาพไว้ใต้ `public/images/` เช่น `public/images/island-visitor-etiquette.jpg` แล้วเพิ่ม field นี้ใน object ของบทความ:

```js
coverImage: {
  src: "/images/island-visitor-etiquette.jpg",
  alt: "ภาพประกอบมารยาทการเยี่ยมเกาะผู้อื่น",
  caption: "ภาพประกอบจากโพสต์ต้นทาง",
},
```

ก่อนนำรูปจากสมาชิกหรือโพสต์ในกลุ่มมาแสดงบนเว็บสาธารณะ ควรได้รับอนุญาตจากเจ้าของเนื้อหาก่อน
