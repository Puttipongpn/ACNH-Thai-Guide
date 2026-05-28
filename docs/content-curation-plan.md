# ACNH Thai Guide Content Curation Plan

อัปเดต: 28 พ.ค. 2026

ไฟล์ดิบที่ใช้ตรวจ:

- `acnh_group_content.json`
- `acnh_group_content_organized.md`
- `acnh_source_inventory.md`
- `acnh_raw_extraction.json`
- `acnh_extraction_progress.md`

## สรุปจากข้อมูลดิบ

- อ่านข้อความจากโพสต์แล้ว: 258 โพสต์
- ความสัมพันธ์ระหว่างโพสต์: 502 ลิงก์
- หมวดหลักจากสารบัญกลุ่ม: 12 หมวด
- รูปภาพที่ต้อง OCR/ตรวจด้วยสายตา: 710 รูป
- สถานะข้อมูลภาพ: ยังไม่ verified

ข้อมูลดิบมีประโยชน์มากสำหรับเป็นคลังอ้างอิง แต่ยังไม่เหมาะเอาเข้าเว็บตรง ๆ เพราะมีข้อมูลซ้ำ โพสต์ข่าวย่อย โพสต์ที่เป็นคอมเมนต์/บทสนทนา โพสต์ที่อ่านชื่อไม่สมบูรณ์ และโพสต์ที่ข้อมูลหลักอยู่ในรูปภาพ

## หลักการคัดแยก

### เก็บเป็นเนื้อหาหลักบนเว็บ

เหมาะกับ card, search result, quick links และหน้า category

- ผู้เล่นใหม่ต้องอ่านก่อนเล่นออนไลน์หรือเข้ากลุ่ม
- ไกด์ที่ตอบคำถามซ้ำบ่อย เช่น NSO, ย้ายเครื่อง, ย้ายเกาะ, Amiibo, NPC visitors
- ไกด์ที่ใช้ซ้ำตามฤดูกาลหรือรายเดือน
- ไกด์ที่มีโครงข้อมูลชัด เช่น NPC, tutorial, gardening, DLC
- โพสต์สารบัญแม่ของแต่ละ content ใช้เป็น `sourceUrl` ของ category แต่ไม่จำเป็นต้องเป็น article card

### เก็บเป็นคลังอ้างอิง

ไม่ควรขึ้นหน้าแรก แต่ควรค้นเจอหรืออยู่ท้ายหมวด

- ข่าวย้อนหลังที่ยังมีประโยชน์
- โพสต์เฉพาะทาง เช่น firmware, Nintendo app, eShop, Pocket Camp
- ข้อมูล trivia/creative ที่ไม่ได้จำเป็นต่อการเล่น แต่สนุกและมีคุณค่าชุมชน
- โพสต์ที่ต้องเปิด Facebook เพื่ออ่านรายละเอียดเต็ม

### ตัดออกจากเว็บหลัก

ไม่ควรแสดงเป็นหน้า article/card เว้นแต่แอดมินเลือกเอง

- โพสต์ที่เป็นคอมเมนต์สั้นหรือบทสนทนา
- โพสต์ที่ title เป็นวันที่อย่างเดียว
- โพสต์ที่ title เป็น `#Animal Crossing: New Horizons Thailand` และไม่มีหัวข้อจริง
- โพสต์ที่เป็น reaction/comment metadata
- โพสต์ข่าวย่อยที่ไม่เกี่ยวกับ ACNH โดยตรง
- โพสต์ที่ข้อมูลสำคัญอยู่ในรูปภาพทั้งหมดและยังไม่ได้ OCR

## โครงข้อมูลใหม่ที่แนะนำ

ใช้ 8 กลุ่มหลักแทน 12 หมวดเดิม เพื่อให้เว็บไม่หนักเกินไป:

1. `start-here` - เริ่มต้น / กฎ / มารยาท / NSO / ย้ายข้อมูล
2. `new-player-path` - Tutorial ตั้งแต่วันแรกถึง 3 ดาว
3. `quick-guides` - Mini guides และคำถามที่เจอบ่อย
4. `npcs-and-visitors` - NPC ถาวรและ NPC visitors
5. `monthly-and-events` - รายเดือน, events, seasonal items
6. `items-shops-and-dlc` - ร้านค้า, Nook Shopping, DLC, HHP
7. `gardening-and-island` - ดอกไม้, สวน, หิน, เกาะ, weather
8. `archive-and-news` - ข่าวสารและโพสต์ที่เก็บเป็นคลัง

## สถานะรูปภาพ

ตอนนี้ข้อมูลภาพควรเก็บเป็น metadata ก่อน:

- `imageCount`
- `imageStatus: "ocr_pending"`
- `imageRole: "cover" | "infographic" | "gallery" | "unknown"`
- `needsImageReview: true`

ยังไม่ควรนำภาพขึ้นเว็บจริงจนกว่า:

1. มีไฟล์รูปจริงหรือ URL ที่เข้าถึงได้
2. OCR หรือแอดมินตรวจข้อความในรูปแล้ว
3. ได้สิทธิ์หรือยืนยันว่าใช้ภาพจากโพสต์ในเว็บได้
4. ระบุ alt text และ caption แล้ว

## สิ่งที่ควรทำต่อ

1. นำ `src/data/curatedContent.ts` ไปใช้แทนข้อมูลตัวอย่างเดิมเมื่อออกแบบเว็บรอบใหม่
2. เลือก 10-20 รายการแรกที่สำคัญสุดขึ้นหน้า Home
3. ทำหน้า Category ให้รองรับ filter ตาม `priority`, `audience`, `contentType`, `imageStatus`
4. เพิ่ม workflow สำหรับ OCR รูปภาพ:
   - ดาวน์โหลด/แนบรูปจริง
   - OCR เป็นข้อความ
   - แอดมิน review
   - สร้าง `visualAssets`
5. แยก News เป็น archive ไม่ให้ปนกับไกด์หลัก
