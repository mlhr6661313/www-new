import jQuery from 'jquery';

(function($) {
  $(document).ready(function() {
    var formWorker = {
      orderForm: $('[data-js="calculator-order-form"]'),

      init() {
        const self = this;
        $.each(self.orderForm, function (i,form) {
          let orderFormSubmitBtn = $(form).find('[data-js="submit-btn"]');
          orderFormSubmitBtn.on('click', function (e) {
            e.preventDefault();
            let orderFormIsValid = true;
            $.each($(form).find('.is-required'), function (i, item) {
              if($(item).val() === '') {
                orderFormIsValid = false;
              }
            });
            if(orderFormIsValid) {
              $(form).find('[data-js="error-message"]').hide();
              self.sendForm($(form).serialize(), form);
            } else {
              $(form).find('[data-js="error-message"]').show();
            }
          });
        });
      },
      sendForm(data, form) {
        $.ajax({
          type:    'POST',
          url:     document.getElementById('ajax_params').getAttribute('data-url'),
          data:    {
            'action': 'sendOrderForm',
            'data':   data
          },
          success: function success() {
            $(form).hide();
            $('#thank-you-popup').show();
            $('.order-popup').css('height', 'auto');
            $('.order-popup').parent().css('height', 'auto');
          },
          error:   function error() {
            console.log('this is error.');
          }
        });
      }
    };
    formWorker.init();
  });
})(jQuery);