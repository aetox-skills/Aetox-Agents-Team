---
name: frontend-state-management
description: State management patterns for frontend agents. Use when building React/Next.js components that manage data, handle async state (loading/error/empty), share state across components, implement optimistic updates, or debug stale/duplicated state. Load before any non-trivial component work — state is the #1 source of frontend bugs.
---

# Frontend State Management

State is the #1 source of frontend bugs. Treat state like you treat class design in Python — category first, pattern second, tool last.

## Core Principle

```
Split state by source, not by convenience.
Server state lives on the server. Client state lives in the UI.
Never mix them. Never duplicate server state into client state.
```

---

## 1. State Categories — Identify First

Every piece of state belongs to exactly ONE category. Classify before choosing a tool.

| Category | Source | Examples | Tool |
|----------|--------|----------|------|
| **Server state** | API/database | list of bookings, user profile, settings | TanStack Query / SWR |
| **Client state** | UI interaction | modal open/close, theme, sidebar collapsed | useState / useReducer |
| **Form state** | User input | login form, booking form, search filters | React Hook Form + Zod |
| **URL state** | Browser URL | search query, page number, selected tab, filters | useSearchParams / router.query |

If you cannot classify it → it's probably server state. Default to server state.

---

## 2. Server State Pattern — TanStack Query

**Rule:** ALL data from API must go through a server-state library. Never `useState + useEffect + fetch`.

```typescript
// ❌ NEVER do this — loading/error handled per-component, duplicate fetches, no cache
const [data, setData] = useState(null);
useEffect(() => { fetch('/api/bookings').then(r => r.json()).then(setData) }, []);

// ✅ ALWAYS do this — loading/error/empty built-in, deduplicated, cached, refetchable
const { data, isLoading, isError, error } = useQuery({
  queryKey: ['bookings', date],
  queryFn: () => fetchBookings(date),
  staleTime: 5 * 60 * 1000,  // 5 min before refetch
});
```

### Query Key Rules

```
queryKey structure: ['resource', ...filters, ...params]
Example: ['bookings', date, courtId]
Example: ['user', userId, 'profile']

Rules:
- Flat array, not nested objects.
- Every filter/param that changes the result goes in the key.
- TanStack Query caches by key — same key = same cache entry.
```

### Stale Time Decision

```
Realtime data (live scores, chat)     → staleTime: 0 (always refetch)
Frequently changing (bookings today)  → staleTime: 30_000 (30s)
Normal data (user profile, settings)  → staleTime: 5 * 60 * 1000 (5min)
Static data (config, translations)    → staleTime: Infinity (never auto-refetch)
```

---

## 3. Loading / Error / Empty Protocol

Every component that shows server data MUST handle these four states. No exceptions.

```typescript
// Use discriminated union — never boolean flags
type AsyncState<T> =
  | { status: 'loading' }
  | { status: 'empty' }
  | { status: 'error'; error: Error; retry: () => void }
  | { status: 'success'; data: T };

// In component:
if (isLoading) return <Skeleton />;           // NOT a spinner — show structure
if (isError)   return <ErrorBanner error={error} onRetry={refetch} />;
if (!data || data.length === 0) return <EmptyState action={createNew} />;
return <RealContent data={data} />;
```

### Loading Rules
- Show skeleton (content shape), not a spinner.
- Skeleton matches real layout — prevents layout shift when data arrives.
- Never show a blank screen while loading.

### Empty Rules
- Empty ≠ error. User did nothing wrong — there's just no data.
- Show CTA: "Create your first booking" / "No results. Try different filters."
- Never show an error icon for empty state.

