---
name: aetox-agents
description: Aetox Agents collaboration protocol — Entry Ritual, Scope Boundary, Handoff, Exit Report. Load before starting any project work. Every Aetox agent must read AGENTS.md in project root, report in, check scope, and log exit. This skill is the central rulebook for all Aetox Agents.
---

# Aetox Agents Protocol

> **Rule:** ห้ามเดา ห้ามซ้อน ห้ามหาย — Report, Scope-Check, Handoff.
> Agents self-organize. No orchestrator. Every agent reads AGENTS.md.

---

## 1. Entry Ritual (ทุก agent, ทุก task)

```
ก่อนแตะโค้ด:
1. อ่าน AGENTS.md ใน project root
2. เช็ค Active Agents — มีใครทำงานอยู่แล้ว? งานซ้อนกัน?
3. ถ้า AGENTS.md ไม่มี → copy จาก templates/AGENTS.md มาสร้าง
4. รายงานตัว: "[agent] reporting. Task: [task]. Scope: [scope]."
5. บันทึกใน AGENTS.md → Active Agents table
```

---

## 2. Scope Boundary

ห้ามทำนอก scope — handoff แทน

```
backend-py scope:           frontend-ts scope:
  ✅ API endpoints             ✅ UI components & pages
  ✅ Database schema           ✅ Layout, styling, CSS
  ✅ Business logic            ✅ State management (client)
  ✅ Auth & permissions        ✅ Forms & validation (client)
  ✅ Error codes & response    ✅ Accessibility
  ✅ DevOps / Docker           ✅ Animation & motion
  ✅ Rate limiting             ✅ Loading/error/empty states
  ❌ UI, CSS, layout          ❌ API design, database
  ❌ Client-side state        ❌ Business logic (server)
  ❌ Image integration        ❌ Auth implementation
```

---

## 3. Handoff Protocol

เมื่อเจองานนอก scope → หยุด + handoff:

```
"[agent] stopping. This is [other_agent]'s work.
 Handing off: [task + context].
 What I completed: [summary if any].
 What's next: [what the other agent needs to do]."

→ บันทึกใน AGENTS.md → Handoffs section
→ Agent ตัวต่อไปอ่าน AGENTS.md แล้วเริ่มต่อ
```

---

## 4. Exit Report

จบงานต้องเขียน exit report ใน AGENTS.md:

```
1. ย้ายจาก Active → Completed
2. บันทึก: "[agent] [task] → [commit] [time]"
3. จด decisions ที่ตัดสินใจ + เหตุผล
4. Flag: "frontend-ts needs to know: [API shape change]"
   หรือ    "backend-py needs to know: [new endpoint request]"
```

---

## 5. AGENTS.md Template

Copy ไป project root ทุกโปรเจกต์:

```markdown
# Aetox Agents — Project Control Center

> อย่าเอา agent มายำรวมกัน แต่ละตัวมีหน้าที่ชัดเจน
> Don't mix agents — each has a clear scope. Handoff, not overlap.

---

## 👥 Active Agents

| Agent | Status | Task | Started | Updated |
|-------|:------:|------|---------|---------|
| — | — | — | — | — |

**Status:** 🟢 working | 🟡 waiting | 🔴 blocked | ⚪ idle

---

## ✅ Completed

```
[agent] [task] → [commit] [time]
```

---

## 🔄 Handoffs

```
[from] → [to]: [reason] [time]
```

---

## 📋 Decisions

```
[date] [decision]
  Reason: [why]
  By: [agent]
```

---

## 🤖 Agent Registry (active in this project)

| Agent | Scope | Primary Stack |
|-------|:------|:--------------|
| `backend-py` | API, database, auth, business logic, DevOps | Python / FastAPI |
| `frontend-ts` | UI, layout, styling, state, components | TypeScript / Next.js |

---

## 🚫 Anti-patterns

- Agent overlap: สอง agent แก้ไฟล์เดียวกันใน session เดียวกัน
- Silent assumption: คิดว่าอีกตัวจะ "figure it out" เอง
- No exit report: ทำงานเสร็จแต่ไม่ log → context หาย
- Scope creep: "ขอทำนิดเดียว" นอก scope → slope
- Ghost agents: ทำงานโดยไม่ report ใน AGENTS.md
```

---

## 6. File Structure Convention

```
shared/
  └── types/           # DTOs — single source of truth for FE+BE

backend/               # backend-py territory
frontend/              # frontend-ts territory
```

## 7. Git Convention

```
feat(backend): add booking endpoint
feat(frontend): booking list page
fix(contract): update error response shape
```

---

## 8. Non-Negotiable Rules

1. **ห้ามเดา** — ไม่รู้ → ถาม contract → ถาม AGENTS.md → ถาม Mike (ตามลำดับ)
2. **ห้ามซ้อน** — agent สองตัวห้ามแก้ไฟล์เดียวกันพร้อมกัน
3. **ห้ามหาย** — จบงานต้องเขียน Exit Report เสมอ
4. **Scope first** — เช็ค scope ก่อนเริ่มงาน
5. **Read AGENTS.md first** — ห้ามเริ่มโดยไม่อ่าน AGENTS.md
6. **No API call without contract** — ใช้ `frontend-backend-contract` skill ทุกครั้ง
7. **No state without pattern** — ใช้ `frontend-state-management` skill ทุกครั้ง

---

## Quick Start (เริ่มโปรเจกต์ใหม่)

1. Copy AGENTS.md template → project root
2. Fill Agent Registry: agents ที่ใช้ในโปรเจกต์นี้
3. backend-py starts → อ่าน AGENTS.md → รายงานตัว → ทำงาน → Exit Report
4. frontend-ts picks up → อ่าน AGENTS.md → ต่อจาก Exit Report → ทำงาน → Exit Report
