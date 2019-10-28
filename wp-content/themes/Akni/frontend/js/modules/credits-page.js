import SmartyTabs from './../vendors/smarty-tabs';

function initCreditPage() {
  const calculatorTabs = SmartyTabs('.credit-tabs',{
    tabSlide:false
  });

  const fancyCalc = $('.fancybox-credit-calc');
  fancyCalc.fancybox({
    touch: false,
    afterShow: function() {
      jQuery('#'+window.tabId).click();
    }
  });

  jQuery(".fancybox-credit-calc").on('click', function () {
    window.tabId = jQuery(this).data('tab-id');
  });
}

if(jQuery('.credit-tabs').length > 0) {
  document.addEventListener('DOMContentLoaded', initCreditPage);
}