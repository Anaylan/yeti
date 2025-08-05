/**
 * @class
 * @param {HTMLElement} element - Alert container element
 * @param {Object} options - Configuration options
 */
function Alert(element, options) {
    /** @type {HTMLElement} */
    this.element = element;

    /** @type {Object} */
    this.options = {
        delay: 5000,
        closeBtn: '.alert__close',
        autoClose: true,
        onOpen: null,
        onClose: null
    };

    // Merge custom options
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            this.options[key] = options[key];
        }
    }

    /** @type {boolean} */
    this.isOpen = false;

    /** @type {?number} */
    this.timeoutId = null;

    /** @type {?Element} */
    this.closeBtn = this.element.querySelector(this.options.closeBtn);

    var self = this;
    if (this.closeBtn) {
        this.closeBtn.addEventListener('click', function (event) {
            self.close();
        });
    }
}

/**
 * @returns {void}
 */
Alert.prototype.show = function () {
    if (this.isOpen) return;

    this.isOpen = true;
    this.element.classList.add('alert_show');

    // Execute open callback
    if (typeof this.options.onOpen === 'function') {
        this.options.onOpen(this);
    }

    var self = this;
    if (this.options.autoClose && this.options.delay > 0) {
        this.timeoutId = setTimeout(function () {
            self.close();
        }, this.options.delay);
    }
}

/**
 * @returns {void}
 */
Alert.prototype.close = function () {
    if (!this.isOpen) return;

    this.isOpen = false;
    this.element.classList.remove('alert_show');

    if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
    }

    // Execute close callback
    if (typeof this.options.onClose === 'function') {
        this.options.onClose(this);
    }
}

/**
 * @param {string} message - Text content
 * @returns {Alert} Returns instance for chaining
 */
Alert.prototype.setMessage = function (message) {
    var messageEl = this.element.querySelector('.alert__message');
    if (messageEl) {
        messageEl.textContent = message;
    }
    return this;
};

/**
 * @param {'success'|'error'|'warning'|'info'} type - Alert variant
 * @returns {Alert} Returns instance for chaining
 */
Alert.prototype.setType = function (type) {
    var classList = this.element.className.split(' ');
    for (var i = classList.length - 1; i >= 0; i--) {
        if (classList[i].indexOf('alert_') === 0) {
            classList.splice(i, 1);
        }
    }

    classList.push('alert_' + type);
    this.element.className = classList.join(' ');
    return this;
};

/**
 * @param {Object} newOptions - New configuration values
 * @returns {Alert} Returns instance for chaining
 */
Alert.prototype.updateOptions = function (newOptions) {
    for (var key in newOptions) {
        if (newOptions.hasOwnProperty(key)) {
            this.options[key] = newOptions[key];
        }
    }
    return this;
};