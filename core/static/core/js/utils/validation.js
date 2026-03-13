// Form Validation Utilities
export const Validation = {
    // Validation rules
    rules: {
        required: (value) => value && value.trim().length > 0,
        email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        phone: (value) => /^[\d\s\-\+\(\)]+$/.test(value),
        number: (value) => !isNaN(value) && value.trim() !== '',
        positive: (value) => !isNaN(value) && parseFloat(value) > 0,
        minLength: (min) => (value) => value && value.length >= min,
        maxLength: (max) => (value) => !value || value.length <= max,
        pattern: (regex) => (value) => !value || regex.test(value)
    },

    // Validate single field
    validateField(value, rules) {
        const errors = [];
        
        rules.forEach(rule => {
            if (typeof rule === 'function') {
                const result = rule(value);
                if (result !== true) {
                    errors.push(result);
                }
            } else if (typeof rule === 'object' && rule.test) {
                const result = rule.test(value);
                if (result !== true) {
                    errors.push(rule.message || 'Validation failed');
                }
            }
        });
        
        return errors;
    },

    // Validate entire form
    validateForm(form, validationRules) {
        const errors = {};
        let isValid = true;

        Object.keys(validationRules).forEach(fieldName => {
            const field = form.elements[fieldName];
            if (field) {
                const fieldErrors = this.validateField(field.value, validationRules[fieldName]);
                if (fieldErrors.length > 0) {
                    errors[fieldName] = fieldErrors;
                    isValid = false;
                }
            }
        });

        return { isValid, errors };
    },

    // Show field errors
    showFieldError(field, errors) {
        // Remove existing errors
        this.clearFieldError(field);

        // Add error styling
        field.classList.add('error');

        // Create error container
        const errorContainer = document.createElement('div');
        errorContainer.className = 'error-message';
        errorContainer.innerHTML = errors.join('<br>');

        // Insert error message
        field.parentNode.insertBefore(errorContainer, field.nextSibling);
    },

    // Clear field errors
    clearFieldError(field) {
        field.classList.remove('error');
        const errorContainer = field.parentNode.querySelector('.error-message');
        if (errorContainer) {
            errorContainer.remove();
        }
    },

    // Clear all form errors
    clearFormErrors(form) {
        Array.from(form.elements).forEach(element => {
            this.clearFieldError(element);
        });
    },

    // Real-time validation
    enableRealTimeValidation(form, validationRules) {
        Object.keys(validationRules).forEach(fieldName => {
            const field = form.elements[fieldName];
            if (field) {
                DOM.on(field, 'input', () => {
                    const errors = this.validateField(field.value, validationRules[fieldName]);
                    if (errors.length > 0) {
                        this.showFieldError(field, errors);
                    } else {
                        this.clearFieldError(field);
                    }
                });

                DOM.on(field, 'blur', () => {
                    const errors = this.validateField(field.value, validationRules[fieldName]);
                    if (errors.length > 0) {
                        this.showFieldError(field, errors);
                    }
                });
            }
        });
    },

    // Common validation patterns
    patterns: {
        name: /^[a-zA-Z\s]{2,50}$/,
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\d\s\-\+\(\)]+$/,
        price: /^\d+(\.\d{1,2})?$/,
        alphanumeric: /^[a-zA-Z0-9]+$/,
        slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    },

    // Common error messages
    messages: {
        required: 'This field is required',
        email: 'Please enter a valid email address',
        phone: 'Please enter a valid phone number',
        number: 'Please enter a valid number',
        positive: 'Please enter a positive number',
        minLength: (min) => `Minimum length is ${min} characters`,
        maxLength: (max) => `Maximum length is ${max} characters`,
        pattern: 'Invalid format'
    }
};
