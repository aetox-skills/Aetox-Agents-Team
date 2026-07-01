---
name: go-design-patterns
description: Go design patterns — composition over inheritance, interface design, error wrapping, functional options, table-driven tests, context propagation. Load when writing Go code, designing packages, or refactoring Go backends.
---

# Go Design Patterns

Go idioms differ from Python/Java. Simplicity is the pattern.

## Core Principle

```
Accept interfaces, return structs.
Define interfaces at the consumer, not the producer.
Composition over inheritance. Explicit over magic.
```

---

## 1. Composition Over Inheritance

Go has no inheritance. Use embedding and interfaces.

```go
// ❌ OOP thinking — base class
type Animal struct { Name string }
type Dog struct { Animal; Breed string }  // embedding, not inheritance

// ✅ Go thinking — interface + concrete implementation
type Speaker interface {
    Speak() string
}

type Dog struct { Name string }
func (d Dog) Speak() string { return "Woof!" }

// Consumer defines the interface it needs
func Greet(s Speaker) { fmt.Println(s.Speak()) }
```

Rule: never define an interface alongside its implementation. Interfaces belong at the call site.

---

## 2. Interface Design

### Keep interfaces small (1-3 methods)

```go
// ✅ Good — small, focused
type Reader interface { Read([]byte) (int, error) }
type Writer interface { Write([]byte) (int, error) }

// ❌ Bad — too many methods, hard to implement
type Repository interface {
    GetUser, CreateUser, UpdateUser, DeleteUser,
    ListUsers, SearchUsers, GetUserByEmail // ... too many
}
```

### Consumer owns the interface

```go
// In the service package (consumer):
type userStore interface {
    Get(ctx context.Context, id string) (User, error)
}

type UserService struct {
    store userStore  // interface defined HERE, not in store package
}

// In the store package (producer):
// Just export the concrete type — no interface needed
type PostgresStore struct { db *sqlx.DB }
func (s *PostgresStore) Get(ctx context.Context, id string) (User, error) { ... }
```

---

## 3. Error Wrapping

Never swallow errors. Always add context. Use `%w` for wrapping.

```go
// ❌ Swallowing — loses context
user, err := store.Get(ctx, id)
if err != nil {
    return User{}, fmt.Errorf("failed")
}

// ✅ Wrapping — preserves chain
user, err := store.Get(ctx, id)
if err != nil {
    return User{}, fmt.Errorf("get user %s: %w", id, err)
}

// ✅ Sentinel errors for known conditions
var ErrNotFound = errors.New("not found")

// ✅ Custom error types for structured errors
type ValidationError struct {
    Field string
    Issue string
}
func (e ValidationError) Error() string {
    return fmt.Sprintf("validation: %s: %s", e.Field, e.Issue)
}
```

**Caller checks:**
```go
if errors.Is(err, ErrNotFound) { ... }
var valErr ValidationError
if errors.As(err, &valErr) { ... }
```

---

## 4. Context Propagation

Every function that does I/O must accept `context.Context`.

```go
// ✅ First parameter, named ctx
func GetUser(ctx context.Context, store Store, id string) (User, error) {
    user, err := store.Get(ctx, id)  // pass ctx down
    if err != nil {
        return User{}, err
    }
    return user, nil
}

// ✅ Set timeouts at the boundary
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()
user, err := GetUser(ctx, store, id)
```

**Rules:**
- `ctx` is always first parameter
- Never store ctx in structs — pass it explicitly
- `context.Background()` only in `main()`, tests, and initialization
- `context.TODO()` when unsure — then fix later

---

## 5. Functional Options Pattern

For constructors with many optional parameters.

```go
// ✅ Functional options — extensible, readable
type Server struct {
    addr    string
    timeout time.Duration
    maxConn int
}

type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}

func WithMaxConn(n int) Option {
    return func(s *Server) { s.maxConn = n }
}

func NewServer(addr string, opts ...Option) *Server {
    s := &Server{addr: addr, timeout: 30 * time.Second, maxConn: 100}
    for _, opt := range opts { opt(s) }
    return s
}

// Usage: NewServer(":8080", WithTimeout(5*time.Second), WithMaxConn(1000))
```

---

## 6. Table-Driven Tests

The Go way to test multiple cases.

```go
func TestGetUser(t *testing.T) {
    tests := []struct {
        name    string
        id      string
        want    User
        wantErr error
    }{
        {"valid user", "user-1", User{ID: "user-1", Name: "Mike"}, nil},
        {"not found", "missing", User{}, ErrNotFound},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got, err := GetUser(context.Background(), tt.id)
            if !errors.Is(err, tt.wantErr) {
                t.Errorf("error = %v, want %v", err, tt.wantErr)
            }
            if got != tt.want {
                t.Errorf("got %+v, want %+v", got, tt.want)
            }
        })
    }
}
```

---

## 7. Repository Pattern

Separation of concerns — handler → service → repository.

```go
// handler/ — HTTP concerns only
func (h *UserHandler) GetUser(w http.ResponseWriter, r *http.Request) {
    id := chi.URLParam(r, "id")
    user, err := h.service.GetUser(r.Context(), id)
    if err != nil {
        writeError(w, err)
        return
    }
    writeJSON(w, http.StatusOK, user)
}

// service/ — business logic only
func (s *UserService) GetUser(ctx context.Context, id string) (User, error) {
    return s.store.Get(ctx, id)
}

// store/ — database only
func (s *PostgresStore) Get(ctx context.Context, id string) (User, error) {
    var user User
    err := s.db.GetContext(ctx, &user, "SELECT * FROM users WHERE id = $1", id)
    return user, err
}
```

---

## 8. Middleware Pattern

```go
// Standard middleware signature
func Logger(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %v", r.Method, r.URL.Path, time.Since(start))
    })
}

// With Chi
r := chi.NewRouter()
r.Use(Logger)
r.Use(AuthMiddleware)
r.Use(RateLimiter)
```

---

## 9. Package Layout

```
cmd/
  └── server/main.go       // entry point — wires everything
internal/
  ├── handler/              // HTTP handlers
  ├── service/              // business logic
  ├── store/                // database
  ├── model/                // domain types
  └── middleware/           // HTTP middleware
pkg/
  └── api/                  // shared types (DTOs) — consumed by frontend
```

Rules:
- `cmd/` — one per binary, only `main()`
- `internal/` — not importable by external packages
- `pkg/` — importable, stable API surface

---

## 10. Dependency Injection (No Framework)

Wire dependencies in `main()`. No DI framework needed.

```go
func main() {
    db := mustConnectDB(os.Getenv("DATABASE_URL"))
    defer db.Close()

    store := store.NewPostgresStore(db)
    service := service.NewUserService(store)
    handler := handler.NewUserHandler(service)

    r := chi.NewRouter()
    r.Get("/api/users/{id}", handler.GetUser)
    http.ListenAndServe(":8080", r)
}
```

---

## Quick Checklist

```
Before submitting Go code:
- [ ] Interfaces defined at consumer, not producer.
- [ ] Interfaces are small (1-3 methods).
- [ ] All errors wrapped with context (%w).
- [ ] context.Context is first parameter in all I/O functions.
- [ ] No ctx stored in structs.
- [ ] Tests are table-driven.
- [ ] Handler → Service → Store layers are separate.
- [ ] No business logic in handlers.
- [ ] No SQL in handlers or services.
```
