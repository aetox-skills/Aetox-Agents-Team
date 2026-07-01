# Repo-to-Textbook Skill (v6)

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
  "skills": {
    "urls": ["https://github.com/aetox-skills/opensource-textbook"]
  }
}
```

## ตัวอย่าง Prompt

```
ใช้ opensource-textbook skill
ทำ Architecture Chapter จาก https://github.com/anomalyco/opencode
ภาษาไทย, Full Textbook
```

## โครงสร้าง Repo

```
opensource-textbook/
├── SKILL.md              ← contract สำหรับ AI (15 rules, 6 gates, 6 evidence labels)
├── README.md             ← คู่มือมนุษย์ (ไฟล์นี้)
├── templates/            ← 8 templates บทเรียน (concept, architecture, code-reading, implementation, comparison, exercise, book-plan, index)
├── templates/glossary.md
├── templates/source-map.md
├── templates/capstone-project.md
└── checklists/           ← 4 checklists (repo-inspection, evidence-check, textbook-quality, evaluation-rubric)
```

## Current Files

- `SKILL.md` — 15 Operating Rules, Knowledge Sources, Book-Level Planning, Knowledge Density, Dependency Graph, Rubric, Report
- `templates/book-plan.md` — แผนทั้งเล่ม
- `templates/index.md` — หน้าประตูเข้าหนังสือ (🆕 v6)
- `templates/concept-chapter.md` — สอนแนวคิด
- `templates/architecture-chapter.md` — สอนภาพรวมระบบ
- `templates/code-reading-chapter.md` — พาอ่านไฟล์จริง
- `templates/implementation-chapter.md` — สร้าง mini version
- `templates/comparison-chapter.md` — เทียบ design choice
- `templates/exercise-chapter.md` — แบบฝึกหัด
- `templates/glossary.md` — คำศัพท์
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
| **Knowledge Density** | 5 ชั้น — Concept, Mechanism, Evidence, Reason, Transfer |
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

## License

MIT — ใช้ได้อิสระ
