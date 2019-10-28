import Vue from 'vue';
import VeeValidate from 'vee-validate';
import adminWorkDay from 'vueComponents/admin-panel/work-day/admin-work-day.vue';
import timeFilter from 'vueComponents/time-filter/time-filter.vue';

Vue.use(VeeValidate);

/**
 * Check validate form on page
 *
 * @param selector
 * @param fn
 */
function hasSelector(selector, fn) {
  const el = document.querySelector(selector);
  if (el) {
    fn();
  }
}

function createBg(parent) {
  const el = document.createElement('div');
  el.classList.add('bg-masked');
  parent.appendChild(el);
  return el;
}

window.onload = () => {
  const baseBtn = document.getElementById('publishing-action');

  /**
   * Hard fix for Wp btn for vue
   */
  hasSelector('.meta-form', () => {
    const maskedBg = createBg(baseBtn);
    baseBtn.addEventListener('click', (e) => {
      const t = e.currentTarget;
      const btn = t.querySelector('#publish');
      if (btn.hasAttribute('disabled')) {
        const inputs = document.body.querySelectorAll('[data-js-required]');
        inputs.forEach((input) => {
          input.focus();
          input.blur();
        });
      }
    });

    const app = new Vue({
      el: '.meta-form',
      delimiters: ['${', '}'],
      created() {
        this.validateAction();
      },

      components: {
        adminWorkDay,
        timeFilter,
      },

      methods: {
        isDisabled() {
          let validate = false;
          const el = document.querySelector(this.$options.el);
          const inputs = el.querySelectorAll('[data-js-required]');
          inputs.forEach((input) => {
            if (!input.value) {
              validate = true;
            }
          });
          return validate;
        },

        validateAction() {
          const btn = document.getElementById('publish');
          if (this.isDisabled()) {
            btn.setAttribute('disabled', 'disabled');
            maskedBg.style.display = 'block';
          } else {
            btn.removeAttribute('disabled');
            maskedBg.style.display = 'none';
          }
        },

        validateMeta() {
          this.validateAction();
        },
      },
    });
  });
};
