# 🎯 ORCHESTRATOR MANIFEST

## Project: SocialVentura Landing Page
## Budget: $30,000 USD
## Quality Level: Enterprise-Grade

---

## 🏛️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                      ORCHESTRATOR (ME)                       │
│         Role: Technical Lead / Quality Gatekeeper           │
│         Responsibility: Review, Validate, Approve           │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│  UI/UX Agent  │    │  Frontend     │    │  JavaScript   │
│  Senior Level │    │  Architect    │    │  Engineer     │
│               │    │  Senior Level │    │  Senior Level │
└───────┬───────┘    └───────┬───────┘    └───────┬───────┘
        │                    │                    │
        │  Deliverable:      │  Deliverable:      │  Deliverable:
        │  style.css         │  index.html        │  script.js
        │  Design System     │  Semantic          │  App Logic
        │                    │  Structure         │  
        └────────────────────┴────────────────────┘
                              │
                              ▼
                    ┌───────────────┐
                    │  QA Engineer  │
                    │  Senior Level │
                    │               │
                    │  Validates    │
                    │  ALL outputs  │
                    └───────────────┘
```

---

## 📋 Execution Protocol

### Phase 1: Asset Generation
1. Generate premium mountain imagery
2. Optimize for web (WebP format)
3. Verify visual quality

### Phase 2: Implementation
Execute in order:
1. **UI/UX Agent** → Creates `style.css` following `.agent/workflows/design-system.md`
2. **Frontend Architect** → Creates `index.html` following `.agent/workflows/html-structure.md`
3. **JavaScript Engineer** → Creates `script.js` following `.agent/workflows/javascript-logic.md`

### Phase 3: Quality Assurance
1. **QA Agent** validates all deliverables using `.agent/workflows/qa-validation.md`
2. **Orchestrator** performs final review
3. Fix any P0/P1 defects before delivery

### Phase 4: Documentation & Delivery
1. Create comprehensive `README.md`
2. Document deployment steps for GitHub Pages
3. Create `walkthrough.md` with proof of work

---

## 🔒 Quality Gates

Each deliverable MUST pass:
- [ ] Code follows workflow specifications
- [ ] No hardcoded values (uses CSS variables, config objects)
- [ ] Accessibility compliant
- [ ] Mobile responsive
- [ ] Performs within targets

---

## 📁 Project Structure

```
Veleta y Mulhacen landing/
├── .agent/
│   ├── ORCHESTRATOR.md          # This file
│   └── workflows/
│       ├── design-system.md     # UI/UX Agent instructions
│       ├── html-structure.md    # Frontend Architect instructions
│       ├── javascript-logic.md  # JavaScript Engineer instructions
│       └── qa-validation.md     # QA Engineer checklist
├── assets/
│   └── images/
│       ├── hero-veleta.webp     # Generated hero image
│       └── hero-mulhacen.webp   # Generated hero image
├── index.html                   # Main HTML file
├── style.css                    # Design system + components
├── script.js                    # Application logic
└── README.md                    # Deployment documentation
```

---

## 🚨 Escalation Protocol

If any agent encounters a blocker:
1. Document the issue clearly
2. Propose alternatives
3. Escalate to Orchestrator for decision
4. DO NOT proceed without resolution

---

## ✅ Sign-Off Requirements

Final delivery requires:
- [ ] All functional tests passing
- [ ] Visual QA approved
- [ ] Mobile testing complete
- [ ] Accessibility audit passed
- [ ] Performance targets met
- [ ] Documentation complete
- [ ] Orchestrator final approval
