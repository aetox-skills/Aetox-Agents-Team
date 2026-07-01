# Pedagogy Reference

> อ่านเมื่อวางแผนการสอน — Knowledge Density, Architecture Comparison, Deep Terminology, Reader Persona, Book Planning, Dependency Graph, Glossary outputs

---

## Knowledge Density Rule (8 ชั้น — tiered by pass level)

ทุกหัวข้อสำคัญในแต่ละบทต้องมีความรู้ตามชั้นที่กำหนด โดยจำนวนชั้นขึ้นอยู่กับ Pass Level:

| ชั้น | ชื่อ | คำถามที่ตอบ | ถ้าขาด = อะไร |
|------|------|-----------|-------------|
| **1** | Overview | ภาพรวมคืออะไร? ทำไมต้องสนใจ? | อ่านแล้วไม่รู้จะเรียนไปทำไม |
| **2** | Concept | แนวคิดคืออะไร? | อ่านไม่รู้เรื่อง |
| **3** | Mechanism | มันทำงานอย่างไร? | รู้แต่ชื่อ ไม่รู้หลักการ |
| **4** | Code Walkthrough | ในโค้ดจริงอยู่ตรงไหน? เดินผ่านทีละขั้น | เหมือนอ่าน textbook ทั่วไป — ไม่เห็นของจริง |
| **5** | Source Evidence | repo ใช้ตรงไหน? `[✓]` | ไม่รู้ว่า repo นี้ใช้จริงหรือแค่ทฤษฎี |
| **6** | Design Reason | ทำไมเขาเลือกแบบนี้? เทียบกับทางเลือกอื่น? | จำได้ แต่ประยุกต์ไม่เป็น |
| **7** | Transfer Skill | เอาไปใช้กับโปรเจกต์ตัวเองยังไง? | เรียนแล้วใช้ไม่เป็น |
| **8** | Common Pitfall | มือใหม่มักผิดอะไร? กับดักคืออะไร? | รู้แต่ทฤษฎี แต่ล้มตอนทำจริง |

### Tiered Density by Pass Level

| Pass Level | Required Layers | เหตุผล |
|-----------|----------------|--------|
| **Quick Note** (30-49) | 1-4 (Overview → Code Walkthrough) | แค่พอให้เห็นภาพ + code จริง |
| **Standard Lesson** (50-69) | 1-6 (Overview → Design Reason) | เพิ่ม evidence + เหตุผลการออกแบบ |
| **Full Textbook** (≥70) | 1-8 (ครบทุกชั้น) | ตำราเต็มรูปแบบ — สอนให้ใช้เป็น + รู้กับดัก |

### Density Check (ต่อบท)

```
สำหรับแต่ละหัวข้อ H ในบท:
  1. ตรวจ Pass Level ของโปรเจคนี้ → รู้ว่าต้องกี่ชั้น
  2. ตรวจว่าหัวข้อ H มีครบตาม Required Layers → ✅ / ⚠️ / ❌
  3. Full Textbook → random 3 หัวข้อ → ต้องครบ 8 ชั้น (1-8)
  4. Standard Lesson → random 3 หัวข้อ → ต้องครบ 6 ชั้น (1-6)
  5. Quick Note → random 3 หัวข้อ → ต้องครบ 4 ชั้น (1-4)
  6. หัวข้อไหนไม่ครบ → เพิ่มชั้นที่ขาด หรือทำเครื่องหมาย [→] ว่ายังไม่มีหลักฐาน
```

---

## Architecture Comparison Framework

ทุก component หลักของระบบ ต้องมีตารางเปรียบเทียบกับทางเลือก เพื่อให้ผู้อ่านเข้าใจ tradeoff และตัดสินใจเองได้:

| มิติ | วิธีที่ repo ใช้ | ทางเลือกอื่น | ทำไมเลือกวิธีนี้ | เมื่อไหร่ควร/ไม่ควรใช้ |
|------|----------------|-------------|----------------|-------------------|
| Performance | | | | |
| Complexity | | | | |
| Maintainability | | | | |
| Ecosystem fit | | | | |

### กฎการใช้

- **มีทางเลือกจริง** → เปรียบเทียบครบทุกมิติที่เกี่ยวข้อง
- **ไม่มีทางเลือกที่แท้จริง** → เขียน "N/A — industry standard" พร้อมอธิบายว่าทำไมไม่มี
- **แหล่งข้อมูล** → Design reason จาก repo `[✓]` ถ้ามี, เสริมด้วย `[M]` / `[W]` ได้
- **เทียบเฉพาะ components ที่มีทางเลือกจริง** — architecture chapter ปกติมี 1-5 ตารางตามความซับซ้อนของระบบ ห้ามสร้างตารางขึ้นมาเพื่อให้ถึง quota — ถ้าไม่มีทางเลือกที่แท้จริงให้เขียนว่า "N/A — การออกแบบนี้ไม่มีทางเลือกอื่นเพราะ..." แล้วอธิบายเหตุผล
- **นำไปใช้กับบทอื่นได้** — concept chapter, implementation chapter ก็ใช้ framework นี้ได้

