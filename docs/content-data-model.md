# Content Data Model

แนวทางนี้ใช้แยกข้อมูลออกเป็น 3 ชั้น เพื่อให้เพิ่มไกด์ใหม่ง่ายขึ้นและพร้อมย้ายไปหลังบ้านภายหลัง

## 1. Guide Metadata

อยู่ใน `src/data/curatedContent.ts` และ `src/data/content.ts`

ใช้เก็บข้อมูลที่เป็นสารบัญ/การค้นหา/การ์ด เช่น

- `id`
- `categoryId`
- `title`
- `description`
- `tags`
- `contentType`
- `audience`
- `status`
- `priority`
- `sourceUrl`

ชั้นนี้ไม่ควรเก็บเนื้อหาบทความยาวหรือ layout เฉพาะหน้า

## 2. Image Assets

อยู่ใน `src/data/postImageAssets.ts`

ใช้เก็บรายการรูปของแต่ละโพสต์แบบอ้างอิงได้ เช่น

```ts
const image = getPostImage("blue-rose-guide", 2);
```

รูปที่ 1 จะถูกใช้เป็น cover ของหน้า detail โดยอัตโนมัติ ส่วนรูปที่เหลือจะแสดงท้ายบทความเป็น "รูปเพิ่มเติมจากโพสต์" หากยังไม่ได้ดึงไปแทรกในบทความ

## 3. Article Content

อยู่ใน `src/data/articleContent.ts`

ใช้เขียนเนื้อหาที่ผู้เล่นอ่านจริง โดยโครงใหม่รองรับ `body` และ `section.blocks` เพื่อแทรกรูประหว่างข้อความได้

ตัวอย่าง:

```ts
import { getPostImage } from "./postImageAssets";
import type { ArticleContentData } from "../types/content";

const stepImage = getPostImage("blue-rose-guide", 2);

export const blueRoseContent: ArticleContentData = {
  label: "ไกด์ปลูกดอกไม้",
  lead: ["สรุปภาพรวมก่อนเริ่มปลูกกุหลาบน้ำเงิน"],
  body: [
    {
      type: "paragraph",
      text: "เริ่มจากเตรียมพื้นที่และดอกตั้งต้นให้ชัดก่อน",
    },
    ...(stepImage
      ? [
          {
            type: "image" as const,
            image: {
              src: stepImage.src,
              alt: stepImage.alt,
              caption: "ตัวอย่างตำแหน่งปลูกจากโพสต์ต้นทาง",
            },
            size: "wide" as const,
          },
        ]
      : []),
  ],
  sections: [
    {
      title: "ขั้นตอนหลัก",
      blocks: [
        { type: "paragraph", text: "แยกแต่ละ generation เพื่อไม่ให้สายพันธุ์ปนกัน" },
        {
          type: "checklist",
          title: "เช็กก่อนข้ามวัน",
          items: ["รดน้ำครบ", "ไม่มีดอกผิดสีปน", "พื้นที่รอบดอกยังว่าง"],
        },
      ],
    },
  ],
};
```

## Block Types

- `paragraph`: ย่อหน้าปกติ
- `image`: รูปเดี่ยวพร้อม caption
- `gallery`: รูปหลายรูปแทรกในตำแหน่งเดียว
- `note`: กล่องหมายเหตุ
- `checklist`: เช็กลิสต์ในเนื้อหา

## Next Migration

เวลาย้ายไปหลังบ้าน ให้ใช้ shape เดียวกันนี้ได้ตรงๆ:

- `guides` table/collection สำหรับ metadata
- `article_blocks` หรือ JSON field สำหรับ `body` และ `sections`
- `assets` table/collection สำหรับรูปและ source attribution

สิ่งที่ควรทำรอบถัดไปคือค่อยๆ ย้ายเนื้อหาเฉพาะหน้าออกจาก `content.ts` ไปไว้ใน `articleContent.ts` ตาม `guideId` แล้วให้ `content.ts` ทำหน้าที่ compose data อย่างเดียว
