# Citation Format & Source Snapshot Reference

> อ่านเมื่อต้องเขียน citation หรือ pin source ให้กับบท

---

## Source Snapshot

ทุกบทและทุก output ต้อง pin source:

```markdown
## Source Snapshot
- Repository: owner/repo
- Branch: main
- Commit SHA: abc1234
- Inspected date: 2026-06-20
- Inspection method: webfetch / git clone
```

### Required Fields

| Field | Required | หมายเหตุ |
|-------|----------|---------|
| Repository | ✅ | `owner/repo` format |
| Branch | ✅ | ปกติ `main` |
| Commit SHA | ✅ | 7-40 ตัวอักษร hex |
| Inspected | ✅ | `YYYY-MM-DD` |
| Method | ✅ | `webfetch` / `git clone` / `both` |
| License | ✅ | จาก GitHub API หรือ LICENSE file — ถ้าไม่มี → `[!]` |

---

## Citation Format (บังคับ)

```
1. ไฟล์ + บรรทัด:  `path/to/file.ts#L10-L45 @ <sha>`
2. ถ้าไม่มีบรรทัด:  `path/to/file.ts → functionName()`
3. Docs:           `docs/architecture.md#section-name`
4. Issue/Release:   URL + accessed date
5. Web source:      URL + accessed date [W]
```

### Citation Examples

```markdown
✅ `packages/core/session.ts#L10-L45 @ abc1234` — pinpoint
✅ `packages/core/session.ts → createSession()` — function-level
⚠️ `session.ts` — too vague, should add path + function
❌ "จากโค้ดใน repo" — unacceptable
```
