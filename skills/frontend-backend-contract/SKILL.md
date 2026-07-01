---
name: frontend-backend-contract
description: Contract-first protocol for frontend and backend agents. Use when creating/updating API endpoints, integrating FE with BE, defining shared types, handling errors, or when frontend or backend behavior crosses the API boundary. Load this before any FE-BE integration work — never guess, always contract-first.
---

# Frontend Backend Contract Skill

Contract > Code. No guessing. No silent breaks. No solo decisions across layers.

## Core Principle

Frontend must never guess backend behavior.
Backend must never guess frontend needs.
Both sides communicate through explicit contracts.

---

## 1. Responsibility Boundary

| Layer | Owns | Does NOT own |
|-------|------|-------------|
| Backend | endpoint behavior, validation rules, database rules, auth requirements, error codes, status codes | UI state, form mapping, user feedback text, cache behavior |
| Frontend | UI state, form mapping, user feedback, cache behavior, loading/empty/error display | endpoint behavior, validation rules, database rules, error codes |
| Shared | DTO shapes, API contract, enum/status names, error schema | — |

---

## 2. API Contract Template

Every endpoint must have a contract. Template:

```
## Endpoint Contract

**Name:** [endpoint name]
**Method:** GET | POST | PUT | PATCH | DELETE
**Path:** /api/v1/...

**Auth:** none | bearer | session | api-key
**Permission:** [role/permission]

**Request Query/Params:**
| Field | Type | Required | Description |
|-------|------|----------|-------------|

**Request Body:**
```json
{ "field": "type" }
```

**Response 200:**
```json
{ "data": {}, "meta": {} }
```

**Response Errors:**
| Code | Meaning | Frontend Action |
|------|---------|-----------------|
| 400 | Validation error | Show inline form errors |
| 401 | Unauthenticated | Redirect to login |
| 403 | Forbidden | Show permission message |
| 404 | Not found | Show empty/not-found state |
| 409 | Conflict | Refresh data + show conflict message |
| 500 | Server error | Show retry message |

**Frontend States:**
- [ ] loading
- [ ] empty
- [ ] success
- [ ] error
- [ ] edge case: [describe]

**Cache Invalidation:** [target query keys]
**Backward Compatibility:** [notes]
```

---

## 3. State Mapping (Response → UI)

Each status code maps to a UI state — never pick UI behavior from status code alone.
Consider context: list view vs. detail view vs. after-action.

```
404 in a list → render empty state without breaking the list.
404 on direct detail route → show "Not Found" page with navigation.
404 after mutation → show toast with context.

403 on page load → permission message, not redirect.
403 after action → toast "You don't have permission to do this".

400 always → inline form errors next to the invalid field(s).
500 always → retry message + "report issue" option.
```

---

## 4. Shared Types & DTO Rules

1. One source of truth for DTOs — shared between FE and BE (e.g., shared package or types folder).
2. Never duplicate DTO definitions across layers.
3. Date format: ISO 8601 string (YYYY-MM-DDTHH:mm:ss.sssZ).
4. ID format: string (not number), clearly named (userId, not id).
5. Pagination shape: `{ data: T[], total: number, page: number, pageSize: number }`.
6. Nullable fields: explicitly nullable, not magically undefined.
7. Enums: shared between FE and BE, never hardcoded strings in UI logic.
8. No `any` type for request or response DTO — ever.
9. Use exact types: prefer `Record<string, User>` over `any`.

---

## 5. Error Protocol

All API errors must follow a unified shape:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Human-readable message",
    "details": { "field": "email", "issue": "invalid_format" }
  }
}
```

Rules:
- `error.code` is a machine-readable constant (FE can switch on it).
- `error.message` is user-facing (can be shown directly).
- `error.details` is optional, field-level for validation errors.
- Never return raw stack traces to the client.

---

## 6. Auth & Permission Rules

- Auth token: stored in httpOnly cookie (preferred) or Authorization header.
- Token refresh: silent, transparent to UI — handled by interceptor.
- 401 → clear auth state + redirect login (NOT on mutation — let user retry).
- 403 → permission message (NOT redirect — user might have multiple roles).
- Frontend: never inspect token payload for permissions — use dedicated endpoint.
- Backend: every protected endpoint must declare required permission in contract.

---

## 7. Mock-First Rule

When backend endpoint is not ready:

1. Frontend creates mock from APPROVED contract ONLY.
2. Mock must use EXACT fields and types from contract.
3. Mock must NOT invent fields not in contract.
4. Mock must simulate ALL response states (success + errors).
5. Mock path: `services/__mocks__/[endpoint].ts`
6. Remove mock BEFORE merging to main.

---

## 8. Breaking Change Protocol

Breaking changes are ANY of:
- Changed field names
- Removed fields
- Renamed fields
- Changed enum values
- Changed status code behavior
- Changed error code strings
- Changed auth requirement
- Changed nullable → required (or vice versa)

If breaking change is unavoidable:

1. Document in contract BEFORE implementing.
2. Bump API version (e.g., `/v1/` → `/v2/`).
3. Keep old endpoint active during migration window.
4. Backend creates migration note: old → new field mapping.
5. Frontend receives note and updates in same PR cycle.

Backend must NEVER silently break an existing contract.

---

## 9. File Structure Standard

```
src/
├── services/           # API functions — one file per domain/resource
│   ├── api-client.ts   # base fetch/axios instance with interceptors
│   ├── users.ts        # user-related API calls
│   └── __mocks__/      # mock implementations (contract-based)
├── types/
│   └── api/            # DTOs shared with backend
│       ├── users.ts
│       └── common.ts   # pagination, error shapes
├── hooks/
│   └── api/            # TanStack Query / SWR hooks
│       └── use-users.ts
├── validators/         # Zod schemas (mirrors backend validation)
│   └── users.ts
└── contracts/          # API contract docs (markdown)
    └── users-api.md
