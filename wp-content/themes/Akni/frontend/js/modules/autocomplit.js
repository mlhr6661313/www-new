import jQuery from 'jquery';

(function($) {
	$(document).ready(function() {
		/*$('header .icon-search').on('click', function () {
			$(this).addClass('active');
			$('header .search-field').addClass('active');
		});*/

		/*$('header .search-field').find('.close-btn').on('click', function () {
			$(this).parent().prev().removeClass('active');
			$(this).parent().removeClass('active');
		});*/

		$('#searchform input').focus(function(){
			$('#search-result').addClass('active');
		});

		$('#searchform input').blur(function(){
			setTimeout(function(){
				$('#search-result').removeClass('active');
			},500);
		});

		$(document).on('click', function (t) {
			var i = $(t.target);
			i.hasClass('icon-search') || i.closest('.search-field').length || ($('header .search-field').removeClass('active'), $('header .icon-search').removeClass('active'))
		});
		$('#searchform').keyup(function (t) {
			t.preventDefault();
			var i = $('#s').val();
			i.length > 1 && $.ajax({
				type: 'POST',
				url: '/wp-admin/admin-ajax.php',
				data: {action: 'wpay_search', search: i},
				success: function (t) {
					0 == t.slice(-1) && (t = t.substring(0, t.length - 1));
					$('#search-result').html(t);
				}
			})
		})

	});
})(jQuery);