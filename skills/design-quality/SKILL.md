# Design Quality & Review

Load this skill when asked to review, audit, or polish existing UI, or before finalizing a design. Provides structured scoring and anti-pattern detection.

## Quality Rubric (0-100)

| Criteria | Weight | What it measures |
|----------|--------|-----------------|
| User Fit | 15 | Does it match the user's mental model and context? |
| Task Clarity | 15 | Can the user tell what to do immediately? |
| Flow Efficiency | 12 | How many steps to complete the task? |
| Info Hierarchy | 10 | Is the right content most prominent? |
| Interaction Safety | 10 | Can users undo, recover, avoid errors? |
| Accessibility | 12 | Contrast, keyboard, focus, labels, touch, motion |
| Visual Consistency | 8 | Matches existing design system and patterns |
| Content Quality | 6 | Copy is clear, helpful, and direct |
| Feasibility | 6 | Can this be built with available tech/timeline? |
| Business Alignment | 6 | Does this serve the business goal? |

**Score meaning:**
- 90-100: production-ready
- 80-89: strong but needs small fixes
- 70-79: acceptable prototype
- 60-69: not ready for development
- below 60: visual draft only, not a real design

## Review Checklist

Before calling any design done, verify:

1. Is the user goal obvious at a glance?
2. Is the primary action obvious?
3. Is the hierarchy clear within 3 seconds?
4. Are all states designed (empty, loading, error, success, edge)?
5. Are errors preventable? Can users recover from mistakes?
6. Is it keyboard accessible? Does contrast pass?
7. Does it work on mobile?
8. Are components reusable (not one-off)?
9. Is the copy clear? (No "Submit", "Click here", "Manage" without context)
10. Does it follow the existing design system?
11. Is there a measurable success metric?

## Anti-Patterns

Do not:

- Start with colors before structure
- Add decoration without purpose
- Use vague CTAs: Submit, Click here, Manage, Continue (without context)
- Ignore empty/loading/error/success/edge states
- Use color as the only signal
- Create one-off components when reusable ones exist
- Design desktop-only
- Hide destructive actions without confirmation
- Overuse modals (another modal inside a modal = bad)
- Build dashboards full of charts that answer no user question
- Add animation that slows down task completion
- Use motion without reduced-motion fallback
- Use images without checking relevance, quality, licensing, performance
- Output a design without any developer handoff context
- Prioritize trends over clarity
