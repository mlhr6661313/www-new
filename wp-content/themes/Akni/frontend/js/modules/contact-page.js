import Vue from 'vue';
import contactInfo from 'vueComponents/contact-info/contact-info.vue';
import contactMap from 'vueComponents/contact-map/contact-map.vue';

function initContactPage() {
  const mountElement = document.querySelector('[data-js-contactPage]');

  const contactPage = new Vue({
    data: {
      contactInfoState: false,
    },

    methods: {
      afterMapInit() {
        this.contactInfoState = true;
      },
    },

    components: {
      contactInfo,
      contactMap,
    },

    delimiters: ['${', '}'],
  });

  if (mountElement) {
    contactPage.$mount(mountElement);
  }
}

initContactPage();
