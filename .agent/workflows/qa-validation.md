---
description: QA Validation Workflow - Senior QA Engineer Agent
---

# QA Validation Workflow

## Agent Role: Senior QA Engineer
You are a Principal QA Engineer with expertise in web accessibility, cross-browser testing, and user experience validation. You ensure the final product meets enterprise-grade quality standards.

## Testing Matrix

### 1. Functional Tests

| Test Case | Steps | Expected Result |
|-----------|-------|-----------------|
| TC-001: Password Gate Display | Load page | Gate overlay visible, main content hidden |
| TC-002: Wrong Password | Enter "wrong", submit | Error message displays, input cleared |
| TC-003: Correct Password | Enter correct password | Gate fades, content reveals with animation |
| TC-004: Session Persistence | Unlock, refresh page | Content visible without re-entering password |
| TC-005: Session Clear | Unlock, close tab, reopen | Gate visible, must re-enter password |
| TC-006: Checklist Toggle | Click checkbox | Visual checkmark appears |
| TC-007: Checklist Persistence | Check items, refresh | Checked items remain checked |
| TC-008: Checklist Storage | Check items, check localStorage | Correct keys and values stored |

### 2. Visual Tests

| Test Case | Criteria |
|-----------|----------|
| VT-001: Glassmorphism | Cards have blur effect, semi-transparent |
| VT-002: Typography | Montserrat for headings, Inter for body |
| VT-003: Color Contrast | Text readable on all backgrounds |
| VT-004: Animations | Smooth 300ms transitions, no jank |
| VT-005: Mobile Layout | Content stacks, touch targets >= 44px |
| VT-006: Mulhacén Blur | Section has blur overlay with "Próximamente" |

### 3. Responsive Breakpoints

| Viewport | Layout Expectation |
|----------|-------------------|
| 375px (iPhone SE) | Single column, full-width cards |
| 768px (iPad) | Two-column grid for equipment lists |
| 1024px+ (Desktop) | Max-width container, centered |

### 4. Accessibility Audit

```
CHECKLIST:
[ ] Keyboard navigation works (Tab through all interactive elements)
[ ] Enter key submits password form
[ ] Focus visible on all interactive elements
[ ] Screen reader announces gate as modal dialog
[ ] Checkboxes have visible labels
[ ] No horizontal scroll at any viewport
```

### 5. Performance Targets

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Total Blocking Time | < 200ms |
| Cumulative Layout Shift | < 0.1 |

## Browser Testing
// turbo-all

1. Open in Chrome DevTools, test all responsive viewports
2. Open in Firefox, verify visual consistency
3. Open in Safari (if available) or use browser stack
4. Test on actual mobile device if possible

## Defect Severity Levels
- **P0 Critical**: Blocks core functionality (password, checklist save)
- **P1 Major**: Significant visual issues, accessibility failures
- **P2 Minor**: Small visual inconsistencies, polish items
- **P3 Cosmetic**: Nice-to-have improvements
