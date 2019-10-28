import jQuery from 'jquery';
import 'parsleyjs';

(function($) {
    $(document).ready(function() {
        const form = $('.callback-form2');

        if(form.length) {
            alert();
            form.find('.form-field').each(function() {
                let self = $(this);
                if(self.hasClass('need_validate')) {
                    self.attr({
                        "required": true,
                        "data-parsley-trigger": "change"
                    });
                }
                if(self.attr('name') == 'email') {
                    self.attr({
                        'data-parsley-type': 'email',
                        "required": true,
                        "data-parsley-trigger": "change"
                    });
                }
            });

            form.parsley();
        }
    });
})(jQuery);
