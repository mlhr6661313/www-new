import $ from 'jquery';

let Validator = function() {
  function Validator(form, name, comment, tel, email, counter, thankyou, ajaxUrl) {
    this.counter = counter;
    this.form = form;
    this.name = name;
    this.comment = comment;
    this.tel = tel;
    this.email = email;
    this.thankyou = thankyou;
    this.ajaxUrl = ajaxUrl;
    this.init();
  }

  Validator.prototype.init = function init() {
    this.name_mask();
    this.validate_change_action();
    this.validate_click_action();
  };

  Validator.prototype.is_valid_phone_number = function is_valid_phone_number(phone_number) {
    const regExpObj = /\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/;
    return !(regExpObj.exec(phone_number) == null || phone_number.length != 17);
  };

  Validator.prototype.is_valid_name = function is_valid_name(name) {
    return name.length > 1 && name.length < 40;
  };
  Validator.prototype.is_valid_comment = function is_valid_comment(comment) {
    return comment.length > 1 && comment.length <= 1000;
  };

  Validator.prototype.is_valid_email = function is_valid_email(email) {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,6})+$/;
    return re.test(email);
  };

  Validator.prototype.name_mask = function name_mask() {
    $(this.name).keydown(function() {
      if(/[^a-zA-Zа-яА-ЯёЁ`ґєҐЄ´ІіЇї .]/i.test(this.value)) {
        this.value = this.value.slice(0, -1);
      }
    });
    $(this.name).keyup(function() {
      if(/[^a-zA-Zа-яА-ЯёЁ`ґєҐЄ´ІіЇї .]/i.test(this.value)) {
        this.value = this.value.slice(0, -1);
      }
    });
  };

  Validator.prototype.validate_name = function validate_name(name) {
    const _this = this;
    const errClass = 'name-error-msg-' + this.counter;
    const errSelector = 'span.name-error-msg-' + this.counter;

    if(!_this.is_valid_name($(name).val())) {
      $(name).toggleClass('field-error', true);
      $(name).toggleClass('field-success', false);

      if(!$(errSelector).html()) {
        $(name).after('<span class="' + errClass + '">' + $(name).attr('data-error') + '</span>');
      }
    } else {
      $(name).toggleClass('field-error', false);
      $(name).toggleClass('field-success', true);
      $(errSelector).fadeOut().remove();
    }
  };
  Validator.prototype.validate_comment = function validate_comment(comment) {
    const _this = this;
    const errClass = 'comment-error-msg-' + this.counter;
    const errSelector = 'span.comment-error-msg-' + this.counter;

    if(!_this.is_valid_comment($(comment).val())) {
      $(comment).toggleClass('field-error', true);
      $(comment).toggleClass('field-success', false);

      if(!$(errSelector).html()) {
        $(comment).after('<span class="' + errClass + '">' + $(comment).attr('data-error') + '</span>');
      }
    } else {
      $(comment).toggleClass('field-error', false);
      $(comment).toggleClass('field-success', true);
      $(errSelector).fadeOut().remove();
    }
  };

  Validator.prototype.validate_tel = function validate_tel(tel) {
    const _this = this;
    const errClass = 'tel-error-msg-' + this.counter;
    const errSelector = 'span.tel-error-msg-' + this.counter;

    if(!_this.is_valid_phone_number($(tel).val())) {
      $(tel).toggleClass('field-error', true);
      $(tel).toggleClass('field-success', false);

      if(!$(errSelector).html()) {
        $(tel).after('<span class="' + errClass + '">' + $(tel).attr('data-error') + '</span>');
      }
    } else {
      $(tel).toggleClass('field-error', false);
      $(tel).toggleClass('field-success', true);
      $(errSelector).fadeOut().remove();
    }
  };

  Validator.prototype.validate_email = function validate_email(email) {
    const _this = this;
    const errClass = 'email-error-msg-' + this.counter;
    const errSelector = 'span.email-error-msg-' + this.counter;

    if(!_this.is_valid_email($(email).val())) {
      $(email).toggleClass('field-error', true);

      if(!$(errSelector).html()) {
        $(email).after('<span class="' + errClass + '">' + $(email).attr('data-error') + '</span>');
      }
    } else {
      $(email).toggleClass('field-error', false);
      $(errSelector).fadeOut().remove();
    }
  };

  Validator.prototype.validate_change_action = function validate_change_action() {
    const _this = this;

    $(_this.tel).change(function() {
      _this.validate_tel(this);
    });
    $(_this.name).change(function() {
      _this.validate_name(this);
    });
    $(_this.comment).change(function() {
      _this.validate_comment(this);
    });
    $(_this.email).change(function() {
      _this.validate_email(this);
    });
  };

  Validator.prototype.sendForm = function sendForm(data) {
    const _this = this;

    $.ajax({
      type:    'POST',
      url:     _this.ajaxUrl,
      data:    {
        'action': 'sendCallback',
        'data':   data
      },
      success: function success() {
        $(_this.form).hide();
        $(_this.thankyou).show();
        _this.initGame();
      },
      error:   function error() {
        console.log('this is error.');
      }
    });
  };

  Validator.prototype.initGame = function initGame() {
    const _this = this;

    $("[data-js='play']").on('click', function () {
      $(_this.thankyou).hide();
      $('#2048game').show();
    });
    $("[data-js='not-play']").on('click', function () {
      jQuery.fancybox.close();
    });
  };

  Validator.prototype.validate_click_action = function validate_click_action() {
    const _this = this;
    $(_this.form).submit(function(evt) {
      let valid = true;
      if($(_this.tel).attr('name') != undefined) {
        if(!_this.is_valid_phone_number($(_this.tel).val())) {
          _this.validate_tel(_this.tel);
          valid = false;
        }
      }
      if($(_this.name).attr('name') != undefined) {
        if(!_this.is_valid_name($(_this.name).val())) {
          _this.validate_name(_this.name);
          valid = false;
        }
      }
      // if($(_this.comment).attr('name') != undefined) {
      //   if(!_this.is_valid_comment($(_this.comment).val())) {
      //     _this.validate_comment(_this.comment);
      //     valid = false;
      //   }
      // }
      if($(_this.email).attr('name') != undefined) {
        if(!_this.is_valid_email($(_this.email).val())) {
          _this.validate_email(_this.email);
          valid = false;
        }
      }
      if(!valid) {
        return false;
      }
      evt.preventDefault();
      $('.header .callback.open .callback_form_block').addClass('thanks');
      _this.sendForm($(this).serialize());
    });
  };
  return Validator;
}();

$(document).ready(function() {
  $('.callback-form').each(function(i) {
    let currentId = '#' + this.id;
    let ajaxUrl = $(currentId).data('url');
    let currentName = '#' + $(currentId).find('.name').attr('id');
    let currentComment = '#' + $(currentId).find('.comment').attr('id');
    let currentTel = '#' + $(currentId).find('.tel').attr('id');
    let currentEmail = '#' + $(currentId).find('.email').attr('id');
    let thankYouText = '#' + $(currentId).parent().find('.thank-you').attr('id');
    new Validator(currentId, currentName, currentComment, currentTel, currentEmail, i, thankYouText, ajaxUrl);
  });
});
