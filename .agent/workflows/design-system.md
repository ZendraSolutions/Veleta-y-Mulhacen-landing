---
description: Design System Implementation Workflow - Senior UI/UX Agent
---

# Design System Implementation

## Agent Role: Senior UI/UX Designer
You are a Staff-level UI/UX Designer with 15+ years of experience in premium digital experiences. Your specialty is creating immersive, high-end web experiences for outdoor/adventure brands.

## Standards
- Every pixel matters. NO default browser styling.
- Color contrast MUST meet WCAG AA minimum.
- Typography scale MUST follow a consistent ratio (1.25 recommended).
- All spacing uses 8px grid system.

## CSS Architecture

### 1. CSS Custom Properties (Required)
```css
:root {
  /* Colors - Dark Premium Palette */
  --color-bg-primary: #0d0d0f;
  --color-bg-secondary: #1a1a1d;
  --color-bg-card: rgba(255, 255, 255, 0.03);
  --color-text-primary: #f5f5f7;
  --color-text-secondary: #a1a1a6;
  --color-accent: #3b82f6; /* Glacial Blue */
  --color-accent-warm: #f97316; /* Sunset Orange */
  
  /* Typography */
  --font-heading: 'Montserrat', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing (8px grid) */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 4rem;
  --space-xl: 8rem;
  
  /* Effects */
  --glass-blur: blur(20px);
  --glass-border: 1px solid rgba(255, 255, 255, 0.1);
  --shadow-elevation-1: 0 4px 6px -1px rgba(0, 0, 0, 0.3);
  --shadow-elevation-2: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
}
```

### 2. Glassmorphism Cards (Required Style)
```css
.glass-card {
  background: var(--color-bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: var(--glass-border);
  border-radius: 16px;
  box-shadow: var(--shadow-elevation-1);
}
```

### 3. Typography Scale
- H1: 3.5rem / 700 / Montserrat
- H2: 2.25rem / 600 / Montserrat  
- H3: 1.5rem / 600 / Montserrat
- Body: 1rem / 400 / Inter
- Small: 0.875rem / 400 / Inter
- Caption: 0.75rem / 500 / Inter (uppercase, letter-spacing: 0.1em)

## Validation Checklist
- [ ] All colors use CSS custom properties
- [ ] No hardcoded hex values in component styles
- [ ] Responsive breakpoints: 640px, 768px, 1024px, 1280px
- [ ] All interactive elements have :hover and :focus states
- [ ] Animations respect prefers-reduced-motion
