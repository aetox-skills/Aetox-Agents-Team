# Pass Levels Reference

> อ่านเมื่อต้องตัดสินใจว่า repo นี้ควรทำ output ระดับไหน

---

## Pass Levels

| Level | Worthiness | Sections | ใช้เมื่อ |
|-------|-----------|----------|---------|
| **Quick Note** | 30-49 | 1-3 | repo เล็ก, preview |
| **Standard Lesson** | 50-69 | 5-8 | concept/module เดียว |
| **Full Textbook** | ≥ 70 | 10-15 | repo ใหญ่, foundation |

### Artifact Budget (ไฟล์สูงสุดต่อ pass)

| Pass Level | สูงสุด | ถ้าเกิน |
|-----------|--------|--------|
| **Quick Note** | 1 ไฟล์ | ถ้าจะเกิน → ทำไมต้องเกิน? หรือตัดสินใจผิดตั้งแต่ intake? |
| **Standard Lesson** | 3-5 ไฟล์ (บท + glossary + patterns) | ถ้าจะเกิน → split เป็นหลาย pass |
| **Full Textbook** | 8-10 ไฟล์ (book-plan + บท + glossary + patterns + cheatsheet + source-map) | ถ้าจะเกิน → ระบุ trigger + evidence ก่อนสร้างเพิ่ม |

**Promotion Gate (ข้าม Pass Level):**
- Name the trigger: "พบ 3+ modules ที่เกี่ยวเนื่องกัน"
- Cite evidence: user request หรือ inspected complexity
- State risk of staying smaller: "ถ้าไม่ทำ Full — missing cross-module patterns"

**หากไม่แน่ใจ:** อยู่ใน pass ที่ต่ำกว่า, inspect แคบๆ ก่อน, ไม่ promote เพียงเพราะ "อาจจะต้อง"

---

## Per-Pass Rule Activation

> ⚠️ **นี่คือขั้นต่ำ (floor) ไม่ใช่เพดาน (ceiling)** — ตารางนี้บอกว่าอย่างน้อยต้องทำอะไรบ้างในแต่ละ pass level ทำเกินได้เสมอถ้าหลักฐานพร้อม
>
> ตารางนี้มีไว้เพื่อ: (1) ป้องกันการทำเกินตัวใน repo ที่ไม่ควรทำตำรา (2) ให้โครงสร้างกับ repo ทุกระดับความซับซ้อน

| Element | Quick Note | Standard Lesson | Full Textbook |
|---------|-----------|----------------|---------------|
| **Operating Rules** | ≥ 2, 3, 7, 11, 15 | ≥ 1, 2, 3, 4, 5, 7, 8, 11, 12, 14, 15 | ครบ 15 ข้อ |
| **Knowledge Layers** | 1-4 (Overview→Code Walkthrough) | 1-6 (+ Evidence + Design Reason) | 1-8 (ครบทุกชั้น) |
| **Evidence Labels** | `[✓]` ≥ 3, `[→]` OK | `[✓]` ≥ 7, `[M]`/`[W]` OK | `[✓]` ≥ 10, ห้าม `[!]` ในข้อความสำคัญ |
| **Architecture Comparison** | ❌ ไม่ต้อง | 1-2 ตาราง (เฉพาะที่มีทางเลือกจริง) | 1-5 ตาราง (ครอบคลุมทุก component ที่มีทางเลือก) |
| **Deep Terminology** | optional | ≥ 2 core terms | ≥ 5 core terms |
| **Self-Score** | Quick Self-Check เท่านั้น | Rubric /100 | Rubric /100 + Evidence Audit |
| **Glossary** | ❌ ไม่ต้อง | ✅ recommended | ✅ required |
| **Cheatsheet** | ❌ ไม่ต้อง | ❌ optional | ✅ recommended |
| **Book Plan** | ❌ ห้าม | mini-plan ในบท | `book-plan.md` เต็ม |

### วิธีใช้ตารางนี้

```
ก่อนเริ่มเขียนบท:
1. ประเมิน Textbook Worthiness → รู้ว่า repo นี้ควรเป็น pass ไหน
2. ดูตาราง → ทำตามขั้นต่ำของ pass นั้น (ทำเกินได้เสมอ)
3. ถ้าจะ promote → ต้องผ่าน Promotion Gate ก่อน
4. ถ้า Worthiness < 30 → Skip (compact note เท่านั้น)
```

---

## Evidence Count per Pass Level

| Pass Level | Minimum `[✓]` | Rule |
|-----------|-------------|------|
| Quick Note | ≥ 3 | ทุก critical claim ต้องมี |
| Standard | ≥ 7 | — |
| Full Textbook | ≥ 10 | อย่ายัด `[✓]` เพื่อผ่าน — quantity ≠ quality |

---

## Output Files (แยกตาม Pass Level)

### Quick Note (Worthiness 30-49)
```
□ quick-note.md              # required
□ book-plan.md               # ❌ ห้าม — เว้นแต่ promoted
□ chapter-*.md                # ❌ ห้าม
```

### Standard Lesson (Worthiness 50-69)
```
□ mini-plan section (ในบท)    # required — แผนสั้นแทน book-plan เต็ม
□ chapter-*.md               # required — 1-5 บท
□ glossary.md                 # recommended
□ patterns.md                 # optional
```

### Full Textbook (Worthiness ≥ 70)
```
□ book-plan.md                # required
□ chapter-*.md                # required
□ glossary.md                 # recommended
□ patterns.md                 # recommended
□ anti-patterns.md            # optional
□ cheatsheet.md               # optional
□ source-map.md               # recommended
□ capstone-project.md         # optional
□ index.md                    # required — หน้าประตูเข้าหนังสือ
```
