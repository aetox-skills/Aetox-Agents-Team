# 🏴 Aetox Agents Team

> **Self-organizing agent team that builds real software.**
> Each agent has a clear scope. They don't overlap — they handoff.
> Contract-first. Evidence-first. No guessing.

---

## 🧠 What is this?

นี่คือ **ทีม AI agents** สำหรับทำงานในโปรเจกต์จริง (ไม่ใช่ผู้ช่วยส่วนตัว)

- `backend-py` — สร้าง API, database, auth, business logic ด้วย Python/FastAPI
- `frontend-ts` — สร้าง UI, state, components, accessibility ด้วย TypeScript/Next.js

ทั้งสองตัวทำงานร่วมกันผ่าน **contract** (API spec) และ **AGENTS.md** (project log) — ไม่เดา ไม่มั่ว ไม่ซ้อนกัน

ใช้กับ **ZCode** (Agentic Development Environment) เป็นหลัก — import agent definitions + skills เข้า ZCode แล้วเริ่มทำงานได้เลย

---

## 🧠 Agents

| Agent | Scope | Primary Stack |
|-------|:------|:--------------|
| **backend-py** ⚙️ | API, database, auth, business logic | Python / FastAPI |
| **frontend-ts** 🎨 | UI, layout, state, components | TypeScript / Next.js |

---

## 🔄 How They Work

```
Entry Ritual → Scope Check → Work → Exit Report
```

1. **Entry Ritual:** Read `AGENTS.md` in project → report in.
2. **Scope Check:** Task matches scope? → proceed. Otherwise → handoff.
3. **Work:** Respect scope. No overlap. Use skills.
4. **Exit Report:** Log in AGENTS.md. Flag what next agent needs to know.

Load `aetox-agents` skill for the full protocol.

---

## 📦 Skills

| Skill | Load when |
|:--|:--|
| `aetox-agents` | Before any project work — Entry Ritual, Scope, Handoff, Exit |
| `frontend-backend-contract` | Creating/modifying API endpoints — Contract-first |
| `frontend-state-management` | Building UI — Server/client/form/URL state patterns |

---

## 🗂️ Project Setup

```
1. Copy templates/AGENTS.md → project root
2. Import agents + skills into ZCode
3. Start: backend-py → reads AGENTS.md → reports → builds API
4. Continue: frontend-ts → reads AGENTS.md → builds UI
5. All coordination through AGENTS.md + contract skills
```

---

## 🚫 Rules

| Rule | Meaning |
|:--|:--|
| ห้ามเดา | ไม่รู้ → ถาม contract → ถาม AGENTS.md |
| ห้ามซ้อน | สอง agent ห้ามแก้ไฟล์เดียวกัน |
| ห้ามหาย | จบงานต้องเขียน Exit Report |
| Contract > Code | `frontend-backend-contract` skill ทุกครั้ง |

---

## 📁 Repo Structure

```
├── agents/         ← Agent definitions (ZCode format)
├── skills/         ← Shared skills
├── templates/      ← AGENTS.md template
└── README.md
```

> **Related:** `Mike0165115321/ai-agent-team` — Opencode personal agents (steward, minecrafter, etc.) — แยกกัน
