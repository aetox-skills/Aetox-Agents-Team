# 🔨 Implementation Chapter Template

## Learning Path
| คำถาม | คำตอบ |
|--------|-------|
| ผู้เรียนต้องรู้อะไรมาก่อน? | (prerequisites) |
| บทนี้สอนแนวคิดอะไร? | (implementation concept) |
| หลังอ่านจบ ผู้เรียนควรทำอะไรได้? | (สร้าง mini version ได้เอง) |
| โค้ดตั้งต้น? | (repo/file reference) |

---

> 🧭 **Guiding Questions** — ก่อนสร้าง mini version ให้ถามตัวเอง:
> 1. แก่นของ component นี้คืออะไร? (ถ้าเอาออกทั้งหมดเหลือแค่ 1 ความคิด — คืออะไร?)
> 2. ส่วนไหนที่ต้อง simplify? ส่วนไหนที่ต้องเก็บไว้? (tradeoff)
> 3. ผู้อ่านจะรันโค้ดนี้ได้ทันทีไหม? (dependencies? setup?)
> 4. ของจริงทำอะไรที่ mini version ไม่ทำ? — อธิบายว่าทำไมของจริงต้องมี
> 5. ถ้าผู้อ่านอยาก extend — จุดต่อที่แนะนำคือตรงไหน?

## 1. เป้าหมาย
"เราจะสร้าง `<X>` แบบง่าย — โดยใช้แนวคิดจาก `<repo>`"

## 0. Source Snapshot
| Field | Value |
|-------|-------|
| Repository | owner/repo |
| Branch | main |
| Commit SHA | abc1234 |
| Inspected | 2026-06-20 |
| Inspected | 2026-06-20 |

## 2. แนวคิดจาก Repo ตัวจริง
```
(Core idea — diagram)
```
**ไฟล์อ้างอิง:** `path/to/original.ts`

## 3. Implementation แบบ Mini

### 3.1 สิ่งที่เราจะสร้าง
(อธิบาย mini version — scope เล็ก)

### 3.2 โค้ด
```language
# Step 1: (คำอธิบาย)
(code)

# Step 2: (คำอธิบาย)
(code)

# Step 3: (คำอธิบาย)
(code)
```

**อธิบายทีละ Step:** (ทำไมต้องทำแบบนี้)

## 4. ต่างจากของจริงตรงไหน
| ของจริง | Mini Version | ทำไมตัดออก |
|---------|-------------|------------|
| ... | ... | ... |

## 5. วิธีรัน/ทดสอบ
```bash
# (commands)
```

## 6. จุดที่มือใหม่มักเข้าใจผิด
| ❌ | ✅ |
|----|-----|
| ... | ... |

## 7. แบบฝึกหัด
1. เพิ่ม feature `Y` เข้าไป
2. เปลี่ยนจาก `Z` เป็น `W`
3. เพิ่ม error handling

## 8. สิ่งที่ควรอ่านต่อ
- (code ของจริงที่เรา simplify มา)
- (docs)
