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
- [ ] `[✓]` ≥ 10 จุดในบท (5)
- [ ] architecture diagram ทุก component มี source (5)
- [ ] claims สำคัญทั้งหมดมี `[✓]` หรือ `[→]` (5)
- [ ] ไม่มี `[!]` ในข้อความสำคัญ (5)

### Teaching Clarity (15 คะแนน)
- [ ] คนไม่รู้มาก่อนอ่านแล้วเข้าใจ (5)
- [ ] ไม่ใช่ข้อมูลกอง — มีลำดับการเล่า (5)
- [ ] มี "ทำไม" ไม่ใช่แค่ "อะไร" (5)

### Knowledge Density (15 คะแนน)
- [ ] random 3 หัวข้อ → ครบ 5 ชั้น (Concept+Mechanism+Evidence+Reason+Transfer) (10)
- [ ] Transfer Skill ใช้ได้จริง ไม่ใช่ vague (5)

### Practical Transfer (15 คะแนน)
- [ ] บอกได้ว่าเอาไปใช้กับโปรเจกต์ตัวเองยังไง (5)
- [ ] มีตัวอย่างการใช้งานจริง (5)
- [ ] มี section "ถ้าจะทดลองเอง เริ่มจากตรงไหน" (5)

### Exercises Quality (10 คะแนน)
- [ ] 3-5 ข้อ (2)
- [ ] มีทบทวน (⭐) + วิเคราะห์ (⭐⭐) + ลงมือทำ (⭐⭐⭐) (3)
- [ ] มีเฉลยทุกข้อ (3)
- [ ] เฉลยอธิบาย "ทำไม" ไม่ใช่แค่ "คำตอบคือ..." (2)

---

## Total Score

```
Accuracy:            ___/25
Source Traceability: ___/20
Teaching Clarity:    ___/15
Knowledge Density:   ___/15
Practical Transfer:  ___/15
Exercises Quality:   ___/10
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
| Source | เพิ่ม `[✓]` labels |
| Clarity | rewrite section ที่ซับซ้อน |
| Density | เพิ่มชั้นที่ขาด (5 layers) |
| Transfer | เพิ่ม "เอาไปใช้ยังไง" |
| Exercises | เพิ่มข้อ + เฉลยละเอียด |
