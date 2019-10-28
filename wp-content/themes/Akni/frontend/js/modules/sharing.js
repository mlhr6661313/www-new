const sharing = {
  sharing : '.sharing',

  init: function () {
    this.sharingAction();
  },

  sharingAction : function () {
    let _this = this;
    $(this.sharing).click(function() {
      _this.popup($(this).attr('href'));
      return false;
    });
  },

  popup: function (url) {
    window.open(url, '', 'toolbar=0,status=0,width=626,height=436');
  }
};
sharing.init();