// Navigation Component
export class Navigation {
    constructor() {
        this.navToggle = DOM.get('.nav-toggle');
        this.navMenu = DOM.get('.nav-menu');
        this.init();
    }

    init() {
        if (this.navToggle && this.navMenu) {
            this.bindEvents();
        }
    }

    bindEvents() {
        // Toggle mobile menu
        DOM.on(this.navToggle, 'click', (e) => {
            e.stopPropagation();
            this.toggleMenu();
        });

        // Close menu when clicking outside
        DOM.on(document, 'click', (e) => {
            if (!DOM.hasClass(this.navToggle, 'active') && 
                !this.navMenu.contains(e.target)) {
                this.closeMenu();
            }
        });

        // Close menu on escape key
        DOM.on(document, 'keydown', (e) => {
            if (e.key === 'Escape' && DOM.hasClass(this.navMenu, 'active')) {
                this.closeMenu();
            }
        });

        // Handle menu item clicks
        DOM.on(this.navMenu, 'click', (e) => {
            if (e.target.tagName === 'A') {
                this.closeMenu();
            }
        });

        // Handle window resize
        DOM.on(window, 'resize', () => {
            if (window.innerWidth > 768) {
                this.closeMenu();
            }
        });
    }

    toggleMenu() {
        DOM.toggleClass(this.navToggle, 'active');
        DOM.toggleClass(this.navMenu, 'active');
    }

    openMenu() {
        DOM.addClass(this.navToggle, 'active');
        DOM.addClass(this.navMenu, 'active');
    }

    closeMenu() {
        DOM.removeClass(this.navToggle, 'active');
        DOM.removeClass(this.navMenu, 'active');
    }

    // Add keyboard navigation
    enableKeyboardNavigation() {
        const menuItems = DOM.getAll('.nav-menu .nav-link');
        
        DOM.on(this.navMenu, 'keydown', (e) => {
            const currentIndex = Array.from(menuItems).findIndex(item => item === document.activeElement);
            
            switch(e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    this.focusMenuItem(menuItems, currentIndex + 1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.focusMenuItem(menuItems, currentIndex - 1);
                    break;
                case 'Home':
                    e.preventDefault();
                    this.focusMenuItem(menuItems, 0);
                    break;
                case 'End':
                    e.preventDefault();
                    this.focusMenuItem(menuItems, menuItems.length - 1);
                    break;
            }
        });
    }

    focusMenuItem(items, index) {
        if (index >= 0 && index < items.length) {
            items[index].focus();
        }
    }

    // Add smooth scroll to section
    enableSmoothScroll() {
        const links = DOM.getAll('.nav-menu a[href^="#"]');
        
        links.forEach(link => {
            DOM.on(link, 'click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const target = DOM.get(`#${targetId}`);
                
                if (target) {
                    DOM.scrollTo(target, { block: 'start' });
                }
            });
        });
    }

    // Add active state based on scroll
    enableScrollSpy() {
        const sections = DOM.getAll('section[id]');
        const navLinks = DOM.getAll('.nav-menu a[href^="#"]');
        
        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, {
            threshold: 0.1
        });

        sections.forEach(section => observer.observe(section));
    }
}