```

---

## 10. Non-Negotiable Rules

1. No API calls inside UI components — use services + hooks.
2. No invented response fields — only use fields from contract.
3. No `any` type for request or response DTOs.
4. No silent backend behavior change — update contract first.
5. No mutation without cache invalidation plan.
6. No frontend implementation before minimum contract exists.
7. No backend endpoint without documented error shape.
8. No shared type duplication across layers.
9. No business logic hidden in frontend formatting code.
10. No optimistic update without rollback behavior.
11. No `res.json(data)` — always use `{ data, meta?, error? }` envelope.

---

## 11. Stop Conditions (CRITICAL)

### Frontend Agent — STOP and ask when:

- Endpoint contract is missing or incomplete.
- Response shape is unknown or undocumented.
- Auth behavior is unclear (which token? which permission?).
- Mutation side effects are unclear (what else changes?).
- Cache invalidation target is unknown.
- Error codes are undocumented (can't map to UI state).
- Backend is unreachable and no contract exists for mocking.

### Backend Agent — STOP and ask when:

- Frontend use case is unclear (what screen? what user flow?).
- Required UI states are unknown (what happens on error?).
- Permission behavior is not specified (who can access?).
- Error handling expectation is missing (what should frontend show?).
- Response shape is assumed but not confirmed with frontend.

---

## 12. Anti-patterns

| Anti-pattern | Why it's bad | Fix |
|-------------|-------------|-----|
| API call in component | No reuse, no error handling, hard to test | Move to service + hook |
| Invented response fields | Drift from backend reality | Use contract, not imagination |
| `any` for API responses | Type safety gone, silent bugs | Define exact DTO type |
| Backend changes response silently | Frontend breaks without warning | Update contract first |
| Duplicated DTO across layers | Two sources of truth, drift guaranteed | Single shared DTO file |
| Hidden business logic in UI | Logic scattered, impossible to audit | Move to backend or service layer |
| Inconsistent response envelope | Every endpoint needs custom handling | Use `{ data, error }` everywhere |
| Skipping error states | User sees nothing on failure | Design error UI for every endpoint |
| Frontend stores raw backend data | UI breaks when backend changes shape | Transform at service boundary |
| Multiple auth patterns | Confusion, security gap | Pick one, enforce everywhere |

---

## 13. Quick Checklist

### Before writing code:
- [ ] Contract exists and is approved.
- [ ] All response shapes are typed (success + all errors).
- [ ] Error codes are mapped to UI states.
- [ ] Auth and permission requirements are clear.
- [ ] Cache invalidation rules are defined.
- [ ] Mock strategy is ready (if backend unavailable).

### After writing code:
- [ ] No `any` types in API layer.
- [ ] No API calls in components.
- [ ] All states handled (loading, empty, success, error, edge).
- [ ] Error messages user-friendly.
- [ ] No duplicated DTOs.
- [ ] No invented fields.

---

## 14. Future: Automated Contract Verification

Markdown contracts (Section 2) are enough for agents to coordinate today.
When the team is ready to automate verification, add these to CI:

| Tool | What it does | One-liner |
|------|-------------|-----------|
| **OpenAPI spec** | Machine-readable contract — generate types, mocks, tests | FastAPI/NestJS can auto-generate |
| **Schemathesis** | Fuzz-test API against spec — catches 500s, schema drift, validation bugs | `schemathesis run openapi.json --checks all` |
| **oasdiff** | Detect breaking changes between spec versions — fail PR if breaking | `oasdiff changelog old.yaml new.yaml --fail-on ERR` |
| **Prism** | Mock server from spec — frontend devs unblocked before backend exists | `prism mock openapi.json` |

Pipeline (when ready):
```
PR opened → schemathesis fuzz → oasdiff breaking check → fail on violation
```

Until then: focus on markdown contracts + stop conditions (Sections 2, 11, 13).
These prevent more bugs than any tool.
