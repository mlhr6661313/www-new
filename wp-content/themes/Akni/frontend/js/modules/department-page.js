import jQuery from 'jquery';

function convertTime(value) {
    function firstNull(num) {
        return +num < 10 ? `0${num}` : num;
    }

    function getDecimal(num) {
        return num > 0 ? num - Math.floor(num) : Math.ceil(num) - num;
    }

    const dirtyTime = value / 60;
    const hours = Math.floor(dirtyTime);
    const minutes = Math.round(getDecimal(dirtyTime) * 60);
    return `${firstNull(hours)}:${firstNull(minutes)}`;
}

function replaceTime(el, converter) {
    function replaceAll(elements) {
        elements.forEach((el) => {
            const value = parseInt(el.innerHTML, 10);
            el.innerHTML = converter(value);
        });
    }

    replaceAll(el.from);
    replaceAll(el.to);
}

replaceTime({
    from: document.querySelectorAll('[data-js-daysInfo="from"]'),
    to: document.querySelectorAll('[data-js-daysInfo="to"]'),
}, convertTime);

(function($) {
  const seo = $('.departments-seo_holder'),
    readMore = seo.find('.read-more'),
    btnText = readMore.find('.btn-text');

  readMore.on('click',function(){
    if(seo.is('.opened')){
      seo.removeClass('opened');
      btnText.html(btnText.html());
    }else{
      seo.addClass('opened');
      btnText.html(btnText.data('hide'));
    }
  });
})(jQuery);