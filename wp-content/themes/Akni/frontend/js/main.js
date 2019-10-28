import './modules/pollyfills';
import Swiper from './vendors/swiper';
import enquire from 'enquire.js';
import outclick from 'outclick';
import Inputmask from "inputmask";
import Masonry from 'masonry-layout';

//modules
import './modules/blog';
import './modules/sharing';
// import './modules/rating';
import './modules/main-form';
import './modules/accordion';
import './modules/scrollTo';
import './modules/department-page';
import './modules/contact-page';
import './modules/other-form';
import './modules/video';
import './modules/actions';
import './modules/autocomplit';
import './modules/vacancy';
import './modules/order-form';
import './modules/2048';
import './modules/credits-page';
import './modules/callback';

const kitGroup = window.kitGroup || {};
kitGroup.options = kitGroup.options || {};
kitGroup.methods = kitGroup.methods || {};

kitGroup.methods = {
	headerMobile() {
		const mobLink = $('.js-humburger');
		const body = $('.w1');

		mobLink.on('click', function () {
			$(this).toggleClass('is-active');
			if (mobLink.hasClass('is-active')) {
				body.css({
					height: '100vh',
					overflow: 'hidden',
				});
			} else  {
				body.css({
					height: 'auto',
					overflow: 'auto',
				});
			}


		});
	},
	initInputMask() {
		let $inputs = $('input[type="tel"]');
		Inputmask({"mask": "+38(999)999-99-99"}).mask($inputs);
		
		document.addEventListener('eventJSWidgetShow', function (e) {
			Inputmask({"mask": "+38(999)999-9999"}).mask($('#sh_container [placeholder="Телефон"]'));
		}, false);
	},
	initHeaderPhones() {
		const headerPhone = document.querySelector('.js-site-header__phones');

		enquire.register('screen and (min-width: 981px)', {
			match() {
				headerPhone.addEventListener('click', function (e) {
					if(headerPhone.classList.contains('is-active')){
						if(e.target.classList.contains('icon-opener')){
							headerPhone.classList.remove('is-active');
						}
					}else{
						headerPhone.classList.add('is-active');
					}
					
					
				});
				headerPhone.addEventListener('outclick', function (e) {
					headerPhone.classList.remove('is-active');
				});
			},
		});
	},
	initMenuSlider() {
		let menuSelector = '.reception__box_wrap';
		let link = jQuery('#credits > a');
		let list = jQuery(menuSelector + ' .reception__list');
		let prev = jQuery(menuSelector + ' .prev');
		let next = jQuery(menuSelector + ' .next');
		let swiperMenu;

		prev.click(function(){
			swiperMenu.slideTo(swiperMenu.activeIndex - swiperMenu.params.slidesPerView);
		});

		next.click(function(){
			swiperMenu.slideTo(swiperMenu.activeIndex + swiperMenu.params.slidesPerView);
		});

		$(window).resize(function() {
			if($(window).width()>980){
				link.removeClass('mobi');
				if(!list.hasClass('swiper-wrapper')){
					list.addClass('swiper-wrapper');
					swiperMenu = new Swiper(menuSelector, {
						slidesPerView: 7,
						breakpoints: {
							1150: {
							  slidesPerView: 5,
							},
							1280: {
							  slidesPerView: 6,
							}
						},
						onSlideChangeStart: function() {
							if(swiperMenu.isBeginning)
								prev.addClass('disabled');
							else
								prev.removeClass('disabled');

							if(swiperMenu.isEnd)
								next.addClass('disabled');
							else
								next.removeClass('disabled');
						},
					});
				}
				
			} else {
				link.addClass('mobi');
				if(list.hasClass('swiper-wrapper')){
					swiperMenu.destroy(true, true);
					list.removeClass('swiper-wrapper');
					console.log('test');
				}
			}
		}).resize();
	},
	initPromoGallery() {
		let mySwiper = new Swiper('.js-promo-gallery', {
			loop: true,
			autoplay: 6000,
			pagination: '.js-promo-gallery .swiper-pagination',
			paginationClickable: true,
			nextButton: '.js-promo-gallery .swiper-button-next',
			prevButton: '.js-promo-gallery .swiper-button-prev',
		});
	},
	initPublicSlider() {
		let mySwiper = new Swiper('.js-publications-swiper', {
			slidesPerView: 3,
			breakpoints: {
				480: {
					slidesPerView: 1,
				},

				900: {
					slidesPerView: 2,
				},
			},
			// loop: true,
			// autoplay: 6000,
			// pagination: '.js-promo-gallery .swiper-pagination',
			// paginationClickable: true,
			nextButton: '.js-publications-swiper .swiper-button-next',
			prevButton: '.js-publications-swiper .swiper-button-prev',
		});
	},
	initMasonry() {
			const msnryList = document.querySelector('.js-grid');

			if(msnryList != null) {
				let msnry = new Masonry(msnryList, {
						itemSelector: '.grid-item',
						gutter: 30,
						percentPosition: true,
				});
			}
	},
	initPopups() {
		const popupsImages = $('[data-fancybox="images"]');

		if (popupsImages.length) {
			popupsImages.fancybox({
				loop: true,
				speed: 1,
				protect : true,
				thumbs: {
					autoStart: true,
				},
				buttons: [
					'fullScreen',
					'thumbs',
					'close',
				],
				image: {
					preload: 'auto',
						maxWidth : 0,
						maxHeight : 0,

				}
			});
		}

		const fancyCalc = $('.fancybox-calc');
		fancyCalc.fancybox({
			touch: false
		});
	},
	initSEOCropText() {
		let seo = $('.js-seo-section');
		if (seo.length) {
			let seoText = seo.html();
			let linkMore = seo.data('link-more');
			let linkHide = seo.data('link-hide');

			if (seoText.length > 500) {
				seo.html('<div class="inner-text">' + seoText.substring(0, 500) + '<p>... </p>' + '</div>');
				seo.append('<a href=\'#\'>' + linkMore + '</a>');

				seo.find('a').on('click', function (e) {
					let $self = $(this);
					e.preventDefault();
					$self.toggleClass('is-hide');
					if ($self.hasClass('is-hide')) {
						seo.find('.inner-text').html(seoText);
						$self.html(linkHide);
					} else {
						seo.find('.inner-text').html(seoText.substring(0, 500) + '<p>... </p>');
						$self.html(linkMore);
					}
				});
			}
		}
	},
	init() {
		this.headerMobile();
		this.initPromoGallery();
		this.initSEOCropText();
		this.initPopups();
		this.initHeaderPhones();
		this.initMasonry();
		this.initInputMask();
		this.initMobSwiper();
		this.initMenuSlider();
		this.initPublicSlider();
	},
	initMobSwiper() {
		let Slider = undefined;

		function initSwiper() {

				if( $(window).width() <= 640 && Slider == undefined) {
					Slider = new Swiper('.swiper-container-mob', {
						centeredSlides        : false,
						paginationClickable   : true,
						slidesPerView         : '1',
						pagination: '.swiper-pagination'
					});
				} else if( $(window).width() > 640 && Slider != undefined ) {
					Slider.forEach((item) => {
						item.destroy();
					});
					Slider = undefined;
					$('.swiper-wrapper').removeAttr( 'style' );
					$('swiper-container').removeAttr( 'style' );
					$('.swiper-slide').removeAttr( 'style' );
				}
		}

		initSwiper();
		$( window ).on( 'resize', function() {
			initSwiper()
		} );
	}
};

