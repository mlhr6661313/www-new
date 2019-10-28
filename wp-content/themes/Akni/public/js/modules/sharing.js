define([], function () {
  'use strict';

  var sharing = {
    sharing: '.sharing',

    init: function init() {
      this.sharingAction();
    },

    sharingAction: function sharingAction() {
      var _this = this;
      $(this.sharing).click(function () {
        _this.popup($(this).attr('href'));
        return false;
      });
    },

    popup: function popup(url) {
      window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
    }
  };
  sharing.init();
});