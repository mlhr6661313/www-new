<template>
   <label class="work-filter">
      <div :class="['work-filter__wrapper', {'radio': radio}]">
         <input class="work-filter__input" v-if="!radio" type="checkbox" :id="id" :name="name" :value="value" v-model="isChecked" hidden/>
         <input class="work-filter__input" v-else="" type="radio" :id="id" :name="name" :value="value" v-model="checkRadio" hidden/>
         <span class="work-filter__name"><slot></slot></span>
      </div>
   </label>
</template>

<script>
  export default {
    props: ['id', 'name', 'value', 'radio', 'radioBtnValue'],
    data() {
      return {
        isChecked: false,
      };
    },
    computed: {
      checkRadio: {
        set(value) {
          this.$emit('change:filter:day-week', value);
        },
        get() {
          return this.radioBtnValue;
        },
      },
    },
    watch: {
      isChecked(value) {
        this.$emit('change:filter:reception', [this.id, value]);
      },
    },
  };
</script>

<style src="./when-works.scss" lang="scss" scoped></style>