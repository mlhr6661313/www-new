import jQuery from 'jquery';

(function($) {
    $(document).ready(function() {
      const header=$('#header');

      $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
          $('#to_top_scroll').fadeIn();
        } else {
          $('#to_top_scrollp').fadeOut();
        }
      });
      //Click event to scroll to top
      $('#to_top_scroll').click(function(){
        $('html, body').animate({scrollTop : 0},800);
        return false;
      });

      $(window).scroll(function () {
        if ($(window).scrollTop() >= 230 && $(window).width() > 991) {
          $('#wrapper').css('padding-top',header.outerHeight()+'px');
          header.addClass('fixed');
        } else {
          header.removeClass('fixed');
          $('#wrapper').css('padding-top',0);
        }
      }).scroll();
    });
})(jQuery);
