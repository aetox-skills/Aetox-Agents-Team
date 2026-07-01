# 🗺️ Source Map Template

> แนวคิด ↔ ไฟล์จริง ↔ บทที่สอน — ทำให้ตำราไม่หลุดจาก codebase

---

| แนวคิด | บทที่สอน | Source File | Lines | Function/Class | Evidence | Commit |
|--------|---------|-------------|-------|---------------|----------|--------|
| Session Management | [[บทที่ 3]] | `src/session.ts` | L10-L45 | `createSession()` | `[✓]` | abc123 |
| Provider Abstraction | [[บทที่ 5]] | `src/provider/index.ts` | L1-L30 | `Provider` interface | `[✓]` | abc123 |
| Agent Loop | [[บทที่ 7]] | `src/agent/loop.ts` | L50-L80 | `runLoop()` | `[→]` | abc123 |
| ... | ... | ... | ... | ... |

---

## Usage

- **ผู้เรียน:** อยากดูโค้ดของแนวคิด X → ดูตาราง → ไปไฟล์นั้น
- **ผู้สอน:** ตรวจว่าทุกแนวคิดสำคัญมี source จริง → ไม่มีไฟล์ = `[!]`
- **AI ตัวต่อไป:** ใช้เป็น index สำหรับ navigate codebase
