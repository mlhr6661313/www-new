define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    exports.default = function (selector, config) {
        return new SmartySelect(selector, config);
    };

    function _defineProperty(obj, key, value) {
        if (key in obj) {
            Object.defineProperty(obj, key, {
                value: value,
                enumerable: true,
                configurable: true,
                writable: true
            });
        } else {
            obj[key] = value;
        }

        return obj;
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
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
    var SmartySelect = function () {
        var $ = function () {
            function $(initClass, config) {
                _classCallCheck(this, $);

                this.config = config || {};
                this.initClass = initClass;
                this._cache = {};

                $.polyfills();
                this.init();
            }

            $.each = function each(array, callback) {
                for (var i = 0; i < array.length; i++) {
                    callback(array[i], i);
                }
            };

            $.el = function el(selector) {
                var all = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

                try {
                    if (!document.querySelector(selector)) {
                        throw new SyntaxError("Your selector, " + selector + ", was undefined");
                    } else {
                        return all ? document.querySelectorAll(selector) : document.querySelector(selector);
                    }
                } catch (e) {
                    console.error(e);
                }
            };

            $.polyfills = function polyfills() {
                /**
                 * Polyfill for CustomEvent
                 */
                try {
                    new CustomEvent("IE has CustomEvent, but doesn't support constructor");
                } catch (e) {
                    window.CustomEvent = function (event, params) {
                        var evt = void 0;
                        params = params || {
                            bubbles: false,
                            cancelable: false,
                            detail: undefined
                        };
                        evt = document.createEvent("CustomEvent");
                        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                        return evt;
                    };
                    CustomEvent.prototype = Object.create(window.Event.prototype);
                }
            };

            $.prototype._config = function _config() {
                var mainSelect = $.el(this.initClass);
                var parentContainer = mainSelect.parentElement;

                var ssAttrs = {
                    container: 'data-ss-container',
                    button: 'data-ss-button',
                    dropdown: 'data-ss-dropdown',
                    option: 'data-ss-option',
                    index: 'data-index',
                    value: 'data-value'
                };

                return {
                    mainSelect: mainSelect,
                    parentContainer: parentContainer,
                    ssAttrs: ssAttrs,
                    ssSelector: this.initClass + " + [" + ssAttrs.container + "]"
                };
            };

            $.prototype._createElement = function _createElement(tagName) {
                var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                var elem = document.createElement(tagName);

                var _config2 = this._config(),
                    ssAttrs = _config2.ssAttrs;

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
                    for (var key in config.attributes) {
                        elem.setAttribute(key, config.attributes[key]);
                    }
                };

                return elem;
            };

            $.prototype._createMaskedSelect = function _createMaskedSelect() {
                var _this = this;

                var _config3 = this._config(),
                    mainSelect = _config3.mainSelect,
                    parentContainer = _config3.parentContainer,
                    ssAttrs = _config3.ssAttrs;

                var currentValue = mainSelect.options.selectedIndex;

                var container = this._createElement("div", {
                    attributes: _defineProperty({}, ssAttrs.container, ""),
                    classes: this.config.containerClass
                });
                var button = this._createElement("div", {
                    attributes: _defineProperty({}, ssAttrs.button, "close"),
                    html: mainSelect.options[currentValue].innerHTML,
                    classes: this.config.buttonClass
                });
                var drodown = this._createElement("div", {
                    attributes: _defineProperty({}, ssAttrs.dropdown, ""),
                    classes: this.config.dropdownClass
                });

                container.appendChild(button);
                container.appendChild(drodown);

                $.each(mainSelect.children, function (option, index) {
                    var _attributes4;

                    var customOption = _this._createElement("div", {
                        html: option.innerHTML,
                        attributes: (_attributes4 = {}, _defineProperty(_attributes4, ssAttrs.option, currentValue === index ? "active" : ""), _defineProperty(_attributes4, ssAttrs.index, index), _defineProperty(_attributes4, ssAttrs.value, option.value), _attributes4),
                        classes: _this.config.optionClass
                    });
                    drodown.appendChild(customOption);
                });

                return container;
            };

            $.prototype._setDropdownPosition = function _setDropdownPosition() {
                var _config4 = this._config(),
                    ssSelector = _config4.ssSelector,
                    ssAttrs = _config4.ssAttrs;

                var ssElems = {
                    select: $.el(ssSelector),
                    dropdown: $.el(ssSelector + " [" + ssAttrs.dropdown + "]")
                };
                var wh = window.innerHeight;
                var dropdownPosition = ssElems.dropdown.getBoundingClientRect().bottom;
                wh - dropdownPosition > 0 ? ssElems.select.setAttribute(ssAttrs.container, '') : ssElems.select.setAttribute(ssAttrs.container, 'opens-up');
            };

            $.prototype._setActiveClass = function _setActiveClass(options, currentOption) {
                var _config5 = this._config(),
                    ssAttrs = _config5.ssAttrs;

                var currentIndex = +currentOption.getAttribute(ssAttrs.index);

                options.forEach(function (option, index) {
                    option.setAttribute(ssAttrs.option, '');
                    if (currentIndex === index) {
                        option.setAttribute(ssAttrs.option, 'active');
                    };
                });
            };

            $.prototype._events = function _events() {
                var that = this;

                var _config6 = this._config(),
                    mainSelect = _config6.mainSelect,
                    ssSelector = _config6.ssSelector,
                    ssAttrs = _config6.ssAttrs;

                var ssElems = {
                    select: $.el(ssSelector),
                    button: $.el(ssSelector + " [" + ssAttrs.button + "]"),
                    dropdown: $.el(ssSelector + " [" + ssAttrs.dropdown + "]"),
                    options: $.el(ssSelector + " [" + ssAttrs.option + "]", true)
                };
                var open = "open",
                    close = "close";

                var customChange = new CustomEvent('custom.change:ss', {
                    bubbles: true,
                    cancelable: true
                });

                function openSelect(event) {
                    var target = event.currentTarget;

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
                    var target = event.target;
                    if (!target.hasAttribute(ssAttrs.option)) return;

                    mainSelect.options.selectedIndex = target.getAttribute(ssAttrs.index);

                    ssElems.button.innerHTML = target.innerHTML;
                    ssElems.button.setAttribute(ssAttrs.button, close);

                    that._setActiveClass(ssElems.options, target);

                    target.dispatchEvent(customChange);
                }

                function initCustomChange(callback) {
                    return function (event) {
                        if (callback) callback(+event.target.getAttribute(ssAttrs.index), event.target.getAttribute(ssAttrs.value), event.target);
                    };
                }

                return this._cache._events ? this._cache._events : this._cache._events = {
                    _initEvent: function _initEvent() {
                        ssElems.button.addEventListener("click", openSelect);
                        ssElems.dropdown.addEventListener("click", checkOption);
                    },
                    _customChange: function _customChange(callback) {
                        !that._cache.hasOwnProperty('_customChangeEvent') ? that._cache._customChangeEvent = initCustomChange(callback) : that._cache._customChangeEvent;

                        ssElems.dropdown.addEventListener('custom.change:ss', that._cache._customChangeEvent);
                    },
                    _destroyEvent: function _destroyEvent() {
                        ssElems.button.removeEventListener("click", openSelect);
                        ssElems.dropdown.removeEventListener("click", checkOption);
                        ssElems.dropdown.removeEventListener('custom.change:ss', that._cache._customChangeEvent);
                    }
                };
            };

            $.prototype.init = function init() {
                var _config7 = this._config(),
                    mainSelect = _config7.mainSelect,
                    parentContainer = _config7.parentContainer;

                if (!this._cache._isInitialize) {
                    this._cache._maskedSelect = !this._cache._maskedSelect ? this._createMaskedSelect() : this._cache._maskedSelect;

                    parentContainer.insertBefore(this._cache._maskedSelect, mainSelect.nextElementSibling);
                    mainSelect.style.display = "none";

                    this._events()._initEvent();
                    this._cache._isInitialize = true;
                };
                if (this._cache._isCustomChange) {
                    this.change();
                };
            };

            $.prototype.destroy = function destroy() {
                var _config8 = this._config(),
                    ssSelector = _config8.ssSelector,
                    mainSelect = _config8.mainSelect,
                    parentContainer = _config8.parentContainer;

                if (this._cache._isInitialize) {
                    this._events()._destroyEvent();
                    this._cache._maskedSelect = parentContainer.removeChild(this._cache._maskedSelect);
                    mainSelect.style.display = 'block';
                    this._cache._isInitialize = false;
                }
            };

            $.prototype.change = function change(callback) {
                this._events()._customChange(callback);
                this._cache._isCustomChange = true;
            };

            return $;
        }();

        return $;
    }();
});