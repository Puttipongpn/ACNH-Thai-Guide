# Image OCR Handoff Prompt

> Deprecated: prompt นี้เน้น OCR/วิเคราะห์ข้อความในภาพมากเกินไปสำหรับเป้าหมายปัจจุบัน
>
> ถ้าต้องการ “เซฟภาพประกอบของโพสต์พร้อมข้อความ/คำอธิบายจากโพสต์” ให้ใช้ไฟล์ใหม่:
> `docs/image-asset-collection-handoff-prompt.md`

ใช้ prompt นี้เฉพาะกรณีที่ต้องการ OCR/ตีความข้อมูลในรูปภาพจริง ๆ เท่านั้น

```text
โปรเจกต์ปลายทางคือเว็บไซต์ ACNH Thai Guide Index สำหรับกลุ่ม Animal Crossing: New Horizons ภาษาไทย

ตอนนี้มีการคัดข้อมูลดิบแล้วใน repository:
- docs/content-curation-plan.md
- src/data/curatedContent.ts

ข้อมูลดิบที่เคย extract:
- acnh_group_content.json
- acnh_raw_extraction.json
- acnh_group_content_organized.md
- acnh_source_inventory.md
- acnh_extraction_progress.md

สถานะปัจจุบัน:
- อ่านข้อความจากโพสต์แล้ว 258 โพสต์
- พบ photo links 710 รูป
- รูปทั้งหมดยังเป็น imageStatus: ocr_pending / needs_review
- ไม่ต้อง OCR ทั้งหมดในรอบแรก

เป้าหมายรอบนี้:
ให้ทำงานเฉพาะรูปภาพของรายการ curated ที่เป็น status = "core" และ priority 1-2 ก่อน โดยเฉพาะรายการที่ includeOnHome = true

ลำดับความสำคัญ:
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
11. island-transfer-overview
12. amiibo-mini-guide

งานที่ต้องทำต่อโพสต์:
1. เปิด sourceUrl ของโพสต์
2. ตรวจว่ามีรูปกี่รูปจริง
3. ดาวน์โหลดหรือบันทึก reference รูปที่ใช้ได้
4. OCR ข้อความในรูป
5. แยกข้อความในรูปเป็นหัวข้อ ไม่ใช่ dump ยาว
6. ตรวจว่าข้อความ OCR สอดคล้องกับข้อความโพสต์หรือมีข้อมูลเพิ่ม
7. สร้าง alt text ภาษาไทยสำหรับแต่ละรูป
8. ระบุ imageRole:
   - cover
   - infographic
   - step-by-step
   - table
   - gallery
   - decorative
9. ระบุว่ารูปไหนควรแสดงบนเว็บ และรูปไหนควรเก็บเป็น reference เท่านั้น

Output ที่ต้องการ:
สร้างไฟล์ JSON ใหม่ชื่อ acnh_curated_image_assets.json โดยมี structure ประมาณนี้:

{
  "updatedAt": "ISO date",
  "source": "Facebook Group extraction + OCR review",
  "items": [
    {
      "guideId": "island-visitor-etiquette",
      "sourcePostId": "1724406801313551",
      "sourceUrl": "...",
      "imageReviewStatus": "reviewed | partial | blocked",
      "images": [
        {
          "imageId": "island-visitor-etiquette-01",
          "sourceImageUrl": "...",
          "localPath": "ถ้ามีไฟล์",
          "role": "cover | infographic | step-by-step | table | gallery | decorative",
          "shouldDisplay": true,
          "alt": "คำอธิบายภาพภาษาไทย",
          "caption": "caption สั้นสำหรับเว็บ",
          "ocrText": "ข้อความที่ OCR ได้",
          "ocrSummary": "สรุปข้อความในรูปแบบอ่านง่าย",
          "confidence": "high | medium | low",
          "needsHumanReview": true
        }
      ],
      "contentFindings": [
        "ข้อมูลสำคัญที่พบในรูปแต่ไม่มีในข้อความโพสต์",
        "จุดที่ OCR ไม่แน่ใจ",
        "ข้อเสนอว่าควรทำเป็น card/table/checklist หรือไม่"
      ]
    }
  ]
}

ข้อควรระวัง:
- ไม่ต้องดึงรูปจากทุกโพสต์ ให้ทำเฉพาะ priority list ก่อน
- หลีกเลี่ยงการนำคอมเมนต์/ข้อมูลส่วนตัวของสมาชิกมาใส่เว็บ
- ถ้ารูปมีข้อมูลจากสมาชิกหรือภาพส่วนตัว ให้ mark shouldDisplay=false จนกว่าแอดมินยืนยันสิทธิ์
- ถ้าข้อมูลในรูปเป็นตารางหรือ infographic ให้สรุปเป็น structured data ที่เว็บใช้ได้ ไม่ใช่แค่ OCR text
- ถ้าเจอข้อมูลที่ conflict กับข้อความโพสต์ ให้บันทึกใน contentFindings
- ถ้าเปิดรูปไม่ได้ ให้ mark imageReviewStatus="blocked" และบอกเหตุผล

เมื่อเสร็จ ให้ส่งกลับ:
1. acnh_curated_image_assets.json
2. สรุปจำนวนรูปที่ reviewed/partial/blocked
3. รายการ guideId ที่พร้อมนำเข้าเว็บ
4. รายการ guideId ที่ยังต้องให้คนตรวจ
```

## เหตุผลที่ควรทำรอบนี้ก่อน redesign

เว็บรอบต่อไปควรออกแบบโดยรู้ก่อนว่าแต่ละ guide มีภาพแบบไหน:

- ถ้ารูปส่วนใหญ่เป็น infographic ควรมี gallery + OCR summary
- ถ้ารูปเป็น step-by-step ควรทำ layout แบบ timeline
- ถ้ารูปเป็นตาราง ควรแปลงเป็น structured cards/table แบบอ่านบนมือถือ
- ถ้ารูปเป็น decorative หรือ screenshot ธรรมดา ไม่ควรทำให้หน้า article หนัก

ดังนั้น OCR/review เฉพาะ core guides จะช่วยให้ redesign แม่นขึ้นมาก
