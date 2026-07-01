# Repo-to-Textbook Skill (v7)

> สกิลสำหรับแปลง Open Source repository → ตำราเรียนภาษาไทย

## ใช้ทำอะไร

ให้ AI (OpenCode, Claude Code, Codex) อ่าน Open Source repository แล้วเขียนเป็นบทเรียนภาษาไทย — จากไม่รู้ → เข้าใจ → วิเคราะห์ได้ → ลงมือทำได้

## เหมาะกับใคร

- คนที่อยากเรียนสถาปัตยกรรมจาก Open Source จริง
- คนที่อยากให้ AI สอนแทนการสรุปเฉยๆ
- นักพัฒนาไทยที่อยากอ่านตำราภาษาไทย

## วิธีการติดตั้ง

```bash
# ใน OpenCode
/skills add aetox-skills/opensource-textbook
```

หรือเพิ่มใน `opencode.json`:

```json
{
  "skills": [
    "https://github.com/aetox-skills/opensource-textbook"
  ]
}
```

หรือวางในโฟลเดอร์ skills โดยตรง:

```
.opencode/skills/opensource-textbook/SKILL.md
.claude/skills/opensource-textbook/SKILL.md
.agents/skills/opensource-textbook/SKILL.md
```

## แนะนำโมเดลที่ควรใช้

| Pass Level | โมเดลขั้นต่ำ | แนะนำ |
|-----------|-------------|-------|
| **Quick Note** | GPT-4o, Claude 3.5 Sonnet, DeepSeek V3 | — |
| **Standard Lesson** | Claude 3.5 Sonnet, DeepSeek R1/V4 | GPT-4o ขึ้นไป |
| **Full Textbook** | Claude Opus 4+, GPT-5+, DeepSeek V4 Pro | Opus 4.5+ หรือ GPT 5.5 Pro |

> 💡 Skill นี้ถูกออกแบบให้ **Full Textbook** ต้องใช้โมเดลที่ reasoning แข็งพอจะทำ 15 rules + 8 layers + comparison + deep terminology ได้ใน pass เดียว — ถ้าใช้โมเดลต่ำกว่านี้ อาจต้อง split เป็นหลาย pass

## ตัวอย่าง Prompt

```
ใช้ opensource-textbook skill
ทำ Architecture Chapter จาก https://github.com/anomalyco/opencode
ภาษาไทย, Full Textbook
```

## โครงสร้าง Repo

```
opensource-textbook/
├── SKILL.md              ← contract สำหรับ AI (15 rules, 8-layer density, comparison framework, deep terminology)
├── README.md             ← คู่มือมนุษย์ (ไฟล์นี้)
├── templates/            ← 11 templates บทเรียน (concept, architecture, code-reading, implementation, comparison, exercise, book-plan, index, glossary, source-map, capstone)
└── checklists/           ← 4 checklists (repo-inspection, evidence-check, textbook-quality, evaluation-rubric)
```

## Current Files

- `SKILL.md` — 15 Operating Rules, Knowledge Sources, Book-Level Planning, 8-Level Knowledge Density (tiered), Architecture Comparison Framework, Deep Terminology Protocol, Rubric, Report
- `templates/book-plan.md` — แผนทั้งเล่ม
- `templates/index.md` — หน้าประตูเข้าหนังสือ
- `templates/concept-chapter.md` — สอนแนวคิด
- `templates/architecture-chapter.md` — สอนภาพรวมระบบ + Architecture Comparison tables
- `templates/code-reading-chapter.md` — พาอ่านไฟล์จริง (🆕 Code Walkthrough layer)
- `templates/implementation-chapter.md` — สร้าง mini version
- `templates/comparison-chapter.md` — เทียบ design choice
- `templates/exercise-chapter.md` — แบบฝึกหัด
- `templates/glossary.md` — คำศัพท์ (Standard + Deep format)
- `templates/source-map.md` — แนวคิด↔ไฟล์↔บท
- `templates/capstone-project.md` — โปรเจคจบเล่ม
- `checklists/repo-inspection.md` — 7 ขั้น Code Reading Pipeline
- `checklists/evidence-check.md` — Evidence audit
- `checklists/textbook-quality.md` — 9 ส่วน Teaching Format
- `checklists/evaluation-rubric.md` — Scoring /100

## ความสามารถหลัก

| ความสามารถ | รายละเอียด |
|-----------|-----------|
| **15 Operating Rules** | ห้ามเขียนก่อนตรวจสอบ, ห้ามเดา, แยก evidence, สอนอย่าบอก |
| **6 Evidence Labels** | `[✓][→][?][!][M][W]` — แยก repo/model/web |
| **Knowledge Sources** | Repo, Model Knowledge, Web — architecture=repo only |
| **Code Reading Pipeline** | 7 ขั้น — ห้ามข้าม, ห้ามเขียน arch จาก README |
| **Book-Level Planning** | `book-plan.md` — target reader, chapter order, dependency graph |
| **8-Level Knowledge Density** | Overview→Concept→Mechanism→Code Walkthrough→Evidence→Design Reason→Transfer→Pitfall — tiered by pass level |
| **Architecture Comparison Framework** | ทุก component หลักเทียบกับทางเลือก — Performance/Complexity/Maintainability/Ecosystem fit |
| **Deep Terminology Protocol** | core terms 4 ชั้น: คำจำกัดความ→กลไก→ความสำคัญ→ตัวอย่าง `[✓]` |
| **7 Chapter Types** | Concept, Architecture, Code Reading, Implementation, Comparison, Exercise, Book Planning |
| **Pass Levels** | Quick Note / Standard / Full + Artifact Budget |
| **Evaluation Rubric** | /100 — < 85 revise |
| **Textbook Worthiness** | Score /100 — ไม่ใช้ stars อย่างเดียว |
| **Source Snapshot** | Commit SHA, branch, date — ทุกบทต้อง pin |
| **Citation Format** | `path/file.ts#L10-L45 @ <sha>` |

## ข้อจำกัด

- Architecture claims ต้องมี `[✓]` จาก repo เท่านั้น
- ต้องให้ AI อ่าน repo จริงก่อน (ผ่าน Code Reading Pipeline 7 ขั้น)
- ภาษาไทยเท่านั้น

## การตรวจสอบผลลัพธ์

ใช้ `scripts/validate-output.js` ตรวจ output แบบ deterministic — เช็ค Source Snapshot, evidence counts, citations, required sections, และ self-score:

```bash
node scripts/validate-output.js ./my-textbook-output --pass full
```

Pass levels: `quick`, `standard`, `full` — แต่ละ level มี min evidence ต่างกัน

## License

MIT — ใช้ได้อิสระ
