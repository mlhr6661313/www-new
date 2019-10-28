jQuery(function($) {
    $(window).load(function() {
        if (!qTranslateConfig || !qTranslateConfig.qtx) {
            return;
        }
        var uniqueId = 0;
        $('.acf-label label').each(function() {
            this.id = 'acf-label--' + (uniqueId++);
            qTranslateConfig.qtx.addDisplayHookById(this.id);
        });
        $('.description').each(function() {
            this.id = 'acf-description--' + (uniqueId++);
            qTranslateConfig.qtx.addDisplayHookById(this.id);
        });
        $('h2').each(function() {
            this.id = 'acf-title--' + (uniqueId++);
            qTranslateConfig.qtx.addDisplayHookById(this.id);
        });
        $('.acf-th').each(function() {
            this.id = 'acf-title--' + (uniqueId++);
            qTranslateConfig.qtx.addDisplayHookById(this.id);
        });
        $('.acf-tab-button').each(function() {
            this.id = 'acf-title--' + (uniqueId++);
            qTranslateConfig.qtx.addDisplayHookById(this.id);
        });

    });
});