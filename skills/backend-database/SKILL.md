# backend-database — Database design & optimization

> ใช้เมื่อ: ออกแบบ schema, optimization queries, migration
> หรือ troubleshoot ปัญหา database

---

## Schema Design Principles

### Normalization (จนกว่าจะจำเป็นต้อง denormalize)
| Level | กฎ |
|-------|-----|
| **1NF** | แต่ละ column มีค่า atomic, ไม่มี array/list ใน column |
| **2NF** | ทุก non-key column ขึ้นกับ primary key ทั้งหมด |
| **3NF** | ทุก column ขึ้นกับ primary key เท่านั้น ไม่ transitive |

### Denormalize เมื่อ
- Read-heavy > write-heavy (reporting, dashboards)
- JOIN เยอะจน performance ตก
- caching layer แก้ไม่พอ

### ประเภท Relationship
```
User 1──N Order          → Foreign Key ใน Order
User N──M Role           → Junction Table (user_roles)
Profile 1──1 User        → Foreign Key ฝั่งใดฝั่งหนึ่ง
```

---

## Indexing Strategy

| Index Type | ใช้เมื่อ |
|-----------|---------|
| **B-tree** (default) | =, >, <, BETWEEN, ORDER BY |
| **Hash** | = เท่านั้น (เร็วกว่า B-tree) |
| **GIN** | JSONB, array, full-text search |
| **GiST** | geometry, full-text, range types |
| **Composite** | query ที่ filter หลาย columns |
| **Partial** | WHERE condition บ่อยๆ |
| **Unique** | guarantee uniqueness |

### กฎการเลือก Index
1. Index columns ที่ใช้ใน `WHERE`, `JOIN`, `ORDER BY`
2. Composite index: เลือก order จาก selectivity (สูง→ต่ำ)
3. อย่า over-index — ทุก index เสีย write performance
4. `EXPLAIN ANALYZE` ทุกครั้งก่อนตัดสินใจ

---

## Query Optimization

### จุดที่ควรตรวจสอบ
```
1. EXPLAIN ANALYZE — ดู execution plan
2. Sequential Scan → ต้อง index
3. Nested Loop บน table ใหญ่ → ต้อง index
4. Sorting บน table ใหญ่ → index ที่ตรง ORDER BY
5. temp file ขนาดใหญ่ → increase work_mem
```

### N+1 Query
```sql
-- ปัญหา:
users = User.query.all()          -- 1 query
for u in users:
    print(u.profile.name)          -- N queries

-- แก้:
users = User.query.options(
    joinedload(User.profile)
).all()                          -- 1 query (LEFT JOIN)
```

### Pagination
```python
# ดี (keyset pagination):
SELECT * FROM users WHERE id > ? ORDER BY id LIMIT 20

# ไม่ดี (OFFSET pagination):
SELECT * FROM users ORDER BY id LIMIT 20 OFFSET 10000
```

---

## Migration Strategies (Alembic)

### หลักการ
```
1 migration = 1 atomic change
auto-generate → review → edit → test → apply
ห้ามแก้ migration ที่ pushed แล้ว
```

### Workflow
```bash
# สร้าง migration
alembic revision --autogenerate -m "add user email"

# review ผลลัพธ์
# แก้ upgrade() / downgrade() ให้ถูกต้อง

# test
alembic upgrade head
alembic downgrade -1

# apply production
alembic upgrade head
```

### สิ่งควรระวัง
- ตรวจสอบ auto-generate ทุกครั้ง — Alembic พลาดได้
- เพิ่ม column = allow NULL หรือมี default
- ลบ column = 2-step (mark deprecated ก่อน)
- ลบ table = ต้องมี downgrade ที่ restore data ได้

---

## Connection Pooling

| Pool | Config | ใช้กับ |
|------|--------|-------|
| **SQLAlchemy** | `pool_size=5, max_overflow=10` | FastAPI sync |
| **asyncpg** | `min_size=2, max_size=10` | FastAPI async |
| **PgBouncer** | external, transaction mode | production |

### กฎ
- pool_size = concurrent requests peak
- max_overflow = burst allowance (อย่าเกิน DB max_connections)
- อย่า create pool ทุก request — global instance

---

## Tools ที่ใช้กับเรา

| Tool | ใช้ทำ | Freamwork |
|------|-------|----------|
| **SQLAlchemy** | ORM + query builder | Python |
| **Alembic** | Migration | Python |
| **Prisma** | ORM + migration | TypeScript |
| **Drizzle** | Lightweight ORM | TypeScript |
| **SQLite** | Dev/test/local | ทั้งสอง |

---

## Anti-patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|-------------|-------|--------|
| **SELECT \*** | ดึง column ไม่จำเป็น | ระบุ column ที่ต้องการ |
| **No index on FK** | JOIN ช้า | index foreign key ทุกตัว |
| **Migration อ่านไม่ออก** | ไม่รู้ว่าเปลี่ยนอะไร | upgrade + downgrade ชัดเจน |
| **Business logic ใน query** | แก้ยาก, test ไม่ได้ | Logic → service layer |
| **Connection leak** | DB connection ไม่ close | use context manager (`async with`) |
