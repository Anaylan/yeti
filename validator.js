/**
 * @class
 * @param {Object} [conditions] - Auto-close delay in milliseconds
 */
function FormValidator(conditions) {
    this.conditions = conditions || [];
}

FormValidator.prototype.validate = function (value) {
    const errs = new Array();
    for (const condition of this.conditions) {
        const error = condition(value);
        if (error !== '') {
            errs.push(error);
        }
    }
    return errs;
}

FormValidator.prototype.test = function (condition) {
    this.conditions.push(condition);
    return this;
}

function StringValidator(conditions) {
    FormValidator.call(this, conditions);
}

StringValidator.prototype = Object.create(FormValidator.prototype);
StringValidator.prototype.constructor = StringValidator;

StringValidator.prototype.min = function (min) {
    this.conditions.push((value) => {
        if (value.length < min) {
            return `Field must be at least ${min} characters.`;
        }
        return '';
    });

    return this;
}

StringValidator.prototype.hasUppercase = function () {
    this.conditions.push((value) => {
        if (!/[A-Z]/.test(value)) {
            return 'Field must contain at least one uppercase letter.';
        }
        return '';
    });

    return this;
}

StringValidator.prototype.hasNumber = function () {
    this.conditions.push((value) => {
        if (!/[0-9]/.test(value)) {
            return 'Field must contain at least one number.';
        }
        return '';
    });

    return this;
}

StringValidator.prototype.hasSymbol = function () {
    this.conditions.push((value) => {
        if (!/[!@#$%^&*()_+={}\[\]:;"'<>,.?/`~-]/.test(value)) {
            return 'Field must contain at least one symbol.';
        }
        return '';
    });

    return this;
}

StringValidator.prototype.max = function (max) {
    this.conditions.push((value) => {
        if (value.length > max) {
            return `Field must be no more than ${max} characters.\n`;
        }
        return '';
    });

    return this;
}

StringValidator.prototype.isEmail = function () {
    this.conditions.push((value) => {
        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) {
            return 'Invalid email format.';
        }
        return '';
    });

    return this;
}
