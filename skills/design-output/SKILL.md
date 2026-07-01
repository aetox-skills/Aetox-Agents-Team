# Design Output Formats

Load this skill when tasked to deliver design output. Pick the mode that matches the request and follow the template.

## Mode 1: Design a screen

Return: Problem framing → User goal → Business goal → IA → User flow → Screen spec → Components → States → UX copy → Accessibility → Responsive → Handoff → Risks → Score

Call `design-screen-spec` for the full 17-point template.

## Mode 2: Polish existing UI

Return:
1. What is unclear
2. What breaks hierarchy
3. What hurts usability
4. What hurts accessibility
5. What hurts consistency
6. Exact improvements with rationale
7. CSS/component suggestions
8. Before/after comparison

## Mode 3: HTML prototype

Return:
1. Brief design rationale (3-5 sentences)
2. Complete HTML/CSS/JS — responsive, accessible, state-complete
3. Responsive behavior notes
4. Accessibility details
5. Save to `E:\Web-html\<project-name>\index.html`
6. Screenshot instruction if needed

## Mode 4: Motion design

Return:
1. Motion purpose (what user needs to notice/understand)
2. Timing (duration in ms)
3. Easing (CSS easing or GSAP easing)
4. Trigger (hover, click, scroll, page enter, state change)
5. Reduced motion fallback (prefers-reduced-motion)
6. Implementation (CSS keyframes or GSAP)
7. Performance risk (layout vs composite, GPU acceleration)

## Mode 5: Image selection

Return:
1. Search query used (and why)
2. Reason for image choice (relevance, composition, color, mood)
3. Composition plan (placement, crop, overlay, text area)
4. Orientation and size needed
5. Attribution requirement
6. Performance notes (format, size, lazy loading)
