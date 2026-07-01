# Changelog

All notable changes to the opensource-textbook skill.

---

## [v7.2] — P0 Hardening (2026-06-24)

### Added
- **LICENSE** — MIT license file
- **Security Boundary** — 6 safety rules + license policy for untrusted repos
- **Deterministic Validator** — `scripts/validate-output.js` checks Source Snapshots, evidence counts, citations, sections, self-scores
- **Evals** — 9 test cases (Quick Note, Standard, Full Textbook, Negative/Skip) in `evals/test-cases.yaml`
- **Negative Examples** — `evals/negative-examples.md` — 6 categories of repos that should NOT get a textbook
- **CI** — GitHub Actions workflow (`.github/workflows/ci.yml`) for markdown lint, contract check, template validation, YAML validation, cross-reference, license check
- **Model Recommendations** — table in README showing minimum model tier per pass level
- **references/** — 5 extracted reference files replacing monolithic SKILL.md

### Changed
- **SKILL.md**: 710 → 148 lines (-79%) — now a compact hub with quick-reference table
- **Per-Pass Activation**: removed "strong model" language, simplified to worthiness-based logic
- **Chapter Types**: header fixed 6→7 to match actual count
- **Evaluation Rubric**: checklist synced with SKILL.md (Practical Transfer 15→10, added Thai Readability 5)
- **Quick Self-Check**: evidence count now tiered (Quick:3, Standard:7, Full:10)
- **Templates**: code-reading, comparison, exercise now have Source Snapshot; concept + implementation fixed missing Branch field

### Fixed
- Architecture Comparison: quota (≥3) → principle (only when real alternatives exist)
- 5 contract inconsistencies: rubric mismatch, chapter types count, template list, evidence counts, missing sections

---

## [v7.1] — Teaching Quality (2026-06-24)

### Added
- **Per-Pass Rule Activation** — table mapping rules/layers/checks to each pass level
- **Guiding Questions** — 🧭 5 questions in every chapter template (architecture, concept, code-reading, implementation, comparison, exercise, book-plan, index)
- **Thai Readability Guide** — 6 anti-patterns, 3 analogy levels, 8-item checklist in SKILL.md

---

## [v7.0] — Depth & Comparison (2026-06-24)

### Added
- **8-Level Knowledge Density** (was 5) — Overview→Concept→Mechanism→Code Walkthrough→Evidence→Design Reason→Transfer→Pitfall
- **Tiered Density by Pass Level** — Quick:1-4, Standard:1-6, Full:1-8
- **Architecture Comparison Framework** — 4-dimension table (Performance, Complexity, Maintainability, Ecosystem fit) with "when to use/avoid"
- **Deep Terminology Protocol** — 4-layer structure for core terms (definition→mechanism→importance→repo evidence)

---

## [v6.0] — Evidence & Worthiness (2026-06-20)

### Added
- Knowledge Sources: Repo `[✓]`, Model `[M]`, Web `[W]`
- Textbook Worthiness Score /100
- Source Snapshot + Citation Format (`path/file.ts#L10-L45 @ <sha>`)
- `index.md` template (book entry page)
- Self-Score Rubric Quick Reference

### Changed
- Evidence labels: `[🧠]`→`[M]`, `[🌐]`→`[W]`
- Output now split by pass level with Artifact Budget

---

## [v5.2] — Book Planning (2026-06-19)

### Added
- Book Planning Chapter type
- `capstone-project.md` template
- `glossary.md` and `source-map.md` templates
- Thai Readability +5 in rubric

---

## [v5.1] — Knowledge Sources (2026-06-19)

### Added
- 3 Knowledge Sources: Repo Evidence, Model Knowledge, Web Evidence
- 15 Operating Rules (was 14)
- `[🧠]` and `[🌐]` evidence tags
- Architecture claims = repo only rule

---

## [v5.0] — Pass Levels (2026-06-18)

### Added
- Early Exit Rule
- Artifact Budget per pass level
- Report Structure (9-item summary)
- Operating Rules expanded to 14

---

## [v4.0] — Pedagogy Foundation (2026-06-17)

### Added
- Book-Level Planning (`book-plan.md`)
- Knowledge Density 5-layer (Concept→Mechanism→Evidence→Reason→Transfer)
- Concept Dependency Graph
- Glossary, Patterns, Cheatsheet outputs
- Evaluation Rubric /100
- Reader Persona (5 levels)

---

## [v3.0] — Split & Rename (2026-06-16)

### Changed
- Renamed to Repo-to-Textbook
- Split README.md from SKILL.md

---

## [v2.0] — Teaching Structure (2026-06-15)

### Added
- Learning Path
- Chapter Types (6)
- Code Reading Pipeline (7 steps)
- Teaching Format (9 sections)

---

## [v1.0] — Initial (2026-06-14)

### Added
- Thai technical documentation standard
- Basic structure for converting repos to Thai textbooks
