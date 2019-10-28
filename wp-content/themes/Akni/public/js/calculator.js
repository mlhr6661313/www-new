/**
 * Created by ice-and-fire on 20.06.16.
 */
'use strict';requirejs([
    'jquery',
    'select2',
    'domReady!',
    'nouislider'], function ($,a,b,noUiSlider) {
    var Tabs = {
        customTabs: function(){
            var menuItem = $('.tabs__menu-item');
            var contentItem = $('.tabs__content-item');
            $('#calc-tab-1-trigger').on('click', function () {
                if(!$(this).hasClass('active')){
                    menuItem.removeClass('active');
                    $(this).addClass('active');
                    contentItem.hide();
                    $('#calc-tab-1').show();
                }
            });
            $('#calc-tab-2-trigger').on('click', function () {
                if(!$(this).hasClass('active')){
                    menuItem.removeClass('active');
                    $(this).addClass('active');
                    contentItem.hide();
                    $('#calc-tab-2').show();
                }
            });
            $('#calc-tab-3-trigger').on('click', function () {
                if(!$(this).hasClass('active')){
                    menuItem.removeClass('active');
                    $(this).addClass('active');
                    contentItem.hide();
                    /**
                     * Yuri fix
                     * This fix Yuri bug
                     **/
                    $("#ts_calc").height('639px');
                    $("#ts_calc").find('iframe').height('639px');
                    $('#calc-tab-3').show();
                }
            });
        }
    };
    Tabs.customTabs();
    var Calculator = {
        init: function () {
            this.customSelect();
            var noslider = document.getElementById('nouslider-'+ current_tab);
            if(!noslider.classList.contains('noUi-target')) {
                noUiSlider.create(noslider, {
                    start: 15,
                    animate: false,
                    range: {
                        min: 10,
                        max: 28
                    }
                });



                noslider.noUiSlider.on('update', function (values, handle) {
                    var val = parseInt(noslider.noUiSlider.get());
                    var day = '';
                    if (val % 10 == 1 || val == 1) {
                        day = $('#translates').attr('data-day-text');
                        if (Math.floor(val / 10) == 1) {
                            day = $('#translates').attr('data-days-text');
                        }
                    } else {
                        if (val % 10 == 2 || val % 10 == 3 || val % 10 == 4) {
                            day = $('#translates').attr('data-day-r-text');
                            if (Math.floor(val / 10) == 1) {
                                day = $('#translates').attr('data-days-text');
                            }
                        } else {
                            day = $('#translates').attr('data-days-text');
                        }
                    }
                    $('.noUi-handle').text(parseInt(values[handle]) + ' ' + day);
                });
            }else{
                Calculator.updateNoSlider(10,28,15);

            }
        },
        // loader: function () {
        //     $('.page-loader').fadeOut('fast');
        // },
        updateNoSlider: function  ( min, max ,midle) {
            var updateSlider = document.getElementById('nouslider-'+ current_tab);
            //hard fix
            if(min == max){
                max = min +0.01
                updateSlider.setAttribute('disabled', true);
            }
            updateSlider.noUiSlider.updateOptions({
                start: midle,
                range: {
                    'min': min,
                    'max': max
                }
            });
        },
        customSelect: function () {
            $("option:selected").removeAttr("selected");
            $('.calculator-form #metal-content-' + current_tab).select2({
                minimumResultsForSearch: Infinity,
                placeholder: $('#translates').attr('data-chose-metal')
            });
            $('.calculator-form #rate-' + current_tab).select2({
                minimumResultsForSearch: Infinity,
                placeholder: $('#translates').attr('data-chose-tp')
            });
            $('.calculator-form #discount-status-' + current_tab).select2({
                minimumResultsForSearch: Infinity,
                placeholder: $('#translates').attr('data-none_status')
            });

        }
    };
    var current_tab = 'gold';
    (function () {
        $('.tabs__menu-item').click(function () {
            current_tab = $(this).attr('data-tab');
            initChange();
        });

        initChange();
        $('.fileupload').on('change', function () {
            var file = this.files[0];
            var number = $(this).attr('data-number');
            var reader = new FileReader();

            reader.onloadstart = function () {
                $('.loader-'+ number).show();
            };

            reader.onloadend = function () {
                $('.preview-' + number).attr('src', reader.result);
                $('[name=image-' + number + ']').val(reader.result);
                $('.preview-' + number).show();
                $('.preview-' + number).parent().addClass('uploaded');
                $('.loader-'+ number).hide();
            };

            if (file) {
                reader.readAsDataURL(file);
                $(this).hide();
                $('.delete-' + number).show();
                $('.delete-' + number).click(function () {
                    $('[data-number="' + number + '"]').val('');
                    $('[data-number="' + number + '"]').show();
                    $('.preview-' + number).attr('src', '');
                    $('.preview-' + number).hide();
                    $('.preview-' + number).parent().removeClass('uploaded');
                    $('.delete-' + number).hide();
                    return false;
                });
            } else {
                $(this).show();
            }
        });
        $('.fileupload').each(function () {
            $(this).val('');
        });
    })();

    var is_valid_weight = function (weight) {

        var regExpObj = /\d/;
        return !(regExpObj.exec(weight) == null || weight.length < 1 || weight < 1);
    };

    function validate_gold_submit() {
        if (is_valid_gold_calc_submit()) {
            $("#calc-submit-" + current_tab).removeClass('disabled');
        }
        else {
            $("#calc-submit-" + current_tab).addClass('disabled');
            $("#item-content-" + current_tab).addClass('result-disabled');
        }
    }

    var is_valid_gold_calc_submit = function () {
        if (is_valid_weight($('#weight-' + current_tab).val()) && $('#metal-content-' + current_tab).val() != ''
            && $("#rate-" + current_tab).val() != '' && $('#discount-status-' + current_tab).val() != '' && $('#metal-content-' + current_tab).val() != 'first' && $('#metal-content-' + current_tab).val() != '') {
            return true;
        }
        return false;

    };

    function initChange() {
        Calculator.init();

        $('#weight-' + current_tab).change(function () {
            if (!is_valid_weight($(this).val())) {
                $(this).toggleClass('field-error', true);
                if (!$('.weight-error-message-' + current_tab).html()) {
                    $(this).after(' <span class="' + 'weight-error-message-' + current_tab + '">' + $('#translates').attr('data-weight-validate') + '</span>');
                }
            } else {
                $(this).toggleClass('field-error', false);
                $(".weight-error-message-" + current_tab).fadeOut().remove();
            }
            validate_gold_submit();
            $("#item-content-" + current_tab).addClass('result-disabled');
        });

        $('#weight-' + current_tab).keyup(function(e) {
            if (!this.value.match(/^\d+(,\d{0,2})?$/g)) {
                this.value = this.value.slice(0, -1);
            }
        });
        $('#weight-' + current_tab).keydown(function(){
            if(/[^0-9,]/i.test(this.value)){this.value = this.value.replace(/[0-9,]/g,"")}
            $("#item-content-" + current_tab).addClass('result-disabled');
        });

        $('#weight-' + current_tab).on('blur', function(){
            if (this.value != '' && this.value !='undefined' && is_valid_weight(this.value)) {
                var lastChar = this.value.slice(-1);
                var regExpObj = /[0-9]/;
                if (regExpObj.exec(lastChar)) {
                    $('#weight-' + current_tab).val($('#weight-' + current_tab).val().replace(/[^0-9,]/g,"") + ' г');
                } else {
                    this.value = this.value.slice(0, -1) + ' г';
                }
            } else if(this.value == '') {
                if (!is_valid_weight($(this).val())) {
                    $(this).toggleClass('field-error', true);
                    if (!$('.weight-error-message-' + current_tab).html()) {
                        $(this).after(' <span class="' + 'weight-error-message-' + current_tab + '">' + $('#translates').attr('data-weight-validate') + '</span>');
                    }
                } else {
                    $(this).toggleClass('field-error', false);
                    $(".weight-error-message-" + current_tab).fadeOut().remove();
                }
                validate_gold_submit();
                $("#item-content-" + current_tab).addClass('result-disabled');
            }
        });

        $('#weight-' + current_tab).on('focus', function(){
            if( $('#weight-' + current_tab).val() != ''){
                $('#weight-' + current_tab).val($('#weight-' + current_tab).val().replace(/[^0-9,]/g,""));
            }
        });

        var detach = new Array();
        var i = 0;
        $('#metal-content-' + current_tab).on("change", function (e) {
            $("#metal-content-" + current_tab + " option[value='first']").remove();
            var gold_val = $(this).val();
            if (detach.length > 0) {
                $(detach).each(function () {

                    if (typeof $(this).attr('data-metal') !== 'undefined' ) {
                        if($(this).attr('data-metal').search('_'+gold_val+'_')!=-1)
                            $("#rate-" + current_tab).append($(this));
                    }
                });
                $("#item-content-" + current_tab).addClass('result-disabled');
            }

            $("#rate-" + current_tab).children().each(function () {
                if (typeof $(this).attr('data-metal') !== 'undefined') {
                    if($(this).attr('data-metal').search('_'+gold_val+'_') == -1)
                        detach[i] = $(this).detach();
                }else{
                    detach[i] = $(this).detach();
                }

                i++;
            });

            $("#rate-" + current_tab).select2("destroy").select2();
            $("#rate-" + current_tab).prop("disabled", false);
            getDiscount($("#rate-" + current_tab).val());
            $("#discount-status-" + current_tab).prop("disabled", false);
            validate_gold_submit();
        });

        $('#rate-' + current_tab).on("change", function (e) {
            getDiscount($(this).val());
            validate_gold_submit();
            $("#item-content-" + current_tab).addClass('result-disabled');
        });
        $('#discount-status-' + current_tab).on("change", function (e) {
            getTimeline($('#rate-' + current_tab).val(), $(this).val());
            validate_gold_submit();
            $("#item-content-" + current_tab).addClass('result-disabled');
        });
        var noslider = document.getElementById('nouslider-'+ current_tab);
        noslider.setAttribute('disabled', true);

        $("#rate-" + current_tab).prop("disabled", true);
        $("#discount-status-" + current_tab).prop("disabled", true);
        noslider.setAttribute('disabled', true);
        $("#calc-submit-" + current_tab).click(function () {
            calculation(getCalcVal(), $("#rate-" + current_tab).val());
            $("#item-content-" + current_tab).removeClass('result-disabled');
            $("html, body").stop().animate({
                scrollTop: 150
            }, 600);
        });
        $("#prepare_request_" + current_tab).click(function () {
            showRequestPopup(current_tab);
        });
        $('#stones-' + current_tab).click(function () {
            if ($(this).attr('checked') == "checked") {
                $(this).attr('checked', '');
            } else {
                $(this).attr('checked', 'checked');
            }
        });
        $('#request_name').keydown(function () {if (/[^a-zA-Zа-яА-ЯёЁ .]/i.test(this.value)) {this.value = this.value.replace(/\w+/g,"")}});
        $('#request_name').keyup(function () {if (/[^a-zA-Zа-яА-ЯёЁ .]/i.test(this.value)) {this.value = this.value.replace(/\w+/g,"")}});
        $('#request_city').keydown(function () {if (/[^a-zA-Zа-яА-ЯёЁ .]/i.test(this.value)) {this.value = this.value.replace(/\w+/g,"")}});
        $('#request_city').keyup(function () {if (/[^a-zA-Zа-яА-ЯёЁ .]/i.test(this.value)) {this.value = this.value.replace(/\w+/g,"")}});

    }

    function getCalcVal() {

        var calc_values = {};

        var noslider = document.getElementById('nouslider-'+ current_tab);
        var  weight = $('#weight-' + current_tab).val();
        if(weight[weight.length-1] == 'г'){
            weight = weight.replace(/[^0-9,]+/g,"");
        }
        calc_values['weight'] = weight;
        calc_values['metal'] = $('#metal-content-' + current_tab).val();
        calc_values['discount'] = $('#discount-status-' + current_tab).val();
        calc_values['cur_date'] = parseInt(noslider.noUiSlider.get());
        return calc_values;
    }

    function calculation(values, tarif) {
        if (values) {
            $.ajax({

                type: 'POST',
                url: "/wp-admin/admin-ajax.php",
                data: {action: 'calculate', values: values, tarif: tarif},

                success: function (data) {

                    if (data.slice(-1) == 0) {
                        data = JSON.parse(data.substring(0, data.length - 1));
                    }
                    var sum = data.sum;
                    var money = data.money;
                    var percent = Math.round(money * 100 / sum);
                    $('#total-' + current_tab).html(sum + $('#translates').attr('data-currency-text'));
                    $('#total-money-' + current_tab).html(money + $('#translates').attr('data-currency-text'));
                    $('#percent-' + current_tab).height(percent + '%');
                },
                error: function () {
                    alert('something goes wrong, please try again');
                }
            });
        }
    }

    function getDiscount(tarif) {
        var noslider = document.getElementById('nouslider-'+ current_tab);
        if (tarif != '' && tarif != 'undefined') {
            $.ajax({

                type: 'POST',
                url: "/wp-admin/admin-ajax.php",
                data: {action: 'discount', tarif: tarif},
                success: function (data) {

                    $('#discount-status-' + current_tab).html(data);
                    $("#discount-status-" + current_tab).select2("destroy").select2();
                    getTimeline($('#rate-' + current_tab).val(), $('#discount-status-' + current_tab).val());
                    noslider.removeAttribute('disabled');
                },
                error: function () {
                    alert('something goes wrong, please try again');
                }
            });
        }
    }

    function getTimeline(tarif, discount) {
        if (tarif != '' && tarif != 'undefined') {
            $.ajax({
                type: 'POST',
                url: "/wp-admin/admin-ajax.php",
                data: {action: 'timeline', tarif: tarif, discount: discount},
                success: function (data) {

                    var timeline = '';
                    if (data.slice(-1) == 0) {
                        timeline = data.substring(0, data.length - 1);
                    }
                    if (timeline != '') {
                        timeline = JSON.parse(timeline);
                        var midle = (+timeline.min + +timeline.max)/2;
                        Calculator.updateNoSlider(+timeline.min, +timeline.max , midle);
                    }

                },
                error: function () {
                    alert('something goes wrong, please try again');
                }
            });
        }
    };

    function showRequestPopup(tab) {
        var noslider = document.getElementById('nouslider-'+ current_tab);
        var weight = $('#weight-' + tab).val();
        var proba = $('#metal-content-' + tab).val();
        var stone = $('#stones-' + tab).attr('checked') == 'checked' ? $('#translates').attr('data-stones-yes-text') : $('#translates').attr('data-stones-no-text');
        var tarif = $('#rate-' + tab + ' option:selected').html();
        var days = parseInt(noslider.noUiSlider.get());
        var total = $('#total-' + tab).html();
        var sum_percents = $('#total-money-' + tab).html();

        $('#weight > .value').html(weight);
        $('[name="weight"]').val(weight);
        $('#proba > .value').html(proba);
        $('[name="proba"]').val(proba);
        $('#stone > .value').html(stone);
        $('[name="stone"]').val(stone);
        $('#tarif > .value').html(tarif);
        $('[name="tarif"]').val(tarif);
        $('#days > .value').html(days);
        $('[name="srok"]').val(days);
        $('#total > .value').html(total);
        $('[name="total"]').val(total);
        $('#sum_percents > .value').html(sum_percents);
        $('[name="sum_percents"]').val(sum_percents);
        $('.calculator-form-section').addClass('showed');
        $('body').addClass('fixed');
        $('#edit_request').click(function () {
            $('.calculator-form-section').removeClass('showed');
            $('body').removeClass('fixed');
        });

        $('#request_submit').click(function (event) {
            event.preventDefault();
            var msg = $('#request__form').serialize();
            if (customValidation()) {
                $.ajax({
                    type: 'POST',
                    url: "/wp-admin/admin-ajax.php",
                    data: msg,
                    success: function () {
                        if ($('#phone-error').length) {
                            $('#phone-error').remove();
                        }
                        if ($('#field-error').length) {
                            $('#field-error').remove();
                        }
                        // if ($('#email-error').length) {
                        //     $('#email-error').remove();
                        // }
                        $('.calculator-form-section').hide();
                        $('#request_succes').show();
                    },
                    error: function () {
                        alert('something goes wrong, please try again');
                    }
                });
            }
        });
        $('#success_close').click(function () {
            $('#request_succes').hide();
            $('.calculator-form-section').removeClass('showed');
            $('body').removeClass('fixed');
        });
    };


    function customValidation() {
        var flag = true;
        if (!is_valid_phone_number($('#request_phone'))) flag = false;
        if (!is_valid_name($('#request_name'))) flag = false;
        if (!is_valid_name($('#request_city'))) flag = false;
        // if (!validateEmail($('#request_email'))) flag = false;
        return flag;

    }

    var is_valid_phone_number = function (phone_number) {
        if (phone_number.val().length < 15) {
            if (!$('#phone-error').length) {
                phone_number.after("<span id='phone-error" + "'>" + phone_number.attr('data-phone-invalid-text') + "</span>");
            }
            return false;
        } else {
            if (!$('#phone-error').length > 0) {
                $('#phone-error').remove();
            }
        }
        return true;
    };
    var is_valid_name = function (name) {
        if (name.val() == "") {
            if (!$('#field-error').length) {
                name.after("<span id='field-error" + "'>" + name.attr('data-empty-invalid-text') + "</span>");
            }
        } else {
            if ($('#field-error').length) {
                $('#field-error').remove();
            }
        }
        return name.val() != "";
    };
    var validateEmail = function (email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email.val())) {
            if (!$('#email-error').length) {
                email.after("<span id='email-error'>" + email.attr('data-email-invalid-text') + "</span>");
            }
        } else {
            if (!$('#email-error').length > 0) {
                $('#email-error').remove();
            }
        }
        return re.test(email.val());
    };


    // Calculator.loader();

});