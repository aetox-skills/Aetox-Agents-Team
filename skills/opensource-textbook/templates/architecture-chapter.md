# 🏗️ Architecture Chapter Template

## Learning Path
| คำถาม | คำตอบ |
|--------|-------|
| ผู้เรียนต้องรู้อะไรมาก่อน? | (prerequisites) |
| บทนี้สอนแนวคิดอะไร? | (architecture concept) |
| หลังอ่านจบ ผู้เรียนควรทำอะไรได้? | (learning outcome) |
| ถ้าจะลงมือทดลอง ต้องเริ่มจากไฟล์ไหน? | (entry point) |

---

> 🧭 **Guiding Questions** — ก่อนเขียนแต่ละ section ให้ถามตัวเอง:
> 1. ถ้าเอา component นี้ออก — ระบบส่วนไหนพัง? (หา dependency จริง)
> 2. แต่ละ component รับ input จากอะไร? output ออกไปเป็นอะไร? (data flow)
> 3. ทำไม component ถึงอยู่ที่ package นี้ ไม่ใช่ package อื่น? (design reason)
> 4. มีวงจร dependency (A→B→A) ไหม? ถ้ามี — นี่คือ intentional หรือ technical debt?
> 5. ส่วนไหนของ architecture ที่คนอ่านโค้ดครั้งแรกจะงง? (ดูจาก comments/README)

## 1. เป้าหมายบทเรียน
(ผู้เรียนจะเข้าใจภาพรวมของระบบ)

## 0. Source Snapshot
| Field | Value |
|-------|-------|
| Repository | owner/repo |
| Branch | main |
| Commit SHA | abc1234 |
| Inspected | YYYY-MM-DD |
| Method | webfetch / git clone |
| License | MIT |

## 2. ภาพรวมระบบ
```
(Architecture Diagram ใหญ่ — ทุก component มี [✓] [→] [?] [!])
```

## 3. แต่ละ Component ทำอะไร
### 3.1 Component A — `packages/xxx/`
(คำอธิบาย + ไฟล์สำคัญ)

### 3.2 Component B — `packages/yyy/`
(คำอธิบาย + ไฟล์สำคัญ)

## 4. Component คุยกันอย่างไร — Data Flow
```
(Flow diagram)
```

## 5. Architecture Comparison — ทำไมถึงออกแบบแบบนี้

> เทียบเฉพาะ components ที่มีทางเลือกจริง — ปกติมี 1-5 ตารางตามความซับซ้อนของระบบ
> ถ้า component นี้ไม่มีทางเลือกที่แท้จริง → ข้าม section นี้ หรือเขียน "N/A" พร้อมเหตุผล

### 5.X Component <ชื่อ> — `packages/xxx/`

| มิติ | วิธีที่ repo ใช้ | ทางเลือกอื่น | ทำไมเลือกวิธีนี้ | เมื่อไหร่ควร/ไม่ควรใช้ |
|------|----------------|-------------|----------------|-------------------|
| Performance | | | | |
| Complexity | | | | |
| Maintainability | | | | |
| Ecosystem fit | | | | |

**ถ้าไม่มีทางเลือกที่แท้จริง:** เขียน "N/A — industry standard" พร้อมอธิบายว่าทำไม

**แหล่งข้อมูล:** `[✓]` จาก repo/docs, เสริมด้วย `[M]` / `[W]`

## 6. ไฟล์สำคัญของแต่ละ Component
| Component | ไฟล์สำคัญ | ทำอะไร |
|-----------|----------|--------|
| ... | `path/to/file` | ... |

## 7. ถ้าจะเปลี่ยน architecture ต้องแก้ตรงไหน
- (impact analysis)

## 8. จุดที่มือใหม่มักเข้าใจผิด
| ❌ | ✅ |
|----|-----|
| ... | ... |

## 9. แบบฝึกหัด
1. (ทบทวน)
2. (วิเคราะห์)
3. (ลงมือทำ)

## 10. คำถามชวนคิด
1. (คำถาม)
2. (คำถาม)

## 11. สิ่งที่ควรอ่านต่อ
- (ลิงก์)
