import $ from '../vendors/jquery';

function hasSelector(selector, fn) {
    const element = document.querySelector(selector);
    if(element) { fn(element); }
}

function check(val, fnTrue, fnFalse = () => {}) {
    val ? fnTrue() : fnFalse();
}

function createElement(config = {}) {
    const element = document.createElement(config.tagName);

    if(config.classes) element.classList = config.classes;
    if(config.attr) element.setAttribute(config.attr[0], config.attr[1]);
    if(config.parentElement) config.parentElement.appendChild(element);

    return element;
}

function getAjaxParams(attr) {
    const servicesBlock = document.getElementById('ajax_params');
    return servicesBlock.getAttribute(`data-${attr}`);
}

function each(array, fn) {
    for(let i = 0; i < array.length; i++) {
        fn(array[i], i);
    }
}

function toArray(obj = {}) {
  const objKeys = Object.keys(obj);
  return objKeys.map((key) => obj[key]);
}

const baseObj = {
    ajax_url:          getAjaxParams('url'),
    current_page:      getAjaxParams('current_page'),
    current_page_name: getAjaxParams('current_page_name'),

    fixBody(elem, action) {
        if(action === false) {
            $('html, body').css('overflow', 'visible');
            elem.css('overflow', 'hidden');
        } else {
            $('html, body').css('overflow', 'hidden');
            elem.css('overflow-y', 'scroll');
        }
    },

    ajaxAction: function(formData, succesData) {
        $.ajax({
            type:    'POST',
            url:     this.ajax_url,
            data:    formData,
            success: function(success) {
                succesData(success);
                $('.products_list_block .products_list').show().parent().find('.products_list_loader').remove();
            },
            error:   function() {
                //console.log('this is error. Tell about it to me please (stevenaknidev@gmail.com).')
            }
        });
    }
};

export {getAjaxParams};
export {toArray};
export {hasSelector};
export {check};
export {createElement};
export {each};
export {baseObj};
