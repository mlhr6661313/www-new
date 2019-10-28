import jQuery from 'jquery';

(function($) {
    $(document).ready(function() {
        let accordion = $('.js-accordion');

        if(accordion.length) {
            accordion.each(function() {
                let self = $(this);

                self.on('click', function() {
                    self.find('.accordion__link').toggleClass('is-active');
                });
            });
        }
    });
})(jQuery);