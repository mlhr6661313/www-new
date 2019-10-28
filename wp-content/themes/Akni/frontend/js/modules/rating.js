import jQuery from 'jquery';

(function($) {
    $(document).ready(function() {
       const rating = $('.js-rating');

       if(rating.length) {
           let checkbox = rating.find('input');

           checkbox.each(function() {
               let self = $(this);

               self.on('click', function(e) {
                   self.parent().siblings().find('input').removeClass('is-filled');
                   self.parent().prevAll().find('input').addClass('is-filled');
               })
           });
       }
    });
})(jQuery);