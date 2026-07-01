# Evaluation Rubric Checklist

ใช้ self-score ก่อนส่ง final — คะแนน < 85 ห้ามส่ง

## Scoring Sheet

### Accuracy (25 คะแนน)

- [ ] stars, language, license ถูกต้อง `[✓]` (5)
- [ ] architecture diagram ตรงกับ repo จริง (5)
- [ ] code examples ใช้ API/functions ที่มีอยู่จริง (5)
- [ ] ไม่มี hallucination — ไม่มี component/func ที่ไม่มีจริง (5)
- [ ] version ตรงกับที่ดึงจาก GitHub (5)

### Source Traceability (20 คะแนน)

- [ ] `[✓]` ≥ ตาม Pass Level (Quick:3, Standard:7, Full:10) (5)
- [ ] architecture diagram ทุก component มี source (5)
- [ ] claims สำคัญทั้งหมดมี `[✓]` หรือ `[→]` (5)
- [ ] ไม่มี `[!]` ในข้อความสำคัญ (5)

### Teaching Clarity (15 คะแนน)

- [ ] คนไม่รู้มาก่อนอ่านแล้วเข้าใจ (5)
- [ ] ไม่ใช่ข้อมูลกอง — มีลำดับการเล่า (5)
- [ ] มี "ทำไม" ไม่ใช่แค่ "อะไร" (5)

### Knowledge Density (15 คะแนน)

- [ ] random 3 หัวข้อ → ครบชั้นตาม Pass Level (Quick:1-4, Std:1-6, Full:1-8) (10)
- [ ] Common Pitfall (ชั้น 8) ครอบคลุมอย่างน้อย 2 จุด (สำหรับ Full Textbook) (2)
- [ ] Code Walkthrough (ชั้น 4) มีตัวอย่างโค้ดจริงทุกหัวข้อหลัก (3)

### Practical Transfer (10 คะแนน)

- [ ] บอกได้ว่าเอาไปใช้กับโปรเจกต์ตัวเองยังไง (4)
- [ ] มีตัวอย่างการใช้งานจริง (3)
- [ ] มี section "ถ้าจะทดลองเอง เริ่มจากตรงไหน" (3)

### Exercise Quality (10 คะแนน)

- [ ] 3-5 ข้อ (2)
- [ ] มีทบทวน (⭐) + วิเคราะห์ (⭐⭐) + ลงมือทำ (⭐⭐⭐) (3)
- [ ] มีเฉลยทุกข้อ (3)
- [ ] เฉลยอธิบาย "ทำไม" ไม่ใช่แค่ "คำตอบคือ..." (2)

### Thai Readability (5 คะแนน)

- [ ] ภาษาไทยธรรมชาติ — อ่านแล้วไม่รู้สึกว่าแปลมา (2)
- [ ] คำทับศัพท์มีคำไทยกำกับในครั้งแรกที่ใช้ (1)
- [ ] ประโยคสั้น — ไม่มีประโยคยาวเกิน 2 บรรทัด (1)
- [ ] มีอุปมา (analogy) อย่างน้อย 1 จุด (1)

---

## Total Score

```
Accuracy:            ___/25
Source Traceability: ___/20
Teaching Clarity:    ___/15
Knowledge Density:   ___/15
Practical Transfer:  ___/10
Exercise Quality:    ___/10
Thai Readability:    ___/5
─────────────────────────
Total:               ___/100

□ ≥ 85 → ส่ง final
□ < 85 → revise → ตรวจใหม่
```

## Revise Targets

ถ้าคะแนนต่ำกว่า 85 ให้ focus แก้ที่ scoring ต่ำสุดก่อน:

| คะแนนต่ำสุด | แก้ที่ |
|------------|--------|
| Accuracy | ดึงข้อมูลใหม่จาก GitHub |
| Source | เพิ่ม `[✓]` labels (ดู Per-Pass minimum) |
| Clarity | rewrite section ที่ซับซ้อน |
| Density | เพิ่มชั้นที่ขาด (8 layers tiered by pass level) |
| Transfer | เพิ่ม "เอาไปใช้ยังไง" |
| Exercises | เพิ่มข้อ + เฉลยละเอียด |
| Thai | อ่านทวน + ใช้อุปมา + ตัดประโยคยาว (ดู Thai Readability Guide) |
