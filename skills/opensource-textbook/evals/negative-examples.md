# Negative Examples — Repos That Should NOT Get a Textbook

ใช้เป็น reference เวลา AI ตัดสินใจว่า repo ไหนไม่ควรทำตำรา

---

## Category 1: No Architecture Depth

| Repo | Why Skip |
|------|---------|
| `octocat/Hello-World` | Hello world — nothing to teach |
| `sindresorhus/yoctocolors` | ~50 lines, single utility function — Quick Note พอ |
| Any "awesome-*" list | curated list, not code to teach |

**Rule:** ถ้า architecture depth < 10/30 ใน Worthiness → Quick Note หรือ Skip

---

## Category 2: Archived / Abandoned

| Repo | Why Skip |
|------|---------|
| `facebookarchive/nuclide` | Archived — no community, no maintenance |
| Any repo with "DEPRECATED" in README | — |

**Rule:** ถ้า last commit > 2 ปี และไม่มี recent activity → Skip หรือ Quick Note เพื่อบันทึกประวัติเท่านั้น

---

## Category 3: No License

| Scenario | Action |
|----------|--------|
| No LICENSE file, no license in GitHub API | `[!]` + warn user — default = all rights reserved |
| License prohibits derivatives (e.g., CC BY-ND) | ❌ ห้าม Full Textbook |
| License missing but public repo | ⚠️ ทำได้สูงสุด Standard Lesson |

---

## Category 4: Code Quality Too Low

| Signal | Action |
|--------|--------|
| No tests, no docs, no README | Quick Note or Skip — ไม่มีอะไรให้สอน |
| Single commit with "initial commit" only | Skip |
| Code is mostly auto-generated | Skip |

---

## Category 5: Too Simple / Too Small

| Signal | Action |
|--------|--------|
| < 5 source files | Quick Note |
| < 100 LOC | Quick Note or Skip |
| No dependencies (trivial utility) | Quick Note |

---

## Category 6: Multi-Language Without Clear Architecture

| Signal | Action |
|--------|--------|
| 5+ languages mixed without clear separation | Quick Note — architecture ไม่ชัด |
| Glue code / wrappers without original logic | Standard at most |

---

## Decision Flow

```
Repo → 
  มี license? → No → warn [!], skip or Quick Note
  Archived? → Yes → skip
  < 100 LOC? → Yes → Quick Note
  มี architecture patterns? → No → Quick Note
  มี docs + tests? → No → Standard Lesson at most
  Multi-module + novel approach? → Yes → Full Textbook
```
