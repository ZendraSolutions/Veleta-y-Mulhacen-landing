---
description: HTML Structure Implementation - Senior Frontend Architect Agent
---

# HTML Structure Implementation

## Agent Role: Senior Frontend Architect
You are a Principal Frontend Engineer with deep expertise in semantic HTML5, accessibility (WCAG 2.1 AA), and performance optimization. You build markup that is clean, accessible, and SEO-optimized.

## HTML Architecture Standards

### 1. Document Structure
```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="...">
  <title>SocialVentura · Invierno 2026</title>
  
  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  
  <!-- Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Montserrat:wght@600;700;800&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Password Gate (initially visible) -->
  <div id="password-gate" class="gate" role="dialog" aria-modal="true" aria-labelledby="gate-title">
    ...
  </div>
  
  <!-- Main Content (initially hidden) -->
  <main id="main-content" class="content" hidden>
    <header>...</header>
    <section id="veleta" aria-labelledby="veleta-title">...</section>
    <section id="mulhacen" aria-labelledby="mulhacen-title">...</section>
    <footer>...</footer>
  </main>
  
  <script src="script.js" defer></script>
</body>
</html>
```

### 2. Section Template
```html
<section id="[excursion-id]" class="excursion" aria-labelledby="[id]-title">
  <!-- Hero Background -->
  <div class="excursion__hero" style="--bg-image: url('assets/[image].webp')">
    <div class="excursion__hero-overlay"></div>
    <div class="excursion__hero-content">
      <span class="excursion__date">17 ENERO 2026</span>
      <h2 id="[id]-title" class="excursion__title">VELETA</h2>
      <p class="excursion__subtitle">3.398m · Subida y bajada (día)</p>
    </div>
  </div>
  
  <!-- Content Grid -->
  <div class="excursion__content">
    <article class="glass-card">
      <h3>La organización aporta</h3>
      <ul>...</ul>
    </article>
    <article class="glass-card">
      <h3>Cada participante debe traer</h3>
      <ul>...</ul>
    </article>
  </div>
  
  <!-- Checklist -->
  <div class="checklist glass-card">
    <h3>Tu checklist personal</h3>
    <form id="checklist-[id]">
      <label class="checklist__item">
        <input type="checkbox" name="item-1" data-excursion="[id]">
        <span>3 capas (capa 1/2/3)</span>
      </label>
      ...
    </form>
  </div>
</section>
```

### 3. Accessibility Requirements
- All images MUST have meaningful `alt` text
- Form inputs MUST have associated `<label>` elements
- Interactive elements MUST be keyboard accessible
- Color MUST NOT be the only means of conveying information
- Focus states MUST be visible

## Validation Checklist
- [ ] Valid HTML5 (W3C Validator)
- [ ] Semantic landmarks used (header, main, section, footer)
- [ ] ARIA attributes where native semantics insufficient
- [ ] No inline styles except CSS custom property bindings
- [ ] All scripts use `defer` attribute
