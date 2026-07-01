# 📋 Book Plan Template

## Target Reader
(Pick one from Reader Persona: Beginner / Junior Dev / Intermediate / System Designer / Maintainer)

**Persona:** 
**Prerequisites:** (สิ่งที่ต้องรู้ก่อนอ่านทั้งเล่ม)

---

## Chapter Order (Learning Structure — NOT repo structure)

```
บท 1: <ชื่อ> — <แนวคิดที่สอน>
  ├── 1.1 <หัวข้อ>
  ├── 1.2 <หัวข้อ>
  └── 1.3 <หัวข้อ>

บท 2: <ชื่อ> — <แนวคิดที่สอน>
  ├── 2.1 <หัวข้อ> (ต้องรู้บท 1 ก่อน)
  ├── 2.2 <หัวข้อ>
  └── 2.3 <หัวข้อ>

บท 3: ...
```

## Concept Dependency Graph

```
(แนวคิด A) → (แนวคิด B) → (แนวคิด C)
     │                          │
     └──→ (แนวคิด D) ←──────────┘

แปลว่า: ต้องรู้ A ก่อน B และ C, ต้องรู้ A+C ก่อน D
```

**เรียงลำดับการสอน:** A → B → C → D

---

## Repeated Terms → Glossary Candidates

| คำศัพท์ | ปรากฏในบท | อธิบายใน glossary |
|---------|----------|------------------|
| ... | บท 1, 3 | ✅ |
| ... | บท 2 | ✅ |

---

## Project Walkthrough Path

เส้นทางพาผู้เรียนลงมือทำ:
```
1. Clone repo → ติดตั้ง dependencies → รันครั้งแรก
2. บท 1: อ่าน entrypoint → เข้าใจภาพรวม
3. บท 2: แกะ core module ทีละไฟล์
4. บท 3: ทดลองแก้โค้ด + รัน test
5. บท 4: สร้าง mini version
```

---

## Final Learning Outcome

หลังอ่านจบทั้งเล่ม ผู้เรียนสามารถ:
1. (outcome ที่ 1 — วัดได้)
2. (outcome ที่ 2 — วัดได้)
3. (outcome ที่ 3 — วัดได้)

---

## Output Files Plan

```
□ book-plan.md          ← ไฟล์นี้
□ chapter-01-*.md       ← บทที่ 1
□ chapter-02-*.md       ← บทที่ 2
□ ...                   ← บทอื่นๆ
□ glossary.md           ← รวบรวมจากบททั้งหมด
□ patterns.md           ← patterns ที่พบ
□ cheatsheet.md         ← สรุปเร็ว
□ source-map.md         ← แนวคิด↔ไฟล์↔บท
```
