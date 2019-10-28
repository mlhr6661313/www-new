<template>
  <div class="departments-popup">
    <div class="departments-popup__wrapper">
      <div class="departments-popup__close-btn" @click="$emit('click:close-popup')"></div>
      <a href="#" class="departments-popup__gallery">
        <img class="departments-popup__img" :src="hasImage" alt="">
        <!-- <span><i><b>№</b>{{ department.name }}</i></span> -->
      </a>
      
      <div class="departments-popup__data">
        <div class="departments-popup__info">
          <div class="departments-popup__address">{{ department.address }}</div>
<!--          <div class="departments-popup__distance">{{ department.distance }} {{labels.km}} {{labels.from_you}}</div>-->

          <div v-bind:class="['receptionNames', 'lang-' + labels.language]">
            <div class="heading">{{ labels.accepts_text }}:</div>
            <ul>
              <li v-for="value in department.receptionNames">
              {{ value }}
              </li>
            </ul>
          </div>
          <div class="departments-popup__phones"><a :href="'tel:'+ hasPhone().clear">{{ hasPhone().original }}</a></div>

          <!-- <a href="#main-calculator-popup" class="fancybox-calc button calccredit">{{ labels.calculate_text }}</a> -->
        </div>
        <!-- <div class="departments-popup__id"></div> -->
      </div>
      <div class="decor"><i></i><i></i><i></i><i></i><i></i></div>
    </div>
  </div>
</template>

<script>
  import './departments-popup.scss';

  export default {
    props: ['department', 'labels'],
    computed: {
      hasImage() {
        return this.department.image
          ? this.department.image : '/wp-content/plugins/BranderMap/frontend/images/default-pic.png';
      },
    },
    mounted() {
      document.querySelector('#brander-map_advanced-1 > div').appendChild(document.querySelector('.departments-popup'));
    },
    methods: {
      hasPhone() {
        if (!this.department.phone) {
          this.department.phone = {};
        }
        if (!this.department.phone.original) {
          this.department.phone.original = '';
          this.department.phone.clear = '';
        }
        return this.department.phone;
      },
    },
  };
</script>