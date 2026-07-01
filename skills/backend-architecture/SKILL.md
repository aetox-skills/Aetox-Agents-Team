# backend-architecture — System design patterns for backend

> ใช้เมื่อ: ต้องออกแบบ architecture, วางโครงสร้างโปรเจค, เลือก design patterns
> หรือต้องการตรวจสอบว่า structure ปัจจุบันดีแล้วหรือยัง

---

## Separation of Concerns (SoC)

โครงสร้างมาตรฐาน: **Router → Service → Repository → Model**

```
Client Request
    ↓
Router (route validation, HTTP concerns)
    ↓
Service (business logic, orchestration)
    ↓
Repository (data access, queries)
    ↓
Model (entity structure)
```

### กฎเหล็ก
| Layer | รู้ได้แค่ | ห้าม |
|-------|----------|------|
| **Router** | request/response schema | แตะ business logic หรือ DB |
| **Service** | repository + model | return dict หรือรู้ request format |
| **Repository** | model เท่านั้น | รู้ business logic |
| **Model** | database schema | รู้ว่าใครเรียกใช้ |

### สัญญาณว่า SoC พัง
- Controller import models โดยตรง
- Service return raw dict แทน schema
- Business logic กระจายในหลายชั้น
- เปลี่ยน DB → ต้องแก้ service

---

## 3-Layer Architecture (ยืมจาก MS Agent Framework)

| Layer | บทบาท |
|-------|--------|
| **Agent Layer** | รับ request, เลือก action, เรียก tools |
| **Workflow Layer** | orchestration, state machine, pipeline |
| **Infrastructure Layer** | database, external services, providers |

Provider abstraction ใช้ **Strategy Pattern**:
```
Service(repository=PostgresRepository())
Service(repository=SQLiteRepository())
```
เปลี่ยน backend โดยไม่เปลี่ยน logic

---

## Architecture Selection Guide

เลือกตาม scale ของ project:

| ถ้า... | ใช้ | เพราะ |
|--------|-----|-------|
| CRUD เล็ก, prototype, MVP, <3 ปี | **Layered** | เร็วสุด, overhead ต่ำ |
| Product จริง, 3-10 ปี, หลาย integrations | **Hexagonal** | Balance ที่สุด, testable, เปลี่ยน infra ได้ |
| ระบบซับซ้อน, domain-heavy, 10+ ปี, enterprise | **Clean + DDD** | คุ้มค่ากับ investment |

### Decision Flow
```
Project scale?
├── เล็ก (CRUD, <1K endpoints, solo)
│   └── → Layered
├── กลาง (product จริง, 3-10 ปี)
│   └── → Hexagonal (Ports & Adapters)
└── ใหญ่ (ระบบซับซ้อน, 10+ ปี, หลายทีม)
    └── → Clean + DDD
```

---

## Plugin / Module System (ยืมจาก Semantic Kernel)

Backend capabilities เป็น plugins/modules:
- **API Plugin** — route definitions, validation, docs
- **DB Plugin** — schema, query, migration
- **Auth Plugin** — JWT, OAuth2, RBAC
- **Infrastructure Plugin** — Docker, Compose, CI/CD

Plugin = module ที่มี interface ชัดเจน
- ถอด/เปลี่ยนได้
- ไม่พังทั้งระบบ
- ทดสอบแยกกันได้

---

## Design Patterns ที่ใช้บ่อย

| Pattern | ใช้เมื่อ | ตัวอย่าง |
|---------|---------|---------|
| **Repository** | แยก data access จาก business logic | `UserRepository.get_by_email()` |
| **Strategy** | ต้องสลับ implementation | DB provider, Auth provider |
| **Factory** | สร้าง objects ซับซ้อน | `ServiceFactory.create_user_service()` |
| **Dependency Injection** | ลด coupling, เพิ่ม testability | FastAPI `Depends()`, constructor injection |
| **Observer/Event** | inter-service communication | Event bus, webhook |
| **Middleware Chain** | request pipeline | Auth → Log → Rate Limit → Cache |

---

## Anti-patterns

| Anti-pattern | ปัญหา | ทางแก้ |
|-------------|-------|--------|
| **God Service** | service ตัวเดียวทำทุกอย่าง | แยกตาม domain |
| **Circular Import** | module A import B, B import A | Shared schema layer |
| **Magic String** | ใช้ string แทน constant/enum | Typed constants |
| **Tight Coupling** | เปลี่ยนอะไรพังหมด | DI + interface |
| **Spaghetti Controller** | router มี business logic | ย้ายไป service |
