import Dropzone from 'dropzone';
import jQuery from 'jquery';
import 'parsleyjs';
import 'parsleyjs/dist/i18n/ru';
// import FormData from 'formdata-polyfill';

(function ( $ ) {
  Dropzone.autoDiscover = false;

  $(document).ready(function () {
    const form = $('#js-dropzone').closest('form');

    window.Parsley.addValidator('cphone', {
      validateString: function ( value ) {
        return value.indexOf('_') == -1;
      },
      messages: {
        en: 'invalid number',
        ru: 'Некорректный номер',
      },
    });

    if ( form.length ) {
      let isAddedFile = false;
      let urlActionForm = form.attr('action');
      const sendFormBtn = $('.js-send-form');
      const sendFormBtn2 = $('.js-send-form2');

      const parentContainer = document.querySelector('[data-loan-id="other"]');
      const maxFileSize = parentContainer.getAttribute('data-file-size');
      const sizeErrorMessage = parentContainer.getAttribute('data-error-size');
      const typeErrorMessage = parentContainer.getAttribute('data-error-type');
      const thanksMessage = parentContainer.getAttribute('data-thanks-message');
      const submitErrorMessage = parentContainer.getAttribute('data-submit-message');

      const formActions = parentContainer.querySelector('.form-actions');
      const submitErrorContainer = document.createElement('div');
      submitErrorContainer.style.display = 'none';
      submitErrorContainer.classList.add('submit-error-message');
      submitErrorContainer.innerHTML = submitErrorMessage;

      formActions.appendChild(submitErrorContainer);

      function thanksPopup( selector ) {
        const container = document.querySelector(selector);
        container.style.position = 'relative';

        const popup = document.createElement('div');
        popup.classList.add('thanks-message');

        const text = document.createElement('div');
        text.classList.add('thanks-message__text');
        text.innerHTML = thanksMessage;

        popup.appendChild(text);

        if ( !container.contains(popup) ) {
          container.appendChild(popup);
        }

        setTimeout(() => {
          container.removeChild(popup);
          container.removeAttribute('style');
        }, 3000);
      }

      let myDropzone = new Dropzone('div#js-dropzone', {
        url: urlActionForm,
        paramName: 'photo',
        thumbnailWidth: 354,
        thumbnailHeight: 354,
        addRemoveLinks: true,
        uploadMultiple: false,
        maxFiles: 1,
        maxFilesize: 2,
        autoProcessQueue: false,
        dictFileTooBig: `${sizeErrorMessage} {{maxFilesize}}MB.`,
        dictInvalidFileType: typeErrorMessage,
        acceptedFiles: 'image/jpeg,image/png,image/jpg',
        init: function () {
          let self = this;

          self.on('addedfile', function ( file ) {
            const state = form.parsley().isValid();
            const fileSize = file.size;
            const maxSize = parseInt(maxFileSize, 10);

            const toBites = num => num * 1024 * 1024;
            const suitableSize = fileSize <= toBites(maxSize);

            if ( state && suitableSize ) {
              isAddedFile = true;
            }
          });

          self.on('removedfile', function () {
            isAddedFile = false;
          });

          self.on('sending', function ( file, xhr, formData ) {
            const $fields = form.find('.form-input');
            const $hiddenFields = form.find('input[type*="hidden"]');
            const $radioField = form.find('.wpcf7-radio input:checked');
            const $checkboxField = form.find('.wpcf7-checkbox input');

            $fields.each(function () {
              const $self = $(this);
              formData.append($self.attr('name'), $self.val());
            });
            $hiddenFields.each(function () {
              const $self = $(this);
              formData.append($self.attr('name'), $self.val());
            });
            $checkboxField.each(function () {
              const $self = $(this);
              formData.append($self.attr('name'), $self.prop('checked'));
            });
            formData.append($radioField.attr('name'), $radioField.val());
            formData.append('action', 'sendTechForm');
          });

          self.on('success', function () {
            myDropzone.removeAllFiles();

            form[ 0 ].reset();
            form.parsley().reset();
            form.parsley().reset();

            thanksPopup('[data-loan-id="other"]');
          });

          sendFormBtn.click(function (e) {
            console.log("sendFormBtn");
            
            e.preventDefault();
            let checkRequiredItem = true;

            const $fields = form.find('.form-input');
            const $hiddenFields = form.find('input[type*="hidden"]');

            $fields.each(function () {
              const $self = $(this);

              if ($self.attr('type') !== 'email' && !$self.val() ) {
                checkRequiredItem = false;
              }
            });

            $hiddenFields.each(function () {
              const $self = $(this);

              if ( !$self.val() ) {
                checkRequiredItem = false;
              }
            });

            if ( checkRequiredItem ) {
              if(!isAddedFile) {
                myDropzone.uploadFile({ name: 'nofiles', upload: { filename: 'nofiles' }});
                submitErrorContainer.style.display = 'none';
                isAddedFile = false;
              } else {
                myDropzone.processQueue();
                submitErrorContainer.style.display = 'none';
                isAddedFile = false;
              }

            } else {
              submitErrorContainer.removeAttribute('style');
              checkRequiredItem = true;
            }
          });
         },
      });

      form.find('.form-input').each(function () {
        let self = $(this);

        if ( self.hasClass('is-required') ) {
          self.attr({
            'required': true,
            'data-parsley-trigger': 'change',
          });
        }
        if ( self.attr('type') == 'tel' ) {
          self.attr('placeholder', '+38');
          self.attr('data-parsley-cphone', '');
        }
        if ( self.attr('type') == 'email' ) {
          self.attr('data-parsley-type', 'email');
        }
        if ( self.hasClass('is-number') ) {
          self.attr('data-parsley-type', 'number');
        }
      });
      form.parsley();
    }
  });
})(jQuery);

