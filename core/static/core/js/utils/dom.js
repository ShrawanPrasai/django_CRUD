// DOM Utilities
export const DOM = {
    // Element selection
    get(selector) {
        return document.querySelector(selector);
    },

    getAll(selector) {
        return document.querySelectorAll(selector);
    },

    // Element creation
    create(tag, attributes = {}, content = '') {
        const element = document.createElement(tag);
        
        Object.keys(attributes).forEach(key => {
            if (key === 'className') {
                element.className = attributes[key];
            } else if (key === 'innerHTML') {
                element.innerHTML = attributes[key];
            } else {
                element.setAttribute(key, attributes[key]);
            }
        });
        
        if (content) {
            element.innerHTML = content;
        }
        
        return element;
    },

    // Element manipulation
    addClass(element, className) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.classList.add(className);
        }
    },

    removeClass(element, className) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.classList.remove(className);
        }
    },

    toggleClass(element, className) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.classList.toggle(className);
        }
    },

    hasClass(element, className) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        return element ? element.classList.contains(className) : false;
    },

    // Event handling
    on(element, event, handler, options = {}) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.addEventListener(event, handler, options);
        }
    },

    off(element, event, handler) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.removeEventListener(event, handler);
        }
    },

    // Style manipulation
    style(element, styles) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            Object.keys(styles).forEach(property => {
                element.style[property] = styles[property];
            });
        }
    },

    // Content manipulation
    html(element, content) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.innerHTML = content;
        }
    },

    text(element, content) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.textContent = content;
        }
    },

    // Visibility
    show(element) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.style.display = '';
        }
    },

    hide(element) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.style.display = 'none';
        }
    },

    // Animation
    animate(element, keyframes, options = {}) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            return element.animate(keyframes, options);
        }
    },

    // Scroll utilities
    scrollTo(element, options = {}) {
        if (typeof element === 'string') {
            element = this.get(element);
        }
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                ...options
            });
        }
    },

    // Form utilities
    serialize(form) {
        if (typeof form === 'string') {
            form = this.get(form);
        }
        if (form) {
            const formData = new FormData(form);
            return Object.fromEntries(formData.entries());
        }
    },

    // Cookie utilities
    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        }
        return null;
    },

    setCookie(name, value, days = 7) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `expires=${date.toUTCString()}`;
        document.cookie = `${name}=${value};${expires};path=/`;
    },

    // Local storage utilities
    storage: {
        get(key) {
            try {
                return JSON.parse(localStorage.getItem(key));
            } catch {
                return localStorage.getItem(key);
            }
        },

        set(key, value) {
            localStorage.setItem(key, JSON.stringify(value));
        },

        remove(key) {
            localStorage.removeItem(key);
        },

        clear() {
            localStorage.clear();
        }
    }
};
