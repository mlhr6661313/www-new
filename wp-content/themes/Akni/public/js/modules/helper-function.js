define(['exports', '../vendors/jquery'], function (exports, _jquery) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.baseObj = exports.each = exports.createElement = exports.check = exports.hasSelector = exports.getAjaxParams = undefined;

  var _jquery2 = _interopRequireDefault(_jquery);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function hasSelector(selector, fn) {
    var element = document.querySelector(selector);
    if (element) {
      fn(element);
    }
  }

  function check(val, fnTrue) {
    var fnFalse = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};

    val ? fnTrue() : fnFalse();
  }

  function createElement() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var element = document.createElement(config.tagName);

    if (config.classes) element.classList = config.classes;
    if (config.attr) element.setAttribute(config.attr[0], config.attr[1]);
    if (config.parentElement) config.parentElement.appendChild(element);

    return element;
  }

  function getAjaxParams(attr) {
    var servicesBlock = document.getElementById('ajax_params');
    return servicesBlock.getAttribute('data-' + attr);
  }

  function each(array, fn) {
    for (var i = 0; i < array.length; i++) {
      fn(array[i], i);
    }
  }

  var baseObj = {
    ajax_url: getAjaxParams('url'),
    current_page: getAjaxParams('current_page'),
    current_page_name: getAjaxParams('current_page_name'),

    fixBody: function fixBody(elem, action) {
      if (action === false) {
        (0, _jquery2.default)('html, body').css('overflow', 'visible');
        elem.css('overflow', 'hidden');
      } else {
        (0, _jquery2.default)('html, body').css('overflow', 'hidden');
        elem.css('overflow-y', 'scroll');
      }
    },
    ajaxAction: function ajaxAction(formData, succesData) {
      _jquery2.default.ajax({
        type: 'POST',
        url: this.ajax_url,
        data: formData,
        success: function success(_success) {
          succesData(_success);
          (0, _jquery2.default)('.products_list_block .products_list').show().parent().find('.products_list_loader').remove();
        },
        error: function error() {
          //console.log('this is error. Tell about it to me please (stevenaknidev@gmail.com).')
        }
      });
    }
  };

  exports.getAjaxParams = getAjaxParams;
  exports.hasSelector = hasSelector;
  exports.check = check;
  exports.createElement = createElement;
  exports.each = each;
  exports.baseObj = baseObj;
});