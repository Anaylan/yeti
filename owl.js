/**
 * @param {'close'|'open'|'half'} state 
 */
function Owl(state, classPrefix, container) {
    this.state = state;
    this.classPrefix = classPrefix;

    /** @type {HTMLElement} */
    this.container = container;
}

/**
 * * @param {'close'|'open'|'half'} state 
 */
Owl.prototype.setState = function (state) {
    if (this.state !== state) {
        var oldState = this.state;
        this.state = state;
        console.log(this.container)
        this.container.classList.replace(`${this.classPrefix}${oldState}`, `${this.classPrefix}${this.state}`)
        console.log('🦉 State changed: ' + oldState + ' → ' + state);
    }
}

/**
 * @returns {'close'|'open'|'half'}
 */
Owl.prototype.getState = function () {
    return this.state;
};
