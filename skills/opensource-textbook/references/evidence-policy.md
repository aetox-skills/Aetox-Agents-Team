# Evidence Policy Reference

> อ่านเมื่อต้องใช้ evidence labels `[✓][→][?][!][M][W]` — รู้ว่าแต่ละ label ใช้เมื่อไหร่ และแต่ละแหล่งความรู้ใช้กับอะไรได้บ้าง

---

## Evidence Labels

| เครื่องหมาย | ระดับ | แหล่ง | ใช้เมื่อ |
|-----------|------|------|---------|
| `[✓]` | Direct | Repo | ยืนยันจาก repo/docs โดยตรง |
| `[→]` | Inferred | Repo | อนุมานจากหลักฐานใน repo |
| `[?]` | Assumed | — | ตั้งสมมติฐาน ยังไม่ยืนยัน |
| `[!]` | Unverified | — | ยังไม่มีหลักฐาน — ต้องกลับมาดู |
| `[M]` | Model Knowledge | LLM | concept ทั่วไป, บริบท, เปรียบเทียบ |
| `[W]` | Web Evidence | Internet | ข้อมูลเสริม, benchmarks, community |

---

## Knowledge Sources (3 แหล่ง — ใช้ให้ถูก)

| แหล่ง | เครื่องหมาย | ใช้กับอะไร | ห้ามใช้กับอะไร |
|-------|-----------|-----------|--------------|
| **Repo Evidence** | `[✓]` | Architecture, file structure, APIs, design decisions ของโปรเจคนี้ | — |
| **Model Knowledge** | `[M]` | อธิบาย concept ทั่วไป, ยกตัวอย่างเปรียบเทียบ, ให้บริบท, Deep Dive | Architecture claims — ต้อง `[✓]` จาก repo |
| **Web Evidence** | `[W]` | เสริมเมื่อ repo docs ไม่พอ, benchmarks, community discussion | Architecture claims — ถ้าหาไม่เจอ → `[!]` |

### หลักการ

```
Architecture → [✓] จาก repo เท่านั้น
Concept/Context → [M] ใช้ความรู้โมเดลได้
ข้อมูลเสริม → [W] ค้นเน็ตได้
```

### ตัวอย่าง

```markdown
✅ ถูกต้อง:
Llama.cpp ใช้ GGML tensor library [✓] จาก ggml/src/ggml.c
GGML คือ zero-dependency ML library [M] — แนวคิดเดียวกับ BLAS
Q4_K_M inference speed เร็วกว่า FP16 ถึง 3x [W] จาก llama.cpp benchmarks

❌ ผิด — architecture claim ใช้ [M]:
Llama.cpp ใช้ SQLite สำหรับ checkpoint persistence [M]
→ ต้อง [✓] จาก repo หรือ [→] อนุมาน — ไม่ใช่เดาจากความรู้เดิม
```

### เวลาใช้ `[M]` — กฎ

- ✅ อธิบายว่า "PagedAttention คืออะไร" → model knowledge
- ✅ ยกตัวอย่าง "เหมือน OS virtual memory paging" → analogy
- ✅ บอกว่า "LangGraph ใช้แนวคิดจาก Google Pregel paper" → historical context
- ❌ บอกว่า "ไฟล์ `session.ts` จัดการ session" → architecture claim ต้อง `[✓]`
- ❌ บอกว่า "ใช้ Redis เป็น cache" → ถ้าไม่เห็นใน repo → `[!]`
