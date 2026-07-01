# backend-api-design — API design standards

> ใช้เมื่อ: ออกแบบ API endpoints, กำหนด convention, versioning, error handling
> หรือ review API ที่มีอยู่แล้ว

---

## RESTful Conventions

### URL Structure
```
/api/v1/{resource}
/api/v1/{resource}/{id}
/api/v1/{resource}/{id}/{sub-resource}
```

### HTTP Methods + Status Codes
| Method | Action | Success | Error |
|--------|--------|---------|-------|
| `GET` | list | 200 | — |
| `GET /{id}` | read | 200 | 404 |
| `POST` | create | 201 | 409 (duplicate), 422 (validation) |
| `PUT /{id}` | replace | 200 | 404, 409 |
| `PATCH /{id}` | partial update | 200 | 404, 422 |
| `DELETE /{id}` | delete | 204 | 404, 409 (referenced) |

### Response Format (RFC 9457 Problem Details)
```json
// Success
{
  "data": { ... },
  "meta": { "page": 1, "total": 42 }
}

// Error
{
  "type": "https://example.com/errors/invalid-email",
  "title": "Invalid Email",
  "status": 422,
  "detail": "Email format is not valid",
  "instance": "/api/v1/users",
  "errors": { "email": ["must be a valid email address"] }
}
```

### Naming
- **Resources**: พหูพจน์ — `/users`, `/orders`
- **Fields**: `snake_case` — `first_name`, `created_at`
- **Query params**: `snake_case` — `?page=1&per_page=20`
- **Filter**: `?status=active&role=admin`
- **Sort**: `?sort=-created_at` (- = descending)
- **Include**: `?include=profile,orders`

---

## Versioning

| วิธี | ข้อดี | ข้อเสีย |
|-----|-------|--------|
| **URL prefix** (`/api/v1/`) | ชัดเจน, route ง่าย | URL ยาว |
| **Header** (`Accept: application/vnd.api+json;version=1`) | URL สะอาด | client ซับซ้อน |
| **Query param** (`?version=1`) | ง่ายสุด | จำกัดความสามารถ |

**แนะนำ:** URL prefix (`/api/v1/`) — balance ระหว่าง clarity + simplicity

---

## Error Handling

### Hierarchy
```
APIException (base)
├── NotFoundException      → 404
├── ValidationException    → 422
├── ConflictException      → 409
├── UnauthorizedException  → 401
├── ForbiddenException     → 403
└── RateLimitException     → 429
```

### Middleware Pattern
```python
@app.exception_handler(APIException)
async def api_error_handler(request, exc):
    return JSONResponse(
        status_code=exc.status,
        content={
            "type": f"https://api.example.com/errors/{exc.code}",
            "title": exc.title,
            "status": exc.status,
            "detail": exc.detail
        }
    )
```

---

## Request Validation

### หลักการ
- Validate ทุก input — ไม่เชื่อ client
- Return error เฉพาะจุด (field-level)
- ใช้ schema validation framework (Pydantic, Zod)

### Pydantic v2 (Python)
```python
class CreateUserRequest(BaseModel):
    email: EmailStr
    name: str = Field(min_length=1, max_length=100)
    age: int = Field(ge=18, le=150)
```

### Zod (TypeScript)
```typescript
const CreateUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1).max(100),
  age: z.number().min(18).max(150),
});
```

---

## API Documentation

- **OpenAPI 3.1** — มาตรฐาน
- **Auto-generate** — จาก schema (FastAPI auto, NestJS Swagger)
- **Include:**
  - Endpoint description
  - Request/response schema
  - Auth requirements
  - Error responses
  - Rate limit info

---

## Rate Limiting

| Strategy | ใช้เมื่อ |
|----------|---------|
| **Token Bucket** | API ปกติ (burst ได้) |
| **Fixed Window** | ง่าย, จำกัดตายตัว |
| **Sliding Window** | แม่นยำ, ป้องกัน edge case |

**Default:** 100 req/min per user, 1000 req/min per IP

---

## Anti-patterns

| Anti-pattern | ปัญหา |
|-------------|-------|
| **No versioning** | เปลี่ยน API แล้ว client พัง |
| **200 for errors** | client แยก error/success ไม่ได้ |
| **Inconsistent naming** | `/users` + `/get-order` + `/api/v1/listProducts` |
| **No pagination** | list 100K records ใน response เดียว |
| **Leaking internals** | return password hash, internal ID |
| **Not validating input** | SQL injection, XSS |
