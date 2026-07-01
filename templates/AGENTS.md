# Aetox Agents — Project Control Center

> อย่าเอา agent มายำรวมกัน แต่ละตัวมีหน้าที่ชัดเจน
> Don't mix agents — each has a clear scope. Handoff, don't overlap.

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

## 🤖 Agent Registry

### Active in this project

| Agent | Scope | Primary Stack |
|-------|:------|:--------------|
| `backend-py` | API, database, auth, business logic, DevOps | Python / FastAPI |
| `frontend-ts` | UI, layout, styling, state, components, accessibility | TypeScript / Next.js |
| `designer` | UI/UX design system, visual polish, motion (frontend-ts internal) | — |
| `scribe` | Documentation, OpenSource textbooks, Obsidian notes | Markdown |
| `debugger` | Bug hunting, system analysis, root cause | Any |

### On-demand (pull when needed)

| Agent | Scope | When to pull |
|-------|:------|:-------------|
| `videographer` | Video production, motion graphics | Video/graphics tasks |
| `minecrafter` | Minecraft bot control | Minecraft sessions |

---

## 📐 Scope Boundaries (CRITICAL)

```
backend-py owns:          frontend-ts owns:
  API endpoints              UI components
  Database schema            Layout & styling
  Business logic             State management
  Auth & permissions         Forms & validation (client-side)
  Data validation (server)   Accessibility
  Rate limiting              Animation & motion
  DevOps / Docker            Image integration
  Error codes                Loading/error/empty states

SHARED (must coordinate):
  API contract               → frontend-backend-contract skill
  DTOs & types                → single source in shared/types/
  Error shapes                → unified { error: { code, message, details } }
  Auth token format           → agreed in contract
```

---

## 🔁 Collaboration Protocol

### Entry Ritual (every agent, every task)

1. **Read AGENTS.md** — before touching any code.
2. **Check Active Agents** — is someone already working on this?
3. **Report in:** `"[agent] reporting. Task: [task]. Stack: [stack]."`
4. **Scope check:** Task matches your scope? → proceed. Otherwise → handoff.

### Boundary Guard

```
Agent must STOP and handoff when:
- Task is clearly in another agent's scope.
- Task requires knowledge the agent doesn't have.
- Agent is about to guess instead of knowing.
- Two agents would overlap on the same file/feature.
```

### Handoff Format

```
"[agent] stopping. This is [other_agent]'s work.
 Handing off: [task description with context so far].
 What I completed: [summary].
 What's next: [next step]."
→ Record in AGENTS.md under Handoffs.
→ Next agent picks up from AGENTS.md.
```

### Exit Report (after every task)

```
1. Update AGENTS.md Active → Completed.
2. Record commit hash.
3. Note any decisions made.
4. Note state of files (what changed, what needs review).
5. Flag anything the next agent MUST know.
```

---

## 🚫 Anti-patterns

- **Agent overlap:** Two agents editing the same file in the same session.
- **Silent assumption:** Agent assumes the other agent will "figure it out."
- **No exit report:** Agent finishes but doesn't log → context lost.
- **Scope creep:** Agent does "one small thing" outside scope → slippery slope.
- **Ghost agents:** Agent works without reporting in AGENTS.md → invisible work.

---

## 🗂️ Project Convention

### File structure (FE+BE)
```
shared/
  └── types/           # DTOs shared between FE and BE
      ├── api.ts
      └── common.ts

backend/               # backend-py territory
  ├── api/
  ├── models/
  ├── services/
  └── tests/

frontend/              # frontend-ts territory
  ├── app/
  ├── components/
  ├── services/
  ├── hooks/api/
  └── tests/
```

### Git convention
```
feat(backend): add booking endpoint
feat(frontend): booking list page
fix(contract): correct 409 error shape
docs(agents): update AGENTS.md — backend completed bookings API
```

---

> **Aetox Agents Rule:** ห้ามเดา ห้ามซ้อน ห้ามหาย — Report, Scope-Check, Handoff.
