# 🏴 Aetox Agents Team

> **Self-organizing agent team that builds real software.**
> Contract-first. Evidence-first. Strategy C — inline knowledge, minimal skills.

## 🧠 Agents (3)

| Agent | Stack | Lines | Knowledge |
|-------|:------|:-----:|:----------|
| **backend-py** ⚙️ | Python / FastAPI | 67 | SoC, Python patterns, performance inline |
| **backend-go** ⚙️ | Go / Chi | 80 | Go idioms, goroutines, performance inline |
| **frontend-ts** 🎨 | TypeScript / Next.js | 73 | State mgmt, contract, Tailwind, CSS animation inline |

ใช้กับ **ZCode** เป็นหลัก

## 🔄 How They Work

```
$skill("aetox-agents") → Entry Ritual → Scope Check → Work → Exit Report
```

1. **Entry Ritual:** Read `AGENTS.md` in project → report in
2. **Scope Check:** Task matches scope → proceed. Overlap → handoff
3. **Work:** Respect scope. All core knowledge inline in agent .md
4. **Exit Report:** Log in AGENTS.md

## 📦 Skills (6 universal on-demand)

| Skill | ใช้เมื่อ | ใครใช้ |
|:--|:--|:--|
| `aetox-agents` | เริ่มโปรเจกต์ — Entry Ritual, Scope, Handoff | ทุก agent |
| `frontend-backend-contract` | สร้าง/แก้ API endpoint | ทุก agent |
| `github` | Git operations | ทุก agent |
| `context7-mcp` | ค้น docs libraries/frameworks | ทุก agent |
| `senior-architect-agent` | วิเคราะห์ architecture ก่อนแก้โค้ดใหญ่ | backend-* |
| `token-saver` | ประหยัด tokens bash output | ทุก agent |

> **Strategy C:** Knowledge หลัก inline ใน agent .md หมดแล้ว — skills 6 ตัวนี้โหลด on-demand เท่านั้น
> Archive: `E:\Aetox\skill-library\` (58 skills — อ้างอิงเวลาต้องการ)

---

## 🗂️ Project Setup

```
1. Copy templates/AGENTS.md → project root
2. Import agents + skills into ZCode
3. Start: backend-py → reads AGENTS.md → reports → builds API
4. Continue: frontend-ts → reads AGENTS.md → builds UI
5. All coordination through AGENTS.md + contract skill
```

## 🚫 Rules

| Rule | Meaning |
|:--|:--|
| ห้ามเดา | ไม่รู้ → ถาม contract → ถาม AGENTS.md |
| ห้ามซ้อน | สอง agent ห้ามแก้ไฟล์เดียวกัน |
| ห้ามหาย | จบงานต้องเขียน Exit Report |
| Contract > Code | `frontend-backend-contract` ทุกครั้ง |

## 📁 Repo Structure

```
├── agents/         ← 3 agent definitions (ZCode, ~70 lines each)
├── skills/         ← 6 universal skills (on-demand)
├── templates/      ← AGENTS.md template
└── README.md
```