### ตัวอย่าง

```markdown
| มิติ | วิธีที่ repo ใช้ | ทางเลือกอื่น | ทำไมเลือกวิธีนี้ | เมื่อไหร่ควร/ไม่ควรใช้ |
|------|----------------|-------------|----------------|-------------------|
| Performance | In-memory Map | Redis | ไม่ต้องพึ่ง external, latency 0ms [✓] จาก `core/session.ts → MapSessionStore` | ✅ single-process, prototype ❌ multi-server production |
| Complexity | ~50 LOC | ~500 LOC + Redis | Minimal สำหรับ use case นี้ [→] | ✅ PoC / CLI ❌ distributed |
| Maintainability | 0 dependency เพิ่ม | +1 Redis client | ลด surface area [M] | ✅ small team ❌ team with ops |
| Ecosystem fit | Node.js built-in | External cache | CLI-first philosophy [✓] จาก README | ✅ CLI ❌ web servers |
```

---

## Deep Terminology Protocol

เมื่อเจอคำศัพท์ technical ที่เป็น **core term** (ปรากฏ 3+ ครั้งใน repo หรืออยู่ใน `glossary_candidates` จาก book-plan) ต้องอธิบายด้วยโครงสร้าง 4 ชั้น:

```
[Term] (ครั้งแรกที่เจอ — [[บทที่ X]])
├── คำจำกัดความ — อธิบายเป็นภาษาไทยง่ายๆ 1-2 ประโยค
├── มันทำงานยังไง — กลไก, flow, diagram ถ้าจำเป็น
├── ทำไมถึงสำคัญ — impact ต่อระบบ, ถ้าไม่มีจะเป็นยังไง
└── ตัวอย่างใน repo [✓] — `path/to/file.ts → function() @ <sha>`
```

### กฎการใช้

- **Core terms เท่านั้น** — ไม่ใช่ทุกคำใน glossary ต้องมี 4 ชั้น
- **คำทั่วไปที่รู้กันอยู่แล้ว** (เช่น "API", "database", "HTTP") → 2 ชั้นพอ (คำจำกัดความ + ตัวอย่าง)
- **ถ้ายังไม่เห็นใน repo** → ใส่ `[!]` ในชั้นสุดท้าย — ห้ามเดา
- **Deep terms ต้องลิงก์จาก glossary** → glossary คือ index สั้น, deep term คือคำอธิบายเต็ม
- **Pass Level minimum:** Full Textbook → ≥ 5 core terms ต้องมี deep format; Standard → ≥ 2; Quick Note → optional

---

## Reader Persona (เลือกระดับก่อนเขียน)

| Persona | ระดับ | น้ำหนักการเขียน |
|---------|-------|---------------|
| **Beginner** | เพิ่งเริ่มเขียนโค้ด | เน้น concept + mechanism, อธิบายทุกอย่าง, มี example เยอะ |
| **Junior Dev** | เขียนโค้ดเป็น แต่ไม่รู้ architecture | เน้น mechanism + design reason, มี code walkthrough |
| **Intermediate** | รู้ architecture พื้นฐาน | เน้น design reason + tradeoff, มี comparison |
| **System Designer** | ออกแบบระบบเป็น | เน้น transfer + boundary + extension |
| **Maintainer** | จะ contribute repo นี้ | เน้น source evidence + code walkthrough + test |

**Rule:** 1 บท = 1 Persona — ถ้าจะเขียนให้หลายระดับ → แยกบท

---

## Book-Level Planning (ต้องทำก่อนเริ่มเขียนบท)

ก่อนเขียนบทแรกของโปรเจคใดๆ ต้องสร้างไฟล์ `book-plan.md`:

```
book-plan.md
├── target_reader         # Reader Persona
├── prerequisite_map      # ต้องรู้อะไรก่อนอ่านเล่มนี้
├── chapter_order         # ลำดับบท — เรียงตาม learning structure
├── concept_dependency    # Concept Dependency Graph — อะไรต้องรู้ก่อนอะไร
├── repeated_terms        # คำศัพท์ที่ปรากฏซ้ำ → glossary candidates
├── glossary_candidates   # คำที่จะอธิบายใน glossary
├── project_walkthrough   # เส้นทางพาผู้เรียนลงมือทำ
├── final_learning_outcome # หลังอ่านจบทั้งเล่ม ทำอะไรได้
└── output_files          # files ที่จะสร้าง (บท, glossary, patterns, cheatsheet)
```

### Book-Level Planning Rules
- **ต้องทำก่อนเขียนบทแรก** — ไม่ใช่เขียนเสร็จแล้วค่อยมาวางแผน
- **chapter_order ≠ repo structure** — เรียงตามการเรียนรู้ ไม่ใช่ตามโฟลเดอร์
- **target_reader ต้องเลือกจาก Reader Persona** — ห้ามใช้ "ทั่วไป"
- **final_learning_outcome ต้องวัดได้** — ไม่ใช่ "เข้าใจระบบ" แต่ "สร้าง X ได้"

