import jQuery from 'jquery';
import SmartyTabs from '../vendors/smarty-tabs';

(function($) {
  $(document).ready(function() {
    if($('.init-tabs-actions').length) {
      SmartyTabs('.init-tabs-actions');
    }
  });
})(jQuery);