### Error Rules
- Show what went wrong in user language (not "TypeError: undefined is not iterable").
- Always provide retry action.
- If critical (page can't work without data) → full error page with retry.
- If non-critical (one widget) → inline error, don't break the whole page.

---

## 4. Cache Invalidation

After every mutation (POST/PUT/PATCH/DELETE), invalidate affected queries.

```typescript
const mutation = useMutation({
  mutationFn: createBooking,
  onSuccess: () => {
    // Invalidate ALL queries that may be affected
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
    queryClient.invalidateQueries({ queryKey: ['courts', 'availability'] });
  },
});
```

### Invalidation Rules
```
Create → invalidate list queries for that resource
Update → invalidate detail + list queries for that resource
Delete → invalidate list queries + remove detail from cache
        queryClient.removeQueries({ queryKey: ['bookings', deletedId] });

Rule: When in doubt, invalidate more. Stale data is worse than one extra fetch.
```

---

## 5. Optimistic Update + Rollback

When the mutation will almost certainly succeed, update UI immediately.

```typescript
const mutation = useMutation({
  mutationFn: updateBookingStatus,
  onMutate: async (updated) => {
    await queryClient.cancelQueries({ queryKey: ['bookings'] });
    const previous = queryClient.getQueryData(['bookings']);
    
    // Optimistically update cache
    queryClient.setQueryData(['bookings'], (old) =>
      old.map(b => b.id === updated.id ? { ...b, ...updated } : b)
    );
    
    return { previous };  // For rollback
  },
  onError: (err, updated, context) => {
    // Rollback on failure
    queryClient.setQueryData(['bookings'], context.previous);
    toast.error('Failed to update. Reverted.');
  },
  onSettled: () => {
    // Always refetch to sync with server truth
    queryClient.invalidateQueries({ queryKey: ['bookings'] });
  },
});
```

### Optimistic Update Rules
- Only for high-confidence mutations (>95% success rate).
- Always implement rollback on error.
- Always invalidate on settled (refetch from server as source of truth).
- NEVER optimistic for: payments, deletes, auth changes.

---

## 6. Client State Rules

Client state is for UI-only concerns. Keep it local and minimal.

```typescript
// Local state — co-locate with the component that uses it
const [isOpen, setIsOpen] = useState(false);           // modal, dropdown
const [selectedTab, setSelectedTab] = useState('info'); // tabs

// Shared but small — lift to nearest common parent
// ❌ Don't put everything in global state
// ✅ Lift only when 3+ components need it

// Complex shared client state — useReducer (NOT multiple useState)
const [state, dispatch] = useReducer(cartReducer, initialState);
```

### When NOT to use global state (Zustand, Redux, Context)
```
Global state is for: auth user, theme, locale.
NOT for: form data, selection state, modal visibility, API data.
If only one page needs it → it's not global.
```

---

## 7. Form State Pattern

Forms have their own lifecycle. Don't mix form state with server state or client state.

```typescript
// React Hook Form + Zod — handle validation at the schema level
const schema = z.object({
  email: z.string().email('Invalid email'),
  date: z.string().refine(d => new Date(d) > new Date(), 'Must be future date'),
});

const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
  resolver: zodResolver(schema),
});

// Form states:
// - default (empty form)
// - dirty (user started typing)
// - validating (onBlur / onSubmit)
// - submitting (isSubmitting = true)
// - success (onSuccess callback)
// - error (server validation errors — map to fields)
```

### Form Rules
- Validate early: schema on blur, server on submit.
- Disable submit button during submission (prevent double-submit).
- Show field-level errors next to the field, not in a toast.
- Server errors → map to the right field if possible, otherwise show as form-level error.
- Keep dirty state in form — don't push to global state.

---

## 8. URL State Pattern

For shareable, bookmarkable state — use URL search params.

```
URL state is for: search queries, filters, page numbers, sort order, selected item.
NOT for: passwords, tokens, transient UI state.

✅ https://app.com/bookings?date=2026-07-01&court=3&page=2
❌ https://app.com/bookings?modalOpen=true&sidebarCollapsed=false
```

```typescript
// Next.js
import { useSearchParams, useRouter } from 'next/navigation';

const searchParams = useSearchParams();
const date = searchParams.get('date') || today;
const page = Number(searchParams.get('page')) || 1;

const router = useRouter();
const setFilter = (key: string, value: string) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  router.push(`?${params.toString()}`);
};
```

---

## 9. Component Architecture with State

How to structure a page component with multiple state sources:

```typescript
// Page: /bookings
export default function BookingsPage() {
  // URL state: filters
  const searchParams = useSearchParams();
  const date = searchParams.get('date') || today;

  // Server state: data
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['bookings', date],
    queryFn: () => fetchBookings(date),
  });

  // Client state: UI
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  // Order matters: loading → error → empty → content
  if (isLoading) return <BookingsSkeleton />;
  if (isError) return <ErrorBanner error={error} onRetry={refetch} />;
  if (!data?.length) return <EmptyBookings />;

  return (
    <>
      <Filters date={date} />
      <BookingList data={data} selected={selectedBooking} onSelect={setSelectedBooking} />
      {selectedBooking && <BookingDetail id={selectedBooking} />}
    </>
  );
}
```

---

## 10. Anti-patterns

| Anti-pattern | Why it's bad | Fix |
|-------------|-------------|-----|
| `useState + useEffect + fetch` | No cache, no dedup, loading handled per-component | Use TanStack Query |
| Duplicating server state into client state | Two sources of truth, drift guaranteed | Use query cache directly |
| Prop drilling > 3 levels | Refactoring nightmare, unnecessary re-renders | Composition or context for shared state |
| Putting everything in global store | Over-engineering, hard to trace data flow | Co-locate state, lift only when needed |
| `useEffect` for deriving state | Unnecessary re-renders, stale closures | Derive during render: `const fullName = firstName + lastName` |
| `useEffect` for event handlers | Wrong tool — side effects, not reactions | Use event handler directly |
| Multiple `useState` for related values | State split across renders causes bugs | `useReducer` for related state |
| Boolean flags for async states | Impossible combination: `isLoading && isError` | Discriminated union: `{ status: 'loading' }` |
| Skipping empty state | User sees nothing and assumes it's broken | Always handle empty explicitly |
| No error retry | User stuck on error page | Every error UI must have retry |

---

## 11. Decision Tree

```
Data comes from API?
├── YES → TanStack Query (server state)
│   ├── Needs to be realtime? → staleTime: 0 + refetchInterval
│   ├── Mutation? → useMutation + invalidateQueries
│   └── High-confidence mutation? → optimistic update + rollback
│
└── NO → Client state
    ├── Only this component uses it? → useState (local)
    ├── 2-3 sibling components share it? → lift to parent
    ├── Many components across tree? → context or Zustand
    ├── Complex logic with multiple sub-values? → useReducer
    └── Only exists in URL? → useSearchParams (don't duplicate to state)
```

---

## 12. Quick Checklist

Before submitting any component:

```
State classification:
- [ ] Every piece of state is classified (server | client | form | URL).
- [ ] No server state duplicated into client state.

Server state:
- [ ] Uses TanStack Query (or SWR) — no manual fetch + useState.
- [ ] queryKey follows convention: ['resource', ...filters].
- [ ] staleTime is set based on data freshness needs.
- [ ] Mutations invalidate ALL affected queries.

Async handling:
- [ ] Loading shows skeleton (structure), not spinner.
- [ ] Empty shows CTA, not error.
- [ ] Error shows user message + retry action.
- [ ] All four states handled: loading | empty | error | success.

Client state:
- [ ] State is co-located with the component that uses it.
- [ ] No prop drilling deeper than 3 levels.
- [ ] Global state only for truly global concerns (auth, theme, locale).

Forms:
- [ ] Uses React Hook Form + Zod (not manual useState per field).
- [ ] Submit button disabled during submission.
- [ ] Field-level errors shown inline.

URL state:
- [ ] Shareable state is in URL (filters, page, sort).
- [ ] Transient UI state is NOT in URL (modal, dropdown).
```
