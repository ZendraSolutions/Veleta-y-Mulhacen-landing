---
description: JavaScript Logic Implementation - Senior JavaScript Engineer Agent
---

# JavaScript Logic Implementation

## Agent Role: Senior JavaScript Engineer
You are a Staff JavaScript Engineer specialized in vanilla JS, performance optimization, and bulletproof error handling. You write code that is clean, testable, and defensive.

## Architecture: Module Pattern (IIFE)

### 1. Main Application Structure
```javascript
/**
 * SocialVentura App
 * @description Main application controller for excursion info page
 * @version 1.0.0
 */
const SVApp = (function() {
  'use strict';
  
  // ============================================
  // CONFIGURATION
  // ============================================
  const CONFIG = Object.freeze({
    PASSWORD_HASH: '', // SHA-256 hash of password
    STORAGE_KEYS: {
      SESSION: 'sv_session',
      CHECKLIST_VELETA: 'sv_checklist_veleta',
      CHECKLIST_MULHACEN: 'sv_checklist_mulhacen'
    },
    SELECTORS: {
      GATE: '#password-gate',
      MAIN: '#main-content',
      PASSWORD_INPUT: '#password-input',
      PASSWORD_SUBMIT: '#password-submit',
      PASSWORD_ERROR: '#password-error'
    }
  });
  
  // ============================================
  // STATE
  // ============================================
  let state = {
    isAuthenticated: false,
    checklists: {
      veleta: [],
      mulhacen: []
    }
  };
  
  // ============================================
  // UTILITIES
  // ============================================
  
  /**
   * Simple hash function for password comparison
   * @param {string} str - String to hash
   * @returns {Promise<string>} - Hex hash
   */
  async function hashString(str) {
    const encoder = new TextEncoder();
    const data = encoder.encode(str);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }
  
  /**
   * Safe localStorage getter
   */
  function getStorage(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch {
      return null;
    }
  }
  
  /**
   * Safe localStorage setter
   */
  function setStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      console.warn('localStorage not available');
      return false;
    }
  }
  
  // ============================================
  // MODULES
  // ============================================
  
  const Auth = {
    async validate(password) {
      const hash = await hashString(password);
      return hash === CONFIG.PASSWORD_HASH;
    },
    
    unlock() {
      const gate = document.querySelector(CONFIG.SELECTORS.GATE);
      const main = document.querySelector(CONFIG.SELECTORS.MAIN);
      
      gate.classList.add('gate--hidden');
      main.removeAttribute('hidden');
      main.classList.add('content--visible');
      
      sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, 'true');
      state.isAuthenticated = true;
    },
    
    checkSession() {
      return sessionStorage.getItem(CONFIG.STORAGE_KEYS.SESSION) === 'true';
    }
  };
  
  const Checklist = {
    init(excursionId) {
      const key = CONFIG.STORAGE_KEYS[`CHECKLIST_${excursionId.toUpperCase()}`];
      const saved = getStorage(key) || [];
      const form = document.querySelector(`#checklist-${excursionId}`);
      
      if (!form) return;
      
      // Restore saved state
      saved.forEach(itemName => {
        const input = form.querySelector(`input[name="${itemName}"]`);
        if (input) input.checked = true;
      });
      
      // Listen for changes
      form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox') {
          this.save(excursionId);
        }
      });
    },
    
    save(excursionId) {
      const key = CONFIG.STORAGE_KEYS[`CHECKLIST_${excursionId.toUpperCase()}`];
      const form = document.querySelector(`#checklist-${excursionId}`);
      const checked = Array.from(form.querySelectorAll('input:checked'))
        .map(input => input.name);
      
      setStorage(key, checked);
      state.checklists[excursionId] = checked;
    }
  };
  
  // ============================================
  // EVENT HANDLERS
  // ============================================
  
  function handlePasswordSubmit(e) {
    e.preventDefault();
    const input = document.querySelector(CONFIG.SELECTORS.PASSWORD_INPUT);
    const error = document.querySelector(CONFIG.SELECTORS.PASSWORD_ERROR);
    
    Auth.validate(input.value).then(isValid => {
      if (isValid) {
        Auth.unlock();
      } else {
        error.textContent = 'Contraseña incorrecta';
        error.classList.add('visible');
        input.value = '';
        input.focus();
      }
    });
  }
  
  // ============================================
  // INITIALIZATION
  // ============================================
  
  function init() {
    // Check existing session
    if (Auth.checkSession()) {
      Auth.unlock();
    }
    
    // Setup password form
    const form = document.querySelector('#password-form');
    if (form) {
      form.addEventListener('submit', handlePasswordSubmit);
    }
    
    // Initialize checklists
    Checklist.init('veleta');
    Checklist.init('mulhacen');
    
    console.log('[SVApp] Initialized');
  }
  
  // ============================================
  // PUBLIC API
  // ============================================
  return {
    init,
    // Expose for testing/debugging in development
    _debug: { state, Auth, Checklist }
  };
})();

// Boot
document.addEventListener('DOMContentLoaded', SVApp.init);
```

## Security Notes
- Password hash is stored in code (acceptable for this use case)
- Session stored in sessionStorage (cleared on tab close)
- Checklist stored in localStorage (persistent)

## Validation Checklist
- [ ] No global variables (except SVApp namespace)
- [ ] All async operations use try/catch
- [ ] Event listeners properly attached
- [ ] localStorage operations are defensive
- [ ] Console logs are informative but not verbose
