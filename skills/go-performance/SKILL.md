---
name: go-performance
description: Go performance optimization — pprof profiling, escape analysis, goroutine leaks, memory allocations, benchmarking. Load when debugging slow Go code, optimizing hot paths, or reviewing performance-critical Go code.
---

# Go Performance

Profile first. Optimize second. Never guess.

---

## 1. Benchmark First

```go
func BenchmarkGetUser(b *testing.B) {
    store := setupTestStore(b)
    b.ResetTimer()
    for i := 0; i < b.N; i++ {
        store.Get(context.Background(), "user-1")
    }
}

// Run: go test -bench=. -benchmem
// Output: BenchmarkGetUser-8  10000  123456 ns/op  8192 B/op  15 allocs/op
```

Key metrics: ns/op (time), B/op (memory), allocs/op (allocations)

---

## 2. pprof — CPU Profile

```go
import _ "net/http/pprof"

func main() {
    go func() {
        http.ListenAndServe(":6060", nil)  // http://localhost:6060/debug/pprof/
    }()
    // ... app logic
}
```

```bash
# CPU profile (30s sample)
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Top functions
(pprof) top10
(pprof) list functionName
(pprof) web  # opens flame graph
```

---

## 3. Memory Allocations (Escape Analysis)

Every allocation costs. Know what escapes to heap.

```bash
# See what escapes
go build -gcflags="-m" ./... 2>&1 | grep "escapes to heap"
```

### Common allocation traps

```go
// ❌ Interface boxing — allocates
var r io.Reader = bytes.NewReader(data)

// ✅ Concrete type — no allocation
r := bytes.NewReader(data)

// ❌ Closure captures — may allocate
for _, item := range items {
    go func() { process(item) }()  // item escapes
}

// ✅ Pass by value to goroutine
for _, item := range items {
    go func(item Item) { process(item) }(item)
}
```

---

## 4. sync.Pool — Reuse Objects

For frequently allocated short-lived objects.

```go
var bufPool = sync.Pool{
    New: func() any { return new(bytes.Buffer) },
}

func process(data []byte) string {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf)
    }()
    buf.Write(data)
    return buf.String()
}
```

Use when: object created many times per second, short-lived, expensive to allocate.

---

## 5. Strings vs Builder

```go
// ❌ String concatenation in loop — allocates every iteration
var result string
for _, s := range items {
    result += s  // O(n²) allocations
}

// ✅ strings.Builder — single allocation
var b strings.Builder
b.Grow(len(items) * 10)  // pre-allocate
for _, s := range items {
    b.WriteString(s)
}
result := b.String()
```

---

## 6. Goroutine Leak Detection

Every goroutine must have a way to exit.

```go
// ❌ Leaks — goroutine runs forever
go func() {
    for {
        data := <-ch
        process(data)
    }
}()

// ✅ Context cancellation
go func() {
    for {
        select {
        case <-ctx.Done():
            return  // goroutine exits
        case data := <-ch:
            process(data)
        }
    }
}()

// ✅ errgroup — manage goroutine groups
g, ctx := errgroup.WithContext(ctx)
g.Go(func() error { return fetchUser(ctx, id) })
g.Go(func() error { return fetchOrders(ctx, id) })
if err := g.Wait(); err != nil { ... }
```

### Detect leaks
```go
// In tests — use goleak
func TestMain(m *testing.M) {
    goleak.VerifyTestMain(m)
}
```

---

## 7. Channel Performance

```go
// ✅ Buffered channels for known capacity
ch := make(chan Result, 100)

// ✅ Select with default for non-blocking sends
select {
case ch <- result:
default:
    // channel full — handle gracefully
}

// ❌ Unbounded goroutine spawning
for _, url := range urls {
    go fetch(url)  // uncontrolled — use worker pool
}

// ✅ Semaphore-bounded goroutines
sem := make(chan struct{}, 10)  // max 10 concurrent
for _, url := range urls {
    sem <- struct{}{}
    go func(url string) {
        defer func() { <-sem }()
        fetch(url)
    }(url)
}
```

---

## 8. Mutex vs RWMutex vs atomic

```go
// sync.Mutex — exclusive lock, read + write
var mu sync.Mutex

// ✅ sync.RWMutex — multiple readers, exclusive writer
var rw sync.RWMutex
func get() Value {
    rw.RLock()
    defer rw.RUnlock()
    return value
}
func set(v Value) {
    rw.Lock()
    defer rw.Unlock()
    value = v
}

// ✅ atomic — lock-free for simple counters
var counter int64
func increment() { atomic.AddInt64(&counter, 1) }
func read() int64  { return atomic.LoadInt64(&counter) }
```

Rule: RWMutex for read-heavy workloads. atomic for single-value counters.

---

## 9. Database Performance

```go
// ✅ Prepared statements (pgx auto-handles)
// ✅ Batch operations
func (s *Store) CreateUsers(ctx context.Context, users []User) error {
    tx, _ := s.db.BeginTx(ctx, nil)
    defer tx.Rollback()

    for _, u := range users {
        _, err := tx.ExecContext(ctx, "INSERT INTO users ...", u.ID, u.Name)
        if err != nil { return err }
    }
    return tx.Commit()
}

// ✅ Connection pool tuning
db.SetMaxOpenConns(25)        // PG connection limit
db.SetMaxIdleConns(10)        // Keep warm connections
db.SetConnMaxLifetime(5 * time.Minute)
```

---

## 10. Quick Performance Checklist

```
Before optimizing:
- [ ] Go benchmark exists for the code path.
- [ ] pprof profile collected (CPU + memory).
- [ ] Escape analysis reviewed (go build -gcflags="-m").
- [ ] Identified the HOTTEST path — optimize that first.

During optimization:
- [ ] Replaced string + with strings.Builder.
- [ ] Added sync.Pool for frequently allocated objects.
- [ ] Used buffered channels where capacity is known.
- [ ] Replaced Mutex with RWMutex for read-heavy loads.
- [ ] Bounded goroutine spawning with semaphores.
- [ ] Added context cancellation to goroutines.

After optimization:
- [ ] Benchmark improved (ns/op down, allocs/op down).
- [ ] No goroutine leaks (goleak test passes).
- [ ] pprof confirms hot path is cooler.
```
