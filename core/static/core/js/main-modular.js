// Main Application Entry Point - Modular Version
import { DOM } from './utils/dom.js';
import { Validation } from './utils/validation.js';
import { Navigation } from './components/navigation.js';
import { FormHandler } from './components/forms.js';

class App {
    constructor() {
        this.version = '1.0.0';
        this.init();
    }

    init() {
        console.log(`🚀 Django CRUD App v${this.version} starting...`);
        
        // Initialize components
        this.initializeNavigation();
        this.initializeForms();
        this.initializeSearch();
        this.initializeTooltips();
        this.initializeBackToTop();
        this.initializeKeyboardShortcuts();
        this.initializeAnimations();
        
        // Add page load animation
        this.addPageLoadAnimation();
        
        console.log('✅ App initialized successfully');
    }

    initializeNavigation() {
        this.navigation = new Navigation();
        
        // Enable additional features
        this.navigation.enableKeyboardNavigation();
        this.navigation.enableSmoothScroll();
        this.navigation.enableScrollSpy();
    }

    initializeForms() {
        const forms = DOM.getAll('form');
        forms.forEach(form => {
            new FormHandler(form, {
                validateOnSubmit: true,
                validateOnInput: true,
                showErrors: true
            });
        });
    }

    initializeSearch() {
        const searchInputs = DOM.getAll('.search-input');
        searchInputs.forEach(input => {
            let searchTimeout;
            
            DOM.on(input, 'input', () => {
                clearTimeout(searchTimeout);
                searchTimeout = setTimeout(() => {
                    this.handleSearch(input.value);
                }, 300);
            });
            
            // Add search hint
            this.addSearchHint(input);
        });
    }

    handleSearch(query) {
        if (query.length > 2) {
            // Add loading state
            DOM.style(DOM.get('.search-form'), {
                transform: 'scale(1.02)'
            });
            
            // Simulate search delay
            setTimeout(() => {
                DOM.style(DOM.get('.search-form'), {
                    transform: 'scale(1)'
                });
            }, 500);
        }
    }

    addSearchHint(input) {
        const hint = DOM.create('small', {
            className: 'search-hint',
            innerHTML: '💡 Tip: Press <kbd>Ctrl+K</kbd> to quickly focus search'
        });
        
        const form = input.closest('.search-form');
        if (form && !form.querySelector('.search-hint')) {
            form.appendChild(hint);
        }
    }

    initializeTooltips() {
        const elementsWithTitles = DOM.getAll('[title]');
        elementsWithTitles.forEach(element => {
            const title = element.getAttribute('title');
            element.removeAttribute('title');
            
            DOM.on(element, 'mouseenter', () => {
                this.showTooltip(element, title);
            });
            
            DOM.on(element, 'mouseleave', () => {
                this.hideTooltip(element);
            });
        });
    }

    showTooltip(element, text) {
        const tooltip = DOM.create('div', {
            className: 'tooltip',
            innerHTML: text
        });
        
        DOM.style(tooltip, {
            position: 'absolute',
            background: 'var(--dark-text)',
            color: 'white',
            padding: '0.5rem',
            borderRadius: '4px',
            fontSize: '0.875rem',
            zIndex: '1000',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)'
        });
        
        DOM.style(element, { position: 'relative' });
        element.appendChild(tooltip);
    }

    hideTooltip(element) {
        const tooltip = element.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    initializeBackToTop() {
        const backToTopBtn = DOM.get('#backToTop');
        if (backToTopBtn) {
            DOM.on(window, 'scroll', () => {
                if (window.pageYOffset > 300) {
                    DOM.addClass(backToTopBtn, 'show');
                } else {
                    DOM.removeClass(backToTopBtn, 'show');
                }
            });
        }
    }

    initializeKeyboardShortcuts() {
        DOM.on(document, 'keydown', (e) => {
            // Ctrl/Cmd + K for search focus
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                const searchInput = DOM.get('.search-input');
                if (searchInput) {
                    searchInput.focus();
                    DOM.scrollTo(searchInput, { block: 'center' });
                }
            }
            
            // Ctrl/Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showHelp();
            }
        });
    }

    initializeAnimations() {
        // Auto-hide messages with animation
        const messages = DOM.getAll('.message');
        messages.forEach((message, index) => {
            setTimeout(() => {
                DOM.style(message, {
                    opacity: '0',
                    transform: 'translateX(100px)'
                });
                
                setTimeout(() => {
                    message.remove();
                }, 300);
            }, 5000 + (index * 500));
        });

        // Add hover effects to table rows
        const tableRows = DOM.getAll('tbody tr');
        tableRows.forEach(row => {
            DOM.on(row, 'mouseenter', () => {
                DOM.style(row, {
                    transform: 'scale(1.02)',
                    boxShadow: 'var(--shadow-md)'
                });
            });
            
            DOM.on(row, 'mouseleave', () => {
                DOM.style(row, {
                    transform: 'scale(1)',
                    boxShadow: 'none'
                });
            });
        });
    }

    addPageLoadAnimation() {
        DOM.style(document.body, {
            opacity: '0',
            transition: 'opacity 0.5s ease'
        });
        
        DOM.on(window, 'load', () => {
            DOM.style(document.body, { opacity: '1' });
        });
    }

    showHelp() {
        const helpModal = DOM.create('div', {
            className: 'help-modal',
            innerHTML: `
                <div class="help-content">
                    <h3>⌨️ Keyboard Shortcuts</h3>
                    <div class="shortcuts-grid">
                        <div class="shortcut">
                            <kbd>Ctrl</kbd> + <kbd>K</kbd>
                            <span>Focus Search</span>
                        </div>
                        <div class="shortcut">
                            <kbd>Ctrl</kbd> + <kbd>/</kbd>
                            <span>Show Help</span>
                        </div>
                        <div class="shortcut">
                            <kbd>Esc</kbd>
                            <span>Close Menu</span>
                        </div>
                    </div>
                    <button class="btn btn-primary" onclick="this.closest('.help-modal').remove()">
                        Close
                    </button>
                </div>
            `
        });
        
        document.body.appendChild(helpModal);
        
        // Auto-close after 10 seconds
        setTimeout(() => {
            if (helpModal.parentNode) {
                helpModal.remove();
            }
        }, 10000);
    }

    // Global message function
    showMessage(message, type = 'success', duration = 5000) {
        const messageDiv = DOM.create('div', {
            className: `message message-${type} message-slide-in`,
            innerHTML: `
                <div class="message-icon">
                    ${type === 'success' ? '✅' : ''}
                    ${type === 'error' ? '❌' : ''}
                    ${type === 'warning' ? '⚠️' : ''}
                    ${type === 'info' ? 'ℹ️' : ''}
                </div>
                <div class="message-content">${message}</div>
                <button class="message-close" onclick="this.parentElement.remove()">×</button>
            `
        });
        
        const messagesContainer = DOM.get('.messages-container') || DOM.get('.content-wrapper');
        if (messagesContainer) {
            messagesContainer.insertBefore(messageDiv, messagesContainer.firstChild);
            
            setTimeout(() => {
                DOM.style(messageDiv, {
                    opacity: '0',
                    transform: 'translateX(100px)'
                });
                
                setTimeout(() => {
                    messageDiv.remove();
                }, 300);
            }, duration);
        }
    }
}

// Global utility functions
window.scrollToTop = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

window.showMessage = (message, type = 'success') => {
    if (window.app) {
        window.app.showMessage(message, type);
    }
};

// Initialize app when DOM is ready
DOM.on(document, 'DOMContentLoaded', () => {
    window.app = new App();
});

// Export for module usage
export { App, DOM, Validation };
