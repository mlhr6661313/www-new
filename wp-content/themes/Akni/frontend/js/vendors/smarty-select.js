const SmartySelect = (() => {
    class $ {
        constructor(initClass, config) {
            this.config = config || {};
            this.initClass = initClass;
            this._cache = {};

            $.polyfills();
            this.init();
        }

        static each(array, callback) {
            for (let i = 0; i < array.length; i++) {
                callback(array[i], i);
            }
        }

        static el(selector, all = false) {
            try {
                if (!document.querySelector(selector)) {
                    throw new SyntaxError(
                            `Your selector, ${selector}, was undefined`
                    );
                } else {
                    return all
                            ? document.querySelectorAll(selector)
                            : document.querySelector(selector);
                }
            } catch (e) {
                console.error(e);
            }
        }

        static polyfills() {
            /**
             * Polyfill for CustomEvent
             */
            try {
                new CustomEvent("IE has CustomEvent, but doesn't support constructor");
            } catch( e ) {
                window.CustomEvent = function( event, params ) {
                    let evt;
                    params = params || {
                                bubbles   : false,
                                cancelable: false,
                                detail    : undefined
                            };
                    evt = document.createEvent("CustomEvent");
                    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                    return evt;
                };
                CustomEvent.prototype = Object.create(window.Event.prototype);
            }
        }

        _config() {
            const mainSelect = $.el(this.initClass);
            const parentContainer = mainSelect.parentElement;

            const ssAttrs = {
                container: 'data-ss-container',
                button: 'data-ss-button',
                dropdown: 'data-ss-dropdown',
                option: 'data-ss-option',
                index: 'data-index',
                value: 'data-value'
            };

            return {
                mainSelect,
                parentContainer,
                ssAttrs,
                ssSelector: `${this.initClass} + [${ssAttrs.container}]`
            };
        }

        _createElement(tagName, config = {}) {
            const elem = document.createElement(tagName);
            const {ssAttrs} = this._config();

            if (config.classes) {
                elem.classList = config.classes;
            };
            if (config.value) {
                elem.setAttribute(ssAttrs.index, config.value);
            };
            if (config.html) {
                elem.innerHTML = config.html;
            };
            if (config.attributes) {
                for (let key in config.attributes) {
                    elem.setAttribute(key, config.attributes[key]);
                }
            };

            return elem;
        }

        _createMaskedSelect() {
            const {mainSelect, parentContainer, ssAttrs} = this._config();
            const currentValue = mainSelect.options.selectedIndex;

            const container = this._createElement("div", {
                attributes: { [ssAttrs.container]: "" },
                classes: this.config.containerClass
            });
            const button = this._createElement("div", {
                attributes: {
                    [ssAttrs.button]: "close"
                },
                html: mainSelect.options[currentValue].innerHTML,
                classes: this.config.buttonClass
            });
            const drodown = this._createElement("div", {
                attributes: { [ssAttrs.dropdown]: "" },
                classes: this.config.dropdownClass
            });

            container.appendChild(button);
            container.appendChild(drodown);

            $.each(mainSelect.children, (option, index) => {
                const customOption = this._createElement("div", {
                    html: option.innerHTML,
                    attributes: {
                        [ssAttrs.option]: currentValue === index
                                                  ? "active"
                                                  : "",
                        [ssAttrs.index]: index,
                        [ssAttrs.value]: option.value
                    },
                    classes: this.config.optionClass
                });
                drodown.appendChild(customOption);
            });

            return container;
        }

        _setDropdownPosition() {
            const { ssSelector, ssAttrs } = this._config();
            const ssElems = {
                select: $.el(ssSelector),
                dropdown: $.el(`${ssSelector} [${ssAttrs.dropdown}]`)
            };
            const wh = window.innerHeight;
            const dropdownPosition = ssElems.dropdown.getBoundingClientRect().bottom;
            wh - dropdownPosition > 0
                    ? ssElems.select.setAttribute(ssAttrs.container, '')
                    : ssElems.select.setAttribute(ssAttrs.container, 'opens-up');
        }

        _setActiveClass(options, currentOption) {
            const { ssAttrs } = this._config();
            const currentIndex = +currentOption.getAttribute(ssAttrs.index);

            options.forEach((option, index) => {
                option.setAttribute(ssAttrs.option, '');
                if (currentIndex === index) {
                    option.setAttribute(ssAttrs.option, 'active');
                };
            });
        }

        _events() {
            const that = this;
            const { mainSelect, ssSelector, ssAttrs } = this._config();
            const ssElems = {
                select: $.el(ssSelector),
                button: $.el(`${ssSelector} [${ssAttrs.button}]`),
                dropdown: $.el(`${ssSelector} [${ssAttrs.dropdown}]`),
                options: $.el(`${ssSelector} [${ssAttrs.option}]`, true)
            };
            const [open, close] = ["open", "close"];
            const customChange = new CustomEvent('custom.change:ss', {
                bubbles   : true,
                cancelable: true
            });

            function openSelect(event) {
                const target = event.currentTarget;

                that._setDropdownPosition();

                switch (target.getAttribute(ssAttrs.button)) {
                    case open:
                        target.setAttribute(ssAttrs.button, close);
                        break;
                    case close:
                        target.setAttribute(ssAttrs.button, open);
                        break;
                }
            }

            function checkOption(event) {
                const target = event.target;
                if (!target.hasAttribute(ssAttrs.option)) return;

                mainSelect.options.selectedIndex = target.getAttribute(ssAttrs.index);

                ssElems.button.innerHTML = target.innerHTML;
                ssElems.button.setAttribute(ssAttrs.button, close);

                that._setActiveClass(ssElems.options, target);

                target.dispatchEvent(customChange);
            }

            function initCustomChange( callback ) {
                return function( event ) {
                    if( callback ) callback(
                            +event.target.getAttribute(ssAttrs.index),
                            event.target.getAttribute(ssAttrs.value),
                            event.target
                    );
                };
            }

            return this._cache._events
                    ? this._cache._events
                    : this._cache._events = {
                        _initEvent() {
                            ssElems.button.addEventListener("click", openSelect);
                            ssElems.dropdown.addEventListener("click", checkOption);
                        },
                        _customChange(callback) {
                            !that._cache.hasOwnProperty('_customChangeEvent')
                                    ? that._cache._customChangeEvent = initCustomChange(callback)
                                    : that._cache._customChangeEvent;

                            ssElems.dropdown.addEventListener('custom.change:ss', that._cache._customChangeEvent);
                        },
                        _destroyEvent() {
                            ssElems.button.removeEventListener("click", openSelect);
                            ssElems.dropdown.removeEventListener("click", checkOption);
                            ssElems.dropdown.removeEventListener('custom.change:ss', that._cache._customChangeEvent);
                        }
                    }
        }

        init() {
            const { mainSelect, parentContainer } = this._config();
            if(!this._cache._isInitialize) {
                this._cache._maskedSelect = !this._cache._maskedSelect
                        ? this._createMaskedSelect()
                        : this._cache._maskedSelect;

                parentContainer.insertBefore(this._cache._maskedSelect, mainSelect.nextElementSibling);
                mainSelect.style.display = "none";

                this._events()._initEvent();
                this._cache._isInitialize = true;
            };
            if(this._cache._isCustomChange) {
                this.change();
            };
        }

        destroy() {
            const {ssSelector, mainSelect, parentContainer} = this._config();

            if(this._cache._isInitialize) {
                this._events()._destroyEvent();
                this._cache._maskedSelect = parentContainer.removeChild(this._cache._maskedSelect);
                mainSelect.style.display = 'block';
                this._cache._isInitialize = false;
            }
        }

        change(callback) {
            this._events()._customChange(callback);
            this._cache._isCustomChange = true;
        }
    }
    return $;
})();

export default function(selector, config) {
    return new SmartySelect(selector, config)
}


// const test = new SmartySelect(".custom-select", {
// });

// // test button
// const testButton = document.querySelector('[data-js-btns]');
//
// testButton.addEventListener('click', (event) => {
//     const target = event.target;
//     if(target.nodeName !== 'BUTTON') return;
//
//     switch(target.getAttribute('data-js-btn')) {
//         case 'init':
//             test.init();
//             break;
//         case 'destroy':
//             test.destroy();
//             break;
//     }
// });
//
// test.change((index, elem) => {
//     const testField = document.querySelector('.test-change-event');
//     const infoBlock = document.createElement('div');
//     infoBlock.innerHTML = `current index - ${index}`;
//     testField.appendChild(infoBlock);
// })