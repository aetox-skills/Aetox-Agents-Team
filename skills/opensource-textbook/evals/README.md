# Evaluation Test Suite

ใช้ทดสอบว่า skill นี้ทำงานถูกต้องกับ repository หลายรูปแบบ — ทดสอบทั้ง positive (ควรทำตำรา) และ negative (ไม่ควรทำตำรา)

## โครงสร้าง

```
evals/
├── README.md              ← ไฟล์นี้
├── test-cases.yaml        ← test cases — repo → expected pass level
├── negative-examples.md   ← repo ที่ไม่ควรทำตำรา + เหตุผล
└── expected/              ← 🚧 golden outputs (future)
```

## วิธีใช้

### Manual Test

เลือก test case จาก `test-cases.yaml` → รัน skill บน repo นั้น → ตรวจว่า:
1. Pass level ตรงกับ expected
2. Artifacts ตรงตาม budget
3. Worthiness score สมเหตุสมผล

### Automated Validation (future)

```bash
node scripts/validate-output.js <output-dir> --pass <level>
node scripts/run-eval.js <test-case-id>   # 🚧 TBD
```

## Test Levels

| Level | Purpose | Example Repos |
|-------|---------|---------------|
| **Smoke** | ทดสอบว่า skill ไม่พัง — 1-2 repos, ทุก pass level | 3 cases |
| **Regression** | ทดสอบหลังแก้ skill — ป้องกัน regression | 5+ cases |
| **Full** | ทดสอบครบทุก edge case — ก่อน release | 10+ cases |

## Current Coverage

| Category | Cases | Status |
|----------|-------|--------|
| Quick Note | 2 | ✅ |
| Standard Lesson | 2 | ✅ |
| Full Textbook | 2 | ✅ |
| Negative (Skip) | 3 | ✅ |
| Edge Cases | 0 | 🚧 |
| **Total** | **9** | — |
