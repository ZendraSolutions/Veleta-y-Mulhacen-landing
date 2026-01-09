/**
 * SocialVentura App
 * @description Main application controller for excursion info page
 * @author JavaScript Senior Engineer Agent
 * @version 1.0.0
 * 
 * Architecture: IIFE Module Pattern
 * Dependencies: None (Vanilla JS ES6+)
 */
const SVApp = (function () {
    'use strict';

    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = Object.freeze({
        // SHA-256 hash of the password (case-insensitive)
        // Generate new hash: https://emn178.github.io/online-tools/sha256.html
        PASSWORD_HASH: '6405a4228daca8c329bf012169ae77d3474e6564748c7f21e12da4c7da6be973',

        STORAGE_KEYS: Object.freeze({
            SESSION: 'sv_session_2026',
            CHECKLIST_VELETA: 'sv_checklist_veleta',
            CHECKLIST_MULHACEN: 'sv_checklist_mulhacen'
        }),

        SELECTORS: Object.freeze({
            GATE: '#password-gate',
            MAIN: '#main-content',
            PASSWORD_FORM: '#password-form',
            PASSWORD_INPUT: '#password-input',
            PASSWORD_ERROR: '#password-error'
        }),

        ANIMATION_DURATION: 700
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
    // UTILITY FUNCTIONS
    // ============================================

    /**
     * Hash a string using SHA-256
     * @param {string} str - String to hash
     * @returns {Promise<string>} - Hexadecimal hash string
     */
    async function hashString(str) {
        try {
            const encoder = new TextEncoder();
            const data = encoder.encode(str);
            const hashBuffer = await crypto.subtle.digest('SHA-256', data);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        } catch (error) {
            console.error('[SVApp] Hash error:', error);
            return '';
        }
    }

    /**
     * Safely get item from localStorage with JSON parsing
     * @param {string} key - Storage key
     * @returns {any|null} - Parsed value or null
     */
    function getStorage(key) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.warn('[SVApp] Storage read error:', error);
            return null;
        }
    }

    /**
     * Safely set item in localStorage with JSON stringification
     * @param {string} key - Storage key
     * @param {any} value - Value to store
     * @returns {boolean} - Success status
     */
    function setStorage(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.warn('[SVApp] Storage write error:', error);
            return false;
        }
    }

    /**
     * Safely query a DOM element
     * @param {string} selector - CSS selector
     * @returns {Element|null}
     */
    function $(selector) {
        return document.querySelector(selector);
    }

    /**
     * Safely query all matching DOM elements
     * @param {string} selector - CSS selector
     * @returns {NodeListOf<Element>}
     */
    function $$(selector) {
        return document.querySelectorAll(selector);
    }

    // ============================================
    // AUTH MODULE
    // ============================================
    const Auth = {
        /**
         * Validate password against stored hash
         * @param {string} password - User input password
         * @returns {Promise<boolean>}
         */
        async validate(password) {
            const inputHash = await hashString(password.trim().toLowerCase());
            return inputHash === CONFIG.PASSWORD_HASH;
        },

        /**
         * Unlock the content and hide the gate
         */
        unlock() {
            const gate = $(CONFIG.SELECTORS.GATE);
            const main = $(CONFIG.SELECTORS.MAIN);

            if (!gate || !main) {
                console.error('[SVApp] Required elements not found');
                return;
            }

            // Animate gate out
            gate.classList.add('gate--hidden');

            // Show main content
            main.removeAttribute('hidden');

            // Trigger animation after a tick to ensure hidden is removed
            requestAnimationFrame(() => {
                main.classList.add('content--visible');
            });

            // Save session
            sessionStorage.setItem(CONFIG.STORAGE_KEYS.SESSION, 'true');
            state.isAuthenticated = true;

            console.log('[SVApp] Content unlocked');
        },

        /**
         * Check if user has an active session
         * @returns {boolean}
         */
        checkSession() {
            return sessionStorage.getItem(CONFIG.STORAGE_KEYS.SESSION) === 'true';
        },

        /**
         * Show error message
         * @param {string} message - Error text
         */
        showError(message) {
            const error = $(CONFIG.SELECTORS.PASSWORD_ERROR);
            if (error) {
                error.textContent = message;
                error.classList.add('visible');

                // Clear error after 3 seconds
                setTimeout(() => {
                    error.classList.remove('visible');
                }, 3000);
            }
        }
    };

    // ============================================
    // CHECKLIST MODULE
    // ============================================
    const Checklist = {
        /**
         * Initialize a checklist for a specific excursion
         * @param {string} excursionId - 'veleta' or 'mulhacen'
         */
        init(excursionId) {
            const key = CONFIG.STORAGE_KEYS[`CHECKLIST_${excursionId.toUpperCase()}`];
            const saved = getStorage(key) || [];
            const form = $(`#checklist-${excursionId}`);

            if (!form) {
                console.log(`[SVApp] Checklist form for ${excursionId} not found (may be locked)`);
                return;
            }

            // Restore saved state
            saved.forEach(itemName => {
                const input = form.querySelector(`input[name="${itemName}"]`);
                if (input) {
                    input.checked = true;
                }
            });

            // Update progress bar
            this.updateProgress(excursionId);

            // Listen for changes
            form.addEventListener('change', (e) => {
                if (e.target.type === 'checkbox') {
                    this.save(excursionId);
                    this.updateProgress(excursionId);
                }
            });

            console.log(`[SVApp] Checklist ${excursionId} initialized with ${saved.length} items`);
        },

        /**
         * Save current checklist state to localStorage
         * @param {string} excursionId - 'veleta' or 'mulhacen'
         */
        save(excursionId) {
            const key = CONFIG.STORAGE_KEYS[`CHECKLIST_${excursionId.toUpperCase()}`];
            const form = $(`#checklist-${excursionId}`);

            if (!form) return;

            const checked = Array.from(form.querySelectorAll('input:checked'))
                .map(input => input.name);

            setStorage(key, checked);
            state.checklists[excursionId] = checked;
        },

        /**
         * Update progress bar and text
         * @param {string} excursionId - 'veleta' or 'mulhacen'
         */
        updateProgress(excursionId) {
            const form = $(`#checklist-${excursionId}`);
            const progressFill = $(`#${excursionId}-progress-fill`);
            const progressText = $(`#${excursionId}-progress-text`);

            if (!form || !progressFill || !progressText) return;

            const total = form.querySelectorAll('input[type="checkbox"]').length;
            const checked = form.querySelectorAll('input:checked').length;
            const percentage = total > 0 ? Math.round((checked / total) * 100) : 0;

            progressFill.style.width = `${percentage}%`;
            progressText.textContent = `${checked} de ${total} items preparados`;

            // Add celebration effect when complete
            if (checked === total && total > 0) {
                progressFill.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
            } else {
                progressFill.style.boxShadow = 'none';
            }
        },

        /**
         * Clear all checklists (for testing)
         */
        clearAll() {
            Object.values(CONFIG.STORAGE_KEYS).forEach(key => {
                if (key.includes('checklist')) {
                    localStorage.removeItem(key);
                }
            });
            console.log('[SVApp] All checklists cleared');
        }
    };

    // ============================================
    // EVENT HANDLERS
    // ============================================

    /**
     * Handle password form submission
     * @param {Event} e - Submit event
     */
    async function handlePasswordSubmit(e) {
        e.preventDefault();

        const input = $(CONFIG.SELECTORS.PASSWORD_INPUT);
        if (!input) return;

        const password = input.value;

        if (!password.trim()) {
            Auth.showError('Por favor, introduce la contraseña');
            return;
        }

        // Show loading state
        const submitBtn = $(`${CONFIG.SELECTORS.PASSWORD_FORM} button[type="submit"]`);
        if (submitBtn) {
            submitBtn.textContent = 'Verificando...';
            submitBtn.disabled = true;
        }

        const isValid = await Auth.validate(password);

        if (isValid) {
            Auth.unlock();
        } else {
            Auth.showError('Contraseña incorrecta');
            input.value = '';
            input.focus();

            // Reset button
            if (submitBtn) {
                submitBtn.textContent = 'Acceder';
                submitBtn.disabled = false;
            }
        }
    }

    // ============================================
    // SCROLL ANIMATIONS
    // ============================================
    const ScrollAnimations = {
        observer: null,

        init() {
            // Check for IntersectionObserver support
            if (!('IntersectionObserver' in window)) {
                console.log('[SVApp] IntersectionObserver not supported');
                return;
            }

            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('animate-fade-in-up');
                            this.observer.unobserve(entry.target);
                        }
                    });
                },
                {
                    threshold: 0.1,
                    rootMargin: '0px 0px -50px 0px'
                }
            );

            // Observe elements with data-animate attribute
            $$('[data-animate]').forEach(el => {
                el.style.opacity = '0';
                this.observer.observe(el);
            });
        }
    };

    // ============================================
    // INITIALIZATION
    // ============================================

    /**
     * Main initialization function
     */
    function init() {
        console.log('[SVApp] Initializing...');

        // Check existing session
        if (Auth.checkSession()) {
            console.log('[SVApp] Existing session found');
            Auth.unlock();
        }

        // Setup password form
        const form = $(CONFIG.SELECTORS.PASSWORD_FORM);
        if (form) {
            form.addEventListener('submit', handlePasswordSubmit);

            // Focus input on load
            const input = $(CONFIG.SELECTORS.PASSWORD_INPUT);
            if (input && !Auth.checkSession()) {
                setTimeout(() => input.focus(), 100);
            }
        }

        // Initialize checklists
        Checklist.init('veleta');
        Checklist.init('mulhacen');

        // Initialize scroll animations
        ScrollAnimations.init();

        console.log('[SVApp] Initialization complete');
    }

    // ============================================
    // PUBLIC API
    // ============================================
    return {
        init
    };
})();

// ============================================
// BOOT APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', SVApp.init);

// ============================================
// PASSWORD HASH GENERATOR (Development Only)
// ============================================
// To generate a new password hash, run this in the browser console:
// (async () => {
//   const password = 'YOUR_PASSWORD_HERE';
//   const hash = await SVApp._debug.hashString(password.toLowerCase());
//   console.log('Password:', password);
//   console.log('Hash:', hash);
// })();
