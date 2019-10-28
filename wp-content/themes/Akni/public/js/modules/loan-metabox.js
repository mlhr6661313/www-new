define(['./helper-function'], function (_helperFunction) {
  'use strict';

  var loan = {
    sample: '#sample_count',

    init: function init() {
      alert(1);
      undefined.sampleChangeAction();
    },

    sampleChangeAction: function sampleChangeAction() {
      document.getElementById(undefined.sample).change(function () {
        alert(undefined);
      });
    }
  };

  document.addEventListener('DOMContentLoaded', function () {
    loan.init();
  });
});