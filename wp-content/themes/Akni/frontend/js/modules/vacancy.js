import jQuery from 'jquery';

(function($) {
  $(document).ready(function() {
    const success = $('#success-block');
    const errorBlock = $('#file-size-error');
    const vacancyForm = $('#vacancy_form');
    vacancyForm.on('submit', function (e) {
      e.preventDefault();
      const fileInput = $('#file');
      if(fileInput.prop('files')[0].size > 2097152) {
        errorBlock.show();
        return false;
      }
      errorBlock.hide();
      let formData = new FormData();

      formData.append('file', fileInput.prop('files')[0]);
      formData.append('name', $('#name').val());
      formData.append('phone', $('#phone').val());
      formData.append('city', $('#city').val());
      formData.append('comment', $('#comment').val());
      formData.append('action', 'sendVacancy');

      $.ajax({
        url: document.getElementById('ajax_params').getAttribute('data-url'),
        type: 'post',
        contentType: false,
        processData: false,
        data: formData,
        success: function (response) {
          const resp = $.parseJSON(response);
          if(resp.error) {
            alert(resp.message);
          } else {
            vacancyForm.hide();
            success.show();
          }
        },
        error: function () {
          alert('error');
        }

      });
    });
  });
  window.getName = function(str) {
    const tmp = str.split(/(\\|\/)/g).pop();
    const uploaded = document.getElementById("file-name-placeholder");
    uploaded.innerHTML = tmp ? tmp : uploaded.getAttribute('data-default-text');
  }
})(jQuery);