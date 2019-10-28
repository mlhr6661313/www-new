import './modules/pollyfills';
import {baseObj} from './modules/helper-function';
import {toArray} from './modules/helper-function';
import Vue from 'vue';
import vSelect from 'vue-select';
import vueSlider from 'vue-slider-component';
import SmartyTabs from './vendors/smarty-tabs';
import Tabs from './vendors/tabModule.min';
import calculatorPopup from 'vueComponents/calculator-popup/calculator-popup.vue';
import $ from 'jquery';

function getData(json) {
  return JSON.parse(json);
}

function initCalc() {
  const calculatorTabs = SmartyTabs('.calculate-tabs',{
    tabSlide:false
  });

  const calculatorReceptionsTabs = SmartyTabs('.calculate-tabs_receptions',{
    tabSlide:false
  });

  Tabs.init();

  const calculators = document.querySelectorAll('.calculator');
  if (calculators.length > 0) {
    calculators.forEach((item) => {
      const calcId = `#${item.id}`;
      if (item.dataset.samples) {
        const samples = getData(item.dataset.samples);
        const id = item.dataset.tab;
        calcConstruct(calcId, samples, id);
      }
    });
  }
}

function calcConstruct(root, samples, currentId) {
  const calcSamples = toArray(samples);
  if (calcSamples.length > 0) {
    const calculator = new Vue({
      el: root,
      data: {
        currentId,
        calcSamples,
        weightValue: '',
        samplesValue: '',
        selectSamples: [],
        tariffValue: '',
        tariffInfo: '',
        tariffs: [],
        discountInfo: '',
        discountValue: '',
        discountOptions: [],
        sum: '',
        percent: '',
        chosenField: {
          samples: false,
          tariff: false,
          discount: false,
          term: false,
          orderBtn: false,
        },
        sliderOptions: {
          value: 14,
          min: 1,
          max: 30,
        },
        isCalculated: false,
        validateRegExp: /\d+\.?\d{0,2}/,
      },

      watch: {
        weightValue(value) {
          if(this.isCalculated) {
            const formElements = this.$el.querySelector('.calculator-form').elements;
            const postData = {};
            for (let i = 0; i < formElements.length; i++) {
              postData[formElements[i].name] = formElements[i].value;
            }
            this.calculateMethod(postData);

            if (value === '') {
              this.chosenField.orderBtn = false;
            } else {
              this.chosenField.orderBtn = true;
            }
            return;
          }
          if (value !== '') {
             this.chosenField.samples = true;
             this.selectSamples = this.calcSamples;
             this.discountOptions = [];
          } else {
            this.chosenField.samples = false;
            this.chosenField.tariff = false;
            this.chosenField.discount = false;
            this.chosenField.term = false;
            this.selectSamples = [];
            this.tariffValue = null;
            this.discountValue = null;
            this.discountOptions = [];
            this.disableForm();
            this.isCalculated = false;
            this.sum = '';
            this.percent = '';
          }
        },
        samplesValue(value) {
          this.tariffValue = null;
          this.tariffs = [];
          this.sum = '';
          this.percent = '';
          if(value) {
            const formData = {
              action: 'getTariff',
              data: {
                'samples': value,
                'pledge': this.currentId
              }
            };
            baseObj.ajaxAction(formData, this.tariffSuccess);
          }
          this.discountValue = null;
          this.discountOptions = [];
          this.chosenField.tariff = !!value;
        },
        tariffValue(value) {
          this.tariffInfo = '';
          this.sum = '';
          this.percent = '';
          this.discountOptions = [];
          if(value) {
            if(value.info) {
              this.tariffInfo = value.info;
            }
            if(value.discounts) {
              this.discountValue = null;
              this.discountOptions = value.discounts;
            } else {
              this.discountValue = null;
              this.discountOptions = [];
            }
          }
          this.chosenField.discount = !!value;
        },
        discountValue(value) {
          this.sum = '';
          this.percent = '';
          this.discountInfo = '';
          if(value) {
            if (value.info) {
              this.discountInfo = value.info;
            }
            if (value.min && value.max && value.val) {
              this.sliderOptions.min = value.min;
              this.sliderOptions.max = value.max;
              this.sliderOptions.value = value.val;
              if (this.$refs.slider) {
                this.$refs.slider.refresh();
              }
            }
          }
          this.chosenField.term = !!value;
          this.chosenField.orderBtn = this.chosenField.term;
        },
      },

      computed: {
        setPercent() {
          //console.log("расчет");
          return (this.sum !== '' && this.percent !== '')
            ? (this.percent / this.sum) * 100 : 0;
            
            
        },
        setSamplesValue() {
          if (this.samplesValue) {
            return this.samplesValue;
          } else {
            return '';
          }
        },
        setTariffValue() {
          if (this.tariffValue) {
            return this.tariffValue.value;
          } else {
            return '';
          }
        },
        setDiscountValue() {
          if (this.discountValue) {
            return this.discountValue.value;
          } else {
            return '';
          }
        },
        setTermValue() {
          return this.$refs.slider
            ? this.$refs.slider.getValue()
            : this.sliderOptions.value;
        },
      },

      methods: {
        fillWithContent() {
          const getSelector = (selector) => this.$el.querySelector(selector);

          getSelector('.order-weight').innerHTML = this.weightValue;
          getSelector('[name=\'order-weight\']').value = this.weightValue;

          getSelector('[name=\'type\']').value = document.querySelector('.smarty-controller__item--active').innerText;

          getSelector('.order-sample').innerHTML = this.samplesValue;
          getSelector('[name=\'order-sample\']').value = this.samplesValue;

          getSelector('.order-tariff').innerHTML = this.tariffValue.label;
          getSelector('[name=\'order-tariff\']').value = this.tariffValue.label;

          getSelector('.order-discount').innerHTML = this.discountValue.label;
          getSelector('[name=\'order-discount\']').value = this.discountValue.label;

          const days = this.$refs.slider ? this.$refs.slider.getValue() : this.sliderOptions.value;
          getSelector('.order-days').innerHTML = days;
          getSelector('[name=\'order-days\']').value = days;

          const servicesBlock = document.getElementById('ajax_params');
          const stonesVal = getSelector('[name=\'stones\']').checked ? servicesBlock.getAttribute('data-yes') : servicesBlock.getAttribute('data-no');

          getSelector('.order-stones').innerHTML = stonesVal;
          getSelector('[name=\'order-stones\']').value = stonesVal;

          getSelector('.order-sum').innerHTML = this.sum;
          getSelector('[name=\'order-sum\']').value = this.sum;

          getSelector('.order-percent').innerHTML = this.percent;
          getSelector('[name=\'order-percent\']').value = this.percent;
        },
        calculateSuccess(success) {
          //console.log("chosenField.tariff");
          if (success) {
            const successData = getData(success);
            if (successData.sum && successData.percent) {
              this.sum = successData.sum;
              this.percent = successData.percent;
              this.isCalculated = true;
            }
          } else {
            console.error('error');
          }
        },
        calculateMethod(data) {
          const formData = {
            action: 'calcAction',
            data: data,
          };
          baseObj.ajaxAction(formData, this.calculateSuccess);
        },
        calculateAction(event) {
          const formElements = event.target.elements;
          const postData = {};
          for (let i = 0; i < formElements.length; i++) {
            postData[formElements[i].name] = formElements[i].value;
          }
          this.calculateMethod(postData);
        },
        calculateCredit() {
          const el = this.$el.querySelector('[data-js-calculatorGraphics]');
          el.classList.remove('disabled');
          console.log("calculateCredit");
          console.log(el);
          console.log(el.classList);
          $(".calc-section").animate({scrollTop: $('.calculator__calculate-btn').offset().top + $(".calc-section").scrollTop() }, 800);
          
        },
        disableForm() {
          const el = this.$el.querySelector('[data-js-calculatorGraphics]');
          el.classList.add('disabled');
        },
        onInputValidate() {
          const matched = this.weightValue.match(this.validateRegExp);
          this.weightValue = matched ? matched[0] : '';
        },
        setLetter(event) {
          const el = event.target;
          const letter = el.getAttribute('data-letter');
          if (event.type === 'focus') {
            this.weightValue = this.weightValue.replace(` ${letter}`, '');
          }
          if (event.type === 'blur' && this.weightValue !== '') {
            this.weightValue = `${this.weightValue} ${letter}`;
          }
        },
        changeInput(event) {
          const el = event.target.parentElement.getElementsByTagName('input')[0];
          if (el.checked) {
            el.checked = false;
          } else {
            el.checked = true;
          }
        },
        sliderOptionsValueUpdate(value){
          this.$refs.slider.setValue(value);
        },
        tooltipAction(event) {
          const tooltip = event.target.nextElementSibling;

          if (event.type === 'mouseover') {
            tooltip.style.opacity = 1;
            tooltip.style.visibility = 'visible';
          }
          if (event.type === 'mouseleave') {
            tooltip.style.opacity = 0;
            tooltip.style.visibility = 'hidden';
          }
        },
        tariffSuccess(success) {
          if (success) {
            const calcTariffs = getData(success);
            this.tariffs = calcTariffs.map((data) => {
              return {
                label: data.post_title,
                value: data.ID,
                info: data.post_content,
                min: parseInt(data.min, 10),
                max: parseInt(data.max, 10),
                val: parseInt(data.val, 10),
                discounts: toArray(data.discounts).map((dat) => {return {
                  label: dat.post_title,
                  info: dat.post_content,
                  value: dat.post_id,
                  min: parseInt(dat.min, 10),
                  max: parseInt(dat.max, 10),
                  val: parseInt(dat.val, 10),
                }})
              };
            });
          } else {
            console.error('error');
          }
        },
      },
      components: {
        vSelect,
        vueSlider,
        calculatorPopup,
      },
      delimiters: ['${', '}'],
    });

  }
}

document.addEventListener('DOMContentLoaded', initCalc);
