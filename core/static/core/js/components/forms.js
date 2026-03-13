// Form Components
export class FormHandler {
    constructor(formSelector, options = {}) {
        this.form = DOM.get(formSelector);
        this.options = {
            validateOnSubmit: true,
            validateOnInput: false,
            showErrors: true,
            resetOnSubmit: false,
            ...options
        };
        
        if (this.form) {
            this.init();
        }
    }

    init() {
        this.bindEvents();
        this.enhanceFields();
    }

    bindEvents() {
        if (this.options.validateOnSubmit) {
            DOM.on(this.form, 'submit', (e) => this.handleSubmit(e));
        }

        if (this.options.validateOnInput) {
            DOM.on(this.form, 'input', (e) => this.handleInput(e));
        }

        // Add field focus effects
        DOM.on(this.form, 'focus', (e) => this.handleFieldFocus(e), true);
        DOM.on(this.form, 'blur', (e) => this.handleFieldBlur(e), true);
    }

    enhanceFields() {
        const fields = DOM.getAll('input, textarea, select');
        fields.forEach(field => {
            this.addFieldEffects(field);
        });
    }

    addFieldEffects(field) {
        // Add floating labels for text inputs
        if (field.type === 'text' || field.type === 'email' || field.type === 'textarea') {
            this.addFloatingLabel(field);
        }

        // Add character counter
        if (field.maxLength) {
            this.addCharacterCounter(field);
        }

        // Add password strength indicator
        if (field.type === 'password') {
            this.addPasswordStrength(field);
        }
    }

    addFloatingLabel(field) {
        const wrapper = DOM.create('div', { className: 'form-field-wrapper' });
        const label = DOM.get(`label[for="${field.id}"]`);
        
        if (label && !DOM.hasClass(field, 'has-floating-label')) {
            field.parentNode.insertBefore(wrapper, field);
            wrapper.appendChild(field);
            
            if (label) {
                wrapper.insertBefore(label, field);
                DOM.addClass(label, 'floating-label');
            }
            
            DOM.addClass(field, 'has-floating-label');
        }
    }

    addCharacterCounter(field) {
        const counter = DOM.create('div', {
            className: 'character-counter',
            innerHTML: `<span class="current">0</span> / <span class="max">${field.maxLength}</span>`
        });
        
        field.parentNode.appendChild(counter);
        
        DOM.on(field, 'input', () => {
            const current = field.value.length;
            counter.querySelector('.current').textContent = current;
            
            if (current > field.maxLength * 0.9) {
                DOM.addClass(counter, 'warning');
            } else {
                DOM.removeClass(counter, 'warning');
            }
        });
    }

    addPasswordStrength(field) {
        const strengthIndicator = DOM.create('div', { className: 'password-strength' });
        const strengthBar = DOM.create('div', { className: 'strength-bar' });
        const strengthText = DOM.create('div', { className: 'strength-text' });
        
        strengthIndicator.appendChild(strengthBar);
        strengthIndicator.appendChild(strengthText);
        field.parentNode.appendChild(strengthIndicator);
        
        DOM.on(field, 'input', () => {
            const strength = this.calculatePasswordStrength(field.value);
            this.updatePasswordStrength(strengthIndicator, strength);
        });
    }

    calculatePasswordStrength(password) {
        let strength = 0;
        
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password)) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^a-zA-Z0-9]/.test(password)) strength++;
        
        return Math.min(strength, 4);
    }

    updatePasswordStrength(indicator, strength) {
        const bar = indicator.querySelector('.strength-bar');
        const text = indicator.querySelector('.strength-text');
        const levels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'];
        const colors = ['#dc3545', '#ffc107', '#fd7e14', '#20c997', '#198754'];
        
        bar.style.width = `${(strength / 4) * 100}%`;
        bar.style.backgroundColor = colors[strength];
        text.textContent = levels[strength];
    }

    handleSubmit(e) {
        if (!this.validateForm()) {
            e.preventDefault();
            return false;
        }
        
        if (this.options.resetOnSubmit) {
            this.resetForm();
        }
        
        return true;
    }

    handleInput(e) {
        const field = e.target;
        this.clearFieldError(field);
        
        if (field.dataset.validate) {
            this.validateField(field);
        }
    }

    handleFieldFocus(e) {
        const field = e.target;
        DOM.addClass(field.parentNode, 'focused');
    }

    handleFieldBlur(e) {
        const field = e.target;
        DOM.removeClass(field.parentNode, 'focused');
        
        if (field.dataset.validate) {
            this.validateField(field);
        }
    }

    validateForm() {
        const fields = DOM.getAll('[data-validate]');
        let isValid = true;
        
        fields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const rules = JSON.parse(field.dataset.validate || '{}');
        const errors = [];
        
        Object.keys(rules).forEach(rule => {
            const value = field.value.trim();
            
            switch(rule) {
                case 'required':
                    if (!value) errors.push('This field is required');
                    break;
                case 'minLength':
                    if (value.length < rules[rule]) {
                        errors.push(`Minimum ${rules[rule]} characters required`);
                    }
                    break;
                case 'maxLength':
                    if (value.length > rules[rule]) {
                        errors.push(`Maximum ${rules[rule]} characters allowed`);
                    }
                    break;
                case 'pattern':
                    if (!new RegExp(rules[rule]).test(value)) {
                        errors.push('Invalid format');
                    }
                    break;
            }
        });
        
        if (errors.length > 0) {
            this.showFieldError(field, errors);
            return false;
        } else {
            this.clearFieldError(field);
            return true;
        }
    }

    showFieldError(field, errors) {
        this.clearFieldError(field);
        DOM.addClass(field, 'error');
        
        const errorElement = DOM.create('div', {
            className: 'field-error',
            innerHTML: errors.join(', ')
        });
        
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        DOM.removeClass(field, 'error');
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    resetForm() {
        this.form.reset();
        DOM.getAll('.field-error').forEach(error => error.remove());
        DOM.getAll('.error').forEach(field => DOM.removeClass(field, 'error'));
    }

    // Loading states
    setLoading(loading = true) {
        const submitButton = DOM.get('button[type="submit"], input[type="submit"]', this.form);
        
        if (submitButton) {
            if (loading) {
                DOM.addClass(submitButton, 'loading');
                submitButton.disabled = true;
                submitButton.dataset.originalText = submitButton.textContent;
                submitButton.textContent = 'Loading...';
            } else {
                DOM.removeClass(submitButton, 'loading');
                submitButton.disabled = false;
                submitButton.textContent = submitButton.dataset.originalText || 'Submit';
            }
        }
    }
}
