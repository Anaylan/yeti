/**
 * @class
 * @param {Object} [conditions] - Auto-close delay in milliseconds
 */
function FormValidator(conditions) {
    this.conditions = conditions || [];
}

FormValidator.prototype.validate = function (value) {
    for (const condition of this.conditions) {
        const error = condition(value);
        if (error !== '') {
            return error;
        }
    }
    return '';
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


StringValidator.prototype.max = function (max) {
    this.conditions.push((value) => {
        if (value.length > max) {
            return `Field must be no more than ${max} characters.`;
        }
        return '';
    });

    return this;
}

