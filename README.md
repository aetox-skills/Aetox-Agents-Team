# 🏴 Aetox Agents

> **Project agents that build real software.**
> Self-organizing. Contract-first. Scope-respecting.

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

1. **Entry Ritual:** Read `AGENTS.md` → report in.
2. **Scope Check:** Task matches scope? → proceed. Otherwise → handoff.
3. **Work:** Respect scope. No overlap. Use skills.
4. **Exit Report:** Log in AGENTS.md. Flag for next agent.

All agents load `aetox-agents` skill for the full protocol.

---

## 📦 Skills

| Skill | When |
|:--|:--|
| `aetox-agents` | Before any project work — Entry Ritual, Scope, Handoff, Exit Report |
| `frontend-backend-contract` | When creating/modifying API endpoints — Contract-first protocol |
| `frontend-state-management` | When building UI components — Server/client/form/URL state patterns |

---

## 🗂️ Project Setup

```
Every project:
1. Copy templates/AGENTS.md → project root
2. Fill Agent Registry
3. backend-py starts → reads AGENTS.md → reports → works → exits
4. frontend-ts picks up → reads AGENTS.md → continues → exits
```

---

## 🚫 Rules

| Rule | Meaning |
|:--|:--|
| ห้ามเดา | ไม่รู้ → ถาม contract → ถาม AGENTS.md → ถาม Mike |
| ห้ามซ้อน | สอง agent ห้ามแก้ไฟล์เดียวกันพร้อมกัน |
| ห้ามหาย | จบงานต้องเขียน Exit Report |
| Contract > Code | `frontend-backend-contract` skill ทุกครั้งที่มี API |

---

## 📁 Structure

```
Aetox-Agents/
├── agents/          ← Agent definitions (ZCode format)
├── skills/          ← Shared skills
├── templates/       ← AGENTS.md template
└── README.md
```

> **Note:** Opencode personal agents (steward, minecrafter, etc.) อยู่ใน repo `ai-agent-team` — แยกกันชัดเจน
