# Image Asset Collection Handoff Prompt

ใช้ prompt นี้กับ Codex ตัวที่ทำหน้าที่ดึงข้อมูลจาก Facebook Group

จุดประสงค์ของ prompt นี้ต่างจาก OCR prompt เดิม: งานนี้คือ **เซฟภาพประกอบที่เกี่ยวกับโพสต์ที่เราจะนำมาใช้ พร้อมข้อความ/คำอธิบายที่เจ้าของโพสต์เขียนไว้** ไม่ใช่วิเคราะห์ว่าภาพหมายถึงอะไร และไม่ใช่พยายามสรุปข้อมูลจากภาพ

```text
โปรเจกต์ปลายทางคือเว็บไซต์ ACNH Thai Guide Index สำหรับกลุ่ม Animal Crossing: New Horizons ภาษาไทย

โฟลเดอร์ข้อมูลทั้งหมดอยู่ที่:
/Users/panupong.ma/Documents/Codex/2026-05-28/facebook-group-private-animal-crossing-new

ไฟล์สำคัญที่ต้องอ่านก่อน:
- acnh_group_content.json
- acnh_raw_extraction.json
- acnh_group_content_organized.md
- acnh_source_inventory.md
- acnh_extraction_progress.md
- acnh_curated_image_assets.json ถ้ามีอยู่แล้ว ให้ใช้เป็น reference ได้ แต่ไม่ต้องยึด schema เดิม

ใน repo เว็บ มี curated list อยู่ที่:
- src/data/curatedContent.ts
- docs/content-curation-plan.md

เป้าหมาย:
ให้เก็บ "ไฟล์ภาพจริง" จากโพสต์ Facebook ที่เกี่ยวข้องกับ curated guides ที่เราจะนำไปใช้บนเว็บ พร้อม metadata พื้นฐานและข้อความโพสต์ต้นทาง

สำคัญมาก:
- งานนี้ไม่ใช่งาน OCR
- ไม่ต้องตีความว่าภาพหมายถึงอะไร
- ไม่ต้องวิเคราะห์เนื้อหาในภาพ
- ไม่ต้องสรุปข้อความในภาพ
- ไม่ต้องตัดสินว่าภาพมีข้อมูลเพิ่มจากโพสต์หรือไม่
- ไม่ต้อง mark ภาพ decorative แล้วตัดออก หากภาพนั้นเป็นภาพประกอบของโพสต์ที่เราจะใช้ ให้เซฟมาได้

สิ่งที่ต้องทำต่อโพสต์:
1. เปิด sourceUrl ของโพสต์จาก curated guide
2. อ่านข้อความ/แคปชันที่เจ้าของโพสต์เขียนไว้
3. เปิดรูปทั้งหมดที่แนบกับโพสต์นั้น
4. เซฟรูปที่เป็นภาพประกอบของโพสต์นั้นลงโฟลเดอร์ local
5. เก็บลำดับรูปตามลำดับในโพสต์ เช่น 01, 02, 03
6. เก็บ sourceImageUrl เท่าที่เห็นได้
7. เก็บ postText หรือ postCaption จากข้อความโพสต์
8. เขียน alt แบบพื้นฐานจากบริบทโพสต์ได้ แต่อย่าพยายามวิเคราะห์ภาพลึก
9. ถ้ารูปเปิดหรือดาวน์โหลดไม่ได้ ให้บันทึกสถานะ blocked พร้อมเหตุผล

ลำดับโพสต์ที่ต้องทำก่อน:
ทำเฉพาะ curated guides ที่สำคัญก่อน ไม่ต้องทำครบ 710 รูป

Priority A:
1. island-visitor-etiquette
2. nso-benefits
3. beginner-walkthrough-main
4. after-three-stars-what-next
5. monthly-checklist-index
6. events-index
7. seasonal-items-index
8. gardening-index
9. blue-rose-guide
10. happy-home-paradise-index

Priority B:
11. island-transfer-overview
12. amiibo-mini-guide
13. meteonook-weather
14. celeste-guide
15. brewster-guide

ที่เก็บไฟล์ภาพ:
สร้างโฟลเดอร์:
/Users/panupong.ma/Documents/Codex/2026-05-28/facebook-group-private-animal-crossing-new/curated_post_images

โครงโฟลเดอร์แนะนำ:
curated_post_images/
  island-visitor-etiquette/
    island-visitor-etiquette-01.jpg
  nso-benefits/
    nso-benefits-01.jpg
    nso-benefits-02.jpg

ชื่อไฟล์:
- ใช้ guideId + running number
- ใช้นามสกุลตามไฟล์จริงถ้ารู้ เช่น .jpg, .png, .webp
- ถ้าไม่รู้ให้ใช้ .jpg

Output ที่ต้องสร้าง:
สร้างไฟล์ใหม่ชื่อ:
acnh_curated_post_images.json

ห้ามเขียนทับ acnh_curated_image_assets.json เดิม

Schema ที่ต้องการ:

{
  "updatedAt": "ISO date",
  "purpose": "download_post_images_with_original_post_text",
  "sourceFolder": "/Users/panupong.ma/Documents/Codex/2026-05-28/facebook-group-private-animal-crossing-new",
  "imageFolder": "/Users/panupong.ma/Documents/Codex/2026-05-28/facebook-group-private-animal-crossing-new/curated_post_images",
  "items": [
    {
      "guideId": "island-visitor-etiquette",
      "sourcePostId": "1724406801313551",
      "sourceUrl": "https://www.facebook.com/groups/AnixNewHorizonsTH/posts/1724406801313551/",
      "status": "downloaded | partial | blocked | no_images",
      "postAuthor": "Marie Furry",
      "postedDate": "ถ้ามี",
      "postTitle": "ชื่อหรือหัวข้อของโพสต์",
      "postText": "ข้อความโพสต์ต้นทางเท่าที่อ่านได้ หรือข้อความสำคัญที่เจ้าของโพสต์เขียนไว้",
      "postCaption": "ถ้ามี caption แยกจาก postText",
      "images": [
        {
          "imageId": "island-visitor-etiquette-01",
          "order": 1,
          "sourceImageUrl": "URL ภาพจาก Facebook ถ้ามี",
          "localPath": "/absolute/path/to/image.jpg",
          "relativePath": "curated_post_images/island-visitor-etiquette/island-visitor-etiquette-01.jpg",
          "downloadStatus": "downloaded | blocked",
          "captionFromPost": "คำอธิบายรูปจากโพสต์ ถ้ามี",
          "alt": "ภาพประกอบโพสต์: มารยาทสำคัญบนเกาะผู้อื่น",
          "notes": "บันทึกสั้น ๆ เช่น รูปนี้เป็นภาพเปิดโพสต์ หรือ รูปที่ 2 ใน gallery"
        }
      ],
      "notes": [
        "มีรูป 1 รูป ดาวน์โหลดสำเร็จ",
        "ข้อความโพสต์อยู่ใน postText แล้ว"
      ]
    }
  ],
  "summary": {
    "requestedGuides": 15,
    "downloadedGuides": 0,
    "partialGuides": 0,
    "blockedGuides": 0,
    "downloadedImages": 0,
    "blockedImages": 0
  }
}

ข้อควรระวัง:
- ห้ามใส่ OCR text ถ้าไม่ได้ถูกขอ
- ห้ามใส่ ocrSummary/contentFindings แบบวิเคราะห์ภาพ
- ห้ามตัดสินว่า "รูปไม่มีประโยชน์" แล้วไม่เซฟ ถ้าเป็นรูปประกอบโพสต์ที่อยู่ใน priority list ให้เซฟก่อน
- ถ้าภาพเป็น meme/ภาพประกอบอารมณ์ของโพสต์ ก็ยังควรเก็บ เพราะเว็บต้องการมีภาพประกอบ ไม่ใช่เฉพาะภาพข้อมูล
- หลีกเลี่ยงการเก็บรูปจากคอมเมนต์ของสมาชิกทั่วไป เว้นแต่เป็นรูปที่เจ้าของโพสต์แนบในโพสต์หลัก
- หากมีข้อมูลส่วนตัว หน้าคน หรือรูปจากสมาชิก ให้บันทึก notes ว่า needs_permission_review
- ห้ามนำรูปไปแก้ไข ดัดแปลง หรือ crop เองในรอบนี้
- หาก source image URL หมดอายุ ให้บันทึกว่า blocked พร้อมเหตุผล ไม่ต้องเดา

เมื่อทำเสร็จ ให้ตอบกลับ:
1. path ของ acnh_curated_post_images.json
2. path ของโฟลเดอร์ curated_post_images
3. จำนวนโพสต์ที่โหลดรูปสำเร็จ/partial/blocked
4. จำนวนรูปที่เซฟสำเร็จ
5. รายการ guideId ที่ยังต้องกลับไปเปิดใหม่หรือรอ permission
```

## หมายเหตุจากการตรวจไฟล์เดิม

ไฟล์ `acnh_curated_image_assets.json` ที่มีอยู่ล่าสุดมีประโยชน์บางส่วน เพราะมี `sourceImageUrl` และ `localPath` ของบางรูปแล้ว แต่ schema เดิมพาไปทาง OCR/วิเคราะห์ภาพมากเกินไป เช่น:

- `ocrText`
- `ocrSummary`
- `contentFindings`
- `role` แบบตีความภาพ
- `shouldDisplay=false` สำหรับภาพประกอบ

งานรอบใหม่ควรใช้ไฟล์นั้นเป็น reference ได้ แต่ควรสร้างไฟล์ใหม่ `acnh_curated_post_images.json` ที่เน้น asset inventory และข้อความโพสต์ต้นทางแทน
