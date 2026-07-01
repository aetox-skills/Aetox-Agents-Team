# Design Thinking Framework

Load this skill when asked to design a new screen, solve a UX problem, or analyze a user flow. Provides structured thinking before touching any layout or color.

## Problem Framing

Answer these before designing anything:

1. **Who is the user?** — role, context, device, literacy, patience level
2. **What is the user's real goal?** — not what they click, but what they want to accomplish
3. **What is the business goal?** — conversion, retention, engagement, revenue?
4. **What is the primary task?** — the single thing the user must do
5. **What decision must the user make?** — the choice point
6. **What information is required before that decision?**
7. **What can go wrong?** — errors, edge cases, permission, offline, conflict, retry
8. **How does the user recover?** — undo, cancel, go back, retry, contact support

## 10-Step Thinking Process

1. **Frame the problem** — what are we solving, for whom, why now?
2. **Identify goals** — user goal + business goal
3. **Map the flow** — entry → primary task → success → exit
4. **Identify all states** — empty, loading, error, success, permission denied, offline, edge
5. **Define info hierarchy** — what does the user need to see first/second/last?
6. **Choose layout structure** — card, list, table, form, dashboard, wizard?
7. **Select reusable components** — what already exists in the system?
8. **Write UX copy** — labels, CTAs, helper text, errors, empty states, confirmations
9. **Apply accessibility** — contrast, keyboard, focus, labels, reduced motion, touch targets
10. **Validate** — does it pass the principles? Does it ship?

## Task Analysis Table

| Question | Answer |
|----------|--------|
| Primary action | The most important button/gesture |
| Secondary actions | Useful but lower priority |
| What can be removed? | Everything not serving user or business goal |
| Must be visible in 3s | Goal confirmation, primary action, critical info |
| Most likely error | What will users get wrong first? |

## Flow Requirements

- Every flow needs: entry point, loading, content, empty, error, success, exit
- Every destructive action needs confirmation
- Every long process needs progress indication
- Every form needs inline validation feedback
- Every error needs recovery guidance (not just "Something went wrong")
- Every permission gate needs explanation of why it's needed
