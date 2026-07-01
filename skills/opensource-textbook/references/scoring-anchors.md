# Scoring Anchors

> "อย่าให้ AI ให้คะแนนแบบ '25/25 เพราะฉันคิดว่าฉันเขียนถูก' — ทุกระดับคะแนนต้องมี anchor ที่วัดได้"

ใช้คู่กับ [`checklists/evaluation-rubric.md`](../checklists/evaluation-rubric.md)

---

## Accuracy (25)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **5** | Stars, language, license ตรงกับ GitHub API | `curl https://api.github.com/repos/{owner}/{repo}` |
| **10** | + Architecture diagram ทุก component มีใน repo จริง | grep component name ใน source tree |
| **15** | + Code examples ใช้ API/functions ที่มีอยู่จริง | grep function name ใน repo |
| **20** | + ไม่มี component/func ที่แต่งขึ้น (hallucination) | ทุกชื่อในบท → ต้อง grep เจอ |
| **25** | + Version, branch, commit SHA ตรงกับที่ inspect จริง | `git log -1` หรือ GitHub API |

---

## Evidence Traceability (20)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **5** | `[✓]` ≥ pass level minimum (Quick:3, Standard:7, Full:10) | `grep -c '\[✓\]' chapter.md` |
| **10** | + Architecture diagram ทุก component มี citation | ตรวจทุก node ใน diagram → มี `[✓]` กำกับ |
| **15** | + Claims สำคัญทั้งหมดมี `[✓]` หรือ `[→]` | random 5 claims → ตรวจ source |
| **20** | + ไม่มี `[!]` ในข้อความสำคัญ + `[→]` ทุกอันมีเหตุผลอธิบาย | grep `[!]` → ตรวจว่าเป็น minor detail |

---

## Teaching Flow (15)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **5** | มี structure: intro → body → conclusion | อ่านเฉพาะ headers → เห็น flow ไหม? |
| **10** | + แต่ละ section มี "ทำไม" ประกอบ "อะไร" | grep "เพราะ", "เนื่องจาก", "[→]" |
| **15** | + อ่านทั้งบทตั้งแต่ต้นจนจบ — รู้สึกเหมือนมีคนสอน ไม่ใช่ข้อมูลกอง | blind read test |

---

## Knowledge Density (15)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **5** | Random 3 หัวข้อ → ครบชั้นตาม Pass Level | Quick:1-4, Standard:1-6, Full:1-8 |
| **10** | + Code Walkthrough (ชั้น 4) มีตัวอย่างโค้ดจริง | grep code block + grep `[✓]` |
| **13** | + Common Pitfall (ชั้น 8) ≥ 2 จุด (Full Textbook) | grep "มือใหม่มัก", grep "กับดัก" |
| **15** | + Transfer Skill (ชั้น 7) บอกได้ชัดเจนว่า "เอาไปใช้กับโปรเจกต์อื่นยังไง" | grep "โปรเจกต์", grep "ประยุกต์" |

---

## Practical Transfer (10)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **4** | บอกได้ว่าเอาไปใช้กับโปรเจกต์ตัวเองยังไง | มี section "ถ้าจะทดลองเอง" |
| **7** | + มีตัวอย่างการใช้งานจริง (ไม่ใช่ hypothetical) | ตัวอย่างอิง repo จริง `[✓]` |
| **10** | + มี mini-implementation หรือ step-by-step guide | มีโค้ดที่รันได้จริง |

---

## Exercise Quality (10)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **2** | 3-5 ข้อ ครบระดับ ⭐ ⭐⭐ ⭐⭐⭐ | นับจำนวนข้อ + ระดับ |
| **5** | + มีเฉลยทุกข้อ | grep `<details>` หรือ "เฉลย" |
| **7** | + เฉลยอธิบาย "ทำไม" ไม่ใช่แค่ "คำตอบคือ..." | เฉลยมี ≥ 3 บรรทัด |
| **10** | + ข้อ Challenge (⭐⭐⭐⭐) เชื่อมกับ transfer skill | ข้อสุดท้าย → ใช้กับโปรเจกต์จริงได้ |

---

## Thai Readability (5)

| คะแนน | Anchor | ตรวจยังไง |
|--------|--------|----------|
| **2** | ภาษาไทยธรรมชาติ — อ่านแล้วไม่รู้สึกว่าแปลมา | blind read test |
| **3** | + คำทับศัพท์มีคำไทยกำกันครั้งแรก + ประโยคสั้น | grep ทับศัพท์ → มีวงเล็บไทย? |
| **5** | + มีอุปมา (analogy) ≥ 1 จุด + ไม่มีประโยค > 2 บรรทัด | grep "เหมือน", grep "คล้าย" |

---

## Second-Pass Review Protocol

เพื่อลด bias จากการที่ AI เป็นทั้งผู้เขียนและผู้ตรวจ — ใช้ protocol นี้:

### Option A: Self-Review with Forced Evidence

```
1. AI เขียนบท → self-score (pass 1)
2. AI ตรวจใหม่ใน session ใหม่ (fresh context) → score อีกครั้ง (pass 2)
3. เทียบคะแนน pass 1 vs pass 2:
   - ต่าง ≤ 5 → ok
   - ต่าง 6-10 → review ส่วนที่ต่าง
   - ต่าง > 10 → suspect hallucination → re-inspect repo
```

### Option B: Blind Section Audit

```
1. AI เขียนบท → อย่าเพิ่ง self-score
2. สุ่ม 3 sections → AI ตรวจโดยไม่เห็น score ของตัวเอง
3. สำหรับแต่ละ section → ตรวจ:
   □ มี [✓] ≥ 2 จุด
   □ claims ทั้งหมดมี source
   □ อ่านแล้วเข้าใจภายใน 60 วิ
4. ถ้าผ่าน ≥ 2/3 sections → self-score ปกติ
5. ถ้าไม่ผ่าน → revise sections ที่ไม่ผ่านก่อน
```

### Option C: External Review (recommended for publish)

```
1. AI เขียนบท → self-score
2. ส่งให้ AI อีกตัว (different model/provider) review
3. Reviewer ตรวจ:
   □ Evidence accuracy — random 5 claims → grep repo
   □ Teaching clarity — blind read
   □ Citation validity — random 5 citations → verify path exists
4. Reviewer ให้คะแนนอิสระ
5. Final score = min(self_score, reviewer_score)
```

### เมื่อไหร่ควรใช้แต่ละ Option

| Option | ใช้เมื่อ |
|--------|--------|
| **A** | Standard Lesson — เร็ว, ลด bias บางส่วน |
| **B** | Full Textbook — เพิ่มความน่าเชื่อถือ |
| **C** | จะ publish/public — จำเป็นก่อนเผยแพร่ |