(function ($) {
	$(document).ready(function () {
		kitGroup.methods.init();

		$('a[href^="#"]').on('click', function(event) {
			var target = $('a[name='+this.getAttribute('href').replace('#','')+']');

			if( target.length ) {
				event.preventDefault();
				
				$('html, body')
				.stop()
				.animate({
					scrollTop: target.offset().top
				}, 700);
			}
		});

	$('#credits').click(function(){
	  if($(window).width()>tablet_w){
		return true;
	  }else{
		$('.header-credits__dropdown').addClass('opened');
		$('.site-header .js-mobile-menu').addClass('fixed')[0].scrollTo(0,0);
		// return false;
	  }
	});

	$('.reception__title').click(function(){
	  $('.header-credits__dropdown').removeClass('opened');
	});

	const tablet_w=980;
	const footer=$('.footer_block');

	$(window).resize(function() {
		if ( $('.header-credits__dropdown').length ) {
			$('.header-credits__dropdown').css({
				left: (-$('.header-credits').offset().left) + 'px',
				width: $(window).width() + 'px'
			});
		}

	  if($(window).width()>tablet_w){
		$('.children-popup').remove();
	  }

	  footer.css('bottom',parseInt(
		parseInt(footer.css('bottom'), 10)
		- ($('.w1').outerHeight()
		- (footer.position().top
		  + footer.outerHeight()))
		, 10)+'px'
	  );
	}).resize();

	const hasChildren=$('.menu-item-has-children');
	hasChildren.children('a').click(function(){
	  let $this=$(this);
	  if($(window).width()>tablet_w){
		return true;
	  } else {
		let a=$('<a/>',{
			href:$this.attr('href'),
			html:'<span>'+$this.text()+'</span>'
			+'<svg viewBox="0 0 25 25" class="icon icon-arrow">'
			+'<use xlink:href="#icon-arrow"></use>'
			+'</svg>',
		  }),
		  mobilepop=$('<div/>',{
			class:'children-popup',
			html:'<div class="children-popup-header">'+$this.text()+'</div>'
			+$this.next('.sub-menu')[0].outerHTML
			+'<div>'
			+a[0].outerHTML
			+"</div>",
		  });

		hasChildren.append(mobilepop);
		setTimeout(function(){
		  mobilepop.addClass('opened');

		  $('.children-popup-header').click(function(){
			mobilepop.removeClass('opened');
			setTimeout(function(){
			  mobilepop.remove();
			},300);
		  });
		},50);
		return false;
	  }
	});
	});
})(jQuery);