### Early Exit + Textbook Worthiness

ก่อนเริ่มทำ book-plan ให้ประเมินว่า repo นี้ควรทำตำราไหม โดยใช้ **Textbook Worthiness Score**:

```
Textbook Worthiness /100
- Architecture depth: 30 — มี design patterns, novel approach, tradeoffs
- Learning value: 25 — สอนอะไรที่เป็นประโยชน์กับคนอื่น
- Source availability: 20 — อ่าน 7 ขั้น pipeline ได้ครบแค่ไหน
- Practical transfer: 15 — เอาไปใช้กับโปรเจกต์อื่นได้
- Community / maturity: 10 — stars, releases, active maintenance

≥ 70 → Full Textbook
≥ 50 → Standard Lesson
≥ 30 → Quick Note
< 30 → Skip (compact note เท่านั้น)
```

> Stars เป็นแค่ส่วนหนึ่งของ Community/maturity (10 คะแนน) — ไม่ใช่ตัวตัดสินหลัก

---

## Concept Dependency Graph (โครงตำรา ≠ โครง repo)

**กฎเหล็ก:** AI ต้องแปลงจาก repo structure → learning structure

```
Repo Structure (โครงระบบ):          Learning Structure (โครงตำรา):
├── packages/                        ├── บท 1: แนวคิดพื้นฐาน
│   ├── core/                        ├── บท 2: ระบบทำงานอย่างไร
│   ├── api/                         │   ├── 2.1 ส่วนที่ต้องรู้ก่อน
│   └── plugins/                     │   ├── 2.2 ส่วนที่ต่อจาก 2.1
│                                    │   └── 2.3 ส่วนที่ใช้ 2.1+2.2
                                     ├── บท 3: ลงมือสร้าง
                                     └── บท 4: วิเคราะห์เปรียบเทียบ
```

### วิธีการสร้าง Dependency Graph

```
1. ลิสต์ทุกแนวคิดสำคัญจาก repo
2. สำหรับแต่ละแนวคิด A → ถาม: "ต้องรู้ B ก่อนถึงจะเข้าใจ A ไหม?"
3. ถ้าใช่ → B ต้องมาก่อน A ใน chapter_order
4. วาดเป็นกราฟ:
   CLI Entry → Config → Session → Provider → Tool → Agent → Plugin
5. จัดกลุ่มเป็นบท: แต่ละบท = กลุ่มแนวคิดที่ depend กัน
6. เรียงบทตาม dependency: สิ่งที่ไม่มี prerequisite → ก่อน
```

### Validation

```
□ ทุกบท i: concept ในบท i ไม่ depend on concept ในบท i+1 (หรือหลังกว่า)
□ บทแรกสอนสิ่งที่ไม่มี prerequisite
□ บทสุดท้ายใช้ทุกอย่างที่เรียนมา
□ กราฟไม่มี cycle (A→B→A)
```

---

## Glossary / Pattern / Cheatsheet Outputs

นอกจากบทเรียน ต้องสร้างไฟล์เสริม:

### `glossary.md`
```
ทุก chapter → เก็บคำศัพท์ที่ปรากฏครั้งแรก + อธิบายแบบคนไทยเข้าใจ
ใช้ Standard format สำหรับคำทั่วไป, Deep format สำหรับ core terms
```

### `patterns.md`
```
รวบรวม design patterns / architecture techniques จาก repo

รูปแบบ:
### <ชื่อ Pattern>
- **คืออะไร:** (1-2 บรรทัด)
- **ใช้ที่ไหนใน repo:** `path/to/file` → `function()`
- **ทำไมถึงใช้:** (เหตุผล)
- **เมื่อไหร่ควรใช้เอง:** (transfer)
- **บทที่สอน:** [[บทที่ X]]
```

### `anti-patterns.md`
```
สิ่งที่ repo หลีกเลี่ยง หรือจุดที่ไม่ควรทำตาม

รูปแบบ:
### <ชื่อ Anti-Pattern>
- **คืออะไร:** (1-2 บรรทัด)
- **พบที่ไหน:** (ถ้ามี)
- **ทำไมไม่ควรทำ:** (เหตุผล)
- **ควรทำอะไรแทน:**
```

### `cheatsheet.md`
```
ตารางตัดสินใจ / สรุปเร็ว — สำหรับคนอ่านจบแล้วกลับมาทบทวน

รูปแบบ:
| สถานการณ์ | ใช้แนวคิดอะไร | ดูบท |
|-----------|-------------|------|
| อยากทำ X | ใช้ Y | [[บทที่ Z]] |
```

### `source-map.md`
```
แนวคิด ↔ ไฟล์จริง ↔ บทที่เกี่ยวข้อง

รูปแบบ:
| แนวคิด | ไฟล์ใน repo | บทที่สอน | ชั้น Knowledge |
|--------|-----------|---------|---------------|
| Session | packages/core/session/ | บท 3 | 1-5 |
```
